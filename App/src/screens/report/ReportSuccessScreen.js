import {
  View,
  Text,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useEffect, useRef } from "react";
import styles from "./ReportSuccessStyles";

export default function ReportSuccessScreen({ navigation }) {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4,
      tension: 120,
      useNativeDriver: true,
    }).start();

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 700,
      delay: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.iconContainer,
          { transform: [{ scale: scaleAnim }] },
        ]}
      >
        <Text style={styles.icon}>✓</Text>
      </Animated.View>

      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={styles.title}>Report Submitted!</Text>

        <Text style={styles.subtitle}>
          Your issue has been successfully reported.
          {"\n"}Authorities will take action soon.
        </Text>
      </Animated.View>

      <Animated.View style={{ opacity: fadeAnim, width: "100%" }}>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.85}
          onPress={() =>
            navigation.replace("Main", { screen: "Home" })
          }
        >
          <Text style={styles.buttonText}>Done</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}