import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Crypto from "expo-crypto";

export interface GrammarConcept {
  id: string;
  name: string;
  description: string;
  summary: string;
  createdAt: string;
  collectionId?: number; // Optional reference to a collection
}

export const GRAMMAR_CONCEPTS_STORAGE_KEY = "@grammar_concepts";

export const getGrammarConcepts = async () => {
  const value = await AsyncStorage.getItem(GRAMMAR_CONCEPTS_STORAGE_KEY);
  return value ? JSON.parse(value) : [];
};

export const addGrammarConcept = async (concept: Partial<GrammarConcept>) => {
  const concepts = await getGrammarConcepts();
  const newConcept = {
    ...concept,
    id: Crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  concepts.push(newConcept);
  await AsyncStorage.setItem(
    GRAMMAR_CONCEPTS_STORAGE_KEY,
    JSON.stringify(concepts)
  );
};

export const deleteGrammarConcept = async (id: string) => {
  const concepts = await getGrammarConcepts();
  const index = concepts.findIndex(
    (concept: GrammarConcept) => concept.id === id
  );
  if (index !== -1) {
    concepts.splice(index, 1);
    await AsyncStorage.setItem(
      GRAMMAR_CONCEPTS_STORAGE_KEY,
      JSON.stringify(concepts)
    );
  }
};

export const updateGrammarConcept = async (
  concept: Partial<GrammarConcept>
) => {
  const concepts = await getGrammarConcepts();
  const index = concepts.findIndex((c: GrammarConcept) => c.id === concept.id);
  if (index !== -1) {
    concepts[index] = concept;
    await AsyncStorage.setItem(
      GRAMMAR_CONCEPTS_STORAGE_KEY,
      JSON.stringify(concepts)
    );
  }
};
