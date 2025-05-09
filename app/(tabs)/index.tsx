import { IsAdmin } from "@/components/admin/constants";
import {
  StyledText,
  StyledButton,
  StyledIconButton,
} from "@/components/styled";
import { useChapters } from "@/database/hooks/useChapters";
import { useCurrentChapter } from "@/database/hooks/useCurrentChapter";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { ScrollView, SheetManager } from "react-native-actions-sheet";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useNavigation } from "expo-router";
import { useEffect } from "react";
import { Colors } from "@/constants/Colors";
import { deleteCollection } from "@/database/tables/collections";

export default function HomeScreen() {
  const { chapters, loading: chaptersLoading, error, refresh } = useChapters();
  const { currentChapterId, loading: currentChapterLoading } =
    useCurrentChapter();
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    // Only redirect on initial app load (when navigation state is empty)
    const navState = navigation.getState();
    if (
      !currentChapterLoading &&
      currentChapterId &&
      navState?.routes?.length === 1
    ) {
      router.replace(`/${currentChapterId}/main`);
    }
  }, [currentChapterLoading, currentChapterId, navigation]);

  const handleClick = () => {
    SheetManager.show("chapter-creation-sheet", {
      payload: {
        onChapterCreated: refresh,
      },
    });
  };

  if (chaptersLoading || currentChapterLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <StyledText>Loading...</StyledText>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.chapterContainer}>
        <StyledText style={styles.title}>Select a Chapter</StyledText>
        {error && <StyledText>Error: {error.message}</StyledText>}
        <ScrollView>
          {chapters.map((chapter) => (
            <TouchableOpacity
              key={chapter.id}
              style={styles.chapterItem}
              onPress={() => router.push(`/${chapter.id}/main`)}
            >
              <View style={styles.chapterItemContent}>
                <StyledText variant="h3">{chapter.name}</StyledText>
                <StyledText>{chapter.description}</StyledText>
              </View>
              {IsAdmin && (
                <View style={styles.chapterItemActions}>
                  <StyledIconButton
                    icon="trash"
                    size="small"
                    variant="ghost"
                    onPress={async () => {
                      await deleteCollection(chapter.id);
                      refresh();
                    }}
                  />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      {IsAdmin && (
        <StyledButton
          style={styles.button}
          icon="add"
          onPress={handleClick}
          title="Create Chapter"
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 60,
    gap: 16,
    height: "100%",
  },
  chapterContainer: {
    flex: 1,
    gap: 16,
  },
  title: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },
  chapterItem: {
    marginVertical: 4,
    backgroundColor: Colors["dark"].cardBackground,
    padding: 16,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  chapterItemContent: {
    flex: 1,
    maxWidth: "90%",
  },
  chapterItemActions: {
    maxWidth: "10%",
    flexDirection: "row",
    gap: 8,
  },
  button: {
    width: "50%",
  },
});
