import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Animated,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useLocalSearchParams, router, Stack } from "expo-router";
import { CardList } from "@/components/Cards/components/CardList";
import { useCollections } from "@/components/Collections/hooks/useCollections";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedTabs } from "@/components/ThemedTabs";
import { GrammarList } from "@/components/Grammar/components/GrammarList";
import { useGrammar } from "@/components/Grammar/hooks/useGrammar";
import { ReviewStatus } from "@/components/Cards/components/ReviewStatus";
import { useReviewStatus } from "@/components/Cards/hooks/useReviewStatus";
import { Ionicons } from "@expo/vector-icons";

const HEADER_MIN_HEIGHT = 60;
const HEADER_MAX_HEIGHT = 150;
const HEADER_EXPANDED_HEIGHT = 250;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default function CollectionScreen() {
  const { id } = useLocalSearchParams();
  const collectionId = parseInt(id as string);
  const [activeTab, setActiveTab] = useState("cards");
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;

  const { collections } = useCollections();
  const { reviewStatus, isLoading: isReviewStatusLoading } =
    useReviewStatus(collectionId);
  const collection = collections.find((c) => c.id === collectionId);

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [
      isDescriptionExpanded ? HEADER_EXPANDED_HEIGHT : HEADER_MAX_HEIGHT,
      HEADER_MIN_HEIGHT,
    ],
    extrapolate: "clamp",
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const titleScale = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0.8],
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

  const renderExpandedHeader = () => (
    <Animated.View style={[styles.expandedHeader, { opacity: headerOpacity }]}>
      <ThemedText style={styles.descriptionHeader}>Description</ThemedText>
      {collection?.description && (
        <TouchableOpacity
          style={styles.descriptionContainer}
          onPress={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
        >
          <ThemedText
            style={styles.description}
            numberOfLines={isDescriptionExpanded ? undefined : 2}
          >
            {collection?.description}
          </ThemedText>
          <Ionicons
            name={isDescriptionExpanded ? "chevron-up" : "chevron-down"}
            size={16}
            color="#666"
          />
        </TouchableOpacity>
      )}
    </Animated.View>
  );

  const renderCondensedHeader = () => (
    <Animated.ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={[
        styles.condensedHeader,
        {
          opacity: scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [0, 1],
            extrapolate: "clamp",
          }),
        },
      ]}
      contentContainerStyle={styles.condensedHeaderContent}
    >
      <ThemedButton
        icon="add"
        title="Cards"
        onPress={handleAddCards}
        size="sm"
        variant="ghost"
      />
      <ThemedButton
        icon="add"
        title="Grammar"
        onPress={handleAddGrammar}
        size="sm"
        variant="ghost"
      />

      <ReviewStatus
        collectionId={collectionId}
        reviewStatus={reviewStatus}
        isLoading={isReviewStatusLoading}
        compact
      />
    </Animated.ScrollView>
  );

  const renderContent = () => (
    <ThemedView style={styles.content}>
      <Stack.Screen options={{ title: collection?.name }} />
      <ThemedView style={styles.actionBar}>
        <ThemedButton
          icon="add"
          title="Add cards"
          onPress={handleAddCards}
          size="sm"
          variant="ghost"
        />
        <ThemedButton
          icon="add"
          title="Add grammar"
          onPress={handleAddGrammar}
          size="sm"
          variant="ghost"
        />
      </ThemedView>
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
      <Animated.View style={[styles.header, { height: headerHeight }]}>
        <Animated.View
          style={[styles.headerContent, { transform: [{ scale: titleScale }] }]}
        >
          <ReviewStatus
            collectionId={collectionId}
            reviewStatus={reviewStatus}
            isLoading={isReviewStatusLoading}
          />
          {renderExpandedHeader()}
        </Animated.View>
        {renderCondensedHeader()}
      </Animated.View>
      <FlatList
        data={[{ key: "content" }]}
        renderItem={renderContent}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        contentContainerStyle={[
          styles.listContent,
          {
            paddingTop: isDescriptionExpanded
              ? HEADER_EXPANDED_HEIGHT
              : HEADER_MAX_HEIGHT,
          },
        ]}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 0,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    overflow: "hidden",
    zIndex: 1,
  },
  headerContent: {
    padding: 16,
  },
  expandedHeader: {},
  descriptionHeader: {
    paddingHorizontal: 16,
  },
  condensedHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_MIN_HEIGHT,
    backgroundColor: "#222",
    borderBottomWidth: 2,
    borderBottomColor: "#333",
  },
  condensedHeaderContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  actionButtonsContainer: {
    flexDirection: "row",
    gap: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  condensedTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  descriptionContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    justifyContent: "space-between",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    opacity: 0.8,
    flex: 1,
    marginRight: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  content: {
    opacity: 1,
    padding: 16,
    zIndex: 1,
  },
  listContent: {
    paddingTop: HEADER_MAX_HEIGHT,
  },
  actionBar: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
});
