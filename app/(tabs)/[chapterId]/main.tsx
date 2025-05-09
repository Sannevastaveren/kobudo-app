import { useCurrentChapter } from "@/database/hooks/useCurrentChapter";
import { useChapters } from "@/database/hooks/useChapters";
import {
  StyledText,
  StyledSurface,
  StyledIconButton,
} from "@/components/styled";
import {
  StyleSheet,
  View,
  useWindowDimensions,
  ViewStyle,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors, moduleColors } from "@/constants/Colors";
import { useColorScheme } from "react-native";
import { ProgressBar } from "@/components/styled/Progressbar";
import { SheetManager } from "react-native-actions-sheet";
import { ModuleIcons } from "@/constants/Icons";

export default function ChapterScreen() {
  const { chapterId } = useLocalSearchParams<{ chapterId: string }>();
  const { getChapter, loading, error } = useChapters();
  const { setCurrentChapter } = useCurrentChapter();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "dark"];
  const chapter = getChapter(parseInt(chapterId));
  const { width } = useWindowDimensions();

  useEffect(() => {
    if (chapterId) {
      setCurrentChapter(parseInt(chapterId));
    }
  }, [chapterId]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StyledText>Loading...</StyledText>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <StyledText>Error: {error.message}</StyledText>
      </SafeAreaView>
    );
  }

  if (!chapter) {
    return (
      <SafeAreaView style={styles.container}>
        <StyledText>Chapter not found</StyledText>
      </SafeAreaView>
    );
  }
  // Calculate card size based on screen width
  const cardSize = (width - 32 - 16) / 2; // 32 for container padding, 16 for gap

  const getLessonCardStyle = (type: string): ViewStyle => ({
    ...styles.lessonCard,
    width: cardSize,
    height: cardSize,
    borderColor: moduleColors[type as keyof typeof moduleColors].main,
    borderWidth: 3,
    borderBottomWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
  });

  const LessonCard = ({
    type,
    title,
  }: {
    type: "reading" | "listening" | "speaking" | "grammar";
    title: string;
  }) => (
    <TouchableOpacity
      style={getLessonCardStyle(type)}
      onPress={() =>
        SheetManager.show(`${type}-sheet`, {
          payload: {
            chapterId: chapterId,
          },
        })
      }
    >
      <StyledSurface style={styles.cardContent}>
        <View style={styles.cardContent}>
          <Ionicons
            name={ModuleIcons[type] as keyof typeof Ionicons.glyphMap}
            size={32}
            color={colors.text}
          />
          <StyledText variant="h4" style={styles.cardText}>
            {title}
          </StyledText>
        </View>
        <ProgressBar
          progress={0.5}
          fillColor={moduleColors[type].light}
          height={5}
        />
      </StyledSurface>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StyledSurface style={styles.header}>
        <View style={styles.headerContent}>
          <StyledText
            variant="h4"
            style={styles.greeting}
            color={colors.textSecondary}
          >
            Hello Sanne,
          </StyledText>
          <View style={styles.chapterNameContainer}>
            <StyledText style={styles.chapterName} variant="h3">
              Continue with: {chapter.name}!
            </StyledText>
            <StyledIconButton
              variant="secondary"
              icon="arrow-forward"
              size="small"
              onPress={() => router.navigate("/")}
            />
          </View>
        </View>
      </StyledSurface>
      <View style={styles.lessonContainer}>
        <StyledText variant="h3" style={styles.continueText}>
          Your lessons
        </StyledText>
        <View style={styles.lessonsGrid}>
          <LessonCard type="reading" title="Reading" />
          <LessonCard type="listening" title="Listening" />
          <LessonCard type="speaking" title="Speaking" />
          <LessonCard type="grammar" title="Grammar" />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    borderRadius: 16,
    padding: 24,
    paddingTop: 84,
  },
  headerContent: {
    gap: 12,
  },
  greeting: {
    opacity: 0.9,
  },
  continueText: {
    opacity: 0.9,
  },
  chapterNameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  chapterIcon: {
    opacity: 0.8,
  },
  chapterName: {
    fontWeight: "bold",
    maxWidth: "90%",
  },
  lessonContainer: {
    width: "100%",
    paddingVertical: 16,
    gap: 16,
  },
  lessonsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    gap: 16,
  },
  lessonCard: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: "60%",
    bottom: 0,
  },
  cardContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    width: "100%",
  },
  cardText: {
    textAlign: "center",
  },
});
