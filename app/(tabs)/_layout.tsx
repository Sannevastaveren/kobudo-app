import { Colors } from "@/constants/Colors";
import { HapticTab } from "@/deprecated/components/HapticTab";
import TabBarBackground from "@/deprecated/components/ui/TabBarBackground";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Platform, useColorScheme } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "dark"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Chapters",
          href: null,
          tabBarIcon: ({ color }) => (
            <Ionicons name="file-tray-stacked" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="[chapterId]/main"
        options={{
          title: "Learn",
          tabBarIcon: ({ color }) => (
            <Ionicons name="book" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="[chapterId]/reading"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
