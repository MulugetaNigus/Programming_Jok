import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AsyncStorage from "@react-native-async-storage/async-storage";

// programming jok endpoint  = https://v2.jokeapi.dev/joke/Any?type=twopart&amount=10

function JCard({ refreshToGetNew }) {
  const [jokeContainer, setJokeContainer] = useState([]);

  useEffect(() => {
    fetchJokes();
  }, [refreshToGetNew]);

  const fetchJokes = async () => {
    try {
      const response = await axios.get("https://v2.jokeapi.dev/joke/Any", {
        params: {
          type: "twopart",
          amount: 10,
        },
      });
      setJokeContainer(response.data.jokes.reverse());
      // console.log(response.data.jokes);
    } catch (error) {
      console.error(error);
    }
  };

  // Here's the rewritten code:
  // Fetch existing favorite jokes from AsyncStorage
  // const existingFavJokes = await AsyncStorage.getItem("FavJok");
  // let favJokesArray = existingFavJokes ? JSON.parse(existingFavJokes) : [];
  // ```javascript

  // The issue in your original code lies in the order of operations. Specifically, you're adding the joke to the `favJokesArray` before checking if it already exists. This means that the joke will always be considered as existing, hence the error message.

  // Here's the corrected version of the `handleAddToFavorite` function:

  // ```javascript
  const handleAddToFavorite = async (joke) => {
    // return await AsyncStorage.setItem("FavJok", JSON.stringify([]));
    try {
      // Fetch existing favorite jokes from AsyncStorage
      const existingFavJokes = await AsyncStorage.getItem("FavJok");
      let favJokesArray = existingFavJokes ? JSON.parse(existingFavJokes) : [];

      // Check if the joke already exists in the array
      const isJokeExist = favJokesArray.some((item) => item.id === joke.id);
      if (isJokeExist) {
        return Alert.alert("Error", "Joke Already Exists In Your Favorite!!!");
      } else {
        // Add new joke to the array
        favJokesArray.push(joke);

        // Save the updated array back to AsyncStorage
        await AsyncStorage.setItem("FavJok", JSON.stringify(favJokesArray));

        Alert.alert(
          "Confirmation",
          "Joke Added To Your Favorite Successfully!!!"
        );
      }
    } catch (error) {
      Alert.alert("Error", "Can't Add To Your Favorite!!!");
      console.error(error);
    }
  };

  return (
    <ScrollView>
      {jokeContainer.length > 0 ? (
        jokeContainer.map((joke, index) => (
          <View key={index} style={styles.JCard}>
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
              <Pressable onPress={() => handleAddToFavorite(joke)}>
                <MaterialIcons
                  name="favorite-outline"
                  size={26}
                  color="black"
                />
              </Pressable>
            </View>
          </View>
        ))
      ) : (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading jokes...</Text>
        </View>
      )}
    </ScrollView>
  );
}

export default JCard;

const styles = StyleSheet.create({
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  loadingText: {
    fontSize: 18,
    color: "#888",
    fontStyle: "italic",
  },
});
