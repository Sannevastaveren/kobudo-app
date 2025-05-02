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
import { Colors } from "@/constants/Colors";

export type ThemedButtonProps = PressableProps & {
  lightColor?: string;
  darkColor?: string;
  title: string;
  icon?: keyof typeof Ionicons.glyphMap | IconSymbolName;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
};

export function ThemedButton({
  style,
  lightColor,
  darkColor,
  title,
  icon,
  variant = "primary",
  size = "md",
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

  const buttonStyle = [
    styles.button,
    styles[size],
    variant === "outline" && styles.outline,
    { backgroundColor, borderColor: textColor },
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
          color={textColor}
        />
      ) : (
        <IconSymbol name={icon as IconSymbolName} size={24} color={textColor} />
      )}
      <ThemedText
        style={styles.text}
        lightColor={lightColor}
        darkColor={darkColor}
        weight={variant === "outline" ? "medium" : "semibold"}
      >
        {title}
      </ThemedText>
    </Pressable>
  );
}

const styles = createStyleSheet({
  button: {
    borderRadius: borderRadius("md"),
    borderWidth: 0.5,
    flexDirection: "row",
    gap: spacing("xs"),
    alignItems: "center",
    justifyContent: "center",
    width: "auto",
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
  outline: {
    backgroundColor: "transparent",
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
