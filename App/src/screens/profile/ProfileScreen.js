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
  }, []);

  // 🔄 Refresh profile when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchProfile();
    }, [])
  );

  // 📊 Fetch Reports
  const fetchReports = async () => {
    try {
      const res = await getUserReports();
      if (res.success) {
        setReports(res.data || []);
      }
    } catch (err) {
      console.log("Reports Error:", err);
    } finally {
      setLoading(false);
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
        style={styles.reportCard}
        onPress={() => navigation.navigate("ReportDetail", { reportId: item.report_id })}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.reportTitle}>{item.issue?.LABEL || "Unknown Issue"}</Text>
            <Text style={{ color: "#6B7280", fontSize: 13, marginTop: 4 }}>📍 {item.location || "No location"}</Text>
          </View>
          <View style={[
            styles.statusBadge,
            item.status === 'Resolved' ? styles.statusResolved :
              item.status === 'Pending' ? styles.statusPending : styles.statusDefault
          ]}>
            <Text style={[
              styles.statusText,
              item.status === 'Resolved' ? styles.statusTextResolved :
                item.status === 'Pending' ? styles.statusTextPending : styles.statusTextDefault
            ]}>{item.status || "Pending"}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

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