import React from "react";
import { View, Text, StyleSheet } from "react-native";

function JCard() {
  return (
    <View style={styles.JCard}>
      <Text style={JockTxt}>
        why coding text editor theme always have a dark backgroundColor, because
        light attracts bugs !
      </Text>
    </View>
  );
}

export default JCard;

const styles = StyleSheet.create({
  JCard: {
    marginHorizontal: 10,
    marginVertical: 10,
    borderWidth: 0.5,
    borderColor: "lightgrey",
    backgroundColor: "lightgrey",
    borderRadius: 15,
    padding: 10,
  },
  JockTxt: {
    fontSize: 18,
    color: "grey",
    fontWeight: "700",
    // letterSpacing:
  },
});
