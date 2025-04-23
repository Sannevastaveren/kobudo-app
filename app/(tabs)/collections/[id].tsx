import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useLocalSearchParams, router } from "expo-router";
import { CardList } from "@/components/Cards/components/CardList";
import { useCollections } from "@/components/Collections/hooks/useCollections";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedTabs } from "@/components/ThemedTabs";
import { GrammarList } from "@/components/Grammar/components/GrammarList";
import { useGrammar } from "@/components/Grammar/hooks/useGrammar";
export default function CollectionScreen() {
  const { id } = useLocalSearchParams();
  const collectionId = parseInt(id as string);
  const [activeTab, setActiveTab] = useState("cards");

  const { collections } = useCollections();
  const { concepts } = useGrammar();

  const collection = collections.find((c) => c.id === collectionId);

  const handleAddCards = () => {
    router.push({
      pathname: "/collections/[id]/add-card",
      params: { id: collectionId.toString() },
    });
  };

  const handleAddGrammar = () => {
    router.push({
      pathname: "/collections/[id]/add-grammar",
      params: { id: collectionId.toString() },
    });
  };
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText style={styles.title}>{collection?.name}</ThemedText>
        {collection?.description && (
          <ThemedText style={styles.description}>
            {collection?.description}
          </ThemedText>
        )}
      </ThemedView>
      <ThemedView style={styles.buttonContainer}>
        <ThemedButton icon="add" title="Add cards" onPress={handleAddCards} />
        <ThemedButton
          icon="add"
          title="Add grammar"
          onPress={handleAddGrammar}
        />
        <ThemedButton icon="book.fill" title="Study" onPress={() => {}} />
      </ThemedView>
      <ThemedTabs
        tabs={[
          { key: "cards", title: "Cards" },
          { key: "grammar", title: "Grammar" },
        ]}
        activeTab={activeTab}
        onTabPress={(tabKey) => {
          setActiveTab(tabKey);
        }}
      />
      {activeTab === "cards" && <CardList collectionId={collectionId} />}
      {activeTab === "grammar" && <GrammarList collectionId={collectionId} />}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    gap: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  buttonContainer: {
    padding: 16,
    flexDirection: "row",
    gap: 8,
  },
  description: {
    fontSize: 16,
    opacity: 0.8,
  },
});
