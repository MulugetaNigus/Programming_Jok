import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { ApplicationProvider } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import "react-native-gesture-handler";

// import './gesture-handler';

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// componets
import MainHome from "./components/MainHome";
import OnBoaring from "./components/OnBoaring";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AppRegistry } from "react-native";
import * as Updates from "expo-updates";
import { Alert } from "react-native";
import MyFavorite from "./components/MyFavorite";

// init the stack
const Stack = createStackNavigator();

export default function App() {
  const [onBoardingScreenTime, setonBoardingScreenTime] = useState(true);

  useEffect(() => {
    // Call the checkForUpdates function when the app loads
    checkForUpdates();
  }, []);

  async function checkForUpdates() {
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        // Notify the user and reload the app
        Alert.alert(
          "Update available!",
          "The app will now restart to apply the update.",
          [{ text: "OK", onPress: async () => await Updates.reloadAsync() }]
        );
      }
    } catch (e) {
      console.error(e);
    }
  }

  // https://oromia.ministry.et/student-result/0832886?first_name=ASHANNAAFII&qr=
  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        {/* {onBoardingScreenTime ? <OnBoaring /> : <MainHome />} */}
        <ApplicationProvider {...eva} theme={eva.light}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="OnBoarding">
              <Stack.Screen
                name="OnBoarding"
                component={OnBoaring}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Home"
                component={MainHome}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="My Favorite"
                component={MyFavorite}
                options={{ headerShown: true }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </ApplicationProvider>
      </GestureHandlerRootView>
    </>
  );
}
