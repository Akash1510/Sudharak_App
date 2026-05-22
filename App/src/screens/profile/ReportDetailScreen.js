import {
  View,
  Text,
  ScrollView,
  Animated,
  ActivityIndicator,
  Image,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import styles from "./ReportDetailStyles";
import { getReportDetail } from "./reportApi";

export default function ReportDetailScreen({ route }) {
  const { reportId } = route.params;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  const intervalRef = useRef(null);

  useEffect(() => {
    fetchDetail();

    intervalRef.current = setInterval(() => {
      fetchDetail(true);
    }, 5000);

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
      setData(res);
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
  const currentIndex = steps.indexOf(data?.status);

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
          <Text style={styles.infoText}>📍 {data?.location}</Text>
          <Text style={styles.infoText}>
            🕒 Last updated: {data?.updated_at || "Now"}
          </Text>

          <Text style={styles.liveText}>
            🔄 Live status updating...
          </Text>
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
                      Currently in progress
                    </Text>
                  )}

                  {isCompleted && (
                    <Text style={styles.completedText}>
                      Completed
                    </Text>
                  )}
                </View>
              </View>
            );
          })}
        </View>
      </Animated.View>
    </ScrollView>
  );
}