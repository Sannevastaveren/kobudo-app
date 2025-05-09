import { TextInput, type TextInputProps } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import {
  createStyleSheet,
  spacing,
  borderRadius,
  shadow,
} from "@/utils/styles";

export type ThemedTextInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
  outlined?: boolean;
  size?: "sm" | "md" | "lg";
};

export function ThemedTextInput({
  style,
  lightColor,
  darkColor,
  size = "md",
  outlined = false,
  ...rest
}: ThemedTextInputProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return (
    <TextInput
      style={[
        styles.input,
        styles[size],
        {
          color,
          backgroundColor: "#222",
          borderColor: color,
          borderWidth: outlined ? 1 : 0,
        },
        style,
      ]}
      placeholderTextColor={color}
      {...rest}
    />
  );
}

const styles = createStyleSheet({
  input: {
    borderWidth: 1,
    borderRadius: borderRadius("md"),
    ...shadow("sm"),
  },
  sm: {
    paddingVertical: spacing("xs"),
    paddingHorizontal: spacing("sm"),
    fontSize: 14,
  },
  md: {
    paddingVertical: spacing("sm"),
    paddingHorizontal: spacing("md"),
    fontSize: 16,
  },
  lg: {
    paddingVertical: spacing("md"),
    paddingHorizontal: spacing("lg"),
    fontSize: 18,
  },
});
