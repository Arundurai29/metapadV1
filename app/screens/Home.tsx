import React, { useState, useEffect,useCallback } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  ActivityIndicator,
  Image,
  BackHandler,
  Platform,
  Text,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { ref, get } from 'firebase/database';
import { DATABASE } from '../../FireBaseConfig';
import { useFonts } from "expo-font";
import { AntDesign } from "@expo/vector-icons";
import { RouteProp } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SoundButton from "./SoundButton";
import TimeSpentDisplay from "./Timespent";
import MenuExample from "./menu";

const logo = require("../../assets/images/metapad.png");
const login_bg = require("../../assets/images/login-bg.png");

export default function HomeScreen() {
  const navigation = useNavigation();
  const [uid, setUserId] = useState(null);
  const [userData, setUserData] = useState<any>(null);


  useEffect(() => {
    const signInAnonymously = async () => {
      try {
        const userCredential = await AUTH.signInAnonymously();
        const user = userCredential.user;
        await AsyncStorage.setItem('uid', user.uid);
        setUserId(user.uid);
        setLoading(false);
      } catch (error) {
        console.error('Error signing in anonymously:', error);
        setLoading(false);
      }
    };

    const getUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('uid');
        if (storedUserId) {
          setUserId(storedUserId);
        } else {
          signInAnonymously();
        }
      } catch (error) {
        console.error('Error retrieving user ID:', error);
        signInAnonymously();
      }
    };

    getUserId();
  }, []);

 
  
  const [isLoaded] = useFonts({
    "pop-mid": require("../../assets/fonts/Poppins-Medium.ttf"),
    "pop-reg": require("../../assets/fonts/Poppins-Regular.ttf"),
    "pop-bold": require("../../assets/fonts/Poppins-Bold.ttf"),
    "pop-xbold": require("../../assets/fonts/Poppins-ExtraBold.ttf"),
  });

  useEffect(() => {
    async function changeScreenOrientation() {
      try {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
      } catch (error) {
        console.error('Error locking screen orientation:', error);
      }
    }
  
    changeScreenOrientation();
  
    return () => {
      async function unlockScreenOrientation() {
        try {
          await ScreenOrientation.unlockAsync();
        } catch (error) {
          console.error('Error unlocking screen orientation:', error);
        }
      }
  
      unlockScreenOrientation();
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
            console.log('User data not found');
          }
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [uid]);

  useFocusEffect(useCallback(() => {
    const onBackPress = () => {
      // Minimize the app
      if (Platform.OS === 'android') {
        BackHandler.exitApp();
        return true;
      } else if (Platform.OS === 'ios') {
        // This approach doesn't actually minimize the app on iOS, but it prevents the default back navigation
        return true;
      }
      return false;
    };

    // Add event listener for hardware back press
    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);

    // Clean up the event listener
    return () => backHandler.remove();
  }, []));


  if (!isLoaded) {
    // Font is still loading
    return <ActivityIndicator />;
  }

  const navigateToMenu = () => {
    navigation.navigate("Menu");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
    <StatusBar hidden={true} translucent={true} />
    <TouchableOpacity onPress={navigateToMenu} style={styles.menuButton}>
        <AntDesign name="menu-fold" size={28} color="#fff" />
      </TouchableOpacity>
    <ImageBackground
      source={login_bg}
      resizeMode="cover"
      style={styles.imageBackground}
    >
      <View style={styles.logos}>
        <Image style={styles.logo} source={logo} />
      </View>
      <View style={styles.titles}>
        <Text style={styles.head}>Welcome</Text>
        {userData && (
          <View>
            <Text style={styles.belowhead}>{userData.name}</Text>
          </View>
        )}
        <Text style={[styles.subheading, styles.mb30]}>
          What would you Like to Play?
        </Text>
      </View>

      <View>
      <SoundButton
        soundPath={require('../../src/sound.mp3')} // Update with your sound file path
        onPress={() => navigation.navigate('Levels', { uid })}
        style={[styles.puzzleBtns, styles.boxShadow]}
      >
        <Text style={styles.puzzleHead}>Puzzle 1</Text>
        <Image
          style={styles.puzzleBtn}
          resizeMode="contain"
          source={require('../../assets/images/originalImage.jpg')}
        />
        <View style={styles.playBtns}>
          <View>
            <Text style={styles.pBtnHead}>Electron Transport Chain</Text>
          </View>
          <View style={styles.playBtn}>
            <AntDesign name="caretright" size={20} color="#fff" />
          </View>
        </View>
      </SoundButton>
      <SoundButton
        soundPath={require('../../src/sound.mp3')} // Update with your sound file path
        onPress={() => navigation.navigate('game2levels', { uid })}
        style={[styles.puzzleBtns, styles.boxShadow]}
      >
        <Text style={styles.puzzleHead}>Puzzle 2</Text>
        <Image
          style={styles.puzzleBtn}
          resizeMode="contain"
          source={require('../../assets/images/puzzle2.jpg')}
        />
        <View style={styles.playBtns}>
          <View>
            <Text style={styles.pBtnHead}>TCA Cycle</Text>
          </View>
          <View style={styles.playBtn}>
            <AntDesign name="caretright" size={20} color="#fff" />
          </View>
        </View>
      </SoundButton>

      <SoundButton
        soundPath={require('../../src/sound.mp3')} // Update with your sound file path
        onPress={() => navigation.navigate('game3levels', { uid })}
        style={[styles.puzzleBtns, styles.boxShadow]}
      >
        <Text style={styles.puzzleHead}>Puzzle 3</Text>
        <Image
          style={styles.puzzleBtn}
          resizeMode="contain"
          source={require('../../assets/images/puzzle3.jpg')}
        />
        <View style={styles.playBtns}>
          <View>
            <Text style={styles.pBtnHead}> Glycogen Metabolism</Text>
          </View>
          <View style={styles.playBtn}>
            <AntDesign name="caretright" size={20} color="#fff" />
          </View>
        </View>
      </SoundButton>

      <SoundButton
        soundPath={require('../../src/sound.mp3')} // Update with your sound file path
        onPress={() => navigation.navigate('game4levels', { uid })}
        style={[styles.puzzleBtns, styles.boxShadow]}
      >
        <Text style={styles.puzzleHead}>Puzzle 4</Text>
        <Image
          style={styles.puzzleBtn}
          resizeMode="contain"
          source={require('../../assets/images/puzzle4.jpg')}
        />
        <View style={styles.playBtns}>
          <View>
            <Text style={styles.pBtnHead}>Beta oxidation</Text>
          </View>
          <View style={styles.playBtn}>
            <AntDesign name="caretright" size={20} color="#fff" />
          </View>
        </View>
      </SoundButton>
      </View>
    </ImageBackground>
  </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
  },
  imageBackground: {
    flex: 1,
    padding: 30,
    paddingTop:40,
    justifyContent: "center",
  },
  logos: {
    alignItems: "flex-end",
  },
  logo: {
    justifyContent: "flex-end",
    alignItems: "center",
    width: 220,
    height: 70,
    resizeMode: "contain",
  },
  titles: {
    marginTop: 20,
    textAlign: "center",
  },
  head: {
    color: "#002693",
    textAlign: "center",
    fontFamily: "pop-bold",
    fontSize: 30,
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
    marginBottom: 20,
    backgroundColor: "#003090",
    paddingVertical: 20,
  },
  menuButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
    padding: 10,
    backgroundColor: "#003090",
    borderRadius: 5,
  },
  boxShadow: {
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  playBtn: {
    backgroundColor: "#003090",
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  playBtns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    gap: 20,
  },
  puzzleHead: {
    fontSize: 20,
    fontFamily: "pop-bold",
    color: "#003090",
  },
  pBtnHead: {
    fontFamily: "pop-reg",
  },
});
