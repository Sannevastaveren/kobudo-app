import { Pressable, type PressableProps, type ViewStyle } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "@/components/ThemedText";
import {
  createStyleSheet,
  spacing,
  borderRadius,
  shadow,
} from "@/utils/styles";
import { IconSymbol, IconSymbolName } from "./ui/IconSymbol";
import { Ionicons } from "@expo/vector-icons";

const COLORS = {
  primary: "rgba(76, 175, 80, 0.8)",
  secondary: "#2196F3",
} as const;

export type ThemedButtonProps = PressableProps & {
  lightColor?: string;
  darkColor?: string;
  title: string;
  icon?: keyof typeof Ionicons.glyphMap | IconSymbolName;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
};

export function ThemedButton({
  style,
  lightColor,
  darkColor,
  title,
  icon,
  variant = "primary",
  size = "md",
  fullWidth = false,
  ...rest
}: ThemedButtonProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );
  const textColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "text"
  );

  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return {
          backgroundColor: COLORS.primary,
          textColor: "#FFFFFF",
        };
      case "secondary":
        return {
          backgroundColor: COLORS.secondary,
          textColor: "#FFFFFF",
        };
      case "ghost":
        return {
          backgroundColor: "#333",
          textColor: "#fff",
        };
      default:
        return {
          backgroundColor: COLORS.primary,
          textColor: "#FFFFFF",
        };
    }
  };

  const variantStyles = getVariantStyles();

  const buttonStyle = [
    styles.button,
    styles[size],
    styles[variant],
    fullWidth && styles.fullWidth,
    { backgroundColor: variantStyles.backgroundColor },
    style as ViewStyle,
  ];

  return (
    <Pressable
      style={({ pressed, hovered }) => [
        buttonStyle,
        pressed && styles.pressed,
        hovered && styles.hovered,
      ]}
      {...rest}
    >
      {icon && icon in Ionicons.glyphMap ? (
        <Ionicons
          name={icon as keyof typeof Ionicons.glyphMap}
          size={24}
          color={variantStyles.textColor}
        />
      ) : (
        <IconSymbol
          name={icon as IconSymbolName}
          size={24}
          color={variantStyles.textColor}
        />
      )}
      <ThemedText
        style={[styles.text, { color: variantStyles.textColor }]}
        weight={variant === "ghost" ? "medium" : "semibold"}
      >
        {title}
      </ThemedText>
    </Pressable>
  );
}

const styles = createStyleSheet({
  button: {
    borderRadius: borderRadius("md"),
    flexDirection: "row",
    gap: spacing("xs"),
    alignItems: "center",
    justifyContent: "center",
    ...shadow("sm"),
    transition: "all 0.2s ease-in-out",
  },
  sm: {
    paddingVertical: spacing("xs"),
    paddingHorizontal: spacing("sm"),
  },
  md: {
    paddingVertical: spacing("sm"),
    paddingHorizontal: spacing("md"),
  },
  lg: {
    paddingVertical: spacing("md"),
    paddingHorizontal: spacing("lg"),
  },
  primary: {
    backgroundColor: COLORS.primary,
  },
  secondary: {
    backgroundColor: COLORS.secondary,
  },
  ghost: {
    backgroundColor: "transparent",
    shadowOpacity: 0,
  },
  fullWidth: {
    width: "100%",
  },
  pressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.8,
  },
  hovered: {
    transform: [{ scale: 1.02 }],
    ...shadow("md"),
  },
  text: {
    textAlign: "center",
  },
});
