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
import SoundButton from "../screens/SoundButton";
import { AntDesign } from "@expo/vector-icons";
import { DATABASE } from "../../FireBaseConfig";
import Draggable2 from "../draggable/draggable2";
import * as ScreenOrientation from "expo-screen-orientation";
import { StatusBar } from 'expo-status-bar';

const glass = require("../../assets/images/glass.png");
const backgroundImage = require("../../src/imgpanda.png");
const imageSources = [
  require("../../src/puzzle1-5/image1.png"),
  require("../../src/puzzle1-5/image2.png"),
  require("../../src/puzzle1-5/image3.png"),
  require("../../src/puzzle1-5/image4.png"),
  require("../../src/puzzle1-5/image5.png"),
  require("../../src/puzzle1-5/image6.png"),
  require("../../src/puzzle1-5/image7.png"),
  require("../../src/puzzle1-5/image8.png"),
  require("../../src/puzzle1-5/image9.png"),
  require("../../src/puzzle1-5/image10.png"),
  require("../../src/puzzle1-5/image11.png"),
  require("../../src/puzzle1-5/image12.png"),
  require("../../src/puzzle1-5/image13.png"),
  require("../../src/puzzle1-5/image14.png"),
  require("../../src/puzzle1-5/image15.png"),
  require("../../src/puzzle1-5/image16.png"),
  require("../../src/puzzle1-5/image17.png"),
  require("../../src/puzzle1-5/image18.png"),
  require("../../src/puzzle1-5/image19.png"),
  require("../../src/puzzle1-5/image20.png"),
  require("../../src/puzzle1-5/image21.png"),
  require("../../src/puzzle1-5/image22.png"),
  require("../../src/puzzle1-5/image23.png"),
  require("../../src/puzzle1-5/image24.png"),
  require("../../src/puzzle1-5/image25.png"),
  require("../../src/puzzle1-5/image26.png"),
  require("../../src/puzzle1-5/image27.png"),
  require("../../src/puzzle1-5/image28.png"),
  require("../../src/puzzle1-5/image29.png"),
  require("../../src/puzzle1-5/image30.png"),
  require("../../src/puzzle1-5/image31.png"),
  require("../../src/puzzle1-5/image32.png"),
  require("../../src/puzzle1-5/image33.png"),
  require("../../src/puzzle1-5/image34.png"),
  require("../../src/puzzle1-5/image35.png"),
  require("../../src/puzzle1-5/image36.png"),
  require("../../src/puzzle1-5/image37.png"),
  require("../../src/puzzle1-5/image38.png"),
  require("../../src/puzzle1-5/image39.png"),
  require("../../src/puzzle1-5/image40.png"),
  require("../../src/puzzle1-5/image41.png"),
  require("../../src/puzzle1-5/image42.png"),
  require("../../src/puzzle1-5/image43.png"),
  require("../../src/puzzle1-5/image44.png"),
  require("../../src/puzzle1-5/image45.png"),
  require("../../src/puzzle1-5/image46.png"),
  require("../../src/puzzle1-5/image47.png"),
  require("../../src/puzzle1-5/image48.png"),
  require("../../src/puzzle1-5/image49.png"),
  require("../../src/puzzle1-5/image50.png"),
  require("../../src/puzzle1-5/image51.png"),
  require("../../src/puzzle1-5/image52.png"),
  require("../../src/puzzle1-5/image53.png"),
  require("../../src/puzzle1-5/image54.png"),
  require("../../src/puzzle1-5/image55.png"),
  require("../../src/puzzle1-5/image56.png"),
  require("../../src/puzzle1-5/image57.png"),
  require("../../src/puzzle1-5/image58.png"),
  require("../../src/puzzle1-5/image59.png"),
  require("../../src/puzzle1-5/image60.png"),
  require("../../src/puzzle1-5/image61.png"),
  require("../../src/puzzle1-5/image62.png"),
  require("../../src/puzzle1-5/image63.png"),
  require("../../src/puzzle1-5/image64.png"),
  require("../../src/puzzle1-5/image65.png"),
  require("../../src/puzzle1-5/image66.png"),
  require("../../src/puzzle1-5/image67.png"),
  require("../../src/puzzle1-5/image68.png"),
  require("../../src/puzzle1-5/image69.png"),
  require("../../src/puzzle1-5/image70.png"),
  require("../../src/puzzle1-5/image71.png"),
  require("../../src/puzzle1-5/image72.png"),
  require("../../src/puzzle1-5/image73.png"),
  require("../../src/puzzle1-5/image74.png"),
  require("../../src/puzzle1-5/image75.png"),
  require("../../src/puzzle1-5/image76.png"),
  require("../../src/puzzle1-5/image77.png"),
  require("../../src/puzzle1-5/image78.png"),
  require("../../src/puzzle1-5/image79.png"),
  require("../../src/puzzle1-5/image80.png"),
  require("../../src/puzzle1-5/image81.png"),
  require("../../src/puzzle1-5/image82.png"),
  require("../../src/puzzle1-5/image83.png"),
  require("../../src/puzzle1-5/image84.png"),
  require("../../src/puzzle1-5/image85.png"),
  require("../../src/puzzle1-5/image86.png"),
  require("../../src/puzzle1-5/image87.png"),
  require("../../src/puzzle1-5/image88.png"),
  require("../../src/puzzle1-5/image89.png"),
  require("../../src/puzzle1-5/image90.png"),
  require("../../src/puzzle1-5/image91.png"),
  require("../../src/puzzle1-5/image92.png"),
  require("../../src/puzzle1-5/image93.png"),
  require("../../src/puzzle1-5/image94.png"),
  require("../../src/puzzle1-5/image95.png"),
  require("../../src/puzzle1-5/image96.png"),
  require("../../src/puzzle1-5/image97.png"),
  require("../../src/puzzle1-5/image98.png"),
];

