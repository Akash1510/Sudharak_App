// ============================================
// 👤 UPDATE PROFILE
// ============================================
import AsyncStorage from "@react-native-async-storage/async-storage";

const getHeaders = async () => {
  const token = await AsyncStorage.getItem("token");

  console.log("🔑 Retrieved Token:", token);

  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
};

export const updateProfile = async (data) => {
  const token = await AsyncStorage.getItem("token");
  const headers = {
    Authorization: token ? `Bearer ${token}` : "",
  };

  const isFormData = data?._parts;

  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(
    "http://65.2.186.163/auth/citizens/profile/edit",
    {
      method: "PUT",
      headers,
      body: isFormData ? data : JSON.stringify(data),
    }
  );

  return res.json();
};


// ============================================
// 👤 USER REPORTS
// ============================================

export const getUserReports = async () => {

  const headers = await getHeaders();
  const res = await fetch("http://65.2.186.163/ai/reports", {
    method: "GET",
    headers
  });

  return res.json();
};

// ============================================
// 📄 REPORT DETAIL
// ============================================

export const getReportDetail = async (reportId) => {
  const headers = await getHeaders();

  const res = await fetch(
    `http://65.2.186.163/reports/${reportId}`,
    {
      method: "GET",
      headers
    }
  );

  return res.json();
};

// ============================================
// 👤 GET USER PROFILE
// ============================================

export const getUser = async () => {
  const headers = await getHeaders();
  const res = await fetch(
    "http://65.2.186.163/auth/citizens/profile",
    {
      method: "GET",
      headers,
    }
  );

  return res.json();
};

