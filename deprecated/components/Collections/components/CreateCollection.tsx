import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { ThemedButton } from "@/components/ThemedButton";
import { Modal } from "@/components/ui/Modal";

type CreateCollectionProps = {
  visible: boolean;
  onCreateCollection: (name: string, description: string) => void;
  onCancel: () => void;
};

export function CreateCollection({
  visible,
  onCreateCollection,
  onCancel,
}: CreateCollectionProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = () => {
    if (name.trim()) {
      onCreateCollection(name.trim(), description.trim());
      setName("");
      setDescription("");
    }
  };

  return (
    <Modal visible={visible} onClose={onCancel}>
      <View style={styles.form}>
        <ThemedText style={styles.title}>Create Collection</ThemedText>
        <ThemedTextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Collection name"
          placeholderTextColor="#666"
        />
        <ThemedTextInput
          style={[styles.input, styles.descriptionInput]}
          value={description}
          onChangeText={setDescription}
          placeholder="Description (optional)"
          placeholderTextColor="#666"
          multiline
        />
        <View style={styles.buttonContainer}>
          <ThemedButton title="Cancel" onPress={onCancel} size="md" />
          <ThemedButton
            title="Create"
            onPress={handleCreate}
            size="md"
            disabled={!name.trim()}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  form: {
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
    width: "100%",
    padding: 16,
  },
  input: {
    borderWidth: 1,
    width: 300,
    borderColor: "#666",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: "top",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
});
