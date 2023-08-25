import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

import API_ENDPOINTS from "../utils/ApiConstants";
import { resizeUI } from "../utils/Common";
import Colors from "../theme/Colors";

export interface Props {
  data?: any;
}

const CustomBox: React.FC<Props> = (props) => {
  const renderMainView = () => {
    return (
      <View style={styles.hourlyMainView}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {props.data.map((item: any, index: any) => {
            return (
              <View
                key={index}
                style={[
                  styles.hourlyView,
                  { marginLeft: index == 0 ? 0 : resizeUI(16) },
                ]}
              >
                <Text style={styles.date}>
                  {item?.dt_txt?.split(" ")[1]?.split(":")[0] +
                    ":" +
                    item?.dt_txt?.split(" ")[1]?.split(":")[1]}
                </Text>
                <Image
                  source={{
                    uri:
                      API_ENDPOINTS.IMAGE_URL + `${item?.weather[0]?.icon}.png`,
                  }}
                  style={{
                    height: resizeUI(48),
                    width: resizeUI(48),
                  }}
                />
                <Text style={styles.userNameTxt}>{`${item?.main?.temp}°`}</Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  };

  return renderMainView();
};

/* StyleSheet
============================================================================= */
const styles = StyleSheet.create({
  hourlyMainView: {
    flexDirection: "row",
  },
  hourlyView: {
    width: resizeUI(95),
    backgroundColor: Colors.BG_LIGHT,
    paddingVertical: resizeUI(16),
    borderRadius: resizeUI(20),
    alignItems: "center",
  },
  date: {
    color: Colors.GREY,
    fontSize: resizeUI(14),
    fontWeight: "bold",
    marginTop: resizeUI(8),
  },
  userNameTxt: {
    color: Colors.LIGHT,
    fontSize: resizeUI(20),
    fontWeight: "bold",
  },
});

export default CustomBox;
