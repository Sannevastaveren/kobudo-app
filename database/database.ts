import AsyncStorage from "@react-native-async-storage/async-storage";
import { CARDS_STORAGE_KEY } from "./tables/cards";
import { COLLECTIONS_STORAGE_KEY } from "./tables/collections";
import { GRAMMAR_CONCEPTS_STORAGE_KEY } from "./tables/grammar";

export const initDatabase = async () => {
  try {
    const existingCards = await AsyncStorage.getItem(CARDS_STORAGE_KEY);
    const existingCollections = await AsyncStorage.getItem(
      COLLECTIONS_STORAGE_KEY
    );
    const existingGrammarConcepts = await AsyncStorage.getItem(
      GRAMMAR_CONCEPTS_STORAGE_KEY
    );

    if (!existingCards) {
      await AsyncStorage.setItem(CARDS_STORAGE_KEY, JSON.stringify([]));
    }
    if (!existingCollections) {
      await AsyncStorage.setItem(COLLECTIONS_STORAGE_KEY, JSON.stringify([]));
    }
    if (!existingGrammarConcepts) {
      await AsyncStorage.setItem(
        GRAMMAR_CONCEPTS_STORAGE_KEY,
        JSON.stringify([])
      );
    }
  } catch (error) {
    console.error("Failed to initialize database:", error);
  }
};
