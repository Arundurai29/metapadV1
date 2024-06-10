import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { ref, get } from "firebase/database";
import * as ScreenOrientation from "expo-screen-orientation";
import { FontAwesome } from "@expo/vector-icons";
import { DATABASE } from "../../FireBaseConfig";
import { Entypo } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { Audio } from 'expo-av';
import { useIsFocused } from '@react-navigation/native';
import SoundButton from "../screens/SoundButton";

const login_bg = require("../../assets/images/win.png");
const imageSources = [
  require("../../assets/images/win1.png"),
  require("../../assets/images/win2.png"),
  require("../../assets/images/win3.png"),
];
const NextPage = ({ navigation, route }) => {
  const { uid, level, } = route.params ?? {};
  const [users, setUsers] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(level);
  const isFocused = useIsFocused();
  
  useEffect(() => {
    let sound: Audio.Sound | undefined;

    const playSound = async () => {
      try {
        const { sound: soundObject } = await Audio.Sound.createAsync(
          require('../../src/win.mp3')
        );
        sound = soundObject;
        await sound.playAsync();
      } catch (error) {
        console.error('Failed to play sound', error);
      }
    };

    if (isFocused) {
      playSound();
    }

    return () => {
      if (sound) {
        sound.stopAsync();
        sound.unloadAsync();
      }
    };
  }, [isFocused]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const usersRef = ref(DATABASE, "users");
        const usersSnapshot = await get(usersRef);
        const usersData = [];

        if (usersSnapshot.exists()) {
          usersSnapshot.forEach((userSnapshot) => {
            const userData = userSnapshot.val();
            if (userData[level] === "completed") {
              usersData.push({
                uid: userSnapshot.key,
                name: userData.name,
                levelTime: userData[level + "Time"],
              });
            }
          });

          setUsers(usersData);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [route.params.level,currentLevel]);

  useEffect(() => {
    ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE
    ).catch((error) =>
      console.error("Error locking screen orientation:", error)
    );

    return () => {
      ScreenOrientation.unlockAsync().catch((error) =>
        console.error("Error unlocking screen orientation:", error)
      );
    };
  }, []);

  const navigateToNextLevel = () => {
    let nextLevel = "";
    switch (level) {
      case "game3level1":
        nextLevel = "game3level2";
        break;
      case "game3level2":
        nextLevel = "game3level3";
        break;
        case "game3level3":
          nextLevel = "game3level4";
          break;
          case "game3level4":
            nextLevel = "game3level5";
            break;
      default:
        nextLevel = "";
    }

    if (nextLevel !== "") {
      navigation.navigate(nextLevel, { uid: uid, level: nextLevel });
    }
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const navigateToNextGame = () => {
    navigation.navigate("Home", { uid: uid });
  };

  const sortedUsers = [...users].sort((a, b) => a.levelTime - b.levelTime);
  return (
    <ImageBackground
      source={login_bg}
      resizeMode="cover"
      style={styles.container}
    >
      <View style={styles.main_container}>
        <View style={styles.wincon}>
          <Image
            style={styles.wincel_above}
            source={require("../../assets/images/wins.png")}
          />
          <View style={styles.wincel_box}>
            <FontAwesome
              name="check-circle-o"
              size={120}
              color="#008000"
              style={styles.winsim}
            />
          </View>
          <Text style={styles.complete}>Completed {level.substr(-6)}
          </Text>
          <View style={styles.imagetext}>
                  <Entypo name="stopwatch" size={24} color="#003090" />
                  <Text style={styles.timeText}>
        {" "}
        {users.length > 0 &&
          formatTime(users.find((user) => user.uid === uid)?.levelTime)}
      </Text>
                </View>
          <View style={styles.buttonsContainer}>
          <SoundButton
          soundPath={require('../../src/sound.mp3')}
      onPress={() => navigation.navigate(level, { uid })}
      style={styles.button}
    >
      <Foundation name="refresh" size={24} color="#003090" />
    </SoundButton>
    {level !== "game3level5" && (
  <SoundButton
    onPress={navigateToNextLevel}
    style={styles.button}
    textStyle={styles.buttonText}
    title="Next Level"
    soundPath={require('../../src/sound.mp3')} 
  />
)}
{level === "game3level5" && (
  <SoundButton
    onPress={navigateToNextGame}
    style={styles.button}
    textStyle={styles.buttonText}
    title="Next Game"
    soundPath={require('../../src/sound.mp3')} 
  />
)}
          </View>
        </View>
        <View style={styles.scorelist}>
          <Text style={styles.scorehead}>Scoreboard</Text>
          <FlatList
            data={sortedUsers}
            keyExtractor={(item) => item.uid}
            renderItem={({ item, index }) => (
              <View
                style={[
                  styles.itemContainer,
                  item.uid === uid && styles.highlightedItem,
                ]}
              >
                <View style={styles.imagetext}>
                  {index < 3 ? (
                    <Image source={imageSources[index]} style={styles.icon} />
                  ) : (
                    <Text style={styles.serialNumber}>{index + 1}</Text>
                  )}

                  <Text style={styles.itemText}>{`${item.name}`}</Text>
                </View>
                <View style={styles.imagetext}>
                  <Entypo name="stopwatch" size={24} color="#003090" />
                  <Text style={styles.itemText}>{`${formatTime(
                    item.levelTime
                  )}`}</Text>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default NextPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  belowhead: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },
  wincel: {
    width: 50,
    height: 50,
  },
  main_container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  wincon: {
    backgroundColor: "#fff",
    padding: 20,
    width: 300,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    position: "relative",
    overflow: "hidden",
  },
  wincel_above: {
    width: 250,
    position: "absolute",
    top: -40,
    objectFit: "contain",
  },
  winsim: {
    zIndex: 2,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    gap: 10,
  },
  button: {
    backgroundColor: "#3B66CF",
    borderRadius: 5,
    padding: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    backgroundColor: "#D7E0F5",
    borderWidth: 2,
    borderColor: "#2862dec9",
    padding: 5,
    justifyContent: "space-between",
    borderRadius: 7,
  },

  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  serialNumber: {
    marginRight: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  itemText: {
    fontSize: 16,
  },
  scorelist: {
    backgroundColor: "#fff",
    padding: 20,
    width: 350,
    borderRadius: 10,
    marginLeft: 10,
  },
  scorehead: {
    color: "#003090",
    fontSize: 18,
    fontWeight: "700",
  },
  imagetext: {
    flexDirection: "row",
    gap: 10,
  },
  highlightedItem: {
    borderWidth: 4,
  },
  complete:{
    color:'#003090',
    fontSize:26,
    marginVertical:10,
    textTransform:'capitalize',
  },
});
