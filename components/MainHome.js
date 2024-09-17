import React, { useState, useEffect } from "react";
import { View, StyleSheet, SafeAreaView, ScrollView, Text } from "react-native";
import JCard from "./JCard";
import { RefreshControl } from "react-native-gesture-handler";

function MainHome() {

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
      <Text style={styles.title}>Programming Joks 🤣😂😁</Text>
      {/* Scrollable cards */}
      <ScrollView style={styles.scrollView}
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
    marginTop: 50
  },
  title: {
    marginHorizontal: 15,
    fontSize: 22,
    fontWeight: 'bold',
    color: "grey",
    marginBottom: 10
  },
  scrollView: {
    flex: 1
  }
});
