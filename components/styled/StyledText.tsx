import React from "react";
import { Text, StyleSheet, TextStyle, TextProps } from "react-native";
import { Colors } from "../../constants/Colors";
import { useColorScheme } from "react-native";

type TextVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "body"
  | "bodySmall"
  | "caption"
  | "label"
  | "error"
  | "button"
  | "placeholder";

interface StyledTextProps extends TextProps {
  variant?: TextVariant;
  color?: string;
  style?: TextStyle;
}

export const StyledText: React.FC<StyledTextProps> = ({
  variant = "body",
  color,
  style,
  ...props
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "dark"];

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      color: color ?? colors.text,
    };

    switch (variant) {
      case "h1":
        return {
          ...baseStyle,
          ...styles.h1,
        };
      case "h2":
        return {
          ...baseStyle,
          ...styles.h2,
        };
      case "h3":
        return {
          ...baseStyle,
          ...styles.h3,
        };
      case "h4":
        return {
          ...baseStyle,
          ...styles.h4,
        };
      case "body":
        return {
          ...baseStyle,
          ...styles.body,
        };
      case "bodySmall":
        return {
          ...baseStyle,
          ...styles.bodySmall,
        };
      case "caption":
        return {
          ...baseStyle,
          ...styles.caption,
        };
      case "placeholder":
        return {
          ...baseStyle,
          ...styles.placeholder,
        };
      case "label":
        return {
          ...baseStyle,
          ...styles.label,
        };
      case "error":
        return {
          ...baseStyle,
          ...styles.error,
        };
      case "button":
        return {
          ...baseStyle,
          ...styles.button,
        };
      default:
        return baseStyle;
    }
  };

  return <Text style={[getTextStyle(), style]} {...props} />;
};

const styles = StyleSheet.create({
  h1: {
    fontSize: 32,
    fontWeight: "700",
    lineHeight: 40,
  },
  h2: {
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 32,
  },
  h3: {
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 28,
  },
  h4: {
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 24,
  },
  body: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 24,
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 16,
  },
  placeholder: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
    opacity: 0.6,
  },
  label: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 16,
  },
  error: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 16,
    color: "#EF4444",
  },
  button: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 24,
  },
});
