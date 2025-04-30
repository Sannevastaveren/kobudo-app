import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView, StyleSheet } from "react-native";
import { CardTest } from "@/components/Cards/components/CardTest";

export default function CardTestPage() {
  const { id: collectionId } = useLocalSearchParams<{
    id: string;
  }>();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen options={{ title: "Study Cards" }} />
      <ThemedView style={styles.container}>
        <ThemedView style={styles.markdown}>
          <CardTest collectionId={parseInt(collectionId)} />
        </ThemedView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  markdown: {
    width: "100%",
    maxWidth: 600,
  },
});
