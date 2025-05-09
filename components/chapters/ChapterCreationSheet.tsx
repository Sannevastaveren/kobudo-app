import React, { useState } from "react";
import { View, StyleSheet, useColorScheme, TextStyle } from "react-native";
import { Colors } from "../../constants/Colors";
import { StyledActionSheet } from "../styled/StyledActionSheet";
import { StyledTextInput } from "../styled/StyledTextInput";
import { SheetProps, SheetManager } from "react-native-actions-sheet";
import { StyledButton } from "../styled/StyledButton";
import { createCollection } from "@/database/tables/collections";
import { StyledText } from "../styled/StyledText";
import { StyledIconButton } from "../styled/StyledIconButton";

export const ChapterCreationSheet: React.FC<
  SheetProps<"chapter-creation-sheet">
> = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "dark"];

  const handleSubmit = async () => {
    if (!title.trim()) {
      console.log("no title");
      return;
    }

    await createCollection({
      name: title.trim(),
      description: description.trim(),
    });

    // Reset form
    setTitle("");
    setDescription("");
    SheetManager.hide("chapter-creation-sheet");

    // Refresh the chapters list
    if (props.payload?.onChapterCreated) {
      await props.payload.onChapterCreated();
    }
  };

  const textStyle: TextStyle = {
    color: colors.text,
  };

  return (
    <StyledActionSheet keyboardHandlerEnabled={false} gestureEnabled>
      <View style={styles.header}>
        <StyledText variant="h2" color={colors.text}>
          Create New Chapter
        </StyledText>
        <StyledIconButton
          variant="ghost"
          icon="close"
          onPress={() => {
            SheetManager.hide("chapter-creation-sheet");
          }}
        />
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <StyledTextInput
            value={title}
            onChangeText={setTitle}
            label="Title"
            placeholder="Enter chapter title"
            placeholderTextColor={colors.icon}
          />
        </View>

        <View style={styles.inputContainer}>
          <StyledTextInput
            value={description}
            onChangeText={setDescription}
            label="Description"
            placeholder="Enter chapter description"
            placeholderTextColor={colors.icon}
            multiline
          />
        </View>

        <StyledButton onPress={handleSubmit} title="Create Chapter" />
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
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
});
