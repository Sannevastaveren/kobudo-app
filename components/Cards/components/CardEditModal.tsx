import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { TranslationCard, TranslationCardTag } from "@/utils/database/cards";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { ThemedIconButton } from "@/components/ThemedIconButton";
import * as Speech from "expo-speech";
import { useCards } from "@/components/Cards/hooks/useCards";

type CardEditModalProps = {
  isVisible: boolean;
  onClose: () => void;
  card: TranslationCard | null;
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

export function CardEditModal({
  isVisible,
  onClose,
  card,
}: CardEditModalProps) {
  const [editedCard, setEditedCard] = useState<TranslationCard | null>(null);
  const { handleCardEdit } = useCards(card?.collectionId ?? 0);

  useEffect(() => {
    if (card) {
      setEditedCard(card);
    }
  }, [card]);

  const handleSave = () => {
    if (editedCard) {
      handleCardEdit(editedCard);
      onClose();
    }
  };

  const handleTagSelect = (tag: TranslationCardTag) => {
    if (editedCard) {
      setEditedCard({ ...editedCard, tag });
    }
  };

  if (!editedCard) return null;

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
      statusBarTranslucent={true}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalContainer}
          keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
        >
          <TouchableWithoutFeedback>
            <ThemedView style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <ThemedText style={styles.modalTitle}>Edit Card</ThemedText>
                <ThemedIconButton
                  name="xmark"
                  onPress={onClose}
                  color={Colors.dark.text}
                />
              </View>

              <View style={styles.inputContainer}>
                <ThemedText style={styles.inputLabel}>Original Text</ThemedText>
                <TextInput
                  style={styles.input}
                  value={editedCard.originalText}
                  onChangeText={(text) =>
                    setEditedCard({ ...editedCard, originalText: text })
                  }
                  placeholder="Enter original text"
                  placeholderTextColor={Colors.dark.text + "80"}
                  autoFocus={true}
                  returnKeyType="next"
                />
              </View>

              <View style={styles.inputContainer}>
                <ThemedText style={styles.inputLabel}>
                  Translated Text
                </ThemedText>
                <TextInput
                  style={styles.input}
                  value={editedCard.translatedText}
                  onChangeText={(text) =>
                    setEditedCard({ ...editedCard, translatedText: text })
                  }
                  placeholder="Enter translated text"
                  placeholderTextColor={Colors.dark.text + "80"}
                  returnKeyType="done"
                  onSubmitEditing={handleSave}
                />
              </View>

              <View style={styles.inputContainer}>
                <ThemedText style={styles.inputLabel}>Tag</ThemedText>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.tagScrollContainer}
                >
                  {Object.values(TranslationCardTag).map((tag) => (
                    <TouchableOpacity
                      key={tag}
                      style={[
                        styles.tagButton,
                        {
                          backgroundColor: getTagColor(tag),
                          opacity: editedCard.tag === tag ? 1 : 0.7,
                        },
                      ]}
                      onPress={() => handleTagSelect(tag)}
                    >
                      <ThemedText style={styles.tagButtonText}>
                        {tag}
                      </ThemedText>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.button, styles.cancelButton]}
                  onPress={onClose}
                >
                  <ThemedText style={styles.buttonText}>Cancel</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.saveButton]}
                  onPress={handleSave}
                >
                  <ThemedText style={styles.buttonText}>Save</ThemedText>
                </TouchableOpacity>
              </View>
            </ThemedView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
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
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  iconButton: {
    padding: 8,
  },
  separator: {
    height: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: Colors.dark.cardBackground,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: Platform.OS === "ios" ? 40 : 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: Colors.dark.text,
  },
  input: {
    backgroundColor: Colors.dark.background,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: Colors.dark.text,
  },
  tagScrollContainer: {
    flexDirection: "row",
    gap: 8,
    paddingVertical: 8,
  },
  tagButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
  },
  tagButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    gap: 12,
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: Colors.dark.background,
  },
  saveButton: {
    backgroundColor: Colors.dark.background,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
