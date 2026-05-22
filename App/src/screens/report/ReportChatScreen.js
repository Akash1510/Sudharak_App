import styles from "./ReportChatStyles";

import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Image,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
export default function ReportChatScreen() {
  const navigation = useNavigation();

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "Hi 👋 Please upload or describe the issue.",
      sender: "bot",
    },
  ]);

  const flatListRef = useRef();

  // 🔹 BOT MESSAGE
  const addBotMessage = (text) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        text,
        sender: "bot",
      },
    ]);
  };

  // 📸 CAMERA
  const handleTakePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) return addBotMessage("Camera permission needed");

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.5,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  // 🖼 GALLERY
  const handlePickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return addBotMessage("Gallery permission needed");

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.5,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  // 📎 OPTIONS
  const handleImageOptions = () => {
    Alert.alert("Upload Image", "", [
      { text: "Camera", onPress: handleTakePhoto },
      { text: "Gallery", onPress: handlePickImage },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  // 🔥 SEND
  const handleSend = async () => {
    if (!selectedImage) {
      return addBotMessage("Please upload image first 📸");
    }

    if (!message.trim()) {
      return addBotMessage("Please enter description ✍️");
    }


    const currentMessage = message;
    const currentImage = selectedImage;

    const compressedImage = await ImageManipulator.manipulateAsync(
      currentImage,
      [{ resize: { width: 800 } }], // resize to 800px width
      {
        compress: 0.2, // 🔥 reduce size (0.0 - 1.0)
        format: ImageManipulator.SaveFormat.JPEG,
      }
    );

    // UI update first (instant UX)
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        text: currentMessage,
        image: compressedImage.uri,
        sender: "CITIZEN",
      },
    ]);

    setMessage("");
    setSelectedImage(null);
    setLoading(true);

    addBotMessage("Analyzing your issue... ⏳");

    try {
      const token = await AsyncStorage.getItem("token");

      const formData = new FormData();
      formData.append("DESCRIPTION", currentMessage);

      // Fix for Web vs Native file uploads
      if (Platform.OS === 'web') {
        const localFile = await fetch(compressedImage.uri);
        const blob = await localFile.blob();

        formData.append("IMAGE", blob, "issue.jpg");
      } else {
        formData.append("IMAGE", {
          uri: Platform.OS === 'android' ? compressedImage.uri : compressedImage.uri.replace("file://", ""),
          name: "issue.jpg",
          type: "image/jpeg",
        });
      }

      const response = await fetch("http://65.2.186.163/ai/analyze", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      const rawText = await response.text(); // ✅ ONLY ONCE

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${rawText}`);
      }

      let data;
      try {
        data = JSON.parse(rawText);
      } catch (e) {
        throw new Error(`Invalid JSON (${response.status}): ${rawText.substring(0, 100)}`);
      }

      // const response = await fetch(
      //   "http://13.127.185.60/ai/analyze",
      //   {
      //     method: "POST",
      //     headers: {
      //       // Authorization: `Bearer ${token}`,
      //       Accept: "application/json",
      //     },
      //     body: formData,
      //   }
      // );

      // let data;

      // try {
      //   data = await response.json(); // ✅ correct way
      // } catch (e) {
      //   const rawText = await response.text(); // fallback
      //   throw new Error(`Server returned non-JSON (${response.status}): ${rawText.substring(0, 100)}`);
      // }

      console.log(data);

      if (data.STATUS === "SUCCESS" || data.status === "SUCCESS") {
        navigation.navigate("ReportPreview", {
          preview: data.PREVIEW,
          token: data.TOKEN,
        });
      } else {
        addBotMessage("Something went wrong ❌");
      }
    } catch (err) {
      console.log("Fetch Error:", err);
      if (err.message.includes("Network request failed")) {
        addBotMessage("Network request failed. Is the server running / timeout?");
      } else {
        addBotMessage(`Error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  // 💬 RENDER MESSAGE
  const renderItem = ({ item }) => {
    const isUser = item.sender === "CITIZEN";

    return (
      <View
        style={[
          styles.messageRow,
          isUser ? styles.alignRight : styles.alignLeft,
        ]}
      >
        <View
          style={[
            styles.bubble,
            isUser ? styles.userBubble : styles.botBubble,
          ]}
        >
          {item.image && (
            <Image
              source={{ uri: item.image }}
              style={styles.uploadedImage}
            />
          )}

          {item.text && (
            <Text
              style={[
                styles.messageText,
                isUser ? styles.userText : styles.botText,
              ]}
            >
              {item.text}
            </Text>
          )}
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Report Assistant 🤖</Text>
          <Text style={styles.headerSubtitle}>
            Upload image & describe issue
          </Text>
        </View>

        {/* CHAT */}
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: true })
          }
          keyboardShouldPersistTaps="handled"
        />

        {/* IMAGE PREVIEW */}
        {selectedImage && (
          <View style={styles.previewContainer}>
            <Image
              source={{ uri: selectedImage }}
              style={styles.previewImage}
            />
          </View>
        )}

        {/* INPUT BAR */}
        <View style={styles.inputBar}>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={handleImageOptions}
          >
            <Text style={styles.icon}>📸</Text>
          </TouchableOpacity>

          <TextInput
            placeholder="Describe issue..."
            value={message}
            onChangeText={setMessage}
            style={styles.input}
            placeholderTextColor="#9CA3AF"
          />

          <TouchableOpacity
            style={styles.sendBtn}
            onPress={handleSend}
            disabled={loading}
            activeOpacity={0.7}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.sendText}>➤</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
