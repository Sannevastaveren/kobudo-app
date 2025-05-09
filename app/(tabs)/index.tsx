import { IsAdmin } from "@/components/admin/constants";
import { StyledText, StyledButton } from "@/components/styled";
import { useChapters } from "@/database/hooks/useChapters";
import { StyleSheet, View } from "react-native";
import { SheetManager } from "react-native-actions-sheet";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { chapters, loading, error, refresh } = useChapters();

  const handleClick = () => {
    SheetManager.show("chapter-creation-sheet", {
      payload: {
        onChapterCreated: refresh,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.chapterContainer}>
        <StyledText style={styles.title}>Chapters</StyledText>
        {loading && <StyledText>Loading...</StyledText>}
        {error && <StyledText>Error: {error.message}</StyledText>}
        {chapters.map((chapter) => (
          <StyledText key={chapter.id}>{chapter.name}</StyledText>
        ))}
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
  button: {
    width: "50%",
  },
});
