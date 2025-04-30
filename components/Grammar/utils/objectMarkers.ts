/**
 * Checks if the correct Korean object marker is used for a given word
 * Rules:
 * - If word ends in a vowel or 을/를 받침, use 를
 * - If word ends in a consonant, use 을
 */
export const checkObjectMarker = (word: string, marker: string): boolean => {
  // Remove any whitespace
  const cleanWord = word.trim();

  // Get the last character of the word
  const lastChar = cleanWord.charAt(cleanWord.length - 1);

  // Get the Unicode value of the last character
  const charCode = lastChar.charCodeAt(0);

  // Korean Unicode range starts at 0xAC00 (가)
  const koreanUnicodeStart = 0xac00;

  // Each Korean syllable block has 28 possible final consonants (including none)
  const finalConsonantOffset = (charCode - koreanUnicodeStart) % 28;

  // If finalConsonantOffset is 0, there is no final consonant (받침)
  const hasFinalConsonant = finalConsonantOffset !== 0;

  // Determine the correct marker
  const correctMarker = hasFinalConsonant ? "을" : "를";

  return marker === correctMarker;
};
