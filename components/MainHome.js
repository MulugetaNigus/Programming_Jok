import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  Pressable,
} from "react-native";
import JCard from "./JCard";
import { RefreshControl } from "react-native-gesture-handler";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

function MainHome({ navigation }) {
  const [refreshToGetNew, setrefreshToGetNew] = useState(false);
  useEffect(() => {
    if (refreshToGetNew) {
      setTimeout(() => {
        setrefreshToGetNew(false);
      }, 3000);
    }
  }, [refreshToGetNew]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Fixed title */}
      {/* naviation */}
      <View style={styles.navBar}>
        <Text style={styles.navTitle}>Programming_Jokes 🤣😂😁</Text>
        <View style={styles.navIconContainer}>
          {/* Add your icon component here */}
          <Pressable onPress={() => navigation.navigate("My Favorite")}>
            <MaterialIcons name="favorite" size={24} color="black" />
          </Pressable>
        </View>
      </View>
      {/* Scrollable cards */}
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshToGetNew}
            onRefresh={() => setrefreshToGetNew(true)}
          />
        }
      >
        <JCard refreshToGetNew={refreshToGetNew} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default MainHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  title: {
    marginHorizontal: 15,
    fontSize: 22,
    fontWeight: "bold",
    color: "grey",
    marginBottom: 10,
  },
  scrollView: {
    flex: 1,
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 15,
    marginBottom: 10,
  },
  navTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  navIconContainer: {
    // Add styles for your icon container here
  },
});
