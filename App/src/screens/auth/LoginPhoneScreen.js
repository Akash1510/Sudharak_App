import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
  Alert,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import styles from "./LoginPhoneStyles";

export default function LoginPhoneScreen({ navigation }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // 🔥 API CALL
  const handleContinue = async () => {
    if (!name.trim() || !phone.trim() || !location.trim()) {
      return Alert.alert("Required", "Please fill all fields");
    }

    try {
      const payload = {
        name: name,
        mobile_number: `+91${phone}`,
        location: location,
      };

      console.log("Sending:", payload);

      const response = await fetch("http://65.2.186.163/auth/citizens/request-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        navigation.navigate("OTP", {
          mobile_number: phone
        });
      } else {
        Alert.alert("Error", data.message || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Network error");
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.animatedContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY }],
          },
        ]}
      >
        <Text style={styles.title}>Get Started 👋</Text>
        <Text style={styles.subtitle}>
          Enter your details to create an account
        </Text>

        {/* NAME INPUT */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            placeholder="John Doe"
            value={name}
            onChangeText={setName}
            style={styles.input}
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* PHONE INPUT */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Mobile Number</Text>
          <TextInput
            placeholder="9876543210"
            keyboardType="numeric"
            value={phone}
            onChangeText={setPhone}
            style={styles.input}
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* LOCATION INPUT */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Location</Text>
          <TextInput
            placeholder="Mumbai, Maharashtra"
            value={location}
            onChangeText={setLocation}
            style={styles.input}
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* BUTTON */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleContinue}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          By continuing, you agree to our Terms of Service and Privacy Policy
        </Text>
      </Animated.View>
    </View>
  );
}
