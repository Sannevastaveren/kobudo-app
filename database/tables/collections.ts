import AsyncStorage from "@react-native-async-storage/async-storage";
import { CARDS_STORAGE_KEY, TranslationCard } from "./cards";

export interface Collection {
  id: number;
  name: string;
  description: string;
  createdAt: string;
}

export const COLLECTIONS_STORAGE_KEY = "@collections";

// Collection management functions
export const createCollection = async ({
  name,
  description,
}: {
  name: string;
  description: string;
}): Promise<number> => {
  try {
    const existingCollections = await AsyncStorage.getItem(
      COLLECTIONS_STORAGE_KEY
    );
    const collections: Collection[] = existingCollections
      ? JSON.parse(existingCollections)
      : [];

    const newCollection: Collection = {
      id: Date.now(),
      name,
      description,
      createdAt: new Date().toISOString(),
    };

    collections.push(newCollection);
    await AsyncStorage.setItem(
      COLLECTIONS_STORAGE_KEY,
      JSON.stringify(collections)
    );
    return newCollection.id;
  } catch (error) {
    console.error("Failed to create collection:", error);
    throw error;
  }
};

export const getAllCollections = async (): Promise<Collection[]> => {
  try {
    const existingCollections = await AsyncStorage.getItem(
      COLLECTIONS_STORAGE_KEY
    );
    const collections: Collection[] = existingCollections
      ? JSON.parse(existingCollections)
      : [];
    return collections.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch (error) {
    console.error("Failed to fetch collections:", error);
    throw error;
  }
};

export const deleteCollection = async (id: number): Promise<void> => {
  try {
    // First, remove collection reference from cards
    const existingCards = await AsyncStorage.getItem(CARDS_STORAGE_KEY);
    const cards: TranslationCard[] = existingCards
      ? JSON.parse(existingCards)
      : [];
    const updatedCards = cards.map((card) => {
      if (card.collectionId === id) {
        return { ...card, collectionId: undefined };
      }
      return card;
    });
    await AsyncStorage.setItem(CARDS_STORAGE_KEY, JSON.stringify(updatedCards));

    // Then delete the collection
    const existingCollections = await AsyncStorage.getItem(
      COLLECTIONS_STORAGE_KEY
    );
    const collections: Collection[] = existingCollections
      ? JSON.parse(existingCollections)
      : [];
    const updatedCollections = collections.filter(
      (collection) => collection.id !== id
    );
    await AsyncStorage.setItem(
      COLLECTIONS_STORAGE_KEY,
      JSON.stringify(updatedCollections)
    );
  } catch (error) {
    console.error("Failed to delete collection:", error);
    throw error;
  }
};
