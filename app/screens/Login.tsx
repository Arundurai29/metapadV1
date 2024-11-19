import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  TextInput,
  Button,
  ImageBackground,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword, sendPasswordResetEmail, signInAnonymously } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { FIREBASE_AUTH, DATABASE } from '../../FireBaseConfig'; // Adjust import path if needed
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import SoundButton from './SoundButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ScreenOrientation from 'expo-screen-orientation';
import { StatusBar } from 'expo-status-bar';

const logo = require('../../assets/images/metapad.png');
const login_bg = require('../../assets/images/login-bg.png');

const LoginScreen: React.FC = () => {
  const [isFocusedEmail, setFocusedEmail] = useState(false);
  const [isFocusedPassword, setFocusedPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const login = async () => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
      console.log('User logged in:', userCredential.user.uid);

      await AsyncStorage.setItem('userCredential', JSON.stringify(userCredential.user));
      await AsyncStorage.setItem('uid', userCredential.user.uid);

      navigation.navigate('Welcome', { uid: userCredential.user.uid });
    } catch (error) {
      console.error('Error logging in:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      alert('Please enter your email address');
      return;
    }

    try {
      await sendPasswordResetEmail(FIREBASE_AUTH, email);
      alert('Password reset email sent! Check your Email inbox.');
    } catch (error) {
      console.error('Error sending password reset email:', error);
      alert('Error sending password reset email');
    }
  };

  const goToSignUp = () => {
    navigation.navigate('SignUp');
  };

  const skip = async () => {
    setLoading(true);
    try {
      const userCredential = await signInAnonymously(FIREBASE_AUTH);
      console.log('Guest user signed in:', userCredential.user.uid);

      await AsyncStorage.setItem('userCredential', JSON.stringify(userCredential.user));
      await AsyncStorage.setItem('uid', userCredential.user.uid);

      // Store guest user data in Realtime Database
      const userRef = ref(DATABASE, 'users/' + userCredential.user.uid);
      await set(userRef, {
        name: 'Guest',
        phone: '',
        email: '',
        level1Time: 0,
        level2Time: 0,
        level3Time: 0,
        level4Time: 0,
        level5Time: 0,
        level1: 'start',
        level2: 'pending',
        level3: 'pending',
        level4: 'pending',
        level5: 'pending',
        game2level1Time: 0,
        game2level2Time: 0,
        game2level3Time: 0,
        game2level4Time: 0,
        game2level5Time: 0,
        game2level1: 'start',
        game2level2: 'pending',
        game2level3: 'pending',
        game2level4: 'pending',
        game2level5: 'pending',
        game3level1Time: 0,
        game3level2Time: 0,
        game3level3Time: 0,
        game3level4Time: 0,
        game3level5Time: 0,
        game3level1: 'start',
        game3level2: 'pending',
        game3level3: 'pending',
        game3level4: 'pending',
        game3level5: 'pending',
        game4level1Time: 0,
        game4level2Time: 0,
        game4level3Time: 0,
        game4level4Time: 0,
        game4level5Time: 0,
        game4level1: 'start',
        game4level2: 'pending',
        game4level3: 'pending',
        game4level4: 'pending',
        game4level5: 'pending',
      });

      navigation.navigate('Welcome', { uid: userCredential.user.uid });
    } catch (error) {
      console.error('Error signing in anonymously:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const changeScreenOrientation = async () => {
      try {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
      } catch (error) {
        console.error('Error locking screen orientation:', error);

        try {
          await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT);
        } catch (fallbackError) {
          console.error('Error locking to default orientation:', fallbackError);
        }
      }
    };

    changeScreenOrientation();

    return () => {
      const unlockScreenOrientation = async () => {
        try {
          await ScreenOrientation.unlockAsync();
        } catch (error) {
          console.error('Error unlocking screen orientation:', error);
        }
      };

      unlockScreenOrientation();
    };
  }, []);

  const [isLoaded] = useFonts({
    'pop-mid': require('../../assets/fonts/Poppins-Medium.ttf'),
    'pop-reg': require('../../assets/fonts/Poppins-Regular.ttf'),
    'pop-bold': require('../../assets/fonts/Poppins-Bold.ttf'),
    'pop-xbold': require('../../assets/fonts/Poppins-ExtraBold.ttf'),
  });

  const handleEmailChange = useCallback((text) => setEmail(text), []);
  const handlePasswordChange = useCallback((text) => setPassword(text), []);

  if (!isLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ImageBackground source={login_bg} resizeMode="cover" style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingContainer}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.Logos}>
            <Image style={styles.Logo} source={logo} />
          </View>
          <View style={styles.titles}>
            <Text style={styles.head}>Login Here</Text>
            <Text style={[styles.belowhead, styles.mb20]}>
              Welcome back you’ve been missed!
            </Text>
          </View>
          <TextInput
            style={{
              ...styles.input,
              borderColor: isFocusedEmail ? '#003090' : '#fff',
              borderWidth: 1,
              color: isFocusedEmail ? '#000' : 'black',
            }}
            placeholder="Email"
            autoCapitalize="none"
            value={email}
            onChangeText={handleEmailChange}
            keyboardType="email-address"
            onFocus={() => setFocusedEmail(true)}
            onBlur={() => setFocusedEmail(false)}
          />
          <TextInput
            style={{
              ...styles.input,
              borderColor: isFocusedPassword ? '#003090' : '#fff',
              borderWidth: 1,
              color: isFocusedPassword ? '#000' : 'black',
            }}
            placeholder="Password"
            secureTextEntry={true}
            autoCapitalize="none"
            value={password}
            onChangeText={handlePasswordChange}
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
                colors={['#003090', '#3B66CF']}
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
              <SoundButton
                title="Skip"
                soundPath={require('../../src/sound.mp3')}
                onPress={skip}
                style={styles.skipButton}
                textStyle={styles.skipButtonText}
              />
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
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
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyboardAvoidingContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
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
     width:"100%"
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
  skipButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  skipButtonText: {
    color: '#003090',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
export default LoginScreen;
