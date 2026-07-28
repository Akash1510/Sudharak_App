// src/i18n/i18n.js

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

// 🔹 Import translations
const resources = {
  en: {
    translation: {
      // General
      welcome: "Welcome",
      continue: "Continue",
      submit: "Submit",
      profile: "Profile",
      
      // Auth
      get_started: "Get Started 👋",
      enter_details: "Enter your details to create an account",
      full_name: "Full Name",
      mobile_number: "Mobile Number",
      location: "Location",
      agree_terms: "By continuing, you agree to our Terms of Service and Privacy Policy",
      verify_otp_title: "Verify OTP 🔐",
      enter_code: "Enter the 6-digit code sent to your phone",
      verify: "Verify",
      did_not_receive: "Didn’t receive code? ",
      resend: "Resend",
      choose_language: "Choose Your Language",

      // Home Screen
      welcome_user: "Welcome, {{userName}} 👋",
      report_track_subtitle: "Report and track civic issues easily",
      no_reports_found: "No reports found 🚫",
      no_title: "No Title",
      no_description: "No description",
      unknown: "Unknown",
      status_label: "Status",
      status_resolved: "Resolved",
      status_in_progress: "In Progress",
      status_pending: "Pending",
      share: "Share",

      // Chat Screen
      assistant_title: "Report Assistant 🤖",
      assistant_subtitle: "Upload image & describe issue",
      describe_issue: "Describe issue...",
      report_issue: "Report Issue",
    },
  },
  hi: {
    translation: {
      // General
      welcome: "स्वागत है",
      continue: "जारी रखें",
      submit: "जमा करें",
      profile: "प्रोफ़ाइल",

      // Auth
      get_started: "शुरुआत करें 👋",
      enter_details: "खाता बनाने के लिए अपना विवरण दर्ज करें",
      full_name: "पूरा नाम",
      mobile_number: "मोबाइल नंबर",
      location: "स्थान",
      agree_terms: "जारी रखकर, आप हमारी सेवा की शर्तों और गोपनीयता नीति से सहमत होते हैं",
      verify_otp_title: "OTP सत्यापित करें 🔐",
      enter_code: "अपने फोन पर भेजा गया 6 अंकों का कोड दर्ज करें",
      verify: "सत्यापित करें",
      did_not_receive: "कोड नहीं मिला? ",
      resend: "फिर से भेजें",
      choose_language: "अपनी भाषा चुनें",

      // Home Screen
      welcome_user: "स्वागत है, {{userName}} 👋",
      report_track_subtitle: "नागरिक समस्याओं की रिपोर्ट करें और आसानी से ट्रैक करें",
      no_reports_found: "कोई रिपोर्ट नहीं मिली 🚫",
      no_title: "कोई शीर्षक नहीं",
      no_description: "कोई विवरण नहीं",
      unknown: "अज्ञात",
      status_label: "स्थिति",
      status_resolved: "हल हो गया",
      status_in_progress: "प्रगति पर है",
      status_pending: "लंबित",
      share: "शेयर करें",

      // Chat Screen
      assistant_title: "रिपोर्ट सहायक 🤖",
      assistant_subtitle: "छवि अपलोड करें और समस्या का वर्णन करें",
      describe_issue: "समस्या का वर्णन करें...",
      report_issue: "समस्या दर्ज करें",
    },
  },
  mr: {
    translation: {
      // General
      welcome: "स्वागत आहे",
      continue: "पुढे जा",
      submit: "सबमिट करा",
      profile: "प्रोफाइल",

      // Auth
      get_started: "सुरुवात करूया 👋",
      enter_details: "खाते तयार करण्यासाठी तुमचे तपशील प्रविष्ट करा",
      full_name: "पूर्ण नाव",
      mobile_number: "मोबाईल नंबर",
      location: "स्थान",
      agree_terms: "पुढे जाऊन, तुम्ही आमच्या सेवा अटी आणि गोपनीयता धोरणाशी सहमत आहात",
      verify_otp_title: "OTP पडताळा 🔐",
      enter_code: "तुमच्या फोनवर पाठवलेला 6 अंकी कोड प्रविष्ट करा",
      verify: "पडताळणी करा",
      did_not_receive: "कोड मिळाला नाही? ",
      resend: "पुन्हा पाठवा",
      choose_language: "तुमची भाषा निवडा",

      // Home Screen
      welcome_user: "स्वागत आहे, {{userName}} 👋",
      report_track_subtitle: "नागरी समस्यांची नोंद करा आणि सहज ट्रॅक करा",
      no_reports_found: "कोणतेही अहवाल आढळले नाहीत 🚫",
      no_title: "शीर्षक नाही",
      no_description: "कोणतेही वर्णन नाही",
      unknown: "अज्ञात",
      status_label: "स्थिती",
      status_resolved: "सोडवले",
      status_in_progress: "प्रगतीपथावर",
      status_pending: "प्रलंबित",
      share: "शेअर करा",

      // Chat Screen
      assistant_title: "अहवाल सहाय्यक 🤖",
      assistant_subtitle: "प्रतिमा अपलोड करा आणि समस्येचे वर्णन करा",
      describe_issue: "समस्येचे वर्णन करा...",
      report_issue: "समस्या नोंदवा",
    },
  },
};

// 🔹 Get device language
const getDeviceLanguage = () => {
  const locale = Localization.locale || "en";
  const lang = locale.split("-")[0];

  if (["en", "hi", "mr"].includes(lang)) {
    return lang;
  }

  return "en";
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