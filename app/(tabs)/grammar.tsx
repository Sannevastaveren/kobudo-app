import React from "react";
import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { useGrammar } from "@/components/Grammar/hooks/useGrammar";
import { GrammarList } from "@/components/Grammar/components/GrammarList";
import { ThemedText } from "@/components/ThemedText";
export default function GrammarPage() {
  const { concepts } = useGrammar();

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: "Grammar" }} />
      <ThemedText style={styles.title}>Korean grammar concepts</ThemedText>
      <GrammarList />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  emptySubText: {
    fontSize: 16,
    textAlign: "center",
    opacity: 0.7,
  },
  listContainer: {
    gap: 8,
  },
});
