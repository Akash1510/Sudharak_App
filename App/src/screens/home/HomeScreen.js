import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
  RefreshControl,
  StatusBar,
} from "react-native";
import { useEffect, useRef, useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import styles from "./HomeStyles";
import { getFeed, toggleUpvote, removeUpvote } from "./reportApi";

export default function HomeScreen({ navigation }) {
  const userName = "Citizens";

  const [feedData, setFeedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(30)).current;

  // ============================================
  // 🔥 FETCH FEED
  // ============================================
  const fetchFeed = async () => {
    try {
      console.log("🔥 Fetching Feed...");

      const response = await getFeed();

      console.log("📦 Feed Response:", response);

      if (response.success) {
        setFeedData(response.data);
      } else {
        console.log("⚠️ Feed not successful");
        setFeedData([]);
      }
    } catch (error) {
      console.log("❌ Feed Error:", error);
      setFeedData([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // ============================================
  // 🔥 INITIAL LOAD
  // ============================================
  useEffect(() => {
    fetchFeed();

    // 🔁 Auto refresh every 2 seconds
    const interval = setInterval(() => {
      console.log("🔄 Auto refreshing feed...");
      fetchFeed();
    }, 20000);

    // 🎬 Animation
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

    // 🧹 CLEANUP (VERY IMPORTANT)
    return () => clearInterval(interval);
  }, []);
  // ============================================
  // 🔄 REFRESH ON SCREEN FOCUS
  // ============================================
  useFocusEffect(
    useCallback(() => {
      fetchFeed();
    }, [])
  );

  // ============================================
  // 🔄 PULL TO REFRESH
  // ============================================
  const onRefresh = () => {
    setRefreshing(true);
    fetchFeed();
  };

  const handleUpvote = async (reportId) => {
    try {
      let isNowUpvoted = false;

      // 🔥 1. Optimistic UI update
      setFeedData((prev) =>
        prev.map((item) => {
          if (item.report_id === reportId) {
            const alreadyUpvoted =
              item.interaction?.user_has_upvoted;

            isNowUpvoted = !alreadyUpvoted;

            return {
              ...item,
              interaction: {
                ...item.interaction,
                user_has_upvoted: !alreadyUpvoted,
                upvote_count: alreadyUpvoted
                  ? item.interaction.upvote_count - 1
                  : item.interaction.upvote_count + 1,
              },
            };
          }
          return item;
        })
      );

      // 🔥 2. Call correct API
      if (isNowUpvoted) {
        await toggleUpvote(reportId); // 👍 POST
      } else {
        await removeUpvote(reportId); // ❌ DELETE
      }

    } catch (error) {
      console.log("❌ Upvote Error:", error);

      // 🔁 rollback if API fails
      fetchFeed();
    }
  };

  // ============================================
  // 🖼️ SAFE IMAGE
  // ============================================
  const getImage = (url) => {
    return url
      ? { uri: url }
      : {
        uri: "https://via.placeholder.com/300x200.png?text=No+Image",
      };
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Welcome, {userName} 👋</Text>
        <Text style={styles.subtitle}>
          Report and track civic issues easily
        </Text>
      </View>

      {/* LOADING */}
      {loading ? (
        <ActivityIndicator size="large" color="#4F46E5" />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {/* EMPTY STATE */}
          {feedData.length === 0 ? (
            <Text style={{ textAlign: "center", marginTop: 50 }}>
              No reports found 🚫
            </Text>
          ) : (
            feedData.map((item, index) => {
              const delay = index * 100;

              return (
                <Animated.View
                  key={item.report_id || index}
                  style={[
                    styles.cardWrapper,
                    {
                      opacity: fadeAnim,
                      transform: [
                        {
                          translateY: translateY.interpolate({
                            inputRange: [0, 30],
                            outputRange: [0, 30 + delay],
                          }),
                        },
                      ],
                    },
                  ]}
                >
                  <View style={styles.card}>
                    {/* IMAGE */}
                    <Image
                      source={getImage(item.image_url)}
                      style={styles.image}
                      resizeMode="cover"
                    />

                    {/* CONTENT */}
                    <View style={styles.cardContent}>
                      {/* TITLE */}
                      <Text style={styles.cardTitle}>
                        {item.issue?.LABEL || "No Title"}
                      </Text>

                      {/* DESCRIPTION */}
                      <Text style={{ color: "#6B7280", marginTop: 6 }}>
                        {item.enhanced_description || "No description"}
                      </Text>

                      {/* LOCATION */}
                      <Text style={{ color: "#9CA3AF", marginTop: 4 }}>
                        📍 {item.location || "Unknown"}
                      </Text>

                      {/* STATUS */}
                      <Text style={{ marginTop: 6, fontWeight: "600" }}>
                        Status: {item.status || "Pending"}
                      </Text>

                      {/* ACTIONS */}
                      <View style={styles.actions}>
                        {/* 👍 UPVOTE */}
                        <TouchableOpacity
                          style={styles.actionBtn}
                          onPress={() =>
                            handleUpvote(item.report_id)
                          }
                        >
                          <Text style={styles.actionIcon}>
                            {item.interaction?.user_has_upvoted
                              ? "👍"
                              : "👍🏻"}
                          </Text>

                          <Text style={styles.actionText}>
                            {item.interaction?.upvote_count || 0}
                          </Text>
                        </TouchableOpacity>

                        {/* 💬 COMMENT */}
                        <TouchableOpacity
                          style={styles.actionBtn}
                          onPress={() =>
                            navigation.navigate("Comments", {
                              reportId: item.report_id,
                              comments:
                                item.interaction?.recent_comments || [],
                            })
                          }
                        >
                          <Text style={styles.actionIcon}>💬</Text>
                          <Text style={styles.actionText}>
                            {item.interaction?.comment_count || 0}
                          </Text>
                        </TouchableOpacity>

                        {/* 🔗 SHARE */}
                        <TouchableOpacity style={styles.actionBtn}>
                          <Text style={styles.actionIcon}>🔗</Text>
                          <Text style={styles.actionText}>Share</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </Animated.View>
              );
            })
          )}
        </ScrollView>
      )}
    </View>
  );
}