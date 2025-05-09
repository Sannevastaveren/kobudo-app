import React from "react";
import {
  Modal as RNModal,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

type ModalProps = {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export function Modal({ visible, onClose, children }: ModalProps) {
  const theme = useColorScheme() ?? "light";
  const backgroundColor =
    theme === "light" ? Colors.light.background : Colors.dark.background;

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={(e) => e.stopPropagation()}
        >
          <ThemedView style={styles.modal}>{children}</ThemedView>
        </TouchableOpacity>
      </TouchableOpacity>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    borderRadius: 12,
    padding: 20,
    maxWidth: "95%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
