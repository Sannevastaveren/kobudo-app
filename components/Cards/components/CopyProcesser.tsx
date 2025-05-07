import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Animated,
  FlatList,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ThemedButton } from "@/components/ThemedButton";

import { ThemedTextInput } from "@/components/ThemedTextInput";
import { Collapsible } from "@/components/Collapsible";
import { useCards } from "@/components/Cards/hooks/useCards";
import { addTranslationCardsInBulk } from "@/utils/database/cards";
import { PrelimCardList } from "@/components/Cards/components/PrelimCardList";
import { ProgressBar } from "@/components/ui/Progressbar";
import { Colors } from "@/constants/Colors";

const HEADER_MIN_HEIGHT = 60;
const HEADER_MAX_HEIGHT = 250;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

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
  const scrollY = useRef(new Animated.Value(0)).current;
  const [scrollProgress, setScrollProgress] = useState(0);

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: "clamp",
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

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

  const renderHeader = () => (
    <Animated.View style={[styles.header, { height: headerHeight }]}>
      <Animated.View style={[styles.headerContent, { opacity: headerOpacity }]}>
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
      </Animated.View>
      {pairs.length > 0 && (
        <Animated.View
          style={[
            styles.progressContainer,
            {
              opacity: scrollY.interpolate({
                inputRange: [0, HEADER_SCROLL_DISTANCE],
                outputRange: [0, 1],
                extrapolate: "clamp",
              }),
            },
          ]}
        >
          <ProgressBar
            progress={scrollProgress}
            height={4}
            backgroundColor={Colors.dark.cardBackground}
            fillColor={"green"}
          />
          <ThemedText style={styles.progressText}>
            {Math.round(scrollProgress * 100)}% reviewed
          </ThemedText>
        </Animated.View>
      )}
    </Animated.View>
  );

  const renderContent = () => (
    <PrelimCardList
      cards={pairs}
      onSaveCards={handleSaveCards}
      onCancel={() => setPairs([])}
    />
  );

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: false,
      listener: (event: any) => {
        const { contentOffset, contentSize, layoutMeasurement } =
          event.nativeEvent;
        const progress =
          contentOffset.y / (contentSize.height - layoutMeasurement.height);
        setScrollProgress(Math.min(Math.max(progress, 0), 1));
      },
    }
  );

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.container}>
        {renderHeader()}
        {pairs.length > 0 && (
          <FlatList
            data={[{ key: "content" }]}
            renderItem={renderContent}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            contentContainerStyle={[
              styles.scrollContent,
              {
                paddingTop: HEADER_MAX_HEIGHT,
              },
            ]}
          />
        )}
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    overflow: "hidden",
    zIndex: 1,
  },
  headerContent: {
    padding: 16,
  },
  scrollContent: {
    flexGrow: 1,
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
  progressContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 4,
    backgroundColor: Colors.dark.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.cardBackground,
  },
  progressText: {
    fontSize: 12,
    opacity: 0.8,
    textAlign: "right",
  },
});
