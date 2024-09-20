import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ScrollView } from "react-native-gesture-handler";
import EvilIcons from '@expo/vector-icons/EvilIcons';

function MyFavorite() {
  const [Fav, setFav] = useState([]);
  // read the joks from localStorage
  useEffect(() => {
    console.log(Fav);
    getData();
  }, []);
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("FavJok");
      jsonValue != null ? JSON.parse(jsonValue) : null;
      console.log(jsonValue);
      return setFav(JSON.parse(jsonValue));
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  const handleRemoveToFavorite = async (joke) => {
    // console.log("hi");
    // first get all joks from localstorage
    const Existingjoks = await AsyncStorage.getItem("FavJok");
    let Joks = JSON.parse(Existingjoks);
    FilterJok = Joks.filter( (jok) => jok.id != joke.id);
    // Save the updated array back to AsyncStorage
    await AsyncStorage.setItem("FavJok", JSON.stringify(FilterJok));
    getData();
  };

  return (
    <SafeAreaView>
      <Text style={styles.myFav}>My Favorite Joks</Text>
      <ScrollView style={{ marginBottom: 60 }}>
        {Fav.map((joke) => (
          <View key={joke.id} style={styles.JCard}>
            <View style={styles.JokeHeader}>
              <Text style={styles.JokeCategory}>Programming Humor</Text>
              <Text style={styles.JokeIcon}>💻</Text>
            </View>
            <Text style={styles.JokeTxt}>{joke.setup}</Text>
            <Text style={styles.PunchlineTxt}>{joke.delivery} 🐛💡</Text>
            <View style={styles.JokeFooter}>
              <Text style={styles.FooterText}>
                ID: {joke.id} | Lang: {joke.lang}
              </Text>
            </View>
            <View>
              <Pressable
                style={{ marginTop: 10 }}
                onPress={() => handleRemoveToFavorite(joke)}
              >
                <EvilIcons name="trash" size={35} color="red" />
              </Pressable>
            </View>
          </View>
        ))}
        {Fav?.length == [] && <View style={{ flex: 1, alignItems: "center", justifyContent: "center", marginTop: 100 }}><Text style={styles.NoJok}>No Favorite Jok Yet !</Text></View>}
      </ScrollView>
    </SafeAreaView>
  );
}

export default MyFavorite;

const styles = StyleSheet.create({
  myFav: {
    marginHorizontal: 20,
    marginTop: 20,
    fontSize: 20,
    color: "grey",
    fontWeight: "500",
    marginBottom: 10
  },
  NoJok: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    marginTop: 20,
    fontSize: 15,
    color: "gray",
    fontWeight: "500",
    marginBottom: 10
  },
  JCard: {
    // flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    marginHorizontal: 10,
    marginVertical: 10,
    borderWidth: 0.5,
    borderColor: "lightgrey",
    backgroundColor: "lightgrey",
    borderRadius: 15,
    padding: 20,
  },
  JokeTxt: {
    fontSize: 18,
    color: "red",
    fontWeight: "700",
    // letterSpacing:
  },
  JokeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  JokeCategory: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  JokeIcon: {
    fontSize: 24,
  },
  PunchlineTxt: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#555",
    marginTop: 10,
  },
  JokeFooter: {
    marginTop: 15,
    alignItems: "flex-end",
  },
  FooterText: {
    fontSize: 14,
    color: "#777",
  },
});
