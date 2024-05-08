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
  Animated,
  ScrollView,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import * as ScreenOrientation from "expo-screen-orientation";
import { StatusBar } from 'expo-status-bar';


const doctor1 = require("../../assets/images/doctor3.png");
const doctor2 = require("../../assets/images/doctor4.png");
const login_bg = require("../../src/imgpanda.png");
const originalImage = require("../../assets/images/puzzle2.jpg");

type RootStackParamList = {
  Home: { uid?: string };
};

type HomeScreenRouteProp = RouteProp<RootStackParamList, "Home">;

const Game2level: React.FC<{
  route: HomeScreenRouteProp;
}> = ({ route }) => {
  const navigation = useNavigation();
  const { uid,level } = route.params ?? {};
  const [modalVisible, setModalVisible] = useState(false);
  const [hasShownPopup, setHasShownPopup] = useState(false);
  const scaleValue = useState(new Animated.Value(0))[0];

  useEffect(() => {
    const lockScreenOrientation = async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
      );
    };
    const unsubscribe = navigation.addListener("focus", lockScreenOrientation);
    openModal();
    return unsubscribe;
  }, [navigation]);
  
  const openModal = () => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setModalVisible(true);
  };

  const closeModal = () => {
    Animated.timing(scaleValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setTimeout(() => setModalVisible(false), 300);
  };

  const navigateToPrices = async () => {
    // await ScreenOrientation.lockAsync(
    //   ScreenOrientation.OrientationLock.PORTRAIT
    // );
    navigation.navigate("game2levels", { uid: uid });
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
              <TouchableOpacity onPress={openModal}>
                <Image style={styles.puzzleBtn} source={originalImage} />
              </TouchableOpacity>
            </View>
            <View style={styles.titles}>
              <Text style={styles.head}>Glycogen Metabolism</Text>
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
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPress={closeModal}
        >
          <Animated.View
            style={[styles.popup, { transform: [{ scale: scaleValue }] }]}
          >
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <AntDesign name="close" size={24} color="#fff" />
            </TouchableOpacity>
            <Image style={styles.modalImage} source={originalImage} />
            <TouchableOpacity
              style={styles.viewmore}
              onPress={() => navigation.navigate("MetaBites1", { uid: uid,level })}
            >
              <Text style={styles.view}>View More</Text>
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      </Modal>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingTop: 50,
    paddingBottom:60,
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
    objectFit: "contain",
    borderColor: "#003090",
    backgroundColor:'#fff',
  },
  puzzleBtns: {
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#003090",
    paddingVertical: 10,
    marginTop: 10,
    width: "auto",
  },
  viewmore: {
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#003090",
    paddingVertical: 5,
    paddingHorizontal: 12,
    marginTop: 10,
    width: "auto",
  },
  view: {
    color: "#fff",
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
  pBtnHead: {
    color: "#fff",
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
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    // backgroundColor: "#fff",
    borderRadius: 10,
    padding: 0,

    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: -40,

    zIndex: 1,
  },
  modalImage: {
    width: 600,
    height: 300,
    marginTop: -40,
    objectFit: "contain",
  },
});
export default Game2level;
