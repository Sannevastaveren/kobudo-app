import AsyncStorage from "@react-native-async-storage/async-storage";

export interface TranslationCard {
  id: number;
  originalText: string;
  translatedText: string;
  createdAt: string;
}

const STORAGE_KEY = "@translation_cards";

export const initDatabase = async () => {
  try {
    const existingCards = await AsyncStorage.getItem(STORAGE_KEY);
    if (!existingCards) {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    }
  } catch (error) {
    console.error("Failed to initialize database:", error);
  }
};

export const addTranslationCard = async (
  originalText: string,
  translatedText: string
): Promise<number> => {
  try {
    const existingCards = await AsyncStorage.getItem(STORAGE_KEY);
    const cards: TranslationCard[] = existingCards
      ? JSON.parse(existingCards)
      : [];

    const newCard: TranslationCard = {
      id: Date.now(),
      originalText,
      translatedText,
      createdAt: new Date().toISOString(),
    };

    cards.push(newCard);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
    return newCard.id;
  } catch (error) {
    console.error("Failed to add card:", error);
    throw error;
  }
};

export const getAllTranslationCards = async (): Promise<TranslationCard[]> => {
  try {
    const existingCards = await AsyncStorage.getItem(STORAGE_KEY);
    const cards: TranslationCard[] = existingCards
      ? JSON.parse(existingCards)
      : [];
    return cards.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch (error) {
    console.error("Failed to fetch cards:", error);
    throw error;
  }
};

export const deleteTranslationCard = async (id: number): Promise<void> => {
  try {
    const existingCards = await AsyncStorage.getItem(STORAGE_KEY);
    const cards: TranslationCard[] = existingCards
      ? JSON.parse(existingCards)
      : [];
    const updatedCards = cards.filter((card) => card.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCards));
  } catch (error) {
    console.error("Failed to delete card:", error);
    throw error;
  }
};
