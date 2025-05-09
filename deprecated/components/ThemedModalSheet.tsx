import React, { ReactNode } from "react";
import {
  StyleSheet,
  Modal,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";

type ThemedModalSheetProps = {
  isVisible: boolean;
  onClose: () => void;
  children: ReactNode;
};

export function ThemedModalSheet({
  isVisible,
  onClose,
  children,
}: ThemedModalSheetProps) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <ThemedView style={styles.modalContent}>{children}</ThemedView>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: Colors.dark.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    minHeight: "40%",
  },
});
