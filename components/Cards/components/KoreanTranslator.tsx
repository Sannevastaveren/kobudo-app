// Usage
import { useState, useEffect } from "react";
import { View, ActivityIndicator, Switch } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { ThemedButton } from "@/components/ThemedButton";
import { createStyleSheet, spacing, borderRadius } from "@/utils/styles";
import { useTranslation } from "@/hooks/useTranslation";
import { addTranslationCard } from "@/utils/database/cards";

type KoreanTranslatorProps = {
  collectionId: number;
};

export default function TranslatorKorean({
  collectionId,
}: KoreanTranslatorProps) {
  const [text, setText] = useState("");
  const [isRealtime, setIsRealtime] = useState(false);
  const { translatedText, loading, error, translateText } = useTranslation({
    text,
    targetLang: "ko",
    sourceLang: "en",
    isRealtime: isRealtime,
  });
  const [modifiedTranslatedText, setModifiedTranslatedText] = useState<
    string | null
  >(null);

  useEffect(() => {
    if (translatedText) {
      setModifiedTranslatedText(translatedText);
    }
  }, [translatedText]);

  const addToCard = async (originalText: string, translatedText: string) => {
    await addTranslationCard(originalText, translatedText, collectionId);
  };

  useEffect(() => {
    if (isRealtime) {
      const timer = setTimeout(translateText, 500);
      return () => clearTimeout(timer);
    }
  }, [text, isRealtime]);

  return (
    <View style={styles.container}>
      <View style={styles.realtimeContainer}>
        <ThemedText size="md" weight="semibold">
          {isRealtime ? "Real-time" : "Manual"} Translation
        </ThemedText>
        <Switch
          value={isRealtime}
          onValueChange={setIsRealtime}
          style={styles.switch}
        />
      </View>
      <ThemedView style={styles.translateContainer}>
        <ThemedTextInput
          value={text}
          onChangeText={setText}
          placeholder="Enter text to translate"
          multiline
          size="lg"
          style={styles.input}
        />
        <ThemedTextInput
          value={modifiedTranslatedText ?? ""}
          onChangeText={setModifiedTranslatedText}
          placeholder="Translation will appear here"
          multiline
          size="lg"
          style={styles.input}
        />
      </ThemedView>
      {!isRealtime && (
        <View style={styles.buttonContainer}>
          <ThemedButton
            icon="translate"
            title="Translate"
            onPress={translateText}
            disabled={loading || !text.trim()}
            size="md"
          />
          <ThemedButton
            icon="add"
            title="Add"
            onPress={() => addToCard(text, modifiedTranslatedText ?? "")}
            disabled={loading || !text.trim()}
            size="md"
          />
        </View>
      )}

      {loading && <ActivityIndicator style={styles.loader} />}

      {error ? (
        <ThemedText style={styles.error}>{error}</ThemedText>
      ) : translatedText ? (
        <View style={styles.resultContainer}>
          <ThemedText size="md" weight="semibold">
            Translation:
          </ThemedText>
          <ThemedText style={styles.resultText}>{translatedText}</ThemedText>
        </View>
      ) : null}
    </View>
  );
}

const styles = createStyleSheet({
  container: {
    gap: spacing("md"),
  },
  translateContainer: {
    padding: spacing("md"),
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: spacing("md"),
    justifyContent: "space-between",
    borderRadius: borderRadius("md"),
  },
  realtimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing("sm"),
  },
  switch: {
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
  },
  input: {
    width: "100%",
    height: 120,
    textAlignVertical: "top",
  },
  loader: {
    marginTop: spacing("md"),
  },
  error: {
    color: "#FF3B30",
    marginTop: spacing("md"),
  },
  resultContainer: {
    marginTop: spacing("md"),
    padding: spacing("md"),
    borderRadius: borderRadius("md"),
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  resultText: {
    marginTop: spacing("sm"),
  },
  buttonContainer: {
    width: "auto",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing("md"),
  },
});
