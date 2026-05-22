import {
  View,
  Text,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import i18n from "../../i18n/i18n";
import { useTranslation } from "react-i18next";
import styles from "./LanguageSelectionStyles";

export default function LanguageSelectionScreen({ navigation }) {
  const { t } = useTranslation();

  const [selectedLang, setSelectedLang] = useState(i18n.language);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(40)).current;

  useEffect(() => {
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

  // Change language
  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    setSelectedLang(lang);
  };

  // Language Card Component
  const LanguageCard = ({ label, code }) => {
    const isSelected = selectedLang === code;
    const scale = useRef(new Animated.Value(1)).current;

    useEffect(() => {
      Animated.spring(scale, {
        toValue: isSelected ? 1.05 : 1,
        useNativeDriver: true,
      }).start();
    }, [isSelected]);

    return (
      <Animated.View style={{ transform: [{ scale }] }}>
        <TouchableOpacity
          onPress={() => handleLanguageChange(code)}
          activeOpacity={0.8}
          style={[
            styles.card,
            isSelected ? styles.cardSelected : styles.cardDefault,
          ]}
        >
          <Text
            style={[
              styles.cardText,
              isSelected ? styles.cardTextSelected : styles.cardTextDefault,
            ]}
          >
            {label}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.innerContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY }],
          },
        ]}
      >
        {/* TITLE */}
        <Text style={styles.title}>
          🌍 {t("Languages")}
        </Text>

        <Text style={styles.subtitle}>
          Select your preferred language
        </Text>

        {/* LANGUAGE OPTIONS */}
        <LanguageCard label="English" code="en" />
        <LanguageCard label="हिंदी" code="hi" />
        <LanguageCard label="मराठी" code="mr" />

        {/* CONTINUE BUTTON */}
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.replace("Main", { screen: "Home" })
          }
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>
            {t("continue")}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}