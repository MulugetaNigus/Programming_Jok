import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

// componets
import MainHome from "./components/MainHome";
import OnBoaring from "./components/OnBoaring";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AppRegistry } from "react-native";
import * as Updates from 'expo-updates';
import { Alert } from 'react-native';

export default function App() {
  const [onBoardingScreenTime, setonBoardingScreenTime] = useState(true);

  useEffect(() => {
    // Call the checkForUpdates function when the app loads
    checkForUpdates();
    const timer = setTimeout(() => {
      setonBoardingScreenTime(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  async function checkForUpdates() {
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        // Notify the user and reload the app
        Alert.alert('Update available!', 'The app will now restart to apply the update.', [
          { text: 'OK', onPress: async () => await Updates.reloadAsync() }
        ]);
      }
    } catch (e) {
      console.error(e);
    }
  }


  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        {onBoardingScreenTime ? <OnBoaring /> : <MainHome />}
      </GestureHandlerRootView>
    </>
  );
}
