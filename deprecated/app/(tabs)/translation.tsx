import { StyleSheet, Platform, ScrollView } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import React from "react";
import TranslatorKorean from "@/components/Cards/components/KoreanTranslator";

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <TranslatorKorean collectionId={1} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 60,
    gap: 16,
  },
  header: {
    marginBottom: 24,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 8,
  },
  title: {
    fontSize: 36,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  translatorContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 16,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
});
