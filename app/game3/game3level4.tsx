// Level2.js
import React, { useEffect, useState, useMemo } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  Button,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSharedValue } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { ref, get, set } from "firebase/database";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { DATABASE } from "../../FireBaseConfig";
import Draggable from "../draggable/draggable2-2";
import * as ScreenOrientation from "expo-screen-orientation";
import { StatusBar } from 'expo-status-bar';
import { MARGIN, SIZE,SIZE2 } from '../utils/utils1';
import SoundButton from "../screens/SoundButton";

const glass = require("../../assets/images/glass.png");
const backgroundImage = require("../../src/imgpanda.png");
const imageSources = [
  require("../../src/puzzle3-4/image1.jpg"),
  require("../../src/puzzle3-4/image2.jpg"),
  require("../../src/puzzle3-4/image3.jpg"),
  require("../../src/puzzle3-4/image4.jpg"),
  require("../../src/puzzle3-4/image5.jpg"),
  require("../../src/puzzle3-4/image6.jpg"),
  require("../../src/puzzle3-4/image7.jpg"),
  require("../../src/puzzle3-4/image8.jpg"),
  require("../../src/puzzle3-4/image9.jpg"),
  require("../../src/puzzle3-4/image10.jpg"),
  require("../../src/puzzle3-4/image11.jpg"),
  require("../../src/puzzle3-4/image12.jpg"),
  require("../../src/puzzle3-4/image13.jpg"),
  require("../../src/puzzle3-4/image14.jpg"),
  require("../../src/puzzle3-4/image15.jpg"),
  require("../../src/puzzle3-4/image16.jpg"),
  require("../../src/puzzle3-4/image17.jpg"),
  require("../../src/puzzle3-4/image18.jpg"),
  require("../../src/puzzle3-4/image19.jpg"),
  require("../../src/puzzle3-4/image20.jpg"),
  require("../../src/puzzle3-4/image21.jpg"),
  require("../../src/puzzle3-4/image22.jpg"),
  require("../../src/puzzle3-4/image23.jpg"),
  require("../../src/puzzle3-4/image24.jpg"),
  require("../../src/puzzle3-4/image25.jpg"),
  require("../../src/puzzle3-4/image26.jpg"),
  require("../../src/puzzle3-4/image27.jpg"),
  require("../../src/puzzle3-4/image28.jpg"),
  require("../../src/puzzle3-4/image29.jpg"),
  require("../../src/puzzle3-4/image30.jpg"),
  require("../../src/puzzle3-4/image31.jpg"),
  require("../../src/puzzle3-4/image32.jpg"),
  require("../../src/puzzle3-4/image33.jpg"),
  require("../../src/puzzle3-4/image34.jpg"),
  require("../../src/puzzle3-4/image35.jpg"),
  require("../../src/puzzle3-4/image36.jpg"),
  require("../../src/puzzle3-4/image37.jpg"),
  require("../../src/puzzle3-4/image38.jpg"),
  require("../../src/puzzle3-4/image39.jpg"),
  require("../../src/puzzle3-4/image40.jpg"),
  require("../../src/puzzle3-4/image41.jpg"),
  require("../../src/puzzle3-4/image42.jpg"),
  require("../../src/puzzle3-4/image43.jpg"),
  require("../../src/puzzle3-4/image44.jpg"),
  require("../../src/puzzle3-4/image45.jpg"),
  require("../../src/puzzle3-4/image46.jpg"),
  require("../../src/puzzle3-4/image47.jpg"),
  require("../../src/puzzle3-4/image48.jpg"),
  require("../../src/puzzle3-4/image49.jpg"),
  require("../../src/puzzle3-4/image50.jpg"),
  require("../../src/puzzle3-4/image51.jpg"),
  require("../../src/puzzle3-4/image52.jpg"),
  require("../../src/puzzle3-4/image53.jpg"),
  require("../../src/puzzle3-4/image54.jpg"),
  require("../../src/puzzle3-4/image55.jpg"),
  require("../../src/puzzle3-4/image56.jpg"),
  require("../../src/puzzle3-4/image57.jpg"),
  require("../../src/puzzle3-4/image58.jpg"),
  require("../../src/puzzle3-4/image59.jpg"),
  require("../../src/puzzle3-4/image60.jpg"),

];

