import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { router } from "expo-router";
import { ReviewStatus as ReviewStatusType } from "@/utils/database/cards";
import { Ionicons } from "@expo/vector-icons";
import { ThemedButton } from "@/components/ThemedButton";

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
      <ThemedButton
        icon="book"
        title={`Study ${dueCards}/${totalCards} `}
        onPress={handleStudy}
        size="sm"
      />
    );
  }

  return (
    <TouchableOpacity onPress={handleStudy} style={styles.container}>
      <View style={styles.container}>
        <View style={styles.statsContainer}>
          <Ionicons name="book" size={20} color="#666" />
          <ThemedText style={styles.stats}>
            {dueCards} of {totalCards} cards due
          </ThemedText>
        </View>
        <View style={styles.statsContainer}>
          <ThemedText>Go to review</ThemedText>
          <Ionicons name="chevron-forward" size={20} color="#666" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
});
