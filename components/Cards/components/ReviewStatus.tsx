import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { router } from "expo-router";
import { ReviewStatus as ReviewStatusType } from "@/utils/database/cards";
import { Ionicons } from "@expo/vector-icons";

interface ReviewStatusProps {
  collectionId: number;
  reviewStatus: ReviewStatusType;
  isLoading: boolean;
  compact?: boolean;
}

export const ReviewStatus: React.FC<ReviewStatusProps> = ({
  collectionId,
  reviewStatus,
  isLoading,
  compact = false,
}) => {
  if (isLoading || !reviewStatus) return null;

  const { totalCards, dueCards } = reviewStatus;

  if (totalCards === 0) return null;

  const handleStudy = () => {
    router.push({
      pathname: "/collections/[id]/study-card",
      params: { id: collectionId.toString() },
    });
  };

  if (compact) {
    return (
      <TouchableOpacity onPress={handleStudy} style={styles.compactContainer}>
        <Ionicons name="book" size={16} color="#666" />
        <ThemedText style={styles.compactStats}>
          {dueCards}/{totalCards}
        </ThemedText>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={handleStudy} style={styles.container}>
      <Ionicons name="book" size={20} color="#666" />
      <ThemedText style={styles.stats}>
        {dueCards} of {totalCards} cards due
      </ThemedText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 8,
    borderRadius: 8,
  },
  compactContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  stats: {
    fontSize: 14,
    opacity: 0.8,
  },
  compactStats: {
    fontSize: 14,
    fontWeight: "600",
  },
});
