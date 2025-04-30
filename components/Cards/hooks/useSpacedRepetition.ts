import { useState, useEffect } from "react";
import {
  getDueCards,
  updateCardReview,
  TranslationCard,
} from "@/utils/database/cards";

export const useSpacedRepetition = (collectionId?: number) => {
  const [dueCards, setDueCards] = useState<TranslationCard[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const loadDueCards = async () => {
    try {
      setIsLoading(true);
      const cards = await getDueCards(collectionId);
      setDueCards(cards);
      setCurrentCardIndex(0);
    } catch (error) {
      console.error("Failed to load due cards:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDueCards();
  }, [collectionId]);

  const handleCardReview = async (isCorrect: boolean) => {
    if (currentCardIndex >= dueCards.length) return;

    const currentCard = dueCards[currentCardIndex];
    await updateCardReview(currentCard.id, isCorrect);

    // Move to next card or reload if we've reviewed all cards
    if (currentCardIndex < dueCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      await loadDueCards();
    }
  };

  const currentCard = dueCards[currentCardIndex];

  return {
    currentCard,
    isLoading,
    totalCards: dueCards.length,
    currentIndex: currentCardIndex + 1,
    handleCardReview,
    reloadCards: loadDueCards,
  };
};
