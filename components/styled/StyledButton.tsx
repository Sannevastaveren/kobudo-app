import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  View,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import { useColorScheme } from "react-native";
import { StyledText } from "./StyledText";

type ButtonVariant = "primary" | "secondary";

interface StyledButtonProps {
  onPress: () => void;
  title: string;
  variant?: ButtonVariant;
  icon?: keyof typeof Ionicons.glyphMap;
  iconPosition?: "left" | "right";
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const StyledButton: React.FC<StyledButtonProps> = ({
  onPress,
  title,
  variant = "primary",
  icon,
  iconPosition = "left",
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "dark"];

  const getButtonStyles = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      ...styles.button,
      opacity: disabled ? 0.5 : 1,
    };

    if (variant === "primary") {
      return {
        ...baseStyle,
        backgroundColor: colors.tint,
      };
    }

    return {
      ...baseStyle,
      backgroundColor: "transparent",
      borderWidth: 1,
      borderColor: colors.tint,
    };
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[getButtonStyles(), style]}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "primary" ? colors.tintText : colors.tint}
          size="small"
          style={styles.loader}
        />
      ) : (
        <View style={styles.content}>
          {icon && iconPosition === "left" && (
            <Ionicons
              name={icon}
              size={20}
              color={variant === "primary" ? colors.tintText : colors.tint}
              style={styles.leftIcon}
            />
          )}
          <StyledText
            variant="button"
            color={variant === "primary" ? colors.tintText : colors.tint}
          >
            {title}
          </StyledText>
          {icon && iconPosition === "right" && (
            <Ionicons
              name={icon}
              size={20}
              color={variant === "primary" ? colors.tintText : colors.tint}
              style={styles.rightIcon}
            />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 48,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8,
  },
  loader: {
    marginVertical: 4,
  },
});
