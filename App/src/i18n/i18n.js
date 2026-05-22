// src/i18n/i18n.js

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

// 🔹 Import translations (you can move to JSON files later)
const resources = {
  en: {
    translation: {
      welcome: "Welcome",
      continue: "Continue",
      enter_mobile: "Enter Mobile Number",
      verify_otp: "Verify OTP",
      choose_language: "Choose Your Language",
      report_issue: "Report Issue",
      submit: "Submit",
      profile: "Profile",
    },
  },
  hi: {
    translation: {
      welcome: "स्वागत है",
      continue: "जारी रखें",
      enter_mobile: "मोबाइल नंबर दर्ज करें",
      verify_otp: "ओटीपी सत्यापित करें",
      choose_language: "अपनी भाषा चुनें",
      report_issue: "समस्या दर्ज करें",
      submit: "जमा करें",
      profile: "प्रोफ़ाइल",
    },
  },
  mr: {
    translation: {
      welcome: "स्वागत आहे",
      continue: "पुढे जा",
      enter_mobile: "मोबाईल नंबर टाका",
      verify_otp: "ओटीपी पडताळा",
      choose_language: "तुमची भाषा निवडा",
      report_issue: "समस्या नोंदवा",
      submit: "सबमिट करा",
      profile: "प्रोफाइल",
    },
  },
};

// 🔹 Get device language (like en, hi, mr)
const getDeviceLanguage = () => {
  const locale = Localization.locale || "en";
  const lang = locale.split("-")[0]; // en-IN → en

  if (["en", "hi", "mr"].includes(lang)) {
    return lang;
  }

  return "en"; // fallback
};

// 🔹 Initialize i18n
i18n.use(initReactI18next).init({
  resources,
  lng: getDeviceLanguage(), // auto detect
  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
  },

  compatibilityJSON: "v3",
});

export default i18n;