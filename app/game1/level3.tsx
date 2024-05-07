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
import Draggable2 from "../draggable/draggable2";
import * as ScreenOrientation from "expo-screen-orientation";
import { StatusBar } from 'expo-status-bar';

const glass = require("../../assets/images/glass.png");
const backgroundImage = require("../../src/imgpanda.png");
const imageSources = [
  require("../../src/puzzle1-3/image1.png"),
  require("../../src/puzzle1-3/image2.png"),
  require("../../src/puzzle1-3/image3.png"),
  require("../../src/puzzle1-3/image4.png"),
  require("../../src/puzzle1-3/image5.png"),
  require("../../src/puzzle1-3/image6.png"),
  require("../../src/puzzle1-3/image7.png"),
  require("../../src/puzzle1-3/image8.png"),
  require("../../src/puzzle1-3/image9.png"),
  require("../../src/puzzle1-3/image10.png"),
  require("../../src/puzzle1-3/image11.png"),
  require("../../src/puzzle1-3/image12.png"),
  require("../../src/puzzle1-3/image13.png"),
  require("../../src/puzzle1-3/image14.png"),
  require("../../src/puzzle1-3/image15.png"),
  require("../../src/puzzle1-3/image16.png"),
  require("../../src/puzzle1-3/image17.png"),
  require("../../src/puzzle1-3/image18.png"),
  require("../../src/puzzle1-3/image19.png"),
  require("../../src/puzzle1-3/image20.png"),
  require("../../src/puzzle1-3/image21.png"),
  require("../../src/puzzle1-3/image22.png"),
  require("../../src/puzzle1-3/image23.png"),
  require("../../src/puzzle1-3/image24.png"),
  require("../../src/puzzle1-3/image25.png"),
  require("../../src/puzzle1-3/image26.png"),
  require("../../src/puzzle1-3/image27.png"),
  require("../../src/puzzle1-3/image28.png"),
  require("../../src/puzzle1-3/image29.png"),
  require("../../src/puzzle1-3/image30.png"),
  require("../../src/puzzle1-3/image31.png"),
  require("../../src/puzzle1-3/image32.png"),
  require("../../src/puzzle1-3/image33.png"),
  require("../../src/puzzle1-3/image34.png"),
  require("../../src/puzzle1-3/image35.png"),
  require("../../src/puzzle1-3/image36.png"),
  require("../../src/puzzle1-3/image37.png"),
  require("../../src/puzzle1-3/image38.png"),
  require("../../src/puzzle1-3/image39.png"),
  require("../../src/puzzle1-3/image40.png"),
  require("../../src/puzzle1-3/image41.png"),
  require("../../src/puzzle1-3/image42.png"),
  require("../../src/puzzle1-3/image43.png"),
  require("../../src/puzzle1-3/image44.png"),
  require("../../src/puzzle1-3/image45.png"),
  require("../../src/puzzle1-3/image46.png"),
  require("../../src/puzzle1-3/image47.png"),
  require("../../src/puzzle1-3/image48.png"),
  require("../../src/puzzle1-3/image49.png"),
  require("../../src/puzzle1-3/image50.png"),
  require("../../src/puzzle1-3/image51.png"),
  require("../../src/puzzle1-3/image52.png"),
  require("../../src/puzzle1-3/image53.png"),
  require("../../src/puzzle1-3/image54.png"),
  require("../../src/puzzle1-3/image55.png"),
  require("../../src/puzzle1-3/image56.png"),
  require("../../src/puzzle1-3/image57.png"),
  require("../../src/puzzle1-3/image58.png"),
  require("../../src/puzzle1-3/image59.png"),
  require("../../src/puzzle1-3/image60.png"),
  require("../../src/puzzle1-3/image61.png"),
  require("../../src/puzzle1-3/image62.png"),
  require("../../src/puzzle1-3/image63.png"),
  require("../../src/puzzle1-3/image64.png"),
  require("../../src/puzzle1-3/image65.png"),
  require("../../src/puzzle1-3/image66.png"),
  require("../../src/puzzle1-3/image67.png"),
  require("../../src/puzzle1-3/image68.png"),
  require("../../src/puzzle1-3/image69.png"),
  require("../../src/puzzle1-3/image70.png"),
  require("../../src/puzzle1-3/image71.png"),
  require("../../src/puzzle1-3/image72.png"),
  require("../../src/puzzle1-3/image73.png"),
  require("../../src/puzzle1-3/image74.png"),
  require("../../src/puzzle1-3/image75.png"),
  require("../../src/puzzle1-3/image76.png"),
  require("../../src/puzzle1-3/image77.png"),
  require("../../src/puzzle1-3/image78.png"),
  require("../../src/puzzle1-3/image79.png"),
  require("../../src/puzzle1-3/image80.png"),
  require("../../src/puzzle1-3/image81.png"),
  require("../../src/puzzle1-3/image82.png"),
  require("../../src/puzzle1-3/image83.png"),
  require("../../src/puzzle1-3/image84.png"),
  require("../../src/puzzle1-3/image85.png"),
  require("../../src/puzzle1-3/image86.png"),
  require("../../src/puzzle1-3/image87.png"),
  require("../../src/puzzle1-3/image88.png"),
  require("../../src/puzzle1-3/image89.png"),
  require("../../src/puzzle1-3/image90.png"),
  require("../../src/puzzle1-3/image91.png"),
  require("../../src/puzzle1-3/image92.png"),
  require("../../src/puzzle1-3/image93.png"),
  require("../../src/puzzle1-3/image94.png"),
  require("../../src/puzzle1-3/image95.png"),
  require("../../src/puzzle1-3/image96.png"),
  require("../../src/puzzle1-3/image97.png"),
  require("../../src/puzzle1-3/image98.png"),
];

