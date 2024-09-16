import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

// componets
import MainHome from "./components/MainHome";
import OnBoaring from "./components/OnBoaring";
import { useEffect, useState } from "react";

export default function App() {
  const [onBoardingScreenTime, setonBoardingScreenTime] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setonBoardingScreenTime(false);
    }, 3000);
  }, []);
  return <>{onBoardingScreenTime ? <OnBoaring /> : <MainHome />}</>;
}
