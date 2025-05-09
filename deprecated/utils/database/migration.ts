import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Crypto from "expo-crypto";
import { CARDS_STORAGE_KEY, TranslationCard } from "./cards";

export const migrateCardIdsToGuid = async (): Promise<void> => {
  try {
    // Get existing cards
    const existingCards = await AsyncStorage.getItem(CARDS_STORAGE_KEY);
    if (!existingCards) return;

    const cards: TranslationCard[] = JSON.parse(existingCards);

    // Map through cards and update any numeric IDs to GUIDs
    const updatedCards = cards.map((card) => {
      // Check if id is numeric (old system)
      if (!isNaN(Number(card.id))) {
        return {
          ...card,
          id: Crypto.randomUUID(), // Generate new GUID
        };
      }
      return card;
    });

    // Save updated cards back to storage
    await AsyncStorage.setItem(CARDS_STORAGE_KEY, JSON.stringify(updatedCards));
  } catch (error) {
    console.error("Failed to migrate card IDs:", error);
    throw error;
  }
};
