import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./ReportPreviewStyles";

export default function ReportPreviewScreen({ navigation, route }) {
  const { preview, token } = route.params || {};

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(40)).current;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // 🔥 Prepare preview data
  const reportData = {
    image: preview?.IMAGE_URL
      ? `${preview.IMAGE_URL}`
      : "https://via.placeholder.com/400",

    issue: preview?.ISSUE?.LABEL || "Unknown Issue",

    description:
      preview?.ENHANCED_DESCRIPTION || "No description available",

    location: preview.LOCATION, // optional (you can pass from previous screen)
  };

  // 🔥 CONFIRM REPORT API
  const handleConfirm = async () => {
    try {
      setLoading(true);

      const jwt = await AsyncStorage.getItem("token");

      const response = await fetch(
        "http://65.2.186.163/ai/confirm",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`, // ✅ JWT
          },
          body: JSON.stringify({
            TOKEN: token, // 🔥 AI TOKEN
          }),
        }
      );

      const data = await response.json();
      console.log("Confirm Response:", data);

      if (response.ok) {
        navigation.replace("ReportSuccess");
      } else {
        Alert.alert("Error", data.message || "Failed to submit");
      }
    } catch (error) {
      console.log("Confirm Error:", error);
      Alert.alert("Error", "Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>Review Report 📝</Text>
          <Text style={styles.subtitle}>
            Confirm details before submission
          </Text>
        </View>

        {/* CARD */}
        <Animated.View
          style={[
            styles.card,
            {
              opacity: fadeAnim,
              transform: [{ translateY }],
            },
          ]}
        >
          {/* IMAGE */}
          <Image
            source={{ uri: reportData.image }}
            style={styles.image}
            resizeMode="cover"
          />

          {/* CONTENT */}
          <View style={styles.content}>
            {/* ISSUE */}
            <Text style={styles.issue}>{reportData.issue}</Text>

            {/* DESCRIPTION */}
            <Text style={styles.description}>
              {reportData.description}
            </Text>

            {/* INFO */}
            <View style={styles.infoBox}>
              <View style={styles.infoItem}>
                <Text style={styles.label}>📍 Location</Text>
                <Text style={styles.value}>
                  {reportData.location}
                </Text>
              </View>

              <View>
                <Text style={styles.label}>🤖 Confidence</Text>
                <Text style={styles.value}>
                  {(preview?.ISSUE?.CONFIDENCE * 100).toFixed(0)}%
                </Text>
              </View>
            </View>
          </View>
        </Animated.View>
      </ScrollView>

      {/* BUTTON */}
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={handleConfirm}
          activeOpacity={0.85}
          style={styles.button}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>
              ✅ Confirm & Submit
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}