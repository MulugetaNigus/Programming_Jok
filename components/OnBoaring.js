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
import { Button } from "@ui-kitten/components";
import AntDesign from "@expo/vector-icons/AntDesign";

function OnBoaring({ navigation }) {
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

  const handleSignWithGoogle = () => {
    // Alert.alert("hi");
    navigation.navigate("Home")
  };

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
        {/* sign in with google btn */}
        <Button
        onPress={ () => handleSignWithGoogle()}
        size="large"
          style={{
            width: "100%",
            padding: 18,
            backgroundColor: "red",
            borderColor: "red",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text>Let's have Fun</Text>
        </Button>
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
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
