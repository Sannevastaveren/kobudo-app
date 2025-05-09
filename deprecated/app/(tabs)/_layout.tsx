import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
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
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="translation"
        options={{
          title: "Translations",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="translate" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="grammar"
        options={{
          title: "Grammar",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="book.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="grammar/[id]"
        options={{
          href: null,
          title: "Grammar details",
          headerShown: true,
        }}
      />
      <Tabs.Screen
        name="collections/[id]"
        options={{
          href: null,
          title: "Collection details",
          headerShown: true,
        }}
      />
      <Tabs.Screen
        name="collections/[id]/add-card"
        options={{
          href: null,
          title: "Add cards",
          headerShown: true,
        }}
      />
      <Tabs.Screen
        name="collections/[id]/add-grammar"
        options={{
          href: null,
          title: "Add grammar",
          headerShown: true,
        }}
      />
      <Tabs.Screen
        name="collections/[id]/study-card"
        options={{
          title: "Study card",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="school" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
