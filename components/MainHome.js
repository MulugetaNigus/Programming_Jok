import React from "react";
import { View, StyleSheet, SafeAreaView, ScrollView, Text } from "react-native";
import JCard from "./JCard";

function MainHome() {
  return (
    // main view
    <SafeAreaView>
      <ScrollView style={styles.MainView}>
        {/* jock cards componet here */}
        <JCard />
      </ScrollView>
    </SafeAreaView>
  );
}

export default MainHome;

const styles = StyleSheet.create({
  MainView: {
    flex: 1,
    margin: 5,
  },
});
