import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Animated,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import { useEffect, useRef, useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import styles from "./ProfileStyles";
import { getUserReports, getUser } from "./reportApi";

export default function ProfileScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(30)).current;

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);

  // 🔥 Initial load
  useEffect(() => {
    fetchReports();

    const interval = setInterval(() => {
      fetchReports(true);
    }, 5000);

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start();

    return () => clearInterval(interval);
  }, []);

  // 🔄 Refresh profile when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchProfile();
    }, [])
  );

  // 📊 Fetch Reports
  const fetchReports = async (isBackground = false) => {
    try {
      if (!isBackground) setLoading(true);
      const res = await getUserReports();
      if (res.success) {
        setReports((prev) => {
          if (!isBackground || prev.length === 0) return res.data || [];
          
          let hasChanges = false;
          const updated = prev.map((oldItem) => {
            const newItem = res.data.find(n => n.report_id === oldItem.report_id);
            if (newItem && newItem.status !== oldItem.status) {
              hasChanges = true;
              return { ...oldItem, status: newItem.status };
            }
            return oldItem;
          });
          
          if (res.data.length !== prev.length) return res.data;
          return hasChanges ? updated : prev;
        });
      }
    } catch (err) {
      console.log("Reports Error:", err);
    } finally {
      if (!isBackground) setLoading(false);
    }
  };

  // 👤 Fetch Profile
  const fetchProfile = async () => {
    try {
      const res = await getUser();
      if (res && res.success && res.data) {
        const user = res.data;
        setProfile({
          name: user.name || "",
          phone: user.mobile_number || "",
          location: user.location || "",
          age: user.age || null,
          gender: user.gender || "",
          image: user.image || null,
        });
      }
    } catch (err) {
      console.log("Profile Error:", err);
    } finally {
      setProfileLoading(false);
    }
  };

  const renderItem = ({ item, index }) => (
    <Animated.View
      style={[
        styles.reportItemWrapper,
        {
          opacity: fadeAnim,
          transform: [
            {
              translateY: translateY.interpolate({
                inputRange: [0, 30],
                outputRange: [0, 30 + index * 10],
              }),
            },
          ],
        },
      ]}
    >
      <TouchableOpacity
        style={[styles.reportCard, { paddingVertical: 14, paddingHorizontal: 16 }]}
        onPress={() => navigation.navigate("ReportDetail", { reportId: item.report_id })}
        activeOpacity={0.7}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image 
            source={{ uri: `https://sudharak-unresolved-images-548685422716-ap-south-1-an.s3.ap-south-1.amazonaws.com/${item.report_id}.jpg` }} 
            style={{ width: 56, height: 56, borderRadius: 12, marginRight: 14 }}
          />
          <View style={{ flex: 1, paddingRight: 8 }}>
            <Text style={[styles.reportTitle, { fontSize: 16 }]} numberOfLines={1}>
              {item.issue?.LABEL || "Report Issue"}
            </Text>
            <Text style={{ color: "#6B7280", fontSize: 13, marginTop: 4 }} numberOfLines={1}>
              📍 {item.location || "Location not specified"}
            </Text>
          </View>
          <View style={[
            styles.statusBadge,
            { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12 },
            (item.status?.toLowerCase().includes('resolve')) ? styles.statusResolved :
              (item.status?.toLowerCase().includes('progress')) ? styles.statusDefault :
                styles.statusPending
          ]}>
            <Text style={[
              styles.statusText,
              { fontSize: 12, fontWeight: '700' },
              (item.status?.toLowerCase().includes('resolve')) ? styles.statusTextResolved :
                (item.status?.toLowerCase().includes('progress')) ? styles.statusTextDefault :
                  styles.statusTextPending
            ]}>
              {item.status?.toLowerCase().includes('resolve') ? "Resolved" :
                item.status?.toLowerCase().includes('progress') ? "In Progress" : "Pending"}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  // Analytics logic
  const totalReports = reports.length;
  const resolvedCount = reports.filter(r => r.status?.toLowerCase().includes('resolve')).length;
  const inProgressCount = reports.filter(r => r.status?.toLowerCase().includes('progress')).length;
  const pendingCount = totalReports - resolvedCount - inProgressCount;
  
  const resolvedWidth = totalReports > 0 ? (resolvedCount / totalReports) * 100 : 0;
  const inProgressWidth = totalReports > 0 ? (inProgressCount / totalReports) * 100 : 0;
  const pendingWidth = totalReports > 0 ? (pendingCount / totalReports) * 100 : 0;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Profile</Text>
      </View>

      {/* PROFILE CARD */}
      <View style={styles.profileCard}>
        {profileLoading ? (
          <ActivityIndicator color="#4F46E5" />
        ) : profile ? (
          <View style={styles.profileRow}>
            <Image
              source={{ uri: profile.image || "https://cdn-icons-png.flaticon.com/512/149/149071.png" }}
              style={styles.avatar}
            />

            <View style={styles.profileInfo}>
              <Text style={styles.name}>{profile.name || "User"}</Text>
              <Text style={styles.info}>{profile.phone || "No phone linked"}</Text>
              <Text style={styles.info}>📍 {profile.location || "Location not set"}</Text>
              <View style={{ flexDirection: 'row', marginTop: 6 }}>
                <View style={{ backgroundColor: '#F3F4F6', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6, marginRight: 8 }}>
                  <Text style={{ fontSize: 11, color: '#6B7280' }}>Age: {profile.age || '?'}</Text>
                </View>
                <View style={{ backgroundColor: '#F3F4F6', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 }}>
                  <Text style={{ fontSize: 11, color: '#6B7280' }}>{profile.gender || 'Not specified'}</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate("EditProfile", { profile, setProfile })}
              style={{ padding: 8 }}
            >
              <Text style={{ fontSize: 18 }}>✏️</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={{ textAlign: 'center', color: '#EF4444' }}>Profile load error</Text>
        )}
      </View>

      {/* STATISTICS GRAPH */}
      {totalReports > 0 && (
        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>Report Analytics</Text>
          <View style={styles.stackedBarContainer}>
            <View style={[styles.barSegment, { width: `${resolvedWidth}%`, backgroundColor: '#16A34A' }]} />
            <View style={[styles.barSegment, { width: `${inProgressWidth}%`, backgroundColor: '#2563EB' }]} />
            <View style={[styles.barSegment, { width: `${pendingWidth}%`, backgroundColor: '#D97706' }]} />
          </View>
          <View style={styles.legendContainer}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#16A34A' }]} />
              <Text style={styles.legendText}>Resolved ({resolvedCount})</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#2563EB' }]} />
              <Text style={styles.legendText}>In Progress ({inProgressCount})</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#D97706' }]} />
              <Text style={styles.legendText}>Pending ({pendingCount})</Text>
            </View>
          </View>
        </View>
      )}

      {/* REPORTS */}
      <Text style={styles.sectionTitle}>My Reports</Text>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : reports.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          No reports found 🚫
        </Text>
      ) : (
        <FlatList
          data={reports}
          keyExtractor={(item) => item.report_id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}