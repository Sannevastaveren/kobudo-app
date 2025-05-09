import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const CURRENT_CHAPTER_KEY = "@current_chapter";

export function useCurrentChapter() {
  const [currentChapterId, setCurrentChapterId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCurrentChapter();
  }, []);

  const loadCurrentChapter = async () => {
    try {
      const storedChapterId = await AsyncStorage.getItem(CURRENT_CHAPTER_KEY);
      setCurrentChapterId(storedChapterId ? parseInt(storedChapterId) : null);
    } catch (error) {
      console.error("Failed to load current chapter:", error);
    } finally {
      setLoading(false);
    }
  };

  const setCurrentChapter = async (chapterId: number) => {
    try {
      await AsyncStorage.setItem(CURRENT_CHAPTER_KEY, chapterId.toString());
      setCurrentChapterId(chapterId);
    } catch (error) {
      console.error("Failed to set current chapter:", error);
    }
  };

  return {
    currentChapterId,
    setCurrentChapter,
    loading,
  };
}
