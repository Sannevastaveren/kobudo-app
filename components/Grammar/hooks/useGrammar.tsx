import { useState, useEffect } from "react";
import {
  GrammarConcept,
  getGrammarConcepts,
  addGrammarConcept,
  deleteGrammarConcept,
  updateGrammarConcept,
} from "@/utils/database/grammar";

export const useGrammar = () => {
  const [concepts, setConcepts] = useState<GrammarConcept[]>([]);
  const [reloading, setReloading] = useState(false);

  useEffect(() => {
    const fetchConcepts = async () => {
      const grammarConcepts = await getGrammarConcepts();
      setConcepts(grammarConcepts);
    };

    if (!reloading) {
      fetchConcepts();
    }
    setReloading(false);
  }, [reloading]);

  const handleConceptDelete = async (conceptId: string) => {
    await deleteGrammarConcept(conceptId);
    setReloading(true);
  };

  const handleConceptEdit = async (concept: Partial<GrammarConcept>) => {
    await updateGrammarConcept(concept);
    setReloading(true);
  };

  const handleConceptAdd = async (concept: Partial<GrammarConcept>) => {
    await addGrammarConcept(concept);
    setReloading(true);
  };

  const reload = () => {
    setReloading(true);
  };

  return {
    concepts,
    handleConceptDelete,
    handleConceptAdd,
    handleConceptEdit,
    reload,
  };
};
