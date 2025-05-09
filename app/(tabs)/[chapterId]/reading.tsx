import { useCurrentChapter } from "@/database/hooks/useCurrentChapter";
import { useChapters } from "@/database/hooks/useChapters";
import {
  StyledText,
  StyledSurface,
  StyledIconButton,
  StyledTextInput,
} from "@/components/styled";
import {
  StyleSheet,
  View,
  useWindowDimensions,
  ViewStyle,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors, moduleColors } from "@/constants/Colors";
import { useColorScheme } from "react-native";
import { ProgressBar } from "@/components/styled/Progressbar";
import { SheetManager } from "react-native-actions-sheet";
import { ModuleIcons } from "@/constants/Icons";

export default function ReadingScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "dark"];
  const params = useLocalSearchParams<{
    chapterId: string;
    type: string;
  }>();
  const { getChapter, loading, error } = useChapters();
  const chapter = useMemo(
    () => getChapter(parseInt(params.chapterId)),
    [params.chapterId]
  );
  console.log(params);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <StyledIconButton
            variant="secondary"
            icon="arrow-back"
            onPress={() => router.back()}
          />
          <StyledText>Translate the words</StyledText>
          <StyledIconButton
            variant="secondary"
            icon="options"
            onPress={() => {}}
          />
        </View>
        <ProgressBar progress={0.1} />
      </View>
      <View style={styles.content}>
        <StyledIconButton
          backgroundColor="rgba(207, 207, 207, 0.18)"
          color="white"
          size="large"
          icon="volume-high"
          onPress={() => {}}
        />
        <StyledText variant="h3">Hello</StyledText>
        <StyledTextInput
          inputStyle={{
            height: 200,
            padding: 16,
            textAlign: "center",
          }}
          placeholder="Enter your translation"
          multiline
          numberOfLines={10}
        />
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
    flex: 1,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  content: {
    flex: 3,
    gap: 16,
    padding: 16,
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
