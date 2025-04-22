import React from "react";
import { StyleSheet } from "react-native";

import { CardList } from "@/components/Translator/CardList";
import { ThemedView } from "@/components/ThemedView";
import { TranslationCard } from "@/utils/database";
import { useCards } from "@/hooks/useCards";
import { useFocusEffect } from "expo-router";
import { CopyProcesser } from "@/components/Translator/CopyProcesser";
export default function CardsScreen() {
    const { cards, handleCardDelete, reload } = useCards();

    useFocusEffect(
        React.useCallback(() => {
            reload();
        }, [])
    );

    const handleCardPress = (card: TranslationCard) => {
        handleCardDelete(card.id);
    };

    return (

        <ThemedView style={styles.container}>
            <CopyProcesser />
            <CardList cards={cards} onCardPress={handleCardPress} />
        </ThemedView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
    },
});
