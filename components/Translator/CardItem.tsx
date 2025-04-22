import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { TranslationCard } from '@/utils/database';
import { ThemedView } from '../ThemedView';
import { Colors } from '@/constants/Colors';
import { ThemedIconButton } from '../ThemedIconButton';
import * as Speech from 'expo-speech';
type CardItemProps = {
    card: TranslationCard;
    onCardPress?: (card: TranslationCard) => void;
};

export function CardItem({ card, onCardPress }: CardItemProps) {

    const speak = () => {
        const thingToSay = card.translatedText;
        Speech.speak(thingToSay, { language: "ko-KR", });
    };
    return (
        <TouchableOpacity
            style={styles.cardContainer}
            activeOpacity={0.7}
        >
            <ThemedView style={styles.card}>
                <View style={styles.textContainer}>
                    <ThemedText style={styles.originalText}>{card.originalText}</ThemedText>
                    <View style={styles.divider} />
                    <View style={styles.translatedTextContainer}>
                        <ThemedText style={styles.translatedText}>{card.translatedText}</ThemedText>
                        <ThemedIconButton
                            style={styles.deleteButton}
                            name="speaker"
                            onPress={() => speak()}
                            color={Colors.dark.text}
                        />
                    </View>
                </View>
                <ThemedIconButton
                    style={styles.deleteButton}
                    name="trash"
                    onPress={() => onCardPress?.(card)}
                    color={Colors.dark.text}
                />
            </ThemedView>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        borderRadius: 12,
        overflow: 'hidden',
    },
    card: {
        flexDirection: 'row',
        padding: 16,
        borderRadius: 12,
        backgroundColor: Colors.dark.cardBackground,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    translatedTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    textContainer: {
        flex: 1,
        gap: 8,
    },
    originalText: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.dark.text,
    },
    translatedText: {
        fontSize: 16,
        color: Colors.dark.text,
        opacity: 0.8,
    },
    divider: {
        height: 1,
        backgroundColor: Colors.dark.text,
        opacity: 0.2,
    },
    deleteButton: {
        padding: 8,
        marginLeft: 8,
    },
    separator: {
        height: 8,
    },
});
