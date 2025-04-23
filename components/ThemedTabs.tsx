import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";

interface Tab {
  key: string;
  title: string;
}

interface ThemedTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabPress: (tabKey: string) => void;
}

export const ThemedTabs: React.FC<ThemedTabsProps> = ({
  tabs,
  activeTab,
  onTabPress,
}) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      gap: 12,
      borderBottomWidth: 1,
      paddingHorizontal: 12,
      borderBottomColor: colors.border,
    },
    tab: {
      flex: 1,
      paddingVertical: 12,
      alignItems: "center",
    },
    activeTab: {
      borderBottomWidth: 2,
      backgroundColor: colors.border,
      borderRadius: 8,
      borderBottomColor: colors.text,
    },
    tabText: {
      color: colors.text,
      fontSize: 16,
    },
    activeTabText: {
      color: colors.text,
      fontWeight: "bold",
    },
  });

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.key}
          style={[styles.tab, activeTab === tab.key && styles.activeTab]}
          onPress={() => onTabPress(tab.key)}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === tab.key && styles.activeTabText,
            ]}
          >
            {tab.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
