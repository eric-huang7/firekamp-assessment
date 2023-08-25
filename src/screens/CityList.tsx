import React, { useContext, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import CustomTextField from "../components/CustomTextField";

import { AppContext } from "../utils/AppContext";
import { resizeUI } from "../utils/Common";
import Colors from "../theme/Colors";
import Images from "../theme/Images";

const cityListData = require("../theme/assets/files/cityList.json");

const CityList: React.FC = (props) => {
  const context = useContext(AppContext);

  const [searchValue, setSearchValue] = useState("");

  const renderItemList = (item: any, index: any) => {
    return (
      <TouchableOpacity
        onPress={() => {
          context.updateCityData(item);
          context.updateLocations((value) => [...value, item]);
          if (props?.route?.params?.screenName == "Home") {
            props.navigation.goBack();
          } else {
            props.navigation.reset({ index: 0, routes: [{ name: "MyTabs" }] });
          }
        }}
      >
        <View style={styles.itemView}>
          <Text style={styles.itemTxt}>{item?.city}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderCityListView = () => {
    return (
      <View style={{ flex: 1, marginTop: resizeUI(6) }}>
        <FlatList
          data={
            searchValue
              ? cityListData.filter(
                  (cityData: any) =>
                    cityData.city
                      .toLowerCase()
                      .indexOf(searchValue.toLowerCase()) !== -1
                )
              : cityListData
          }
          initialNumToRender={15}
          renderItem={({ item, index }) => renderItemList(item, index)}
        />
      </View>
    );
  };

  const renderSearchView = () => {
    return (
      <>
        <CustomTextField
          placeholder={"Search City"}
          value={searchValue}
          onChangeText={(value: any) => {
            setSearchValue(value);
          }}
        />
      </>
    );
  };

  const renderHeaderView = () => {
    return (
      <View style={styles.headerView}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Image
            source={Images.BACK_ARROW}
            style={{
              height: resizeUI(28),
              width: resizeUI(36),
              tintColor: Colors.LIGHT,
            }}
          />
        </TouchableOpacity>

        <Text style={styles.titleTxt}>Select City</Text>
      </View>
    );
  };

  const renderMainView = () => {
    return (
      <View style={styles.mainView}>
        {renderHeaderView()}
        {renderSearchView()}
        {renderCityListView()}
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
    flexDirection: "row",
    marginBottom: resizeUI(16),
  },
  titleTxt: {
    color: Colors.LIGHT,
    fontSize: resizeUI(20),
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
    marginRight: resizeUI(32),
  },
  itemView: {
    backgroundColor: Colors.BG_LIGHT,
    borderRadius: resizeUI(8),
    marginVertical: resizeUI(6),
  },
  itemTxt: {
    color: Colors.LIGHT,
    fontSize: resizeUI(18),
    padding: resizeUI(16),
    // fontWeight: "bold"
  },
});

export default CityList;
