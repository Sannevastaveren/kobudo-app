import { StyleSheet } from "react-native";
import {
  theme,
  Spacing,
  BorderRadius,
  TypographySize,
  TypographyWeight,
  Shadow,
} from "../../constants/Theme";

export const createStyleSheet = <T extends StyleSheet.NamedStyles<T>>(
  styles: T
) => {
  return StyleSheet.create(styles);
};

export const spacing = (size: Spacing) => theme.spacing[size];

export const borderRadius = (size: BorderRadius) => theme.borderRadius[size];

export const typography = (
  size: TypographySize,
  weight: TypographyWeight = "regular"
) => ({
  fontSize: theme.typography.sizes[size],
  fontWeight: theme.typography.weights[weight],
  lineHeight:
    theme.typography.sizes[size] * theme.typography.lineHeights.normal,
});

export const shadow = (size: Shadow) => theme.shadows[size];

export const createSpacingStyle = (vertical: Spacing, horizontal: Spacing) => ({
  paddingVertical: spacing(vertical),
  paddingHorizontal: spacing(horizontal),
});

export const createMarginStyle = (vertical: Spacing, horizontal: Spacing) => ({
  marginVertical: spacing(vertical),
  marginHorizontal: spacing(horizontal),
});

export const createFlexStyle = (
  direction: "row" | "column" = "column",
  justify:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between" = "flex-start",
  align: "flex-start" | "center" | "flex-end" = "flex-start"
) => ({
  flexDirection: direction,
  justifyContent: justify,
  alignItems: align,
});
