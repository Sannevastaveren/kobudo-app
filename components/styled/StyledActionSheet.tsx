import React, { useRef, useEffect } from "react";
import { View, StyleSheet, useColorScheme, ViewStyle } from "react-native";
import ActionSheet, {
  ActionSheetRef,
  ActionSheetProps,
} from "react-native-actions-sheet";
import { Colors } from "../../constants/Colors";

interface StyledActionSheetProps
  extends Omit<ActionSheetProps, "containerStyle"> {
  containerStyle?: ViewStyle;
}

export const StyledActionSheet: React.FC<StyledActionSheetProps> = ({
  children,
  containerStyle,
  ...props
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "dark"];
  const actionSheetRef = useRef<ActionSheetRef>(null);

  const baseContainerStyle: ViewStyle = {
    ...styles.container,
    backgroundColor: colors.background,
    ...(containerStyle || {}),
  };

  return (
    <ActionSheet
      ref={actionSheetRef}
      containerStyle={baseContainerStyle}
      {...props}
    >
      <View style={[styles.content, { backgroundColor: colors.background }]}>
        {children}
      </View>
    </ActionSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  content: {
    padding: 24,
  },
});