const Level5 = ({ navigation, route }) => {
  const [completed, setCompleted] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { uid } = route.params ?? {};
  const [timer, setTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  
  const positions = useSharedValue(
    Object.assign(
      {},
      ...imageSources.map((item, index) => ({ [index]: index }))
    )
  );

  // useEffect(() => {
  //   const setScreenOrientation = async () => {
  //     await ScreenOrientation.lockAsync(
  //       ScreenOrientation.OrientationLock.PORTRAIT
  //     );
  //   };
  //   setScreenOrientation();
  // }, []);

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
    const allowedPositions = [0,1,2,5,6,7,8,9,10,11,12,13,14,15,20,21,22,23,24,25,26,27,28,29,30,31,37,38,39,41,56,70,83,84,85,89,93,97];
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
      const userTimingRef = ref(DATABASE, `users/${uid}/level5Time`);
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
    const allowedPositions = [0,1,2,5,6,7,8,9,10,11,12,13,14,15,20,21,22,23,24,25,26,27,28,29,30,31,37,38,39,41,56,70,83,84,85,89,93,97];
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
      set(ref(DATABASE, `users/${uid}/level5`), "completed");
      navigation.navigate("NextScreen",{ uid: uid ,  level: "level5"});
    } else {
      console.log("Not all images placed correctly");
    }
  };

  const navigateToPrices = () => {
    navigation.navigate("Level", { uid: uid,level: "level5" });
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
    // <ScrollView>
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
          <Draggable2
            key={index}
            positions={positions}
            id={index}
            gameStarted={gameStarted}  // Conditionally enable dragging
          >
            <Image source={source} style={styles.image} />
          </Draggable2>
        ))}
      </View>
      <StatusBar hidden={true} translucent={true} />
    </GestureHandlerRootView>
    // </ScrollView>
  );
};

export default Level5;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  wrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
   
     marginTop: 30,
     marginLeft:52,
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
    width: 40,
    height: 40,
    borderColor: "#000",
    borderWidth: 1,
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
