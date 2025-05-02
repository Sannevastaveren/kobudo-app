import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedView } from "@/components/ThemedView";

interface ProgressBarProps {
  progress: number; // Value between 0 and 1
  height?: number;
  backgroundColor?: string;
  fillColor?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = 10,
  backgroundColor = "#333",
  fillColor = "#4CAF50",
}) => {
  // Ensure progress stays between 0 and 1
  const clampedProgress = Math.min(Math.max(progress, 0), 1);

  return (
    <ThemedView style={[styles.progressBar, { height, backgroundColor }]}>
      <ThemedView
        style={[
          styles.progressFill,
          {
            width: `${clampedProgress * 100}%`,
            backgroundColor: fillColor,
          },
        ]}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  progressBar: {
    width: "100%",
    borderRadius: 18,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
  },
});
