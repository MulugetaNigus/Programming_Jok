import React from "react";
import { View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";

function OnBoaring() {
  return (
    // main onboaring views
    <SafeAreaView>
      <ScrollView style={styles.AppView}>
        <View>
          {/* simle and easy center text */}
          {/* some logo mesay neger */}
          <Entypo name="code" size={55} color="black" />
          <Text style={styles.slogan1}>Let's have fun !</Text>
          <Text style={styles.slogan2}>Programmer</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default OnBoaring;

const styles = StyleSheet.create({
  AppView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  slogan1: {
    fontSize: 45,
    fontWeight: "900",
    color: "#7751a",
  },
  slogan2: {
    fontSize: 25,
    fontWeight: "700",
    color: "#7751a",
  },
});
