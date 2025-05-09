import { View } from "react-native";
import ActionSheet from "react-native-actions-sheet";
import { StyledTextInput } from "../styled/StyledTextInput";

function ExampleSheet() {
  return (
    <ActionSheet>
      <View>
        <StyledTextInput label="Title" />
      </View>
    </ActionSheet>
  );
}

export default ExampleSheet;
