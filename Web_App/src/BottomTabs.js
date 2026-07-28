import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "./screens/home/HomeScreen";
import Profile from "./screens/profile/ProfileScreen";
import styles from "./BottomStyles";

const Tab = createBottomTabNavigator();

export default function BottomTabs({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Text
              style={[
                styles.icon,
                { color: focused ? "#FFFFFF" : "#C7D2FE" },
              ]}
            >
              🏠
            </Text>
          ),
        }}
      />

      <Tab.Screen
        name="ReportDummy"
        component={Home}
        options={{
          tabBarIcon: () => (
            <TouchableOpacity
              style={styles.centerButton}
              onPress={() =>
                navigation.navigate("ReportChat")
              }
              activeOpacity={0.85}
            >
              <Text style={styles.plus}>＋</Text>
            </TouchableOpacity>
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <Text
              style={[
                styles.icon,
                { color: focused ? "#FFFFFF" : "#C7D2FE" },
              ]}
            >
              👤
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}