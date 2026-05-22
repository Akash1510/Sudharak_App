import AsyncStorage from "@react-native-async-storage/async-storage";

export const apiRequest = async (url, method = "GET", body = null) => {
  const token = await AsyncStorage.getItem("token");

  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: body ? JSON.stringify(body) : null,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "API Error");
  }

  return data;
};