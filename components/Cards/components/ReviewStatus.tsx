import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedButton } from "@/components/ThemedButton";
import { router } from "expo-router";
import { ReviewStatus as ReviewStatusType } from "@/utils/database/cards";

interface ReviewStatusProps {
  collectionId: number;
  reviewStatus: ReviewStatusType;
  isLoading: boolean;
}

export const ReviewStatus: React.FC<ReviewStatusProps> = ({
  collectionId,
  reviewStatus,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Loading review status...</ThemedText>
      </ThemedView>
    );
  }

  const { totalCards, dueCards, nextReviewDate } = reviewStatus;

  if (totalCards === 0) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>No cards in this collection</ThemedText>
      </ThemedView>
    );
  }

  const handleStudy = () => {
    router.push({
      pathname: "/collections/[id]/study-card",
      params: { id: collectionId.toString() },
    });
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.statusContainer}>
        <ThemedText style={styles.title}>Review Status</ThemedText>
        <ThemedText style={styles.stats}>
          {dueCards} of {totalCards} cards due for review
        </ThemedText>
        {nextReviewDate && (
          <ThemedText style={styles.nextReview}>
            Next review: {new Date(nextReviewDate).toLocaleDateString()}
          </ThemedText>
        )}
      </ThemedView>
      <ThemedButton
        title={dueCards > 0 ? "Start Review" : "Study All Cards"}
        onPress={handleStudy}
        icon="book.fill"
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  statusContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  stats: {
    fontSize: 16,
    marginBottom: 4,
  },
  nextReview: {
    fontSize: 14,
    opacity: 0.8,
  },
});
