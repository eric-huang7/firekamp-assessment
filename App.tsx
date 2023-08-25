import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import { WeatherReport, CityList, Home, OnBoarding, Account } from './src/screens';

import { fetchUserName, saveUserName } from './src/utils/LocalStorage';
import { isIOS, resizeUI } from './src/utils/Common';
import Colors from './src/theme/Colors';
import Images from './src/theme/Images';

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator();

let isUserLoggedIn: any = null

const App: React.FC = () => {

  const [isLocalData, setIsLocalData] = useState(false)

  useEffect(() => {
    checkIsLoggedInUser()
  }, [])

  const checkIsLoggedInUser = async () => {
    isUserLoggedIn = await fetchUserName()
    saveUserName(isUserLoggedIn)

    setIsLocalData(true)
  }

  function MyTabs() {
    return (
      <Tab.Navigator initialRouteName={"Home"}
        screenOptions={({ route }) => ({

          tabBarShowLabel: false,
          tabBarStyle: {
            height: isIOS ? resizeUI(134) : resizeUI(100),
            backgroundColor: "#191919",
            borderTopWidth: 0
          },

          tabBarIcon: ({ focused }) => {
            let iconName, tintColor;
            if (route.name == 'Home') {
              iconName = Images.HOME
              tintColor = focused ? Colors.SELECTED : Colors.LIGHT
            } else if (route.name == 'Locations') {
              iconName = Images.SAVED_LOCATIONS
              tintColor = focused ? Colors.SELECTED : Colors.LIGHT
            } else if (route.name == 'WeatherReport') {
              iconName = Images.REPORT
              tintColor = focused ? Colors.SELECTED : Colors.LIGHT
            } else if (route.name == 'Account') {
              iconName = Images.ACCOUNT
              tintColor = focused ? Colors.SELECTED : Colors.LIGHT
            }

            return (
              <Image
                source={iconName}
                style={{
                  height: resizeUI(28),
                  width: resizeUI(28),
                  tintColor: tintColor
                }}
                resizeMode='contain' />
            )
          },
        })}>
        <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Tab.Screen name="WeatherReport" component={WeatherReport} options={{ headerShown: false }} />
        <Tab.Screen name="Account" component={Account} options={{ headerShown: false }} />
      </Tab.Navigator>
    );
  }

  return (
    isLocalData
    && (<SafeAreaProvider >
      <StatusBar barStyle="light-content" backgroundColor={Colors.BG} />
      <SafeAreaView style={{ backgroundColor: Colors.BG }} />
      <NavigationContainer>
        <Stack.Navigator initialRouteName={isUserLoggedIn ? "MyTabs" : "OnBoarding"} screenOptions={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}>
          <Stack.Screen name="OnBoarding" component={OnBoarding} options={{ headerShown: false }} />
          <Stack.Screen name="CityList" component={CityList} options={{ headerShown: false }} />
          <Stack.Screen name="MyTabs" component={MyTabs} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>)
  );
}

export default App;
