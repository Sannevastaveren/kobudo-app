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
  // Spaced repetition fields
  lastReviewed?: string;
  nextReview?: string;
  reviewCount: number;
  easeFactor: number;
  interval: number;
}

export const CARDS_STORAGE_KEY = "@translation_cards";

export interface ReviewStatus {
  totalCards: number;
  dueCards: number;
  nextReviewDate?: string;
}

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
      reviewCount: 0,
      easeFactor: 2.5,
      interval: 0,
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
      id: Crypto.randomUUID(),
      originalText: card.originalText,
      translatedText: card.translatedText,
      createdAt: new Date().toISOString(),
      tag: card.tag ?? TranslationCardTag.Other,
      collectionId: card.collectionId,
      reviewCount: 0,
      easeFactor: 2.5,
      interval: 0,
    }));

    const updatedCards = [...currentCards, ...newCards];
    await AsyncStorage.setItem(CARDS_STORAGE_KEY, JSON.stringify(updatedCards));

    return newCards.map((card) => card.id);
  } catch (error) {
    console.error("Failed to add cards in bulk:", error);
    throw error;
  }
};

// Spaced repetition functions
export const updateCardReview = async (
  cardId: string,
  isCorrect: boolean
): Promise<void> => {
  try {
    const existingCards = await AsyncStorage.getItem(CARDS_STORAGE_KEY);
    const cards: TranslationCard[] = existingCards
      ? JSON.parse(existingCards)
      : [];

    const cardIndex = cards.findIndex((card) => card.id === cardId);
    if (cardIndex === -1) return;

    const card = cards[cardIndex];
    const now = new Date().toISOString();

    // Initialize spaced repetition fields if they don't exist
    if (!card.reviewCount) card.reviewCount = 0;
    if (!card.easeFactor) card.easeFactor = 2.5;
    if (!card.interval) card.interval = 0;

    // Update review count
    card.reviewCount += 1;
    card.lastReviewed = now;

    // Calculate new interval and ease factor using SuperMemo 2 algorithm
    if (isCorrect) {
      if (card.reviewCount === 1) {
        card.interval = 1;
      } else if (card.reviewCount === 2) {
        card.interval = 6;
      } else {
        card.interval = Math.round(card.interval * card.easeFactor);
      }
      card.easeFactor = Math.max(
        1.3,
        card.easeFactor + (0.1 - (5 - 5) * (0.08 + (5 - 5) * 0.02))
      );
    } else {
      card.interval = 1;
      card.easeFactor = Math.max(1.3, card.easeFactor - 0.2);
    }

    // Calculate next review date
    const nextReviewDate = new Date();
    nextReviewDate.setDate(nextReviewDate.getDate() + card.interval);
    card.nextReview = nextReviewDate.toISOString();

    await AsyncStorage.setItem(CARDS_STORAGE_KEY, JSON.stringify(cards));
  } catch (error) {
    console.error("Failed to update card review:", error);
    throw error;
  }
};

export const getDueCards = async (
  collectionId?: number
): Promise<TranslationCard[]> => {
  try {
    const existingCards = await AsyncStorage.getItem(CARDS_STORAGE_KEY);
    const cards: TranslationCard[] = existingCards
      ? JSON.parse(existingCards)
      : [];

    const now = new Date().toISOString();
    const filteredCards = collectionId
      ? cards.filter((card) => card.collectionId === collectionId)
      : cards;

    return filteredCards
      .filter((card) => {
        // Include cards that have never been reviewed
        if (!card.nextReview) return true;
        // Include cards that are due for review
        return card.nextReview <= now;
      })
      .sort((a, b) => {
        // Sort by next review date, with unreviewed cards first
        if (!a.nextReview) return -1;
        if (!b.nextReview) return 1;
        return (
          new Date(a.nextReview).getTime() - new Date(b.nextReview).getTime()
        );
      });
  } catch (error) {
    console.error("Failed to fetch due cards:", error);
    throw error;
  }
};

export const getCollectionReviewStatus = async (
  collectionId: number
): Promise<ReviewStatus> => {
  try {
    const existingCards = await AsyncStorage.getItem(CARDS_STORAGE_KEY);
    const cards: TranslationCard[] = existingCards
      ? JSON.parse(existingCards)
      : [];

    const collectionCards = cards.filter(
      (card) => card.collectionId === collectionId
    );
    const now = new Date().toISOString();

    const dueCards = collectionCards.filter((card) => {
      if (!card.nextReview) return true;
      return card.nextReview <= now;
    });

    // Find the next review date (earliest nextReview date among all cards)
    const nextReviewDate = collectionCards
      .filter((card) => card.nextReview && card.nextReview > now)
      .sort((a, b) => {
        if (!a.nextReview || !b.nextReview) return 0;
        return (
          new Date(a.nextReview).getTime() - new Date(b.nextReview).getTime()
        );
      })[0]?.nextReview;

    return {
      totalCards: collectionCards.length,
      dueCards: dueCards.length,
      nextReviewDate,
    };
  } catch (error) {
    console.error("Failed to get collection review status:", error);
    throw error;
  }
};
