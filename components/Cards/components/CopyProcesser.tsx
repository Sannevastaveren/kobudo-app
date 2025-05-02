import React, { useState } from "react";
import { SafeAreaView, StyleSheet, TextInput, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ThemedButton } from "@/components/ThemedButton";

import { ThemedTextInput } from "@/components/ThemedTextInput";
import { Collapsible } from "@/components/Collapsible";
import { useCards } from "@/components/Cards/hooks/useCards";
import { addTranslationCardsInBulk } from "@/utils/database/cards";
import { PrelimCardList } from "@/components/Cards/components/PrelimCardList";

type CopyProcesserProps = {
  collectionId: number;
};
export type WordPair = {
  korean: string;
  english: string;
};

export function CopyProcesser({ collectionId }: CopyProcesserProps) {
  const { handleCardAdded } = useCards();
  const [pastedText, setPastedText] = useState("");
  const [regexString, setRegexString] = useState<string>(
    '([^-\n]+?)\\s*-\\s*"([^"]+)"'
  );
  const [pairs, setPairs] = useState<WordPair[]>([]);

  function parseTextToWordPairs(text: string): WordPair[] {
    const pairs: WordPair[] = [];
    const regex = new RegExp(regexString, "g");
    let match;

    while ((match = regex.exec(text)) !== null) {
      const korean = match[1].trim();
      const english = match[2].trim();

      // Split by commas and clean up each translation
      const translations = english
        .split(",")
        .map((t) => {
          // Remove quotes and clean up whitespace
          return t.replace(/^"|"$/g, "").trim();
        })
        .filter((t) => t); // Remove empty translations

      const koreanRemoveEnglish = korean.replace(/"\s*[^"]*?\s*"/g, "");

      // Create a pair for each translation
      translations.forEach((translation) => {
        pairs.push({
          korean: koreanRemoveEnglish, // Remove optional parts in brackets
          english: translation,
        });
      });
    }
    console.log(pairs);
    return pairs;
  }
  function handleSaveCards(pairs: WordPair[]) {
    addTranslationCardsInBulk(
      pairs.map((pair) => ({
        originalText: pair.english,
        translatedText: pair.korean,
        collectionId: collectionId,
      }))
    );

    reset();
  }

  function reset() {
    setPastedText("");
    setPairs([]);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.container}>
        <ThemedText style={styles.title}>Paste Korean Words</ThemedText>
        <Collapsible title="Change regex (optional)">
          <View style={styles.regexInputContainer}>
            <ThemedTextInput
              style={styles.regexInput}
              value={regexString}
              onChangeText={setRegexString}
            />
          </View>
        </Collapsible>
        <TextInput
          style={styles.input}
          multiline
          value={pastedText}
          onChangeText={setPastedText}
          placeholder="Paste text in format: 소개(를) 하다 - to introduce"
          placeholderTextColor="#666"
        />
        <ThemedView style={styles.buttonContainer}>
          <ThemedButton
            icon="add"
            title="Process"
            onPress={() => {
              const pairs = parseTextToWordPairs(pastedText);
              setPairs(pairs);
            }}
            disabled={!pastedText.trim()}
            size="md"
          />
        </ThemedView>
        {pairs.length > 0 && (
          <PrelimCardList
            cards={pairs}
            onSaveCards={handleSaveCards}
            onCancel={() => setPairs([])}
          />
        )}
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
    height: "100%",
  },
  regexInputContainer: {
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  buttonContainer: {
    paddingVertical: 12,
    flexDirection: "row",
    gap: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  regexInput: {
    borderRadius: 8,
    marginBottom: 12,
    padding: 2,
    color: "#fff",
    backgroundColor: "#222",
  },
  input: {
    marginTop: 12,
    minHeight: 100,
    maxHeight: 100,
    borderRadius: 8,
    padding: 12,
    color: "#fff",
    backgroundColor: "#222",
  },
});
