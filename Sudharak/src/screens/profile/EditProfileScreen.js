import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Animated,
  ActivityIndicator,
  Alert,
  Platform,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import styles from "./EditProfileStyles";
import { updateProfile } from "./reportApi";

export default function EditProfileScreen({ navigation }) {
  const route = useRoute();
  const profile = route.params?.profile || {};
  const setProfile = route.params?.setProfile;

  const [name, setName] = useState(profile.name || "");
  const [age, setAge] = useState(profile.age ? String(profile.age) : "");
  const [gender, setGender] = useState(profile.gender || "");
  const [location, setLocation] = useState(profile.location || "");
  const [image, setImage] = useState(profile.image || null);

  const [loading, setLoading] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // 🔍 Diagnostic Log
  useEffect(() => {
    console.log("📝 EditProfile received:", profile);
  }, [profile]);

  // 📸 PICK IMAGE
  const pickImage = async () => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission required");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.5,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // ✅ VALIDATION
  const validate = () => {
    if (!name.trim()) return "Name is required";
    if (!age || isNaN(age)) return "Valid age required";
    if (!gender.trim()) return "Gender required";
    if (!location.trim()) return "Location required";
    return null;
  };

  // 🔥 SAVE PROFILE
  const handleSave = async () => {
    const errorMsg = validate();
    if (errorMsg) {
      return Alert.alert("Validation Error", errorMsg);
    }

    try {
      setLoading(true);


      let payload;

      if (image && image !== profile.image) {

        // ✅ use FormData only when image exists
        payload = new FormData();

        payload.append("name", name);
        payload.append("age", String(age));
        payload.append("gender", gender);
        payload.append("location", location);

        payload.append("image", {
          uri:
            Platform.OS === "ios"
              ? image.replace("file://", "")
              : image,
          name: "profile.jpg",
          type: "image/jpeg",
        });

      } else {

        // ✅ normal JSON
        payload = {
          name,
          age: Number(age),
          gender,
          location,
        };
      }

      const res = await updateProfile(payload);
      if (res && res.success) {
        Alert.alert("Success", "Profile updated!");

        if (setProfile) {
          setProfile({
            ...profile,
            name,
            age,
            gender,
            location,
            image, // ✅ FIXED
          });
        }

        navigation.goBack();
      } else {
        Alert.alert("Error", res?.message || "Update failed");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.inner,
          {
            opacity: fadeAnim,
            transform: [{ translateY }],
          },
        ]}
      >
        {/* TITLE */}
        <Text style={styles.title}>Edit Profile ✏️</Text>

        {/* IMAGE */}
        <View style={styles.imageContainer}>
          <View style={styles.imageWrapper}>
            <Image
              source={{
                uri:
                  image ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png",
              }}
              style={styles.avatar}
            />

            <TouchableOpacity
              style={styles.editIcon}
              onPress={pickImage}
            >
              <Text style={styles.editIconText}>✎</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* FORM */}
        <View style={styles.card}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            style={styles.input}
          />

          <Text style={styles.label}>Age</Text>
          <TextInput
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
            style={styles.input}
          />

          <Text style={styles.label}>Gender</Text>
          <TextInput
            value={gender}
            onChangeText={setGender}
            placeholder="Male / Female"
            style={styles.input}
          />

          <Text style={styles.label}>Location</Text>
          <TextInput
            value={location}
            onChangeText={setLocation}
            style={styles.inputLast}
          />
        </View>

        {/* BUTTON */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleSave}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>
              Save Changes
            </Text>
          )}
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}