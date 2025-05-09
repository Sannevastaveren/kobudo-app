import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Collection } from "@/utils/database/collections";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { ThemedIconButton } from "@/components/ThemedIconButton";

type CollectionListProps = {
  collections: Collection[];
  onCollectionPress?: (collection: Collection) => void;
  onDeleteCollection?: (collectionId: number) => void;
  onRefresh?: () => void;
  refreshing?: boolean;
};

export function CollectionList({
  collections,
  onCollectionPress,
  onDeleteCollection,
  onRefresh,
  refreshing = false,
}: CollectionListProps) {
  const renderCollection = ({ item }: { item: Collection }) => (
    <TouchableOpacity
      onPress={() => onCollectionPress?.(item)}
      style={styles.collectionContainer}
    >
      <ThemedView style={styles.collection}>
        <View style={styles.textContainer}>
          <ThemedText style={styles.name}>{item.name}</ThemedText>
          <ThemedText style={styles.description}>{item.description}</ThemedText>
        </View>
        {onDeleteCollection && (
          <ThemedIconButton
            name="trash"
            onPress={() => onDeleteCollection(item.id)}
            color={Colors.dark.text}
          />
        )}
      </ThemedView>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={collections}
        renderItem={renderCollection}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        refreshControl={
          onRefresh ? (
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={Colors.dark.text}
            />
          ) : undefined
        }
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "none",
    maxHeight: "100%",
  },
  listContainer: {
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  collectionContainer: {
    borderRadius: 12,
    overflow: "hidden",
  },
  collection: {
    flexDirection: "row",
    padding: 16,
    borderRadius: 12,
    backgroundColor: Colors.dark.cardBackground,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  textContainer: {
    flex: 1,
    gap: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.dark.text,
  },
  description: {
    fontSize: 14,
    color: Colors.dark.text,
    opacity: 0.8,
  },
  separator: {
    height: 8,
  },
});
