import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Crypto from "expo-crypto";

export enum TranslationCardTag {
  Verb = "Verb",
  Noun = "Noun",
  Adjective = "Adjective",
  Adverb = "Adverb",
  Pronoun = "Pronoun",
  Preposition = "Preposition",
  Conjunction = "Conjunction",
  Interjection = "Interjection",
  Article = "Article",
  Number = "Number",
  Punctuation = "Punctuation",
  Other = "Other",
}

export interface TranslationCard {
  id: string;
  originalText: string;
  translatedText: string;
  createdAt: string;
  tag: TranslationCardTag;
  collectionId?: number; // Optional reference to a collection
}

export const CARDS_STORAGE_KEY = "@translation_cards";

// Card management functions
export const addTranslationCard = async (
  originalText: string,
  translatedText: string,
  collectionId?: number,
  tag?: TranslationCardTag
): Promise<string> => {
  try {
    const existingCards = await AsyncStorage.getItem(CARDS_STORAGE_KEY);
    const cards: TranslationCard[] = existingCards
      ? JSON.parse(existingCards)
      : [];

    const newCard: TranslationCard = {
      id: Crypto.randomUUID(),
      originalText,
      translatedText,
      createdAt: new Date().toISOString(),
      tag: tag ?? TranslationCardTag.Other,
      collectionId,
    };

    cards.push(newCard);
    await AsyncStorage.setItem(CARDS_STORAGE_KEY, JSON.stringify(cards));
    return newCard.id;
  } catch (error) {
    console.error("Failed to add card:", error);
    throw error;
  }
};

export const updateTranslationCard = async (
  id: string,
  originalText: string,
  translatedText: string,
  tag?: TranslationCardTag
): Promise<void> => {
  try {
    const existingCards = await AsyncStorage.getItem(CARDS_STORAGE_KEY);
    const cards: TranslationCard[] = existingCards
      ? JSON.parse(existingCards)
      : [];
    const updatedCards = cards.map((card) => {
      if (card.id === id) {
        return { ...card, originalText, translatedText, tag };
      }
      return card;
    });
    await AsyncStorage.setItem(CARDS_STORAGE_KEY, JSON.stringify(updatedCards));
  } catch (error) {
    console.error("Failed to update card:", error);
    throw error;
  }
};

export const getAllTranslationCards = async (
  collectionId?: number
): Promise<TranslationCard[]> => {
  try {
    const existingCards = await AsyncStorage.getItem(CARDS_STORAGE_KEY);
    const cards: TranslationCard[] = existingCards
      ? JSON.parse(existingCards)
      : [];

    const filteredCards = collectionId
      ? cards.filter((card) => card.collectionId === collectionId)
      : cards;

    return filteredCards.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch (error) {
    console.error("Failed to fetch cards:", error);
    throw error;
  }
};

export const deleteTranslationCard = async (id: string): Promise<void> => {
  try {
    const existingCards = await AsyncStorage.getItem(CARDS_STORAGE_KEY);
    const cards: TranslationCard[] = existingCards
      ? JSON.parse(existingCards)
      : [];
    const updatedCards = cards.filter((card) => card.id !== id);
    await AsyncStorage.setItem(CARDS_STORAGE_KEY, JSON.stringify(updatedCards));
  } catch (error) {
    console.error("Failed to delete card:", error);
    throw error;
  }
};

export const addTranslationCardsInBulk = async (
  cards: {
    originalText: string;
    translatedText: string;
    collectionId: number;
    tag?: TranslationCardTag;
  }[]
): Promise<string[]> => {
  try {
    const existingCards = await AsyncStorage.getItem(CARDS_STORAGE_KEY);
    const currentCards: TranslationCard[] = existingCards
      ? JSON.parse(existingCards)
      : [];

    const newCards: TranslationCard[] = cards.map((card) => ({
      id: Crypto.randomUUID(), // Ensure unique IDs
      originalText: card.originalText,
      translatedText: card.translatedText,
      createdAt: new Date().toISOString(),
      tag: card.tag ?? TranslationCardTag.Other,
      collectionId: card.collectionId,
    }));

    const updatedCards = [...currentCards, ...newCards];
    await AsyncStorage.setItem(CARDS_STORAGE_KEY, JSON.stringify(updatedCards));

    return newCards.map((card) => card.id);
  } catch (error) {
    console.error("Failed to add cards in bulk:", error);
    throw error;
  }
};
