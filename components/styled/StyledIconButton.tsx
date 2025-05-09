import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  ActivityIndicator,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import { useColorScheme } from "react-native";

type IconButtonVariant = "primary" | "secondary" | "ghost";
type IconButtonSize = "small" | "medium" | "large";

interface StyledIconButtonProps {
  onPress: () => void;
  icon: keyof typeof Ionicons.glyphMap;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
}

export const StyledIconButton: React.FC<StyledIconButtonProps> = ({
  onPress,
  icon,
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  style,
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "dark"];

  const getButtonStyles = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      ...styles.button,
      ...styles[size],
      opacity: disabled ? 0.5 : 1,
    };

    switch (variant) {
      case "primary":
        return {
          ...baseStyle,
          backgroundColor: colors.tint,
        };
      case "secondary":
        return {
          ...baseStyle,
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: colors.tint,
        };
      case "ghost":
        return {
          ...baseStyle,
          backgroundColor: "transparent",
        };
      default:
        return baseStyle;
    }
  };

  const getIconColor = (): string => {
    switch (variant) {
      case "primary":
        return colors.tintText;
      case "secondary":
      case "ghost":
        return colors.tint;
      default:
        return colors.text;
    }
  };

  const getIconSize = (): number => {
    switch (size) {
      case "small":
        return 16;
      case "medium":
        return 20;
      case "large":
        return 24;
      default:
        return 20;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[getButtonStyles(), style]}
    >
      {loading ? (
        <ActivityIndicator
          color={getIconColor()}
          size={getIconSize()}
          style={styles.loader}
        />
      ) : (
        <View style={styles.content}>
          <Ionicons name={icon} size={getIconSize()} color={getIconColor()} />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
  },
  small: {
    width: 32,
    height: 32,
    borderRadius: 100,
  },
  medium: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  large: {
    width: 48,
    height: 48,
    borderRadius: 100,
  },
  loader: {
    margin: 4,
  },
});
