import React, { useCallback, useState } from "react";
import { View, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { TranslationCard } from "@/utils/database/cards";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { CardItem } from "@/components/Cards/components/CardItem";
import { CardEditModal } from "@/components/Cards/components/CardEditModal";
import { useCards } from "@/components/Cards/hooks/useCards";
import { useFocusEffect } from "expo-router";

type CardListProps = {
  collectionId: number;
  onCardPress?: (card: TranslationCard) => void;
};

export function CardList({ collectionId, onCardPress }: CardListProps) {
  const { handleCardDelete, reload, cards } = useCards(collectionId);
  const [editingCard, setEditingCard] = useState<TranslationCard | null>(null);

  const handleEditComplete = () => {
    setEditingCard(null);
    reload();
  };

  useFocusEffect(
    useCallback(() => {
      reload();
    }, [])
  );

  const renderCard = ({ item }: { item: TranslationCard }) => (
    <CardItem
      key={item.id + item.originalText + item.translatedText}
      card={item}
      onDeletePress={() => handleCardDelete(item.id)}
      onEditPress={() => setEditingCard(item)}
    />
  );

  return (
    <ThemedView style={styles.container}>
      {cards.length === 0 ? (
        <ThemedView style={styles.emptyState}>
          <ThemedText style={styles.emptyStateText}>No cards found</ThemedText>
        </ThemedView>
      ) : (
        <FlatList
          data={cards}
          renderItem={renderCard}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}
      <CardEditModal
        isVisible={!!editingCard}
        onClose={handleEditComplete}
        card={editingCard}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    backgroundColor: "none",
    maxHeight: "80%",
  },
  listContainer: {
    padding: 16,
    gap: 12,
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  cardContainer: {
    borderRadius: 12,
    overflow: "hidden",
  },
  card: {
    flexDirection: "row",
    padding: 16,
    borderRadius: 12,
    backgroundColor: Colors.dark.cardBackground,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  textContainer: {
    flex: 1,
    gap: 8,
  },
  originalText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.dark.text,
  },
  translatedText: {
    fontSize: 16,
    color: Colors.dark.text,
    opacity: 0.8,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.dark.text,
    opacity: 0.2,
  },
  deleteButton: {
    padding: 8,
    marginLeft: 8,
  },
  separator: {
    height: 8,
  },
});
