import { View, Text, Image, Animated, ActivityIndicator } from "react-native";
import { useEffect, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./SplashStyles";

export default function SplashScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.7)).current;
  const translateY = useRef(new Animated.Value(30)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Logo Animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 80,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();

    // Text Animation
    const textTimer = setTimeout(() => {
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    }, 600);

    // Navigation
    const navTimer = setTimeout(() => {
      navigation.replace("Login");
    }, 2800);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(navTimer);
    };
  }, []);

  return (
    <LinearGradient colors={["#4F46E5", "#312E81"]} style={styles.container}>
      
      {/* LOGO & BRANDING */}
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [
              { scale: scaleAnim },
              { translateY: translateY },
            ],
          },
        ]}
      >
        <Image
          source={require("../../../assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        
        <Animated.View style={{ opacity: textOpacity, alignItems: 'center', marginTop: 20 }}>
          <Text style={styles.title}>Sudharak</Text>
          <Text style={styles.subtitle}>Smart Civic Reporting</Text>
        </Animated.View>
      </Animated.View>

      {/* LOADING INDICATOR */}
      <Animated.View style={[styles.bottomContent, { opacity: textOpacity }]}>
        <ActivityIndicator color="#FFFFFF" size="small" />
        <Text style={styles.loadingText}>Initializing</Text>
      </Animated.View>

    </LinearGradient>
  );
}