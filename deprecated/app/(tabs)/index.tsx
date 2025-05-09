import { ThemedView } from "@/components/ThemedView";
import { useCollections } from "@/components/Collections/hooks/useCollections";
import { StyleSheet } from "react-native";
import { CollectionList } from "@/components/Collections/components/CollectionList";
import { CreateCollection } from "@/components/Collections/components/CreateCollection";
import { useCallback, useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import { ThemedButton } from "@/components/ThemedButton";
import { router, useFocusEffect } from "expo-router";
import { Collection } from "@/utils/database/collections";

export default function HomeScreen() {
  const {
    collections,
    reload,
    handleCreateCollection,
    handleDeleteCollection,
  } = useCollections();
  const [showCreateCollection, setShowCreateCollection] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      reload();
    }, [])
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      reload();
    } finally {
      setRefreshing(false);
    }
  }, [reload]);

  const handleCreateNewCollection = (name: string, description: string) => {
    handleCreateCollection(name, description);
    setShowCreateCollection(false);
  };

  const handleCollectionPress = (collection: Collection) => {
    router.push({
      pathname: "/collections/[id]",
      params: { id: collection.id.toString() },
    });
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText style={styles.title}>Collections</ThemedText>
        <ThemedButton
          title="Add"
          icon="add"
          size="sm"
          onPress={() => setShowCreateCollection(true)}
        />
        <CreateCollection
          visible={showCreateCollection}
          onCreateCollection={handleCreateNewCollection}
          onCancel={() => setShowCreateCollection(false)}
        />
      </ThemedView>
      <CollectionList
        collections={collections}
        onRefresh={onRefresh}
        refreshing={refreshing}
        onCollectionPress={handleCollectionPress}
        onDeleteCollection={handleDeleteCollection}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 60,
    gap: 16,
    height: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 16,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 6,
  },
});
