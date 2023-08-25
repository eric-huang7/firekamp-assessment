import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";

import CustomTextField from "../components/CustomTextField";
import CustomButton from "../components/CustomButton";

import { resizeUI, width } from "../utils/Common";
import { AppContext } from "../utils/AppContext";
import Colors from "../theme/Colors";
import Images from "../theme/Images";

const OnBoarding: React.FC = (props) => {
  const context = useContext(AppContext);

  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");

  const submitAction = () => {
    if (!userName) {
      setError("Please enter your name");
    } else {
      context.updateUserName(userName);
      props.navigation.navigate("CityList", { screenName: "OnBoarding" });
    }
  };

  const submitButton = () => {
    return (
      <CustomButton
        label={"Submit"}
        onPress={() => submitAction()}
        viewStyle={{ width: width / 2 }}
      />
    );
  };

  const renderTextInputView = () => {
    return (
      <>
        <CustomTextField
          placeholder={"Username"}
          value={userName}
          onChangeText={(value: any) => {
            setError("");
            setUserName(value);
          }}
        />
      </>
    );
  };

  const renderAppName = () => {
    return (
      <View style={styles.appNameView}>
        <Image
          source={Images.REPORT}
          style={{
            height: resizeUI(150),
            width: resizeUI(150),
            tintColor: Colors.SELECTED,
          }}
        />
      </View>
    );
  };

  const renderMainView = () => {
    return (
      <View style={styles.mainView}>
        {renderAppName()}

        {renderTextInputView()}

        {error && <Text style={styles.errorTxt}>{error}</Text>}

        {submitButton()}
      </View>
    );
  };

  return renderMainView();
};

/* StyleSheet
============================================================================= */
const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: Colors.BG,
    padding: resizeUI(24),
  },
  appNameView: {
    alignSelf: "center",
    marginTop: resizeUI(48),
    marginBottom: resizeUI(150),
  },
  submitButton: {
    backgroundColor: Colors.SELECTED,
    paddingVertical: resizeUI(16),
    marginTop: resizeUI(32),
    borderRadius: resizeUI(14),
    width: width / 2,
    alignItems: "center",
    alignSelf: "center",
  },
  btnTxt: {
    fontSize: resizeUI(18),
    fontWeight: "bold",
    color: Colors.BG,
  },
  errorTxt: {
    fontSize: resizeUI(16),
    fontWeight: "bold",
    color: Colors.DANGER,
    padding: resizeUI(8),
  },
});

export default OnBoarding;