const Level3 = ({ navigation, route }) => {
  const [completed, setCompleted] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { uid } = route.params ?? {};
  const [timer, setTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
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

  useEffect(() => {
    const shuffledPositions = Object.values(positions.value).sort(
      () => Math.random() - 0.5
    );
    positions.value = Object.assign(
      {},
      ...shuffledPositions.map((item, index) => ({ [index]: item }))
    );
  }, []);

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
    const isComplete =
      JSON.stringify(currentPositions) === JSON.stringify(originalOrder);
    setCompleted(isComplete);

    if (isComplete) {
      saveTimingToDatabase(timer);
    }
  };

  const saveTimingToDatabase = (timing) => {
    if (uid) {
      const userTimingRef = ref(DATABASE, `users/${uid}/level1Time`);
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
    } else {
      checkPosition();
    }
  };

  const checkPosition = () => {
    let allPlaced = true;

    for (let i = 0; i < imageSources.length; i++) {
      if (positions.value[i] !== i) {
        allPlaced = false;
        break;
      }
    }

    if (allPlaced) {
      console.log("All images placed correctly");
      saveTimingToDatabase(timer);
      set(ref(DATABASE, `users/${uid}/level1`), "completed");
      navigation.navigate("NextScreen",{ uid: uid ,  level: "level1"});
    } else {
      console.log("Not all images placed correctly");
    }
  };

  const navigateToPrices = () => {
    navigation.navigate("Level", { uid: uid,level: "level1" });
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
      <TouchableOpacity style={styles.arrowButton} onPress={navigateToPrices}>
        <AntDesign name="arrowleft" size={24} color="#003090" />
      </TouchableOpacity>
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
            <TouchableOpacity
              style={styles.Button}
              onPress={handleStartFinishButton}
            >
              <Text style={styles.btn_text}>Finish</Text>
            </TouchableOpacity>
          )}
          {!isPlaying && (
            <TouchableOpacity
              style={styles.Button}
              onPress={handleStartFinishButton}
            >
              <Text style={styles.btn_text}>Start</Text>
            </TouchableOpacity>
          )}
        </LinearGradient>
      </View>
      <View style={styles.wrapper}>
        {imageSources.map((source, index) => (
          <Draggable2
            key={index}
            positions={positions}
            id={index}
            draggable={isPlaying} // Conditionally enable dragging
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

export default Level3;


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
