import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
  Alert,
} from "react-native";
import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./OTPVerificationStyles";

export default function OTPVerificationScreen({ navigation, route }) {
  const { t } = useTranslation();
  const { mobile_number } = route.params || {};

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputs = useRef([]);

  const shakeAnim = useRef(new Animated.Value(0)).current;
  const loadingAnim = useRef(new Animated.Value(1)).current;

  // 🔹 Handle input
  const handleChange = (text, index) => {
    if (text.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  // 🔹 Backspace
  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && index > 0 && !otp[index]) {
      inputs.current[index - 1]?.focus();
    }
  };

  // 🔹 Shake animation
  const triggerShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 6, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -6, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  };

  // 🔥 VERIFY OTP API
  const handleVerify = async () => {
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      triggerShake();
      return;
    }

    try {
      // 🔹 Button fade (loading effect)
      Animated.timing(loadingAnim, {
        toValue: 0.6,
        duration: 200,
        useNativeDriver: true,
      }).start();

      const response = await fetch(
        "http://65.2.186.163/auth/citizens/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mobile_number: `+91${mobile_number}`,
            otp: enteredOtp,
          }),
        }
      );

      const data = await response.json();
      console.log("OTP Response:", data);

      const token = data.token || data.TOKEN;

      if (response.ok && data.success && token) {
        // ✅ SAVE JWT TOKEN
        await AsyncStorage.setItem("token", token);

        navigation.replace("Language");
      } else {
        triggerShake();
        Alert.alert("Invalid OTP", data.message || "Please try again");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Network error");
    } finally {
      Animated.timing(loadingAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <View style={styles.container}>
      {/* TITLE */}
      <Text style={styles.title}>{t("verify_otp_title")}</Text>
      <Text style={styles.subtitle}>
        {t("enter_code")}
      </Text>

      {/* OTP BOXES */}
      <Animated.View
        style={[
          styles.otpContainer,
          { transform: [{ translateX: shakeAnim }] },
        ]}
      >
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputs.current[index] = ref)}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            keyboardType="numeric"
            maxLength={1}
            style={styles.otpInput}
            textAlign="center"
          />
        ))}
      </Animated.View>

      {/* VERIFY BUTTON */}
      <Animated.View style={{ opacity: loadingAnim, width: "100%" }}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleVerify}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>{t("verify")}</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* RESEND */}
      <Text style={styles.resendText}>
        {t("did_not_receive")}
        <Text style={styles.resendLink}>{t("resend")}</Text>
      </Text>
    </View>
  );
}