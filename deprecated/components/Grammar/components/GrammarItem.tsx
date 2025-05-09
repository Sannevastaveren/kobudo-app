import React from "react";
import { StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { GrammarConcept } from "@/utils/database/grammar";
import Markdown from "react-native-markdown-display";
import { markdownStyle } from "@/components/Grammar/utils/markdownstyle";

interface GrammarItemProps {
  concept: GrammarConcept;
}

export function GrammarItem({ concept }: GrammarItemProps) {
  return (
    <Link
      href={{
        pathname: "/grammar/[id]",
        params: { id: concept.id },
      }}
      asChild
    >
      <Pressable>
        <ThemedView style={styles.container}>
          <ThemedText style={styles.title}>{concept.name}</ThemedText>
          <ThemedText style={styles.summary} numberOfLines={2}>
            {concept.summary}
          </ThemedText>
          {/* <Markdown style={markdownStyle}>{concept.description}</Markdown> */}
        </ThemedView>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  summary: {
    fontSize: 14,
    opacity: 0.7,
  },
});
