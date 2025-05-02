import React, { useState, useCallback, memo } from "react";
import { StyleSheet, View } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedButton } from "@/components/ThemedButton";
import { Colors } from "@/constants/Colors";
import { WordPair } from "./CopyProcesser";
import { ThemedIconButton } from "@/components/ThemedIconButton";
import { ThemedModalSheet } from "@/components/ThemedModalSheet";
import { ThemedTextInput } from "@/components/ThemedTextInput";

type PrelimCardListProps = {
  cards: WordPair[];
  onSaveCards?: (pairs: WordPair[]) => void;
  onCancel?: () => void;
};

type CardItemProps = {
  item: WordPair;
  index: number;
  onEditPress: (index: number) => void;
  onRemove: (index: number) => void;
};

const CardItem = memo(
  ({ item, index, onEditPress, onRemove }: CardItemProps) => {
    return (
      <ThemedView style={styles.card}>
        <View style={styles.textContainer}>
          <ThemedText style={styles.originalText}>{item.english}</ThemedText>
          <ThemedText style={styles.translatedText}>{item.korean}</ThemedText>
        </View>
        <View style={styles.buttonContainer}>
          <ThemedIconButton
            name="pencil"
            onPress={() => onEditPress(index)}
            color={Colors.dark.text}
          />
          <ThemedIconButton
            name="trash"
            onPress={() => onRemove(index)}
            color={Colors.dark.text}
          />
        </View>
      </ThemedView>
    );
  }
);

export function PrelimCardList({
  cards: initialCards,
  onSaveCards,
  onCancel,
}: PrelimCardListProps) {
  const [cards, setCards] = useState<WordPair[]>(initialCards);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedCard, setEditedCard] = useState<WordPair | null>(null);

  const updateCard = useCallback((index: number, updatedCard: WordPair) => {
    setCards((prevCards) => {
      const newCards = [...prevCards];
      newCards[index] = updatedCard;
      return newCards;
    });
  }, []);

  const removeCard = useCallback((index: number) => {
    setCards((prevCards) => prevCards.filter((_, i) => i !== index));
  }, []);

  const handleEditPress = useCallback(
    (index: number) => {
      setEditingIndex(index);
      setEditedCard(cards[index]);
    },
    [cards]
  );

  const handleSaveEdit = useCallback(() => {
    if (editingIndex !== null && editedCard) {
      updateCard(editingIndex, editedCard);
      setEditingIndex(null);
      setEditedCard(null);
    }
  }, [editingIndex, editedCard, updateCard]);

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Review Cards</ThemedText>
      <View style={styles.cardsContainer}>
        {cards.map((item, index) => (
          <React.Fragment key={item.english + item.korean + index}>
            <CardItem
              item={item}
              index={index}
              onEditPress={handleEditPress}
              onRemove={removeCard}
            />
            {index < cards.length - 1 && <View style={styles.separator} />}
          </React.Fragment>
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <ThemedButton
          icon="close"
          title="Cancel"
          onPress={onCancel}
          size="md"
        />
        <ThemedButton
          icon="save"
          title="Save All"
          onPress={() => onSaveCards?.(cards)}
          size="md"
          disabled={cards.length === 0}
        />
      </View>

      <ThemedModalSheet
        isVisible={editingIndex !== null}
        onClose={() => {
          setEditingIndex(null);
          setEditedCard(null);
        }}
      >
        <ThemedView style={styles.modalContent}>
          <ThemedText style={styles.modalTitle}>Edit Card</ThemedText>
          <ThemedTextInput
            value={editedCard?.english ?? ""}
            onChangeText={(text) =>
              setEditedCard((prev) =>
                prev ? { ...prev, english: text } : null
              )
            }
            placeholder="Original text"
          />
          <ThemedTextInput
            value={editedCard?.korean ?? ""}
            onChangeText={(text) =>
              setEditedCard((prev) => (prev ? { ...prev, korean: text } : null))
            }
            placeholder="Translated text"
          />
          <View style={styles.modalButtons}>
            <ThemedButton
              icon="close"
              title="Cancel"
              onPress={() => {
                setEditingIndex(null);
                setEditedCard(null);
              }}
              size="md"
            />
            <ThemedButton
              icon="save"
              title="Save"
              onPress={handleSaveEdit}
              size="md"
            />
          </View>
        </ThemedView>
      </ThemedModalSheet>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardsContainer: {
    flex: 1,
  },
  card: {
    padding: 12,
    borderRadius: 8,
    flexDirection: "row",
    backgroundColor: Colors.dark.cardBackground,
    gap: 8,
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
  separator: {
    height: 12,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  modalContent: {
    padding: 16,
    gap: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
});
