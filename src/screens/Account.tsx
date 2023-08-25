import React, { useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import CustomTextField from "../components/CustomTextField";
import CustomButton from "../components/CustomButton";

import { AppContext } from "../utils/AppContext";
import { resizeUI, width } from "../utils/Common";
import Colors from "../theme/Colors";

const Account: React.FC = (props) => {
  const context = useContext(AppContext);

  const [userName, setUserName] = useState(context?.userName);
  const [error, setError] = useState("");

  const submitAction = () => {
    if (!userName) {
      setError("Please enter your name");
    } else {
      context.updateUserName(userName);
      props.navigation.navigate("Home");
    }
  };

  const resetAction = () => {
    context.resetAction();
    props.navigation.reset({ index: 0, routes: [{ name: "OnBoarding" }] });
  };

  const renderBottomButton = () => {
    return (
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <CustomButton
          label={"Submit"}
          onPress={() => submitAction()}
          viewStyle={{ width: width / 2.5 }}
        />

        <CustomButton
          label={"Reset App"}
          onPress={() => resetAction()}
          viewStyle={{ width: width / 2.5 }}
        />
      </View>
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

  const renderHeaderView = () => {
    return (
      <View style={styles.headerView}>
        <Text style={styles.titleTxt}>{"Account"}</Text>
      </View>
    );
  };

  const renderMainView = () => {
    return (
      <View style={styles.mainView}>
        {renderHeaderView()}
        {renderTextInputView()}

        {error && <Text style={styles.errorTxt}>{error}</Text>}

        {renderBottomButton()}
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
  headerView: {
    alignItems: "center",
    marginBottom: resizeUI(24),
  },
  titleTxt: {
    color: Colors.LIGHT,
    fontSize: resizeUI(20),
    fontWeight: "bold",
  },
  errorTxt: {
    fontSize: resizeUI(16),
    fontWeight: "bold",
    color: Colors.DANGER,
    padding: resizeUI(8),
  },
});

export default Account;
