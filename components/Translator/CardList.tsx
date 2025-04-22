import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { TranslationCard } from '@/utils/database';
import { ThemedView } from '../ThemedView';
import { ThemedButton } from '../ThemedButton';
type CardListProps = {
    cards: TranslationCard[];
    onCardPress?: (card: TranslationCard) => void;
};

export function CardList({ cards, onCardPress }: CardListProps) {
    const renderCard = ({ item }: { item: TranslationCard }) => (
        <ThemedView style={styles.card}>
            <ThemedText style={styles.cardText}>{item.originalText}</ThemedText>
            <ThemedText style={styles.cardText}>{item.translatedText}</ThemedText>
            <ThemedButton title="Delete" onPress={() => onCardPress?.(item)} />
        </ThemedView>
    );

    return (
        <ThemedView style={styles.container}>
            <ThemedText style={styles.title}>My Cards</ThemedText>
            <FlatList
                data={cards}
                renderItem={renderCard}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}
            />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'none',
        padding: 16,
        gap: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    card: {
        flexDirection: 'row',
        gap: 16,
        justifyContent: 'space-between',
        padding: 16,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    cardText: {
        fontSize: 16,
        marginBottom: 8,
    },
});
