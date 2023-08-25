import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { resizeUI } from "../utils/Common";
import Colors from "../theme/Colors";

export interface Props {
  label?: String;
  onPress?: any;
  viewStyle?: any;
}

const CustomButton: React.FC<Props> = (props) => {
  const renderMainView = () => {
    return (
      <TouchableOpacity
        style={[styles.submitButton, { ...props.viewStyle }]}
        onPress={props.onPress}
      >
        <Text style={styles.btnTxt}>{props.label}</Text>
      </TouchableOpacity>
    );
  };

  return renderMainView();
};

/* StyleSheet
============================================================================= */
const styles = StyleSheet.create({
  submitButton: {
    backgroundColor: Colors.SELECTED,
    paddingVertical: resizeUI(16),
    marginTop: resizeUI(32),
    borderRadius: resizeUI(14),
    alignItems: "center",
    alignSelf: "center",
  },
  btnTxt: {
    fontSize: resizeUI(18),
    fontWeight: "bold",
    color: Colors.BG,
  },
});

export default CustomButton;
