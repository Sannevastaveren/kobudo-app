import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useLocalSearchParams, router } from "expo-router";
import { CopyProcesser } from "@/components/Cards/components/CopyProcesser";
import KoreanTranslator from "@/components/Cards/components/KoreanTranslator";
import { ThemedButton } from "@/components/ThemedButton";
import { useCards } from "@/components/Cards/hooks/useCards";
import { TranslationCard } from "@/utils/database/cards";

type AddMethod = "copy" | "translate";

export default function AddCardsScreen() {
  const { id } = useLocalSearchParams();
  const collectionId = parseInt(id as string);
  const [addMethod, setAddMethod] = useState<AddMethod | null>(null);
  const { handleCardAdded } = useCards(collectionId);

  const handleCardAddedCallback = (card: TranslationCard) => {
    handleCardAdded(card); // TODO: Fix this when we have proper card type
  };

  const handleBack = () => {
    setAddMethod(null);
    router.navigate({
      pathname: "/collections/[id]",
      params: { id: collectionId.toString() },
    });
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedButton
          icon="arrow.left"
          onPress={handleBack}
          size="md"
          title="Back"
        />
      </ThemedView>
      {!addMethod ? (
        <ThemedView style={styles.methodsContainer}>
          <ThemedText style={styles.title}>Choose how to add cards</ThemedText>
          <View style={styles.buttonContainer}>
            <ThemedButton
              icon="copy"
              title="Copy & Paste"
              onPress={() => setAddMethod("copy")}
              size="lg"
            />
            <ThemedButton
              icon="translate"
              title="Translate"
              onPress={() => setAddMethod("translate")}
              size="lg"
            />
          </View>
        </ThemedView>
      ) : addMethod === "copy" ? (
        <CopyProcesser collectionId={collectionId} />
      ) : (
        <KoreanTranslator collectionId={collectionId} />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  methodsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    gap: 16,
  },
});
