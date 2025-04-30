import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withSequence,
  withDelay,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import * as Speech from "expo-speech";
import { ThemedIconButton } from "@/components/ThemedIconButton";
import { router } from "expo-router";
import { useFocusEffect } from "expo-router";
import { useSpacedRepetition } from "../hooks/useSpacedRepetition";
import { TranslationCard } from "@/utils/database/cards";
import * as Haptics from "expo-haptics";

interface CardTestProps {
  collectionId?: number;
  cards?: TranslationCard[];
}

export const CardTest: React.FC<CardTestProps> = ({ collectionId }) => {
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);

  // Animation values
  const cardScale = useSharedValue(1);
  const cardOpacity = useSharedValue(1);
  const cardTranslateX = useSharedValue(0);
  const feedbackScale = useSharedValue(0);
  const feedbackOpacity = useSharedValue(0);

  const {
    currentCard,
    isLoading,
    totalCards,
    currentIndex,
    handleCardReview,
    reloadCards,
  } = useSpacedRepetition(collectionId);

  useFocusEffect(
    useCallback(() => {
      setIsFinished(false);
      setCorrectAnswers(0);
      setUserAnswer("");
      setIsCorrect(null);
      reloadCards();
    }, [])
  );

  const handleCheckAnswer = () => {
    const isAnswerCorrect = currentCard?.translatedText === userAnswer;
    setIsCorrect(isAnswerCorrect);

    if (isAnswerCorrect) {
      setCorrectAnswers(correctAnswers + 1);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }

    // Animate feedback
    feedbackScale.value = withSequence(
      withSpring(1, { damping: 10, stiffness: 100 }),
      withDelay(500, withSpring(0))
    );
    feedbackOpacity.value = withSequence(
      withTiming(1, { duration: 200 }),
      withDelay(500, withTiming(0))
    );

    speak(userAnswer);

    // Animate card transition
    cardScale.value = withTiming(0.8, { duration: 200 });
    cardOpacity.value = withTiming(0, { duration: 200 });
    cardTranslateX.value = withTiming(isAnswerCorrect ? 100 : -100, {
      duration: 200,
    });

    setTimeout(() => {
      handleCardReview(isAnswerCorrect);
      setIsCorrect(null);
      setUserAnswer("");

      // Reset animations
      cardScale.value = withTiming(1, { duration: 200 });
      cardOpacity.value = withTiming(1, { duration: 200 });
      cardTranslateX.value = withTiming(0, { duration: 200 });

      if (currentIndex >= totalCards) {
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
    if (currentCard?.translatedText) {
      speak(currentCard.translatedText);
    }
  }, [currentCard]);

  const cardAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: cardScale.value },
      { translateX: cardTranslateX.value },
    ],
    opacity: cardOpacity.value,
  }));

  const feedbackAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: feedbackScale.value }],
    opacity: feedbackOpacity.value,
  }));

  if (isLoading) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Loading cards...</ThemedText>
      </ThemedView>
    );
  }

  if (isFinished) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Finished!</ThemedText>
        <ThemedText>
          You got {correctAnswers} out of {totalCards} correct.
        </ThemedText>
        <ThemedButton
          title="Return to collection"
          onPress={() => {
            router.push({
              pathname: "/collections/[id]",
              params: { id: collectionId?.toString() ?? "" },
            });
          }}
        />
      </ThemedView>
    );
  }

  if (!currentCard) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>No cards due for review!</ThemedText>
        <ThemedButton
          title="Return to collection"
          onPress={() => {
            router.push({
              pathname: "/collections/[id]",
              params: { id: collectionId?.toString() ?? "" },
            });
          }}
        />
      </ThemedView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ThemedText style={styles.cardIndex}>
        {currentIndex}/{totalCards}
      </ThemedText>
      <Animated.View style={[styles.cardContainer, cardAnimatedStyle]}>
        <ThemedView style={styles.cardTextContainer}>
          <ThemedText style={styles.cardText}>
            {currentCard.originalText} / {currentCard.translatedText}
          </ThemedText>
          <ThemedIconButton
            name="speaker"
            onPress={() => speak(currentCard.translatedText)}
          />
        </ThemedView>
        <ThemedTextInput
          placeholder="Enter your answer"
          value={userAnswer}
          onChangeText={setUserAnswer}
          style={styles.input}
        />
        <ThemedButton title="Check" onPress={handleCheckAnswer} />
        <Animated.View
          style={[styles.feedbackContainer, feedbackAnimatedStyle]}
        >
          <ThemedText
            style={[
              styles.resultText,
              isCorrect ? styles.correctText : styles.incorrectText,
            ]}
          >
            {isCorrect ? "Correct!" : "Incorrect!"}
          </ThemedText>
        </Animated.View>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  cardIndex: {
    fontSize: 18,
    marginBottom: 16,
  },
  cardContainer: {
    width: "100%",
    maxWidth: 400,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#222",
  },
  cardTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    height: 100,
    backgroundColor: "#333",
    borderRadius: 8,
    padding: 16,
  },
  cardText: {
    fontSize: 20,
    flex: 1,
  },
  input: {
    marginBottom: 16,
    height: 40,
  },
  feedbackContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -50 }, { translateY: -50 }],
    alignItems: "center",
    justifyContent: "center",
  },
  resultText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  correctText: {
    color: "#4CAF50",
  },
  incorrectText: {
    color: "#F44336",
  },
});
