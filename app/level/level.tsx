import React, { useEffect } from "react";
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
import { AntDesign } from "@expo/vector-icons";
import * as ScreenOrientation from "expo-screen-orientation";
import { StatusBar } from 'expo-status-bar';


const doctor1 = require("../../assets/images/doctor3.png");
const doctor2 = require("../../assets/images/doctor4.png");
const login_bg = require("../../src/imgpanda.png");

type RootStackParamList = {
  Home: { uid?: string };
};

type HomeScreenRouteProp = RouteProp<RootStackParamList, "Home">;

const Level: React.FC<{
  route: HomeScreenRouteProp;
}> = ({ route }) => {
  const navigation = useNavigation();
  const { uid,level } = route.params ?? {};

  useEffect(() => {
    const lockScreenOrientation = async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
      );
    };
    const unsubscribe = navigation.addListener("focus", lockScreenOrientation);

    return unsubscribe;
  }, [navigation]);

  

  const navigateToPrices = async () => {
    // await ScreenOrientation.lockAsync(
    //   ScreenOrientation.OrientationLock.PORTRAIT
    // );
    navigation.navigate("Levels", { uid: uid });
  };

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
          onPress={navigateToPrices}
        >
          <AntDesign name="arrowleft" size={24} color="#003090" />
        </TouchableOpacity>
        <View style={styles.level_section}>
          <Image source={doctor1} style={styles.doctor_img} />
          <View style={styles.levels}>
            <View>
              <Text style={styles.level}>{level}</Text>
              <Image
                style={styles.puzzleBtn}
                source={require("../../assets/images/originalImage.png")}
              />
            </View>
            <View style={styles.titles}>
              <Text style={styles.head}>Glycogen Metabolism Puzzle</Text>
            </View>
            <TouchableOpacity
              style={styles.puzzleBtns}
              onPress={() => navigation.navigate(level, { uid: uid })}
            >
              <View style={styles.playBtns}>
                <View>
                  <Text style={styles.pBtnHead}>Start To Play</Text>
                </View>
                <AntDesign name="caretright" size={15} color="#fff" />
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
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingTop:70,
  },
  level_section: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  titles: {
    marginTop: 20,
    textAlign: "center",
  },
  head: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "pop-bold",
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 15,
  },
  puzzleBtn: {
    width: "100%",
    height: 150,
    borderRadius: 45 / 2,
    borderWidth: 6,
    objectFit: "cover",
    borderColor: "#003090",
  },
  puzzleBtns: {
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#003090",
    paddingVertical: 10,
    marginTop: 10,
    width: "auto",
  },
  pb50: {
    paddingBottom: 50,
  },
  playBtns: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 0,
    flex: 1,
    gap: 100,
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
  pBtnHead:{
    color:'#fff',
  },
  level: {
    position: "absolute",
    backgroundColor: "#003090",
    color: "#fff",
    padding: 5,
    borderRadius: 8,
    zIndex: 3,
    marginLeft: "30%",
    marginTop: -10,
    textAlign: "center",
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

export default Level;
