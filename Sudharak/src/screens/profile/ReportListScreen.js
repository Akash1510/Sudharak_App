import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useEffect, useRef } from "react";
import styles from "./ReportListStyles";

export default function ReportListScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const reports = [
    { id: "1", title: "Pothole Issue", status: "Pending" },
    { id: "2", title: "Garbage Dump", status: "In Progress" },
    { id: "3", title: "Water Leakage", status: "Resolved" },
    { id: "4", title: "Street Light Not Working", status: "Rejected" },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return styles.pending;
      case "In Progress":
        return styles.progress;
      case "Resolved":
        return styles.resolved;
      case "Rejected":
        return styles.rejected;
      default:
        return styles.default;
    }
  };

  const renderItem = ({ item, index }) => (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [
          {
            translateY: translateY.interpolate({
              inputRange: [0, 20],
              outputRange: [0, 20 + index * 6],
            }),
          },
        ],
      }}
    >
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.9}
        onPress={() =>
          navigation.navigate("ReportDetail", { report: item })
        }
      >
        {/* LEFT CONTENT */}
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>Tap to view details</Text>
        </View>

        {/* STATUS */}
        <View style={[styles.badge, getStatusStyle(item.status)]}>
          <Text style={styles.badgeText}>{item.status}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY }],
        }}
      >
        <Text style={styles.header}>My Reports</Text>
        <Text style={styles.subHeader}>
          Track and manage your submitted issues
        </Text>
      </Animated.View>

      {/* LIST */}
      <FlatList
        data={reports}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}