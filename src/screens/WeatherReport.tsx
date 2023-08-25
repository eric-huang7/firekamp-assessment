import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import moment from "moment";

import { API_KEY, resizeUI } from "../utils/Common";
import API_ENDPOINTS from "../utils/ApiConstants";
import { AppContext } from "../utils/AppContext";
import Colors from "../theme/Colors";
import CustomBox from "../components/CustomBox";

const WeatherReport: React.FC = (props) => {
  const context = useContext(AppContext);

  let today = new Date();

  const [weatherData, setWeatherData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState("");
  const [selectedData, setSelectedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getWeatherDataList(
      context?.cityData?.latitude,
      context?.cityData?.longitude
    );

    const subscribeFocus = props.navigation.addListener("focus", () => {
      getWeatherDataList(
        context?.cityData?.latitude,
        context?.cityData?.longitude
      );
    });

    const unSubscribeFocus = props.navigation.addListener("blur", () => {
      setSelectedIndex("");
    });

    return () => {
      subscribeFocus();
      unSubscribeFocus();
    };
  }, [props.navigation, context?.cityData]);

  const getSelectedIndexData = (selectedDate: any) => {
    let tempData = [];
    allData.forEach((item: any, index: any) => {
      if (
        moment(selectedDate).format("YYYY-MM-DD") ==
        moment(item?.dt_txt).format("YYYY-MM-DD")
      ) {
        tempData.push(item);
      }
    });

    const uniqueDates = [];
    const uniqueDateSet = new Set();

    for (const item of tempData) {
      const dtTxt = item.dt_txt;
      const date = dtTxt;

      if (!uniqueDateSet.has(date)) {
        uniqueDateSet.add(date);
        uniqueDates.push(item);
      }
    }

    setSelectedData(uniqueDates);
  };

  const getWeatherDataList = (lat: any, long: any) => {
    setIsLoading(true);

    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      API_ENDPOINTS.FORECAST +
        `?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result?.list) {
          let tempData = [];

          for (let i = 1; i <= 5; i++) {
            result?.list?.map((item: any, index: any) => {
              if (
                item?.dt_txt?.split(" ")[0] !=
                moment(today).format("YYYY-MM-DD")
              ) {
                tempData.push(item);
              }
            });
          }
          setAllData(tempData);

          const uniqueDates = [];
          const uniqueDateSet = new Set();

          for (const item of tempData) {
            const dtTxt = item.dt_txt;
            const date = dtTxt.split(" ")[0];

            if (!uniqueDateSet.has(date)) {
              uniqueDateSet.add(date);
              uniqueDates.push(item);
            }
          }
          setWeatherData(uniqueDates);
        } else {
          setError(result?.message);
        }
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  };

  const renderOtherDaysList = () => {
    return (
      <View style={styles.otherDaysMainView}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {weatherData.map((item: any, index: any) => {
            return (
              <View key={index}>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedIndex(item?.dt_txt);
                    getSelectedIndexData(item?.dt_txt);
                  }}
                >
                  <View style={styles.otherDaysView}>
                    <View>
                      <Text style={styles.dayTxt}>
                        {moment(item?.dt_txt).format("dddd")}
                      </Text>
                      <Text style={styles.dateTxt}>
                        {moment(item?.dt_txt).format("Do MMMM")}
                      </Text>
                    </View>

                    <Image
                      source={{
                        uri:
                          API_ENDPOINTS.IMAGE_URL +
                          `${item?.weather[0]?.icon}.png`,
                      }}
                      style={{
                        height: resizeUI(48),
                        width: resizeUI(48),
                      }}
                    />

                    <Text style={styles.dayTxt}>{`${item?.main?.temp}°`}</Text>
                  </View>
                </TouchableOpacity>

                {selectedIndex == item?.dt_txt && (
                  <View style={{ marginBottom: resizeUI(24) }}>
                    <CustomBox data={selectedData} />
                  </View>
                )}
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  };

  const renderHeaderView = () => {
    return (
      <View style={styles.headerView}>
        <Text style={styles.titleTxt}>{"Next 5 Days"}</Text>
      </View>
    );
  };

  const renderMainView = () => {
    return (
      <View style={styles.mainView}>
        {renderHeaderView()}

        {error ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={styles.errorTxt}>{error}</Text>
          </View>
        ) : isLoading ? (
          <View style={{ flex: 1, justifyContent: "center" }}>
            <ActivityIndicator color={Colors.SELECTED} size={"large"} />
          </View>
        ) : (
          renderOtherDaysList()
        )}
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
    paddingTop: resizeUI(24),
    paddingHorizontal: resizeUI(24),
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
  dayTxt: {
    color: Colors.LIGHT,
    fontSize: resizeUI(18),
    fontWeight: "bold",
    marginBottom: resizeUI(8),
  },
  dateTxt: {
    color: Colors.GREY,
    fontSize: resizeUI(14),
    fontWeight: "bold",
  },
  otherDaysMainView: {
    flex: 1,
  },
  otherDaysView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.BG_LIGHT,
    borderRadius: resizeUI(16),
    padding: resizeUI(24),
    marginBottom: resizeUI(24),
  },
  errorTxt: {
    fontSize: resizeUI(16),
    fontWeight: "bold",
    color: Colors.DANGER,
    padding: resizeUI(8),
  },
});

export default WeatherReport;
