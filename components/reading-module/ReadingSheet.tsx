import React from "react";
import {
  View,
  StyleSheet,
  useColorScheme,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Colors, moduleColors } from "../../constants/Colors";
import { StyledActionSheet } from "../styled/StyledActionSheet";
import { SheetManager, SheetProps } from "react-native-actions-sheet";
import { StyledText } from "../styled/StyledText";
import { StyledIconButton } from "../styled/StyledIconButton";
import { StyledSurface } from "../styled/StyledSurface";
import { Ionicons } from "@expo/vector-icons";
import { ModuleIcons } from "@/constants/Icons";
import { router, useLocalSearchParams } from "expo-router";

export const ReadingSheet: React.FC<SheetProps<"reading-sheet">> = (props) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "dark"];

  return (
    <StyledActionSheet keyboardHandlerEnabled={false} gestureEnabled>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Ionicons
            name={ModuleIcons.reading as keyof typeof Ionicons.glyphMap}
            size={24}
            color={moduleColors.reading.light}
          />
          <View style={styles.titleContainer}>
            <StyledText variant="h2" color={colors.text}>
              Reading
            </StyledText>
            <StyledText variant="body" color={colors.textSecondary}>
              Improve your reading skills
            </StyledText>
          </View>
        </View>
        <StyledIconButton
          variant="ghost"
          icon="close"
          onPress={() => {
            SheetManager.hide("reading-sheet");
          }}
        />
      </View>
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.card}
          onPressIn={() => {
            console.log("Vocab");
            router.push(`/${props.payload?.chapterId}/reading`);
            router.setParams({
              type: "vocab",
            });
            SheetManager.hide("reading-sheet");
          }}
        >
          <Ionicons
            name="language"
            size={24}
            color={moduleColors.reading.light}
          />
          <StyledText variant="h3" color={colors.text}>
            Vocab
          </StyledText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPressIn={() => {
            router.push(`/${props.payload?.chapterId}/reading`);
            router.setParams({
              type: "dialog",
            });
            SheetManager.hide("reading-sheet");
          }}
        >
          <Ionicons
            name="chatbubbles"
            size={24}
            color={moduleColors.reading.light}
          />
          <StyledText variant="h3" color={colors.text}>
            Dialog
          </StyledText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPressIn={() => {
            router.push(`/${props.payload?.chapterId}/reading`);
            router.setParams({
              type: "texts",
            });
            SheetManager.hide("reading-sheet");
          }}
        >
          <Ionicons
            name="document"
            size={24}
            color={moduleColors.reading.light}
          />
          <StyledText variant="h3" color={colors.text}>
            Texts
          </StyledText>
        </TouchableOpacity>
      </View>
    </StyledActionSheet>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  titleContainer: {
    flexDirection: "column",
    gap: 6,
  },
  closeButton: {
    padding: 4,
  },
  formContainer: {
    gap: 16,
  },
  inputContainer: {
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 4,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  submitButton: {
    padding: 16,
    borderRadius: 8,
    marginTop: 24,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  content: {
    flexDirection: "row",
    gap: 16,
  },
  card: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    gap: 16,
  },
});