const Game3Level4 = ({ navigation, route }) => {
  const [completed, setCompleted] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { uid } = route.params ?? {};
  const [timer, setTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameStarted, setGameStarted] = useState(false); // New state variable

  const positions = useSharedValue(
    Object.assign(
      {},
      ...imageSources.map((item, index) => ({ [index]: index }))
    )
  );

  // Lock screen orientation to landscape when screen gains focus
  useEffect(() => {
    const lockScreenOrientation = async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
      );
    };
    const unsubscribe = navigation.addListener("focus", lockScreenOrientation);

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const resetTimerAndShuffleImages = () => {
      setTimer(0);
      shuffleImages();
    };

    const unsubscribe = navigation.addListener('focus', resetTimerAndShuffleImages);

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (uid) {
      const userRef = ref(DATABASE, `users/${uid}`);
      get(userRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            setUserData(snapshot.val());
          } else {
            console.log("User data not found");
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [uid]);

  const shuffleImages = () => {
    const shuffledPositions = Object.values(positions.value).sort(
      () => Math.random() - 0.5
    );
    positions.value = Object.assign(
      {},
      ...shuffledPositions.map((item, index) => ({ [index]: item }))
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying) {
        setTimer((prevTimer) => prevTimer + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    checkCompletion();
  }, [positions]);

  const checkCompletion = () => {
    const currentPositions = Object.values(positions.value).sort(
      (a, b) => a - b
    );
    const originalOrder = [...Array(imageSources.length).keys()];
    const allowedPositions = [0, 1, 11,23,31,59];
    const isComplete = currentPositions.every((value, index) => {
      return allowedPositions.includes(index) || value === originalOrder[index];
    });

    setCompleted(isComplete);

    if (isComplete) {
      saveTimingToDatabase(timer);
    }
  };

  const saveTimingToDatabase = (timing) => {
    if (uid) {
      const userTimingRef = ref(DATABASE, `users/${uid}/game3level2Time`);
      set(userTimingRef, timing)
        .then(() => console.log("Gameplay timing saved successfully"))
        .catch((error) =>
          console.error("Error saving gameplay timing:", error)
        );
    }
  };

  const handleStartFinishButton = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      setGameStarted(true); // Update gameStarted state when Start button is clicked
    } else {
      checkPosition();
    }
  };

  const checkPosition = () => {
    const allowedPositions = [0, 1, 11,23,31,59];
    let allPlaced = true;

    for (let i = 0; i < imageSources.length; i++) {
      if (!allowedPositions.includes(i) && positions.value[i] !== i) {
        allPlaced = false;
        break;
      }
    }

    if (allPlaced) {
      console.log("All images placed correctly");
      saveTimingToDatabase(timer);
      set(ref(DATABASE, `users/${uid}/game3level4`), "completed");
      navigation.navigate("NextLevelScreen3",{ uid: uid ,  level: "game3level4"});
    } else {
      console.log("Not all images placed correctly");
    }
  };

  const navigateToPrices = () => {
    navigation.navigate("game3level", { uid: uid,level: "game3level4" });
  };

  const memoizedUserData = useMemo(() => userData?.name || "", [userData]);

  // Function to format timer into hours, minutes, seconds
  const formatTimer = () => {
    const hours = Math.floor(timer / 3600);
    const minutes = Math.floor((timer % 3600) / 60);
    const seconds = timer % 60;
    return `${hours < 10 ? "0" + hours : hours}:${
      minutes < 10 ? "0" + minutes : minutes
    }:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  return (
    <GestureHandlerRootView style={styles.container}>
     <SoundButton
        soundPath={require('../../src/sound.mp3')}
        onPress={navigateToPrices}
        style={styles.arrowButton}
      >
        <AntDesign name="arrowleft" size={24} color="black" />
      </SoundButton>
      <Image source={backgroundImage} style={styles.backgroundImage} />
      <View style={styles.buttonContainer}>
        <LinearGradient
          start={{ x: 0, y: 0.2 }}
          colors={["#003090", "#3B66CF"]}
          end={{ x: 1, y: 2 }}
          style={styles.timer_container}
        >
          <Text style={styles.timer}>
            {" "}
            <Entypo name="stopwatch" size={24} color="#fff" /> {formatTimer()}
          </Text>
        </LinearGradient>
      </View>
      <View style={styles.btnContainer} >
        <LinearGradient
          start={{ x: 0, y: 0.2 }}
          colors={["#003090", "#3B66CF"]}
          end={{ x: 1, y: 2 }}
          style={styles.btnbac}
        >
          {isPlaying && (
        <SoundButton
          soundPath={require('../../src/sound.mp3')}
          onPress={handleStartFinishButton}
          style={styles.Button}
        >
          <Text style={styles.btn_text}>Finish</Text>
        </SoundButton>
      )}
      {!isPlaying && (
        <SoundButton
          soundPath={require('../../src/sound.mp3')}
          onPress={handleStartFinishButton}
          style={styles.Button}
        >
          <Text style={styles.btn_text}>Start</Text>
        </SoundButton>
      )}
        </LinearGradient>
      </View>
      <View style={styles.wrapper}>
        {imageSources.map((source, index) => (
          <Draggable
            key={index}
            positions={positions} 
            id={index}
            gameStarted={gameStarted} 
          >
            <Image source={source} style={styles.image} />
          </Draggable>
        ))}
      </View>
      <StatusBar hidden={true} translucent={true} />
    </GestureHandlerRootView>
  );
};

export default Game3Level4;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  wrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    // padding: 16,
     marginTop: 13,
     marginLeft:75,
     backgroundColor:'#000'
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  image: {
    width: 57,
    height: 70,
    borderColor: "#000",
    borderWidth: 0.3,
    padding:0,
    objectFit:'fill',
    marginBottom:-20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    position: "absolute",
    right: 15,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    position: "absolute",
    right: 15,
    bottom:20,
  },
btn_text:{
  fontSize: 18,
  color:'#fff',
},
  timer: {
    color: "white",
    fontSize: 18,
  },
  Button: {
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    color:'#fff',
  },
  timer_container: {
    padding: 10,
    borderRadius: 20,

  },
  btnbac:{
    paddingHorizontal:10,
    margin:0,
    borderRadius: 20,
    alignItems:'center',

  },
  arrowButton: {
    position: "absolute",
    top: 20,
    left: 15,
    zIndex: 999,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
  },
});
