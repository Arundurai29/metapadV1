import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Alert,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';
import { ref, get } from 'firebase/database';
import { signOut, deleteUser } from 'firebase/auth';
import { DATABASE, FIREBASE_AUTH } from '../../FireBaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TimeTrackingContext } from './Timespent';

const avatar = require('../../assets/player/bear.png');

const MenuScreen = () => {
  const navigation = useNavigation();
  const auth = FIREBASE_AUTH;
  const [uid, setUserId] = useState(null);
  const [userData, setUserData] = useState<any>(null);
  const { totalTime } = useContext(TimeTrackingContext);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return `${hrs}:${mins}`;
  };

  useEffect(() => {
    const getUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('uid');
        setUserId(storedUserId);
      } catch (error) {
        console.error('Error retrieving user ID:', error);
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
            console.log('User data not found');
          }
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [uid]);

  const makePhoneCall = (phoneNumber) => {
    let phoneNumberFormatted = `mailto:${phoneNumber}`;
    Linking.openURL(phoneNumberFormatted)
      .then((supported) => {
        if (!supported) {
          Alert.alert('Phone call not supported');
        } else {
          return Linking.openURL(phoneNumberFormatted);
        }
      })
      .catch((err) => console.log(err));
  };

  const logout = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.clear();
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const deleteAccount = async () => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            if (auth.currentUser) {
              try {
                await deleteUser(auth.currentUser);
                await AsyncStorage.clear();
                navigation.navigate('Login');
              } catch (error) {
                console.error('Error deleting account:', error);
                Alert.alert('Error', 'There was an issue deleting your account. Please try again.');
              }
            }
          },
        },
      ],
      { cancelable: false }
    );
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
      <View style={styles.personal_info}>
        {userData && (
          <Image source={getImageSource(userData.profileImage)} style={styles.avatar} />
        )}
        {userData && (
          <View style={styles.userInfo}>
            <Text style={styles.name}>{userData.name}</Text>
            <Text style={styles.email}>{userData.phone}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Edit')} style={styles.edit}>
              <FontAwesome6 name="edit" size={22} color="#003090" />
              <Text style={styles.edit_text}>Edit</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={styles.menu_container}>
        <View style={styles.menu_content}>
          <TouchableOpacity onPress={() => makePhoneCall('drskmgameuniverse@gmail.com')} style={styles.menuItem}>
            <Text style={styles.logout_text}>Help and Support</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={logout} style={[styles.menuItem, styles.mb0]}>
            <Feather name="log-out" size={24} color="black" />
            <Text style={styles.logout_text}>Logout</Text>
          </TouchableOpacity>
        </View>
        <View>
          
          <TouchableOpacity onPress={deleteAccount} style={[styles.menuItem, styles.mb0]}>
            <Feather name="trash" size={24} color="red" />
            <Text style={styles.logout_text}>Delete Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  userInfo: {
    alignItems: 'baseline',
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
    borderRadius: 10,
    marginBottom: 20,
  },
  personal_info: {
    borderBottomWidth: 3,
    borderColor: "#003090",
    padding: 20,
    paddingTop:60,
    paddingBottom: 60,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 20,
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
    color: '#fff',
    textAlign: "left",
  },
  email: {
    fontSize: 16,
    marginTop: 5,
    color: '#fff',
    textAlign: "left",
  },
  logout_text: {
    fontSize: 18,
    fontWeight: "bold",
  },
  menu_container: {
    width: "80%",
    height: "auto",
    flex: 1,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    marginHorizontal: 'auto',
    marginTop: -40,
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 20,
  },
  menu_content: {

  },
  edit: {
    backgroundColor: "#fff",
    padding: 10,
    paddingHorizontal: 25,
    marginTop: 10,
    flexDirection: 'row',
    gap: 10,
    borderRadius: 10,
  },
  edit_text: {
    color: '#003090',
    fontSize: 18,
  },
  mb0: {
    marginBottom: 0,
  },
});

export default MenuScreen;
