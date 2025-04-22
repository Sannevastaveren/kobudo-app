import React, { useState } from "react";
import {
    FlatList,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "../ThemedView";
import { TranslationCard } from "@/utils/database";
import { addTranslationCard } from "@/utils/database";
import { ThemedButton } from "../ThemedButton";
import { CardItem } from "./CardItem";
import { ThemedTextInput } from "../ThemedTextInput";
import { Collapsible } from "../Collapsible";

type CopyProcesserProps = {
    onCardAdded?: () => void;
};
type WordPair = {
    korean: string;
    english: string;
};

export function CopyProcesser({ onCardAdded }: CopyProcesserProps) {
    const [pastedText, setPastedText] = useState("");
    const [regexString, setRegexString] = useState<string>(
        '/([^-\n]+?)s*-s*"([^"]+)"/g'
    );
    const [pairs, setPairs] = useState<WordPair[]>([]);

    function parseTextToWordPairs(text: string): WordPair[] {
        const pairs: WordPair[] = [];

        let match;
        const regex = new RegExp(regexString);
        while ((match = regex.exec(text)) !== null) {
            const korean = match[1].trim();
            const english = match[2].trim();
            pairs.push({ korean, english });
        }
        return pairs;
    }

    return (
        <ThemedView style={styles.container}>
            <ThemedView>
                <ThemedText style={styles.title}>Paste Korean Words</ThemedText>
                <Collapsible title="Change regex (optional)">
                    <View>
                        <ThemedTextInput
                            style={styles.regexInput}
                            value={regexString}
                            onChangeText={setRegexString}
                        />
                    </View>
                </Collapsible>
                <TextInput
                    style={styles.input}
                    multiline
                    value={pastedText}
                    onChangeText={setPastedText}
                    placeholder="Paste text in format: 소개(를) 하다 - to introduce"
                    placeholderTextColor="#666"
                />
                <ThemedView style={styles.buttonContainer}>
                    <ThemedButton
                        icon="add"
                        title="Process"
                        onPress={() => {
                            const pairs = parseTextToWordPairs(pastedText);
                            setPairs(pairs);
                        }}
                        disabled={!pastedText.trim()}
                        size="md"
                    />
                </ThemedView>
            </ThemedView>
            <ThemedView>
                <FlatList
                    data={pairs}
                    renderItem={({ item }) => (
                        <CardItem
                            card={{
                                originalText: item.english,
                                translatedText: item.korean,
                                id: 0,
                                createdAt: new Date().toISOString(),
                            }}
                        />
                    )}
                />
            </ThemedView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        gap: 12,
    },
    buttonContainer: {
        paddingVertical: 12,
        flexDirection: "row",
        gap: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
    },
    regexInput: {
        borderWidth: 1,
        borderColor: "#666",
        borderRadius: 8,
        marginBottom: 12,
        padding: 2,
        color: "#fff",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
    input: {
        minHeight: 100,
        borderWidth: 1,
        borderColor: "#666",
        borderRadius: 8,
        padding: 12,
        color: "#fff",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
});
