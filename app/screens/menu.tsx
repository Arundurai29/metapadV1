import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Easing,
  StyleSheet,
  Modal,
  Animated,
  Linking,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import Octicons from "@expo/vector-icons/Octicons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { ref, get } from "firebase/database";
import { signOut } from "firebase/auth";
import { DATABASE, FIREBASE_AUTH } from "../../FireBaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TimeSpentDisplay from "./Timespent";

const { width } = Dimensions.get("window");
const avatar = require("../../assets/player/bear.png");
const MenuExample = () => {
  const navigation = useNavigation();
  const auth = FIREBASE_AUTH;
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-width)).current;
  const [uid, setUserId] = useState(null);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const getUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("uid");
        setUserId(storedUserId);
      } catch (error) {
        console.error("Error retrieving user ID:", error);
      }
    };

    getUserId();
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
        });
    }
  }, [uid]);

  useEffect(() => {
    if (isMenuVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500, // Increased duration for smoother animation
        easing: Easing.out(Easing.exp), // Easing function for smooth animation
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -width,
        duration: 500, // Increased duration for smoother animation
        easing: Easing.in(Easing.exp), // Easing function for smooth animation
        useNativeDriver: true,
      }).start();
    }
  }, [isMenuVisible]);

  const makePhoneCall = (phoneNumber) => {
    let phoneNumberFormatted = `tel:${phoneNumber}`;
    Linking.openURL(phoneNumberFormatted)
      .then((supported) => {
        if (!supported) {
          console.log('Phone call not supported');
        } else {
          return Linking.openURL(phoneNumberFormatted);
        }
      })
      .catch((err) => console.log(err));
  };

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const logout = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.clear(); // Clear all AsyncStorage data
      navigation.navigate("Login"); // Navigate back to the Login screen
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const getImageSource = (imageName) => {
    switch (imageName) {
      case 'bear':
        return require('../../assets/player/bear.png');
      case 'boy':
        return require('../../assets/player/boy.png');
      case 'girl':
        return require('../../assets/player/girl.png');
      case 'man':
        return require('../../assets/player/man.png');
      case 'woman':
        return require('../../assets/player/woman.png');
      case 'man1':
        return require('../../assets/player/man1.png');
      case 'woman1':
        return require('../../assets/player/woman1.png');
      default:
        return require('../../assets/player/bear.png');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
        <AntDesign name="menu-fold" size={28} color="#fff" />
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={isMenuVisible}
        animationType="none"
        onRequestClose={toggleMenu}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={toggleMenu}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={{  width: "100%" }}
            onPress={() => {}}
          >
            <Animated.View
              style={[styles.menu, { transform: [{ translateX: slideAnim }] }]}
            >
              <TouchableOpacity onPress={toggleMenu} style={styles.closeButton}>
                <Octicons name="x" size={24} color="#fff" />
              </TouchableOpacity>
              <View style={styles.personal_info}>
              {userData && (
                  <Image source={getImageSource(userData.profileImage)} style={styles.avatar} />
                )}
                {userData && (
                  <View style={styles.userInfo}>
                    <Text style={styles.name}>{userData.name}</Text>
                    <Text style={styles.email}>{userData.phone}</Text>
                    <TouchableOpacity onPress={()=>navigation.navigate("Edit")} style={styles.edit}>
                    <FontAwesome6 name="edit" size={22} color="#003090" /><Text style={styles.edit_text}>Edit</Text>
              </TouchableOpacity>
                  </View>
                )}
              </View>
              <View style={[styles.menu_container]}>
                <View style={[styles.menu_content]}>
                <TouchableOpacity onPress={toggleMenu} style={styles.menuItem}>
                <Text style={styles.logout_text}>Messsage</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleMenu} style={styles.menuItem}>
                <Text style={styles.logout_text} >Notification</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleMenu} style={styles.menuItem}>
                <Text style={styles.logout_text} >Time You Spent: <TimeSpentDisplay/> </Text>
              </TouchableOpacity>
              <TouchableOpacity  onPress={() => makePhoneCall('+91 9789099989')} style={styles.menuItem}>
                <Text style={styles.logout_text} >Help and Support </Text>
              </TouchableOpacity>
                </View>
               <View>
               <TouchableOpacity onPress={logout} style={[styles.menuItem,styles.mb0]}>
                <Feather name="log-out" size={24} color="black" />
                <Text style={styles.logout_text}>Logout</Text>
              </TouchableOpacity>
               </View>
         
              </View>
            </Animated.View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  menuButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 10,
    padding: 10,
    backgroundColor: "#003090",
    borderRadius: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    justifyContent: "flex-start",
    alignItems: "baseline",
  },
  menu: {
    backgroundColor: "#fff",
    // padding: 20,
    height: "100%",
    alignItems: "baseline",
  },
  closeButton: {
    alignSelf: "flex-end",
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 10,
    padding: 10,
  },
  userInfo: {
   alignItems:'baseline',
  },
  menuItem: {
    padding: 15,
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 20,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
    borderRadius:10,
    marginBottom:20,
  },
  personal_info: {
    borderBottomWidth: 3,
    borderColor: "#003090",
    padding: 20,
    paddingBottom:60,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap:20,
    width: "100%",
    flexDirection: 'row',
    backgroundColor: "#003090",
  },
  avatar: {
    width: 120,
    height: 120,
    objectFit: "contain",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    color:'#fff',
    textAlign: "left",
  },
  email: {
    fontSize: 16,
    marginTop: 5,
    color:'#fff', 
    textAlign: "left",
  },
 
  logout_text: {
    fontSize: 18,
    fontWeight: "bold",
  },

  menu_container:{
    width: "80%",
    height: "auto",
    flex:1,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    marginHorizontal:'auto',
    marginTop:-40,
    borderRadius:10,
    flexDirection:'column',
    justifyContent:'space-between',
    padding:20,
  },
  menu_content:{
    
  },
  edit:{
    backgroundColor:"#fff",
    padding:10,
    paddingHorizontal:25,
    marginTop:10,
    flexDirection:'row',
    gap:10,
    borderRadius:10,
  },
  edit_text:{
    color:'#003090',
    fontSize:18,
  },
  mb0:{
    marginBottom:0,
  },
});

export default MenuExample;
