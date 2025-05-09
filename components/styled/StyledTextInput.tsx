import React from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TextInputProps,
} from "react-native";
import { Colors } from "../../constants/Colors";
import { useColorScheme } from "react-native";
import { StyledText } from "./StyledText";
interface StyledTextInputProps extends Omit<TextInputProps, "style"> {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
}

export const StyledTextInput: React.FC<StyledTextInputProps> = ({
  label,
  error,
  containerStyle,
  inputStyle,
  labelStyle,
  errorStyle,
  ...props
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "dark"];

  const getInputStyles = (): TextStyle => {
    return {
      ...styles.input,
      backgroundColor: colors.cardBackground,
      color: colors.text,
      borderColor: error ? colors.error : colors.icon,
    };
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <StyledText variant="label">{label}</StyledText>}
      <TextInput
        style={[getInputStyles(), inputStyle]}
        placeholderTextColor={colors.icon}
        {...props}
      />
      {error && (
        <StyledText variant="label" color={colors.error}>
          {error}
        </StyledText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  input: {
    width: "100%",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
});
