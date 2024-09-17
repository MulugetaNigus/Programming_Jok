import React, { useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  Alert,
  Animated,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";

function OnBoaring() {
  const [timer, settimmer] = useState(5);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    setTimeout(() => {
      settimmer((prev) => (prev != 0 ? prev - 1 : 0));
    }, 1000);

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, [timer]);

  return (
    <>
      <View style={styles.AppView}>
        {/* simle and easy center text */}
        {/* some logo mesay neger */}
        <Entypo name="code" size={105} color="black" />

        <Animated.Text
          style={[
            styles.slogan1,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          Let's have fun 😊
        </Animated.Text>
      </View>
      <View style={styles.pro}>
        <Text
          style={styles.slogan2}
          onPress={() =>
            Alert.alert(
              "Hello Programmers",
              "Lets have fun with programming joks !!!"
            )
          }
        >
          Programmer {timer}
        </Text>
      </View>
    </>
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
    fontSize: 65,
    fontWeight: "900",
    color: "#7751a",
  },
  slogan2: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    fontSize: 25,
    fontWeight: "700",
    color: "#7751a",
  },
  pro: {
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "grey",
    padding: 14,
    borderRadius: 10,
    backgroundColor: "lightgrey",
  },
});
