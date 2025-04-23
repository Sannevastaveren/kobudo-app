import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { TranslationCard, TranslationCardTag } from "@/utils/database/cards";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { ThemedIconButton } from "@/components/ThemedIconButton";
import * as Speech from "expo-speech";

type CardItemProps = {
  card: TranslationCard;
  onDeletePress?: (card: TranslationCard) => void;
  onEditPress?: (card: TranslationCard) => void;
};

const getTagColor = (tag: TranslationCardTag) => {
  switch (tag) {
    case TranslationCardTag.Verb:
      return "#FF6B6B";
    case TranslationCardTag.Noun:
      return "#4ECDC4";
    case TranslationCardTag.Adjective:
      return "#45B7D1";
    case TranslationCardTag.Adverb:
      return "#96CEB4";
    case TranslationCardTag.Pronoun:
      return "#FFEEAD";
    case TranslationCardTag.Preposition:
      return "#D4A5A5";
    case TranslationCardTag.Conjunction:
      return "#9B59B6";
    case TranslationCardTag.Interjection:
      return "#E67E22";
    case TranslationCardTag.Article:
      return "#3498DB";
    case TranslationCardTag.Number:
      return "#2ECC71";
    case TranslationCardTag.Punctuation:
      return "#95A5A6";
    default:
      return "#7F8C8D";
  }
};

export function CardItem({ card, onDeletePress, onEditPress }: CardItemProps) {
  const speak = () => {
    const thingToSay = card.translatedText;
    Speech.speak(thingToSay, { language: "ko-KR" });
  };

  return (
    <TouchableOpacity style={styles.cardContainer} activeOpacity={0.7}>
      <ThemedView
        style={[
          styles.card,
          { borderColor: getTagColor(card.tag), borderWidth: 1 },
        ]}
      >
        <View style={styles.textContainer}>
          <View style={styles.headerContainer}>
            <ThemedText style={styles.originalText}>
              {card.originalText}
            </ThemedText>
            <View
              style={[
                styles.tagContainer,
                { backgroundColor: getTagColor(card.tag) },
              ]}
            >
              <ThemedText style={styles.tagText}>
                {card.tag ?? TranslationCardTag.Other}
              </ThemedText>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.translatedTextContainer}>
            <ThemedText style={styles.translatedText}>
              {card.translatedText}
            </ThemedText>
            <ThemedIconButton
              style={styles.iconButton}
              name="speaker"
              onPress={() => speak()}
              color={Colors.dark.text}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <ThemedIconButton
            style={styles.iconButton}
            name="pencil"
            onPress={() => onEditPress?.(card)}
            color={Colors.dark.text}
          />
          <ThemedIconButton
            style={styles.iconButton}
            name="trash"
            onPress={() => onDeletePress?.(card)}
            color={Colors.dark.text}
          />
        </View>
      </ThemedView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tagContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  tagText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  translatedTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  textContainer: {
    flex: 1,
    gap: 8,
  },
  originalText: {
    fontSize: 16,
    fontWeight: "600",
    textTransform: "capitalize",
    color: Colors.dark.text,
    flex: 1,
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
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  iconButton: {
    padding: 8,
  },
});
