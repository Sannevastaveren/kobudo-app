import React from "react";
import { StyleSheet, FlatList } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedButton } from "@/components/ThemedButton";
import { useGrammar } from "../hooks/useGrammar";
import { GrammarConcept } from "@/utils/database/grammar";

interface GrammarListProps {
  collectionId?: number;
}

export const GrammarList: React.FC<GrammarListProps> = ({ collectionId }) => {
  const { concepts, handleConceptDelete } = useGrammar();

  const filteredConcepts = collectionId
    ? concepts.filter((concept) => concept.collectionId === collectionId)
    : concepts;

  const renderItem = ({ item }: { item: GrammarConcept }) => (
    <ThemedView style={styles.conceptCard}>
      <ThemedView style={styles.conceptHeader}>
        <ThemedText style={styles.conceptName}>{item.name}</ThemedText>
        <ThemedButton
          icon="trash"
          onPress={() => handleConceptDelete(item.id)}
          title="Delete"
        />
      </ThemedView>
      <ThemedText style={styles.conceptDescription}>
        {item.description}
      </ThemedText>
    </ThemedView>
  );

  return (
    <ThemedView style={styles.container}>
      {filteredConcepts.length === 0 ? (
        <ThemedView style={styles.emptyState}>
          <ThemedText style={styles.emptyStateText}>
            No grammar concepts found
          </ThemedText>
        </ThemedView>
      ) : (
        <FlatList
          data={filteredConcepts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 16,
    gap: 16,
  },
  conceptCard: {
    padding: 16,
    borderRadius: 8,
    gap: 8,
  },
  conceptHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  conceptName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  conceptDescription: {
    fontSize: 16,
    opacity: 0.8,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyStateText: {
    fontSize: 16,
    opacity: 0.6,
  },
});
