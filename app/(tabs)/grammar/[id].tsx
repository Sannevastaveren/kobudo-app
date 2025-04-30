import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { useGrammar } from "@/components/Grammar/hooks/useGrammar";
import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView, StyleSheet } from "react-native";
import Markdown from "react-native-markdown-display";
import { markdownStyle } from "@/components/Grammar/utils/markdownstyle";

export default function GrammarTestPage() {
  const { id: grammarId } = useLocalSearchParams<{
    id: string;
  }>();
  const { concepts } = useGrammar();

  const grammarConcept = concepts.find((concept) => concept.id === grammarId);

  if (!grammarConcept) {
    return (
      <ThemedView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Stack.Screen options={{ title: "Grammar Test" }} />
        <ThemedText>Grammar concept not found</ThemedText>
      </ThemedView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen options={{ title: grammarConcept.name }} />
      <ThemedView style={styles.container}>
        <ThemedText style={styles.title}>Explanation</ThemedText>
        <ThemedView style={styles.markdown}>
          <Markdown style={markdownStyle}>
            {grammarConcept.description}
          </Markdown>
        </ThemedView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  markdown: {
    backgroundColor: "#222",
    padding: 16,
    borderRadius: 16,
  },
});
