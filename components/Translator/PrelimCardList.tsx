import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';
import { ThemedTextInput } from '../ThemedTextInput';
import { ThemedButton } from '../ThemedButton';
import { TranslationCard } from '@/utils/database';
import { Colors } from '@/constants/Colors';
import { WordPair } from './CopyProcesser';
import { ThemedIconButton } from '../ThemedIconButton';

type PrelimCardListProps = {
    cards: WordPair[];
    onSaveCards?: (pairs: WordPair[]) => void;
    onCancel?: () => void;
};

export function PrelimCardList({ cards: initialCards, onSaveCards, onCancel }: PrelimCardListProps) {
    const [cards, setCards] = useState<WordPair[]>(initialCards);

    const updateCard = (index: number, field: 'originalText' | 'translatedText', value: string) => {
        const newCards = [...cards];
        newCards[index] = { ...newCards[index], [field]: value };
        setCards(newCards);
    };

    const removeCard = (index: number) => {
        setCards(cards.filter((_, i) => i !== index));
    };

    return (
        <ThemedView style={styles.container}>
            <ThemedText style={styles.title}>Review Cards</ThemedText>
            <FlatList
                data={cards}
                renderItem={({ item, index }) => (
                    <ThemedView style={styles.card}>
                        <ThemedTextInput
                            value={item.english}
                            onChangeText={(text) => updateCard(index, 'originalText', text)}
                            style={styles.input}
                            placeholder="Original text"
                        />
                        <ThemedTextInput
                            value={item.korean}
                            onChangeText={(text) => updateCard(index, 'translatedText', text)}
                            style={styles.input}
                            placeholder="Translated text"
                        />
                        <ThemedIconButton
                            name="trash"
                            onPress={() => removeCard(index)}
                            color={Colors.dark.text}
                        />
                    </ThemedView>
                )}
                keyExtractor={(_, index) => index.toString()}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
            <View style={styles.buttonContainer}>
                <ThemedButton
                    icon="close"
                    title="Cancel"
                    onPress={onCancel}
                    size="md"
                />
                <ThemedButton
                    icon="save"
                    title="Save All"
                    onPress={() => onSaveCards?.(cards)}
                    size="md"
                    disabled={cards.length === 0}
                />
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        gap: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    card: {
        padding: 12,
        borderRadius: 8,
        flexDirection: 'row',
        backgroundColor: Colors.dark.cardBackground,
        gap: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#666',
        borderRadius: 8,
        flex: 1,
        padding: 8,
        color: '#fff',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    separator: {
        height: 12,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
        marginTop: 16,
    },
});
