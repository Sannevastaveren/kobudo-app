// Usage
import { useState, useEffect } from 'react';
import { View, ActivityIndicator, Switch } from 'react-native';
import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';
import { ThemedTextInput } from '../ThemedTextInput';
import { ThemedButton } from '../ThemedButton';
import { createStyleSheet, spacing, borderRadius } from '@/utils/styles';
import { API_KEY } from '@env';

export default function TranslatorKorean() {
    const [text, setText] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isRealtime, setIsRealtime] = useState(false);

    const translateText = async () => {
        if (!text.trim()) {
            setTranslatedText('');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await fetch(
                'https://translation.googleapis.com/language/translate/v2',
                {
                    method: 'POST',
                    headers: {
                        'X-goog-api-key': API_KEY,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        q: text,
                        target: 'ko',
                        source: 'en'
                    }),
                }
            );

            const data = await response.json();
            if (data.data && data.data.translations) {
                setTranslatedText(data.data.translations[0].translatedText);
            }
        } catch (err) {
            setError('Translation failed. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isRealtime) {
            const timer = setTimeout(translateText, 500);
            return () => clearTimeout(timer);
        }
    }, [text, isRealtime]);

    return (
        <View style={styles.container}>
            <View style={styles.realtimeContainer}>
                <ThemedText size="md" weight="semibold">Real-time Translation</ThemedText>
                <Switch
                    value={isRealtime}
                    onValueChange={setIsRealtime}
                    style={styles.switch}
                />
            </View>

            <ThemedTextInput
                value={text}
                onChangeText={setText}
                placeholder="Enter text to translate"
                multiline
                size="lg"
                style={styles.input}
            />

            {!isRealtime && (
                <ThemedButton
                    title="Translate to Korean"
                    onPress={translateText}
                    disabled={loading || !text.trim()}
                    size="lg"
                />
            )}

            {loading && <ActivityIndicator style={styles.loader} />}

            {error ? (
                <ThemedText style={styles.error}>{error}</ThemedText>
            ) : translatedText ? (
                <View style={styles.resultContainer}>
                    <ThemedText size="md" weight="semibold">Translation:</ThemedText>
                    <ThemedText style={styles.resultText}>{translatedText}</ThemedText>
                </View>
            ) : null}
        </View>
    );
}

const styles = createStyleSheet({
    container: {
        gap: spacing('md'),
    },
    realtimeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: spacing('sm'),
    },
    switch: {
        transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
    },
    input: {
        height: 120,
        textAlignVertical: 'top',
    },
    loader: {
        marginTop: spacing('md'),
    },
    error: {
        color: '#FF3B30',
        marginTop: spacing('md'),
    },
    resultContainer: {
        marginTop: spacing('md'),
        padding: spacing('md'),
        borderRadius: borderRadius('md'),
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
    },
    resultText: {
        marginTop: spacing('sm'),
    },
});