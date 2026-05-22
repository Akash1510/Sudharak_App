


import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "http://65.2.186.163";

// ============================================
// 🔐 COMMON HEADERS (JWT)
// ============================================
const getHeaders = async () => {
  const token = await AsyncStorage.getItem("token");

  console.log("🔑 Retrieved Token:", token);

  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
};

// ============================================
// 🔥 COMMON RESPONSE HANDLER
// ============================================
const handleResponse = async (res) => {
  let data;

  try {
    data = await res.json();
  } catch (e) {
    throw new Error("Invalid JSON response");
  }

  console.log("📡 Status:", res.status);
  console.log("📦 Response:", data);

  if (!res.ok) {
    throw new Error(data?.message || "API Error");
  }

  // ✅ Normalize response
  return {
    success: data.success || data.STATUS === "Success",
    data: data.data || data.DATA || [],
    raw: data,
  };
};

// ============================================
// 🔥 FEED
// ============================================
export const getFeed = async () => {
  try {
    console.log("🔥 Calling FEED API...");

    const headers = await getHeaders();

    const res = await fetch(`${BASE_URL}/ai/feed`, {
      method: "GET",
      headers,
    });

    return await handleResponse(res);
  } catch (error) {
    console.log("❌ Feed API Error:", error.message);
    return { success: false, data: [] };
  }
};

// ============================================
// 👍 TOGGLE UPVOTE
// ============================================
export const toggleUpvote = async (reportId) => {
  try {
    const headers = await getHeaders();

    const res = await fetch(
      `${BASE_URL}/reports/${reportId}/upvote`,
      {
        method: "POST",
        headers,
      }
    );

    return await handleResponse(res);
  } catch (error) {
    console.log("❌ Upvote Error:", error.message);
    return { success: false };
  }
};

// ============================================
// ❌ REMOVE UPVOTE (DELETE)
// ============================================
export const removeUpvote = async (reportId) => {
  try {
    const headers = await getHeaders();

    const res = await fetch(
      `${BASE_URL}/reports/${reportId}/upvote`,
      {
        method: "DELETE", // ✅ IMPORTANT CHANGE
        headers
      }
    );

    return await handleResponse(res);
  } catch (error) {
    console.log("❌ Remove Upvote Error:", error.message);
    return { success: false };
  }
};

// ============================================
// 💬 ADD COMMENT
// ============================================
export const addComment = async (reportId, text) => {
  try {
    const headers = await getHeaders();

    const res = await fetch(
      `${BASE_URL}/reports/${reportId}/comment`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({ text }),
      }
    );

    return await handleResponse(res);
  } catch (error) {
    console.log("❌ Add Comment Error:", error.message);
    return { success: false };
  }
};

// ============================================
// ✏️ EDIT COMMENT
// ============================================
export const editComment = async (reportId, commentId, text) => {
  try {
    const headers = await getHeaders();

    const res = await fetch(
      `${BASE_URL}/reports/${reportId}/comment/${commentId}`,
      {
        method: "PUT",
        headers,
        body: JSON.stringify({ text }),
      }
    );

    return await handleResponse(res);
  } catch (error) {
    console.log("❌ Edit Comment Error:", error.message);
    return { success: false };
  }
};

// ============================================
// 🗑️ DELETE COMMENT
// ============================================
export const deleteComment = async (reportId, commentId) => {
  try {
    const headers = await getHeaders();

    const res = await fetch(
      `${BASE_URL}/reports/${reportId}/comment/${commentId}`,
      {
        method: "DELETE",
        headers,
      }
    );

    return await handleResponse(res);
  } catch (error) {
    console.log("❌ Delete Comment Error:", error.message);
    return { success: false };
  }
};