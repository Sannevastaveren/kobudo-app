import React from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { IconSymbol, IconSymbolName } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

interface ThemedIconButtonProps extends TouchableOpacityProps {
    name: string;
    size?: number;
    color?: string;
    weight?: 'regular' | 'medium' | 'semibold' | 'bold';
}

export function ThemedIconButton({
    name,
    size = 24,
    weight = 'regular',
    style,
    ...props
}: ThemedIconButtonProps) {
    const theme = useColorScheme() ?? 'light';
    const iconColor = props.color ?? (theme === 'light' ? Colors.light.icon : Colors.dark.icon);

    return (
        <TouchableOpacity
            style={[styles.button, style]}
            activeOpacity={0.7}
            {...props}
        >
            <IconSymbol
                name={name as IconSymbolName}
                size={size}
                color={iconColor}
                weight={weight}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        padding: 8,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
