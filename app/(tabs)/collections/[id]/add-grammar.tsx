import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useLocalSearchParams, router } from "expo-router";
import { ThemedButton } from "@/components/ThemedButton";
import { useGrammar } from "@/components/Grammar/hooks/useGrammar";

export default function AddGrammarScreen() {
  const { id } = useLocalSearchParams();
  const collectionId = parseInt(id as string);
  const { handleConceptAdd } = useGrammar();

  const handleBack = () => {
    router.navigate({
      pathname: "/collections/[id]",
      params: { id: collectionId.toString() },
    });
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedButton
          icon="arrow.left"
          onPress={handleBack}
          size="md"
          title="Back"
        />
      </ThemedView>
      <ThemedView style={styles.content}>
        <ThemedText style={styles.title}>Add Grammar Concept</ThemedText>
        {/* Add grammar form components here */}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
  },
  content: {
    padding: 16,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
