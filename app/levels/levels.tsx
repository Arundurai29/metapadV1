import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  ImageBackground,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Image,
  Text,
  TouchableOpacity,
  Platform,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { ref, get, child } from "firebase/database";
import { DATABASE } from "../../FireBaseConfig";
import { useFonts } from "expo-font";
import { useRoute, RouteProp } from "@react-navigation/native";
import * as ScreenOrientation from "expo-screen-orientation";
import { StatusBar } from 'expo-status-bar';

const doctor1 = require("../../assets/images/doctor1.png");
const doctor2 = require("../../assets/images/doctor2.png");
const login_bg = require("../../src/imgpanda.png");

type RootStackParamList = {
  Home: { uid?: string };
};

type HomeScreenRouteProp = RouteProp<RootStackParamList, "Home">;

const Levels: React.FC<{
  route: HomeScreenRouteProp;
}> = ({ route }) => {
  const navigation = useNavigation();
  const { uid } = route.params ?? {};
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [isFocused, setFocused] = useState(false);
  const [isFocusedd, setFocusedd] = useState(false);
  const [isFocuse, setFocuse] = useState(false);
  const [isFocus, setFocus] = useState(false);
  const [isLoaded] = useFonts({
    "pop-mid": require("../../assets/fonts/Poppins-Medium.ttf"),
    "pop-reg": require("../../assets/fonts/Poppins-Regular.ttf"),
    "pop-bold": require("../../assets/fonts/Poppins-Bold.ttf"),
    "pop-xbold": require("../../assets/fonts/Poppins-ExtraBold.ttf"),
  });

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

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const navigateToLevels = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE
    );
    navigation.navigate("Home", { uid: uid });
  };

  const level1Complete = userData.level1 === "start" && userData.level1 === "completed";
  const level2Complete =  userData.level1 === "completed";
  const level3Complete =  userData.level2 === "completed";

  return (
    <ScrollView>
      <StatusBar hidden={true} translucent={true} />
      <ImageBackground
        source={login_bg}
        resizeMode="cover"
        style={styles.container}
      >
        <TouchableOpacity
          style={styles.arrowButton}
          onPress={navigateToLevels}
        >
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.titles}>
          <Text style={styles.head}>Glycogen Metabolism Puzzle</Text>
        </View>
        <View style={styles.level_section}>
          <Image source={doctor1} style={styles.doctor_img} />
          <View style={styles.levels}>
            <TouchableOpacity
              style={[
                styles.puzzleBtns,
                styles.boxShadow,
              
              ]}
              onPress={() => navigation.navigate("Level", { uid: uid, level: "level1" })}
              disabled={level1Complete}
            >
              <View style={styles.playBtns}>
                <View>
                  <Text style={styles.pBtnHead}>Level 1</Text>
                </View>
                <View style={styles.playBtn}>
                  <AntDesign name="caretright" size={15} color="#fff" />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.puzzleBtns,
                styles.boxShadow,
                !level2Complete && styles.disabledButton,
              ]}
              onPress={() => navigation.navigate("Level", { uid: uid, level: "level2"})}
              disabled={!level2Complete}
            >
              <View style={styles.playBtns}>
                <View>
                  <Text style={styles.pBtnHead}>Level 2</Text>
                </View>
                <View style={styles.playBtn}>
                  <AntDesign name="caretright" size={15} color="#fff" />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.puzzleBtns,
                styles.boxShadow,
                !level3Complete && styles.disabledButton,
              ]}
              onPress={() => navigation.navigate("Level", { uid: uid, level: "level3"})}
              disabled={!level3Complete}
            >
              <View style={styles.playBtns}>
                <View>
                  <Text style={styles.pBtnHead}>Level 3</Text>
                </View>
                <View style={styles.playBtn}>
                  <AntDesign name="caretright" size={15} color="#fff" />
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <Image source={doctor2} style={styles.doctor_img} />
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  ScrollView: {
    backgroundColor: "#fff",
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  level_section: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  Button: {
    padding: 20,
    borderRadius: 10,
    marginTop: 30,
  },
  input: {
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    backgroundColor: "#EEF4FF",
    color: "#000",
    textAlign: "left",
    fontSize: 16,
    fontFamily: "pop-reg",
    fontWeight: "500",
  },
  login: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 20,
    fontFamily: "pop-bold",
    textAlign: "center",
  },
  Logos: {
    alignItems: "center",
  },
  Logo: {
    justifyContent: "center",
    alignItems: "center",
    width: 250,
    height: 70,
    objectFit: "contain",
  },
  titles: {
    marginTop: 20,
    textAlign: "center",
  },
  head: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "pop-bold",
    fontSize: 40,
    fontWeight: "800",
    marginBottom: 15,
  },
  belowhead: {
    color: "#000",
    textAlign: "center",
    fontFamily: "pop-bold",
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 13,
  },
  mb30: {
    marginBottom: 30,
  },
  mb20: {
    marginBottom: 20,
  },
  forgot_con: {
    margin: 20,
    marginRight: 0,
  },
  forgot: {
    textAlign: "right",
    color: "#002693",
    fontSize: 16,
    fontFamily: "pop-bold",
  },

  new: {
    textAlign: "center",
    marginTop: 20,
    fontFamily: "pop-bold",
    fontSize: 16,
  },
  subheading: {
    color: "#003090",
    textAlign: "center",
    fontSize: 18,
    fontFamily: "pop-bold",
  },
  puzzleBtn: {
    width: 200,
    height: 120,
    borderRadius: 45 / 2,
    borderWidth: 6,
    borderColor: "#003090",
  },
  puzzleBtns: {
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#003090",
    paddingVertical: 10,
    marginTop: 10,
  },
  disabledButton: {
    opacity: 0.5,
  },
  boxShadow: {
    backgroundColor: "white",
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: "rgba(0, 0, 0, 0.3)",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  pb50: {
    paddingBottom: 50,
  },
  playBtn: {
    backgroundColor: "#003090",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 30,
    height: 30,

    borderRadius: 100,
  },
  whiteColor: { color: "#fff" },
  playBtns: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 0,
    flex: 1,
    gap: 100,
  },
  puzzleHead: {
    fontSize: 20,
    fontFamily: "pop-bold",
    color: "#003090",
  },
  pBtnHead: {
    fontFamily: "pop-reg",
  },
  levels: {
    width: "40%",
  },
  doctor_img: {
    width: "30%",
    height: 200,
    transform: [{ rotate: "-90deg" }],
    objectFit: "contain",
  },
  arrowButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 999,
    backgroundColor:'#fff',
    padding:10,
    borderRadius:10,
  },
});

export default Levels;
