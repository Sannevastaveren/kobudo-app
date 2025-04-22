import { useState, useEffect } from "react";
import {
  TranslationCard,
  getAllTranslationCards,
  deleteTranslationCard,
  addTranslationCard,
} from "@/utils/database";

export const useCards = () => {
  const [cards, setCards] = useState<TranslationCard[]>([]);
  const [reloading, setReloading] = useState(false);

  useEffect(() => {
    const fetchCards = async () => {
      const cards = await getAllTranslationCards();
      setCards(cards);
    };

    if (!reloading) {
      fetchCards();
    }
    setReloading(false);
  }, [reloading]);

  const handleCardDelete = (cardId: number) => {
    deleteTranslationCard(cardId);
    setReloading(true);
  };

  const handleCardAdded = (card: TranslationCard) => {
    addTranslationCard(card.originalText, card.translatedText);
    setReloading(true);
  };

  const reload = () => {
    setReloading(true);
  };

  return {
    cards,
    handleCardDelete,
    handleCardAdded,
    reload,
  };
};
