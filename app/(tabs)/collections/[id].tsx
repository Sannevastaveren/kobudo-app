import React, { useState, useRef } from "react";
import { StyleSheet, View, Animated, FlatList } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useLocalSearchParams, router } from "expo-router";
import { CardList } from "@/components/Cards/components/CardList";
import { useCollections } from "@/components/Collections/hooks/useCollections";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedTabs } from "@/components/ThemedTabs";
import { GrammarList } from "@/components/Grammar/components/GrammarList";
import { useGrammar } from "@/components/Grammar/hooks/useGrammar";
import { ReviewStatus } from "@/components/Cards/components/ReviewStatus";
import { useReviewStatus } from "@/components/Cards/hooks/useReviewStatus";

const HEADER_MAX_HEIGHT = 400;
const HEADER_MIN_HEIGHT = 0;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default function CollectionScreen() {
  const { id } = useLocalSearchParams();
  const collectionId = parseInt(id as string);
  const [activeTab, setActiveTab] = useState("cards");
  const scrollY = useRef(new Animated.Value(0)).current;

  const { collections } = useCollections();
  const { reviewStatus, isLoading: isReviewStatusLoading } =
    useReviewStatus(collectionId);

  const collection = collections.find((c) => c.id === collectionId);

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: "clamp",
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0.5, 0],
    extrapolate: "clamp",
  });

  const handleAddCards = () => {
    router.push({
      pathname: "/collections/[id]/add-card",
      params: { id: collectionId.toString() },
    });
  };

  const handleAddGrammar = () => {
    router.push({
      pathname: "/collections/[id]/add-grammar",
      params: { id: collectionId.toString() },
    });
  };

  const renderHeader = () => (
    <Animated.View
      style={[styles.header, { height: headerHeight, opacity: headerOpacity }]}
    >
      <ThemedView style={styles.headerContent}>
        <ThemedText style={styles.title}>{collection?.name}</ThemedText>
        {collection?.description && (
          <ThemedText style={styles.description}>
            {collection?.description}
          </ThemedText>
        )}

        <ReviewStatus
          collectionId={collectionId}
          reviewStatus={reviewStatus}
          isLoading={isReviewStatusLoading}
        />

        <ThemedView style={styles.buttonContainer}>
          <ThemedButton icon="add" title="Add cards" onPress={handleAddCards} />
          <ThemedButton
            icon="add"
            title="Add grammar"
            onPress={handleAddGrammar}
          />
        </ThemedView>
      </ThemedView>
    </Animated.View>
  );

  const renderContent = () => (
    <ThemedView style={styles.content}>
      <ThemedTabs
        tabs={[
          { key: "cards", title: "Cards" },
          { key: "grammar", title: "Grammar" },
        ]}
        activeTab={activeTab}
        onTabPress={(tabKey) => {
          setActiveTab(tabKey);
        }}
      />
      {activeTab === "cards" && <CardList collectionId={collectionId} />}
      {activeTab === "grammar" && <GrammarList collectionId={collectionId} />}
    </ThemedView>
  );

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={[{ key: "content" }]}
        renderItem={renderContent}
        ListHeaderComponent={renderHeader}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        stickyHeaderIndices={[0]}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#1a1a1a",
    overflow: "hidden",
    zIndex: 1,
  },
  headerContent: {
    padding: 16,
  },
  content: {
    padding: 16,
    paddingTop: HEADER_MAX_HEIGHT,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    opacity: 0.8,
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
});
