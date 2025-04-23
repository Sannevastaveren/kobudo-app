import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
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
      pairs.push({ korean, english });
    }
    return pairs;
  }
  function handleSaveCards(pairs: WordPair[]) {
    console.log(pairs);
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
    <ThemedView style={styles.container}>
      <ThemedView>
        <ThemedText style={styles.title}>Paste Korean Words</ThemedText>
        <Collapsible title="Change regex (optional)">
          <View>
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
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
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
    borderWidth: 1,
    borderColor: "#666",
    borderRadius: 8,
    marginBottom: 12,
    padding: 2,
    color: "#fff",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  input: {
    minHeight: 100,
    borderWidth: 1,
    maxHeight: 100,
    borderColor: "#666",
    borderRadius: 8,
    padding: 12,
    color: "#fff",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
});
