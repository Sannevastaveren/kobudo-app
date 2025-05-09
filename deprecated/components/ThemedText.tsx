import { Text, type TextProps, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { createStyleSheet, typography } from '@/utils/styles';
import { TypographySize, TypographyWeight } from '@/constants/Theme';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  size?: TypographySize;
  weight?: TypographyWeight;
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  size = 'md',
  weight = 'regular',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        typography(size, weight),
        { color },
        style,
      ]}
      {...rest}
    />
  );
}

const styles = createStyleSheet({
  default: typography('md'),
  defaultSemiBold: typography('md', 'semibold'),
  title: typography('xxxl', 'bold'),
  subtitle: typography('lg', 'bold'),
  link: {
    ...typography('md'),
    color: '#0a7ea4',
  },
});
