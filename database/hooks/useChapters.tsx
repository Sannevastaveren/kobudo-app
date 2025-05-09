import { useCallback, useEffect, useState } from "react";
import { Collection, getAllCollections } from "../tables/collections";
import { useFocusEffect } from "expo-router";

export function useChapters(chapterId?: number): {
  chapters: Collection[];
  loading: boolean;
  error: Error | null;
  getChapter: (chapterId: number) => Collection | undefined;
  refresh: () => Promise<void>;
} {
  const [chapters, setChapters] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchChapters = useCallback(async () => {
    try {
      const data = await getAllCollections();

      if (chapterId) {
        const chapter = data.find((c) => c.id === chapterId);
        if (chapter) {
          setChapters([chapter]);
        }
      } else {
        setChapters(data);
      }

      if (error) {
        throw error;
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An error occurred"));
    } finally {
      setLoading(false);
    }
  }, [chapterId, error]);

  useFocusEffect(
    useCallback(() => {
      fetchChapters();
    }, [fetchChapters])
  );

  const getChapter = (chapterId: number) => {
    return chapters.find((c) => c.id === chapterId);
  };

  return {
    chapters: chapters,
    loading,
    error,
    getChapter,
    refresh: fetchChapters,
  };
}
