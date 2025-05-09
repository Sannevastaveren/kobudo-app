import React from "react";
import { View, StyleSheet, ViewStyle, ViewProps } from "react-native";
import { Colors } from "../../constants/Colors";
import { useColorScheme } from "react-native";

type SurfaceVariant = "default" | "elevated" | "outlined" | "filled";
type SurfaceSize = "small" | "medium" | "large";

interface StyledSurfaceProps extends ViewProps {
  variant?: SurfaceVariant;
  size?: SurfaceSize;
  style?: ViewStyle;
  children?: React.ReactNode;
}

export const StyledSurface: React.FC<StyledSurfaceProps> = ({
  variant = "default",
  size = "medium",
  style,
  children,
  ...props
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "dark"];

  const getSurfaceStyles = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      ...styles.surface,
      ...styles[size],
    };

    switch (variant) {
      case "default":
        return {
          ...baseStyle,
          backgroundColor: colors.background,
        };
      case "elevated":
        return {
          ...baseStyle,
          backgroundColor: colors.cardBackground,
          shadowColor: colors.text,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        };
      case "outlined":
        return {
          ...baseStyle,
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: colors.icon,
        };
      case "filled":
        return {
          ...baseStyle,
          backgroundColor: colors.cardBackground,
        };
      default:
        return baseStyle;
    }
  };

  return (
    <View style={[getSurfaceStyles(), style]} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  surface: {
    borderRadius: 12,
    overflow: "hidden",
  },
  small: {
    padding: 8,
  },
  medium: {
    padding: 16,
  },
  large: {
    padding: 24,
  },
});
