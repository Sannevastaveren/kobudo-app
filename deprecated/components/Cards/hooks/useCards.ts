import {
  deleteTranslationCard,
  TranslationCard,
  addTranslationCard,
  updateTranslationCard,
} from "@/utils/database/cards";
import { getAllTranslationCards } from "@/utils/database/cards";
import { useState, useEffect } from "react";

export const useCards = (collectionId?: number) => {
  const [cards, setCards] = useState<TranslationCard[]>([]);
  const [reloading, setReloading] = useState(false);

  useEffect(() => {
    const fetchCards = async () => {
      const cards = await getAllTranslationCards(collectionId);
      setCards(cards);
    };

    if (!reloading) {
      fetchCards();
    }
    setReloading(false);
  }, [reloading, collectionId]);

  const handleCardDelete = (cardId: string) => {
    deleteTranslationCard(cardId);
    setReloading(true);
  };

  const handleCardEdit = (card: TranslationCard) => {
    updateTranslationCard(
      card.id,
      card.originalText,
      card.translatedText,
      card.tag
    );
    setReloading(true);
  };

  const handleCardAdded = (card: TranslationCard) => {
    addTranslationCard(
      card.originalText,
      card.translatedText,
      card.collectionId
    );
    setReloading(true);
  };

  const reload = () => {
    setReloading(true);
  };

  return {
    cards,
    handleCardDelete,
    handleCardAdded,
    handleCardEdit,
    reload,
  };
};
