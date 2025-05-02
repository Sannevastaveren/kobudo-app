import React, { useState } from "react";
import { StyleSheet, Pressable } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
} from "react-native-reanimated";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedIconButton } from "@/components/ThemedIconButton";
import { borderRadius, shadow, spacing } from "@/utils/styles";

interface FlipableCardProps {
  originalText: string;
  translatedText: string;
  onSpeakText?: (text: string) => void;
}

export const FlipableCard: React.FC<FlipableCardProps> = ({
  originalText,
  translatedText,
  onSpeakText,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const flipProgress = useSharedValue(0);

  const frontAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(flipProgress.value, [0, 1], [0, 180], "clamp");
    return {
      transform: [{ rotateY: `${rotateY}deg` }],
    };
  });

  const backAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(
      flipProgress.value,
      [0, 1],
      [180, 360],
      "clamp"
    );
    return {
      transform: [{ rotateY: `${rotateY}deg` }],
    };
  });

  const flipCard = () => {
    if (isFlipped) {
      flipProgress.value = withSpring(0, {
        damping: 10,
        stiffness: 100,
      });
    } else {
      flipProgress.value = withSpring(1, {
        damping: 10,
        stiffness: 100,
      });
    }
    setIsFlipped(!isFlipped);
  };

  return (
    <Pressable onPress={flipCard} style={styles.container}>
      <Animated.View
        style={[styles.card, styles.cardFront, frontAnimatedStyle]}
      >
        <ThemedView style={styles.cardContent}>
          <ThemedText style={styles.text}>{originalText}</ThemedText>
          {onSpeakText && (
            <ThemedIconButton
              name="speaker"
              onPress={() => onSpeakText(originalText)}
            />
          )}
        </ThemedView>
      </Animated.View>

      <Animated.View style={[styles.card, styles.cardBack, backAnimatedStyle]}>
        <ThemedView style={styles.cardContent}>
          <ThemedText style={styles.text}>{translatedText}</ThemedText>
          {onSpeakText && (
            <ThemedIconButton
              name="speaker"
              onPress={() => onSpeakText(translatedText)}
            />
          )}
        </ThemedView>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 100,
    position: "relative",
  },
  card: {
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
    position: "absolute",
    ...shadow("md"),
  },
  cardContent: {
    flex: 1,
    padding: spacing("lg"),
    borderRadius: borderRadius("lg"),
    flexDirection: "row",
    backgroundColor: "#222",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardFront: {
    zIndex: 1,
  },
  cardBack: {
    transform: [{ rotateY: "180deg" }],
  },
  text: {
    fontSize: 24,
    flex: 1,
  },
});
