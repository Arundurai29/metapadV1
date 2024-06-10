// LoginScreen.tsx
import React, { useState,useEffect } from 'react';
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
  ScrollView

} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../FireBaseConfig';
import { LinearGradient } from "expo-linear-gradient";
import { RouteProp } from '@react-navigation/native';
import { useFonts } from "expo-font";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as ScreenOrientation from 'expo-screen-orientation'
import { StatusBar } from 'expo-status-bar';
import SoundButton from './SoundButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { sendPasswordResetEmail } from 'firebase/auth';

const logo = require("../../assets/images/metapad.png");
const login_bg = require("../../assets/images/login-bg.png");

type RootStackParamList = {
  Login: undefined;
  Profile: { uid: string };
};

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;
type LoginScreenRouteProp = RouteProp<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<{
  navigation: LoginScreenNavigationProp;
  route: LoginScreenRouteProp;
}> = ({ navigation, route }) => {
  const [isFocusedEmail, setFocusedEmail] = useState(false);
  const [isFocusedPassword, setFocusedPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;
  

  const login = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in:', userCredential.user.uid);

      await AsyncStorage.setItem('userCredential', JSON.stringify(userCredential.user));
      await AsyncStorage.setItem('uid', userCredential.user.uid);


      navigation.navigate('Welcome', { uid: userCredential.user.uid});

    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      alert('Please enter your email address');
      return;
    }
  
    try {
      await sendPasswordResetEmail(auth, email);
      alert('Password reset email sent! Check your Email inbox.');
    } catch (error) {
      console.error('Error sending password reset email:', error);
      alert('Error sending password reset email');
    }
  };
  
  
  const goToSignUp = () => {
    navigation.navigate('SignUp');
  };

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
  
  const [isLoaded] = useFonts({
    "pop-mid": require("../../assets/fonts/Poppins-Medium.ttf"),
    "pop-reg": require("../../assets/fonts/Poppins-Regular.ttf"),
    "pop-bold": require("../../assets/fonts/Poppins-Bold.ttf"),
    "pop-xbold": require("../../assets/fonts/Poppins-ExtraBold.ttf"),
  });
  return (
    
      <ImageBackground
        source={login_bg}
        resizeMode="cover"
        style={styles.container}
      >
        <ScrollView>
        <View style={styles.Logos}>
          <Image style={styles.Logo} source={logo} />
        </View>
        <View style={styles.titles}>
          <Text style={styles.head}>Login Here</Text>
          <Text style={[styles.belowhead, styles.mb20]}>Welcome back you’ve
been missed!</Text>

        </View>
        <KeyboardAvoidingView behavior='padding'>
          <TextInput
            style={{
              ...styles.input,
              borderColor: isFocusedEmail ? "#003090" : "#fff",
              borderWidth: 1,
              color: isFocusedEmail ? "#000" : "black",
            }}
            placeholder="Email"
            autoCapitalize="none"
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
            onFocus={() => setFocusedEmail(true)}
            onBlur={() => setFocusedEmail(false)}
          />
          <TextInput
            style={{
              ...styles.input,
              borderColor: isFocusedPassword ? "#003090" : "#fff",
              borderWidth: 1,
              color: isFocusedPassword ? "#000" : "black",
            }}
            placeholder="Password"
            secureTextEntry={true}
            autoCapitalize="none"
            value={password}
            onChangeText={(text) => setPassword(text)}
            onFocus={() => setFocusedPassword(true)}
            onBlur={() => setFocusedPassword(false)}
          />
       
<SoundButton
        title="Forgot your password?"
        soundPath={require('../../src/sound.mp3')}
        onPress={handleForgotPassword}
        style={styles}
        textStyle={styles.forgot} 
      />
        
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <View>
              <LinearGradient
                start={{ x: 0, y: 0.2 }}
                colors={["#003090", "#3B66CF"]}
                end={{ x: 1, y: 2 }}
                style={styles.Button}
              >
               
                <SoundButton
        title="Login"
        soundPath={require('../../src/sound.mp3')}
        onPress={login}
        style={styles.button}
        textStyle={styles.login} 
      />
              </LinearGradient>
              <SoundButton
        title="Don't have an account? Sign Up"
        soundPath={require('../../src/sound.mp3')}
        onPress={goToSignUp}
        style={styles}
        textStyle={styles.new} 
      />
             
            </View>
          )}
        </KeyboardAvoidingView>
        </ScrollView>
        <StatusBar hidden={true} translucent={true} />
      </ImageBackground>
     
  );
};

const styles = StyleSheet.create({
  ScrollView:{
backgroundColor:'#fff'
  },
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  Button: {
    padding: 20,
    borderRadius: 10,
    marginTop:30,
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
    fontWeight:'500',
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
   width:250,
   height:70,
   objectFit:'contain',
    
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
    fontWeight: "600",
    marginBottom: 30,
  },
  belowhead: {
    color: "#000",
    textAlign: "center",
    fontFamily: "pop-bold",
    fontSize: 20,
    fontWeight: "800",
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
    marginTop:20,
    fontWeight:'800',
  },
  new: {
    textAlign: "center",
    marginTop: 20,
    fontFamily: "pop-bold",
    fontSize: 16,
  },
});
export default LoginScreen;
