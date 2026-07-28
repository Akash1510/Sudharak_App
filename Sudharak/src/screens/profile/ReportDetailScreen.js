import {
  View,
  Text,
  ScrollView,
  Animated,
  ActivityIndicator,
  Image,
  Modal,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useRef, useState } from "react";
import styles from "./ReportDetailStyles";
import { getReportDetail } from "./reportApi";

export default function ReportDetailScreen({ route }) {
  const { reportId } = route.params;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const intervalRef = useRef(null);

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem("token");
      setToken(storedToken);
    };
    fetchToken();
    fetchDetail();

    intervalRef.current = setInterval(() => {
      fetchDetail(true);
    }, 2000);

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 0.4,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start();

    return () => clearInterval(intervalRef.current);
  }, []);

  const fetchDetail = async (silent = false) => {
    try {
      if (!silent) setLoading(true);
      const res = await getReportDetail(reportId);
      const reportData = res?.data || res?.DATA || res;
      setData(reportData);
    } catch (err) {
      console.log("Detail Error:", err);
    } finally {
      if (!silent) setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  const steps = ["Pending", "In Progress", "Resolved"];

  const getNormalizedStatus = (status) => {
    if (!status) return "Pending";
    const s = status.toLowerCase();
    if (s.includes("progress")) return "In Progress";
    if (s.includes("resolve")) return "Resolved";
    return "Pending";
  };

  const currentIndex = steps.indexOf(getNormalizedStatus(data?.status));

  return (
    <ScrollView style={styles.container}>
      {/* HERO IMAGE */}
      <View>
        <Image
          source={{
            uri:
              data?.image ||
              "https://images.unsplash.com/photo-1581091215367-59ab6b64b7f8",
          }}
          style={styles.image}
        />

        <View style={styles.overlay}>
          <Text style={styles.overlayTitle}>
            {data?.issue?.LABEL}
          </Text>
        </View>
      </View>

      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY }],
          },
        ]}
      >
        {/* INFO CARD */}
        <View style={styles.card}>
          <Text style={styles.infoText}>
            🕒 Last updated: {data?.updated_at || "Now"}
          </Text>

          <View style={styles.liveContainer}>
            <Animated.View style={[styles.liveDot, { opacity: pulseAnim }]} />
            <Text style={styles.liveText}>
              Live status updating...
            </Text>
          </View>
        </View>

        {/* STATUS TRACKER */}
        <Text style={styles.sectionTitle}>Progress</Text>

        <View style={styles.card}>
          {steps.map((step, index) => {
            const isActive = index === currentIndex;
            const isCompleted = index < currentIndex;

            return (
              <View key={index} style={styles.stepRow}>
                {/* TIMELINE */}
                <View style={styles.timeline}>
                  <View
                    style={[
                      styles.circle,
                      isCompleted && styles.circleCompleted,
                      isActive && styles.circleActive,
                    ]}
                  />

                  {index !== steps.length - 1 && (
                    <View style={styles.line} />
                  )}
                </View>

                {/* CONTENT */}
                <View style={styles.stepContent}>
                  <Text
                    style={[
                      styles.stepTitle,
                      (isActive || isCompleted) &&
                      styles.stepActiveText,
                    ]}
                  >
                    {step}
                  </Text>

                  {isActive && (
                    <Text style={styles.activeText}>
                      {step === "Pending" && "Awaiting review"}
                      {step === "In Progress" && "Currently in progress"}
                      {step === "Resolved" && "Issue successfully resolved"}
                    </Text>
                  )}

                  {isCompleted && (
                    <Text style={styles.completedText}>
                      Completed
                    </Text>
                  )}

                  {step === "Resolved" && (isActive || isCompleted) && (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styles.resolvedThumbnailContainer}
                      onPress={() => setModalVisible(true)}
                    >
                      <Image
                        source={{
                          uri: `https://sudharak-resolved-images-548685422716-ap-south-1-an.s3.ap-south-1.amazonaws.com/${reportId}_resolved.png`
                        }}
                        style={styles.resolvedThumbnail}
                        resizeMode="cover"
                      />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            );
          })}
        </View>
      </Animated.View>

      {/* RESOLVED IMAGE MODAL */}
      <Modal visible={modalVisible} transparent={true} animationType="fade" onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
          <View style={styles.modalContent}>
            <Image
              source={{
                uri: `https://sudharak-resolved-images-548685422716-ap-south-1-an.s3.ap-south-1.amazonaws.com/${reportId}_resolved.png`
              }}
              style={styles.fullImage}
              resizeMode="contain"
            />
          </View>
        </View>
      </Modal>

    </ScrollView>
  );
}