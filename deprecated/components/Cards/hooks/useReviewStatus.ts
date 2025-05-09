import { useState, useEffect } from "react";
import {
  getCollectionReviewStatus,
  ReviewStatus,
} from "@/utils/database/cards";

export const useReviewStatus = (collectionId?: number) => {
  const [reviewStatus, setReviewStatus] = useState<ReviewStatus>({
    totalCards: 0,
    dueCards: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  const loadReviewStatus = async () => {
    if (!collectionId) return;

    try {
      setIsLoading(true);
      const status = await getCollectionReviewStatus(collectionId);
      setReviewStatus(status);
    } catch (error) {
      console.error("Failed to load review status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadReviewStatus();
  }, [collectionId]);

  return {
    reviewStatus,
    isLoading,
    reload: loadReviewStatus,
  };
};
