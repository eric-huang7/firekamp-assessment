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

import CustomBox from "../components/CustomBox";

import { API_KEY, resizeUI } from "../utils/Common";
import API_ENDPOINTS from "../utils/ApiConstants";
import { AppContext } from "../utils/AppContext";
import Colors from "../theme/Colors";
import Images from "../theme/Images";

const tabs = ["Today", "Next 5 Days"];

const Home: React.FC = (props) => {
  const context = useContext(AppContext);

  let today = new Date();
  let currentDay = new Date().toLocaleString("en-us", { weekday: "long" });

  let currentHour = today.getHours();

  const [dayStatus, setDayStatus] = useState("");
  const [selectedTab, setSelectedTab] = useState(0);
  const [todaysWeatherData, setTodaysWeatherData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getDayStatus();

    const subscribeFocus = props.navigation.addListener("focus", () => {
      getWeatherDataList(
        context?.cityData?.latitude,
        context?.cityData?.longitude
      );
    });

    return () => {
      subscribeFocus();
    };
  }, [props.navigation, context?.cityData]);

  const getDayStatus = () => {
    if (currentHour < 12) {
      setDayStatus("Morning");
    } else if (currentHour < 18) {
      setDayStatus("Afternoon");
    } else {
      setDayStatus("Evening");
    }
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
          result?.list?.map((item: any, index: any) => {
            if (
              moment(item?.dt_txt).format("YYYY-MM-DD") ==
              moment(today).format("YYYY-MM-DD")
            ) {
              tempData.push(item);
            }
          });
          setTodaysWeatherData(tempData);
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

  const renderHourlyInfoView = () => {
    return (
      <>
        <CustomBox data={todaysWeatherData} />
      </>
    );
  };

  const renderTabView = () => {
    return (
      <View style={styles.tabMainView}>
        {tabs.map((item: any, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setSelectedTab(index);
                if (index == 1) {
                  setSelectedTab(0);
                  props.navigation.navigate("WeatherReport");
                }
              }}
            >
              <View
                style={[
                  styles.tabView,
                  {
                    backgroundColor:
                      selectedTab == index
                        ? Colors.SELECTED
                        : Colors.TRANSPARENT,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.tabTxt,
                    { color: selectedTab == index ? Colors.BG : Colors.LIGHT },
                  ]}
                >
                  {item}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const renderOtherInfoView = () => {
    return (
      <View style={styles.otherInfoView}>
        <View style={{ alignItems: "center" }}>
          <Image
            source={Images.WIND}
            style={{
              height: resizeUI(24),
              width: resizeUI(24),
              tintColor: Colors.LIGHT,
              marginBottom: resizeUI(6),
            }}
          />
          <Text
            style={[styles.userNameTxt, { paddingTop: resizeUI(6) }]}
          >{`${todaysWeatherData[0]?.wind?.speed} km/h`}</Text>
          <Text style={styles.date}>{"Wind"}</Text>
        </View>

        <View style={{ alignItems: "center" }}>
          <Image
            source={Images.VISIBILITY}
            style={{
              height: resizeUI(24),
              width: resizeUI(24),
              tintColor: Colors.LIGHT,
              marginBottom: resizeUI(6),
            }}
          />
          <Text style={[styles.userNameTxt, { paddingTop: resizeUI(6) }]}>
            {todaysWeatherData[0]?.visibility}
          </Text>
          <Text style={styles.date}>{"Visibility"}</Text>
        </View>

        <View style={{ alignItems: "center" }}>
          <Image
            source={Images.HUMIDITY}
            style={{
              height: resizeUI(24),
              width: resizeUI(24),
              tintColor: Colors.LIGHT,
              marginBottom: resizeUI(6),
            }}
          />
          <Text
            style={[styles.userNameTxt, { paddingTop: resizeUI(6) }]}
          >{`${todaysWeatherData[0]?.main?.humidity} %`}</Text>
          <Text style={styles.date}>{"Humidity"}</Text>
        </View>
      </View>
    );
  };

  const renderMainInfoView = () => {
    return (
      <View style={styles.mainInfoView}>
        <Text style={styles.userNameTxt}>{context?.cityData?.city}</Text>

        <Text style={[styles.degTxt, { fontWeight: "normal" }]}>
          <Text style={styles.degTxt}>{todaysWeatherData[0]?.main?.temp}</Text>°
        </Text>

        <Text style={[styles.date, { fontSize: resizeUI(24) }]}>
          {todaysWeatherData[0]?.weather[0]?.main}
        </Text>
      </View>
    );
  };

  const renderHeaderView = () => {
    return (
      <View style={styles.headerView}>
        <View style={styles.profileView}>
          <Text style={styles.userName}>
            {context.userName.split(" ").length > 1
              ? context.userName
                  ?.split(" ")[0]
                  ?.substring(0, 1)
                  ?.toUpperCase() +
                context.userName?.split(" ")[1]?.substring(0, 1)?.toUpperCase()
              : context.userName?.split(" ")[0]?.substring(0, 1)?.toUpperCase()}
          </Text>
        </View>

        <View style={styles.detailView}>
          <Text style={styles.userNameTxt}>{`Good ${dayStatus},`}</Text>

          <Text style={styles.userNameTxt}>{context.userName}!</Text>

          <Text style={styles.date}>{`${moment(today).format("Do MMMM")}, ${
            currentDay.split(",")[0]
          }`}</Text>
        </View>

        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate("CityList", { screenName: "Home" })
          }
        >
          <Image
            source={Images.LOCATION}
            style={{
              height: resizeUI(32),
              width: resizeUI(32),
              tintColor: Colors.LIGHT,
            }}
          />
        </TouchableOpacity>
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
          <ScrollView
            contentContainerStyle={{ paddingBottom: resizeUI(24) }}
            showsVerticalScrollIndicator={false}
          >
            {renderMainInfoView()}
            {renderOtherInfoView()}
            {renderTabView()}
            {renderHourlyInfoView()}
          </ScrollView>
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
    flexDirection: "row",
    alignItems: "flex-start",
  },
  profileView: {
    height: resizeUI(50),
    width: resizeUI(50),
    borderRadius: resizeUI(50),
    backgroundColor: Colors.SELECTED,
    alignItems: "center",
    justifyContent: "center",
    marginRight: resizeUI(16),
  },
  userName: {
    color: Colors.BG,
    fontSize: resizeUI(20),
    fontWeight: "bold",
  },
  detailView: {
    flex: 1,
  },
  userNameTxt: {
    color: Colors.LIGHT,
    fontSize: resizeUI(20),
    fontWeight: "bold",
  },
  date: {
    color: Colors.GREY,
    fontSize: resizeUI(14),
    fontWeight: "bold",
    marginTop: resizeUI(8),
  },
  mainInfoView: {
    height: resizeUI(240),
    width: resizeUI(240),
    borderRadius: resizeUI(28),
    backgroundColor: Colors.BG_LIGHT,
    padding: resizeUI(24),
    marginTop: resizeUI(48),
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "center",
  },
  degTxt: {
    color: Colors.SELECTED,
    fontSize: resizeUI(60),
    fontWeight: "bold",
    marginTop: resizeUI(8),
  },
  otherInfoView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: resizeUI(20),
    borderRadius: resizeUI(24),
    backgroundColor: Colors.BG_LIGHT,
    marginTop: resizeUI(40),
  },
  tabMainView: {
    flexDirection: "row",
    alignSelf: "center",
    borderRadius: resizeUI(8),
    marginVertical: resizeUI(40),
    backgroundColor: Colors.BG_LIGHT,
  },
  tabView: {
    width: resizeUI(148),
    alignItems: "center",
    borderRadius: resizeUI(8),
    paddingVertical: resizeUI(14),
  },
  tabTxt: {
    fontSize: resizeUI(16),
    fontWeight: "bold",
  },
  errorTxt: {
    fontSize: resizeUI(16),
    fontWeight: "bold",
    color: Colors.DANGER,
    padding: resizeUI(8),
  },
});

export default Home;
