import { useState, useEffect } from "react";

interface UseTranslationProps {
  text: string;
  targetLang: string;
  sourceLang: string;
  isRealtime?: boolean;
}

interface UseTranslationReturn {
  translatedText: string;
  loading: boolean;
  error: string;
  translateText: () => Promise<void>;
}

export const useTranslation = ({
  text,
  targetLang,
  sourceLang,
  isRealtime = false,
}: UseTranslationProps): UseTranslationReturn => {
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const translateText = async () => {
    if (!text.trim()) {
      setTranslatedText("");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://translation.googleapis.com/language/translate/v2",
        {
          method: "POST",
          headers: {
            "X-goog-api-key": process.env.EXPO_PUBLIC_API_KEY ?? "",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            q: text,
            target: targetLang,
            source: sourceLang,
          }),
        }
      );

      const data = await response.json();
      if (data.data && data.data.translations) {
        setTranslatedText(data.data.translations[0].translatedText);
      }
    } catch (err) {
      setError("Translation failed. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isRealtime) {
      const timer = setTimeout(translateText, 500);
      return () => clearTimeout(timer);
    }
  }, [text, isRealtime]);

  return {
    translatedText,
    loading,
    error,
    translateText,
  };
};
