import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

import { resizeUI } from "../utils/Common";
import Colors from "../theme/Colors";

export interface Props {
  placeholder?: String;
  value?: String;
  onChangeText?: any;
}

const CustomTextField: React.FC<Props> = (props) => {
  const renderMainView = () => {
    return (
      <View style={styles.textInputViewStyle}>
        <TextInput
          style={styles.textInputStyle}
          cursorColor={Colors.LIGHT}
          selectionColor={Colors.LIGHT}
          placeholderTextColor={Colors.GREY}
          placeholder={String(props.placeholder)}
          value={String(props.value)}
          onChangeText={props.onChangeText}
        />
      </View>
    );
  };

  return renderMainView();
};

/* StyleSheet
============================================================================= */
const styles = StyleSheet.create({
  textInputViewStyle: {
    backgroundColor: Colors.BG_LIGHT,
    borderRadius: resizeUI(12),
  },
  textInputStyle: {
    height: resizeUI(54),
    paddingHorizontal: resizeUI(16),
    color: Colors.LIGHT,
    fontSize: resizeUI(18),
  },
});

export default CustomTextField;
