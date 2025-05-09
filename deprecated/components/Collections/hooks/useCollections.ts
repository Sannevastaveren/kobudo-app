import { useState, useEffect } from "react";
import {
  Collection,
  createCollection,
  getAllCollections,
  deleteCollection,
} from "@/utils/database/collections";

export const useCollections = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [reloading, setReloading] = useState(false);

  useEffect(() => {
    const fetchCollections = async () => {
      const collections = await getAllCollections();
      setCollections(collections);
    };

    if (!reloading) {
      fetchCollections();
    }
    setReloading(false);
  }, [reloading]);

  const handleCreateCollection = async (name: string, description: string) => {
    await createCollection(name, description);
    setReloading(true);
  };

  const handleDeleteCollection = async (collectionId: number) => {
    await deleteCollection(collectionId);
    setReloading(true);
  };

  const reload = () => {
    setReloading(true);
  };

  return {
    collections,
    handleCreateCollection,
    handleDeleteCollection,
    reload,
  };
};
