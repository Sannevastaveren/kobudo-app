import React from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { TranslationCard } from '@/utils/database';
import { ThemedView } from '../ThemedView';
import { Colors } from '@/constants/Colors';
import { CardItem } from './CardItem';

type CardListProps = {
    cards: TranslationCard[];
    onCardPress?: (card: TranslationCard) => void;
};

export function CardList({ cards, onCardPress }: CardListProps) {
    const renderCard = ({ item }: { item: TranslationCard }) => (
        <CardItem card={item} onCardPress={onCardPress} />
    );

    return (
        <ThemedView style={styles.container}>
            <ThemedText style={styles.title}>My Cards</ThemedText>
            <FlatList
                data={cards}
                renderItem={renderCard}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'none',
    },
    listContainer: {
        padding: 16,
        gap: 12,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 8,
    },
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
