import { Pressable, type PressableProps, type ViewStyle } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedText } from '@/components/ThemedText';
import { createStyleSheet, spacing, borderRadius, shadow } from '@/utils/styles';

export type ThemedButtonProps = PressableProps & {
    lightColor?: string;
    darkColor?: string;
    title: string;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
};

export function ThemedButton({
    style,
    lightColor,
    darkColor,
    title,
    variant = 'primary',
    size = 'md',
    ...rest
}: ThemedButtonProps) {
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
    const textColor = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

    const buttonStyle = [
        styles.button,
        styles[size],
        variant === 'outline' && styles.outline,
        { backgroundColor, borderColor: textColor },
        style as ViewStyle,
    ];

    return (
        <Pressable style={buttonStyle} {...rest}>
            <ThemedText
                style={styles.text}
                lightColor={lightColor}
                darkColor={darkColor}
                weight={variant === 'outline' ? 'medium' : 'semibold'}
            >
                {title}
            </ThemedText>
        </Pressable>
    );
}

const styles = createStyleSheet({
    button: {
        borderRadius: borderRadius('md'),
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        ...shadow('sm'),
    },
    sm: {
        paddingVertical: spacing('xs'),
        paddingHorizontal: spacing('sm'),
    },
    md: {
        paddingVertical: spacing('sm'),
        paddingHorizontal: spacing('md'),
    },
    lg: {
        paddingVertical: spacing('md'),
        paddingHorizontal: spacing('lg'),
    },
    outline: {
        backgroundColor: 'transparent',
    },
    text: {
        textAlign: 'center',
    },
});
