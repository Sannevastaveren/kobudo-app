import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, SafeAreaView } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedButton } from "@/components/ThemedButton";
import { useGrammar } from "../hooks/useGrammar";
import { GrammarConcept } from "@/utils/database/grammar";
import Markdown from "react-native-markdown-display";
import { useCards } from "@/components/Cards/hooks/useCards";
import { TranslationCard, TranslationCardTag } from "@/utils/database/cards";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { checkObjectMarker } from "../utils/objectMarkers";
import * as Speech from "expo-speech";
import { ThemedIconButton } from "@/components/ThemedIconButton";

interface GrammarTestProps {
  collectionId?: number;
  grammarConcept: GrammarConcept;
}

export const GrammarTest: React.FC<GrammarTestProps> = ({ grammarConcept }) => {
  const { cards } = useCards(grammarConcept.collectionId);

  const grammarConceptTag = TranslationCardTag.Noun;

  const relatedCards = cards.filter((card) => card.tag === grammarConceptTag);

  const [currentCard, setCurrentCard] = useState<TranslationCard | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);

  useEffect(() => {
    setCurrentCard(relatedCards[currentCardIndex]);
  }, [relatedCards, currentCardIndex]);

  const handleCheckAnswer = () => {
    const lastSyllable = userAnswer.trim().charAt(userAnswer.length - 1);
    const isCorrect = checkObjectMarker(
      currentCard?.translatedText || "",
      lastSyllable || ""
    );
    if (isCorrect) {
      setIsCorrect(true);
      setCorrectAnswers(correctAnswers + 1);
    } else {
      setIsCorrect(false);
    }
    speak(userAnswer);
    setTimeout(() => {
      if (currentCardIndex < relatedCards.length - 1) {
        setIsCorrect(null);
        setUserAnswer("");
        setCurrentCardIndex(currentCardIndex + 1);
      } else {
        setIsFinished(true);
      }
    }, 1000);
  };

  function speak(text: string) {
    Speech.speak(text, {
      language: "ko-KR",
    });
  }

  useEffect(() => {
    speak(currentCard?.translatedText || "");
  }, [currentCard]);

  if (isFinished) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Finished!</ThemedText>
        <ThemedText>
          You got {correctAnswers} out of {relatedCards.length} correct.
        </ThemedText>
      </ThemedView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ThemedText style={styles.cardIndex}>
        {currentCardIndex}/{relatedCards.length}
      </ThemedText>
      <ThemedView style={styles.cardContainer}>
        <ThemedView style={styles.cardTextContainer}>
          <ThemedText style={styles.cardText}>
            {currentCard?.originalText} / {currentCard?.translatedText}
          </ThemedText>
          <ThemedIconButton
            name="speaker"
            onPress={() => speak(currentCard?.translatedText || "")}
          />
        </ThemedView>
        <ThemedTextInput
          placeholder="Enter your answer"
          value={userAnswer}
          onChangeText={setUserAnswer}
          style={styles.input}
        />
        <ThemedButton title="Check" onPress={handleCheckAnswer} />
        {isCorrect !== null && (
          <ThemedText style={styles.resultText}>
            {isCorrect ? "Correct!" : "Incorrect!"}
          </ThemedText>
        )}
      </ThemedView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  cardText: {
    fontSize: 24,
    textTransform: "capitalize",
    fontWeight: "bold",
    lineHeight: 32,
  },
  cardIndex: {
    fontSize: 24,
    fontWeight: "bold",
  },
  cardTextContainer: {
    flexDirection: "row",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "gray",
    padding: 16,
    alignItems: "center",
    gap: 16,
  },
  cardContainer: {
    flex: 1,
    gap: 16,
    backgroundColor: "none",
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  resultText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  input: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
  },
});
