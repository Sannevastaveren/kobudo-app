import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useLocalSearchParams, router } from "expo-router";
import { ThemedButton } from "@/components/ThemedButton";
import { useGrammar } from "@/components/Grammar/hooks/useGrammar";
import Markdown from "react-native-markdown-display";
import { markdownStyle } from "@/components/Grammar/utils/markdownstyle";

export default function AddGrammarScreen() {
  const { id } = useLocalSearchParams();
  const collectionId = parseInt(id as string);
  const { handleConceptAdd } = useGrammar();
  const [name, setName] = useState("");
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");

  const handleBack = () => {
    router.navigate({
      pathname: "/collections/[id]",
      params: { id: collectionId.toString() },
    });
  };

  const handleSubmit = () => {
    if (name.trim() && description.trim()) {
      handleConceptAdd({
        name,
        summary,
        description,
        collectionId,
      });
      handleBack();
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedButton
          icon="chevron-back"
          onPress={handleBack}
          size="md"
          title="Back"
        />
      </ThemedView>
      <ThemedView style={styles.content}>
        <ThemedText style={styles.title}>Add Grammar Concept</ThemedText>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1, width: "100%" }}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <ThemedText style={styles.label}>Concept Name</ThemedText>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter concept name"
              placeholderTextColor="#666"
            />
            <ThemedText style={styles.label}>Concept Summary</ThemedText>
            <TextInput
              style={styles.input}
              value={summary}
              onChangeText={setSummary}
              placeholder="A short summary of what this grammar concept is about"
              placeholderTextColor="#666"
            />
            <ThemedText style={styles.label}>Description (Markdown)</ThemedText>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              placeholder="Enter a detailed description of the grammar concept in markdown format"
              placeholderTextColor="#666"
              multiline
              numberOfLines={10}
            />
            <ThemedText style={styles.previewTitle}>Preview</ThemedText>
            <ThemedView style={styles.preview}>
              <Markdown style={markdownStyle}>{description}</Markdown>
            </ThemedView>
            <ThemedButton
              title="Add Concept"
              onPress={handleSubmit}
              style={styles.submitButton}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    width: "100%",
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 16,
  },
  content: {
    width: "100%",
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 24,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#fff",
  },
  textArea: {
    height: 150,
    textAlignVertical: "top",
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 24,
    marginBottom: 8,
  },
  preview: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  submitButton: {
    marginTop: 24,
    marginBottom: 16,
  },
});
