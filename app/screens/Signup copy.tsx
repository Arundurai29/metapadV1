  // SignUpScreen.tsx
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
  import { createUserWithEmailAndPassword } from 'firebase/auth';
  import { FIREBASE_AUTH, FIREBASE_DB,DATABASE } from '../../FireBaseConfig';
  import { useFonts } from "expo-font";
  import {ref,set} from 'firebase/database';
  import { LinearGradient } from "expo-linear-gradient";
  import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as ScreenOrientation from 'expo-screen-orientation'

  const logo = require("../../assets/images/metapad.png");
const login_bg = require("../../assets/images/login-bg.png");

type RootStackParamList = {
  SignUp: undefined;
  Profile: { uid: string };
};

type SignUpScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignUp'>;
type SignUpScreenRouteProp = RouteProp<RootStackParamList, 'SignUp'>;

const SignUpScreen: React.FC<{
  navigation: SignUpScreenNavigationProp;
  route: SignUpScreenRouteProp;
}> = ({ navigation, route }) => {
  const [isFocused, setFocused] = useState(false);
  const [isFocusedd, setFocusedd] = useState(false);
  const [isFocuse, setFocuse] = useState(false);
  const [isFocus, setFocus] = useState(false);

      const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

    const goToSignIn = () => {
      navigation.navigate('Login');
    };

    const signUp = async () => {
      
      

      setLoading(true);
      try {
        const response = await createUserWithEmailAndPassword(auth, email, password);

        // Save user data to the database
        set(ref(DATABASE, 'users/' + response.user.uid), {
          name: name,
          phone: phone,
          level1Time:0,
          level2Time:0,
          level3Time:0,
          level4Time:0,
          level5Time:0,
          level1:'start',
          level2:'pending',
          level3:'pending',
          level4:'pending',
          level5:'pending',
          game2level1Time:0,
          game2level2Time:0,
          game2level3Time:0,
          game2level4Time:0,
          game2level5Time:0,
          game2level1:'start',
          game2level2:'pending',
          game2level3:'pending',
          game2level4:'pending',
          game2level5:'pending',
          game3level1Time:0,
          game3level2Time:0,
          game3level3Time:0,
          game3level4Time:0,
          game3level5Time:0,
          game3level1:'start',
          game3level2:'pending',
          game3level3:'pending',
          game3level4:'pending',
          game3level5:'pending',
          game4level1Time:0,
          game4level2Time:0,
          game4level3Time:0,
          game4level4Time:0,
          game4level5Time:0,
          game4level1:'start',
          game4level2:'pending',
          game4level3:'pending',
          game4level4:'pending',
          game4level5:'pending',
        });
  
        navigation.navigate('Home', { uid: response.user.uid });
     
        if (!isLoaded) {
          return <ActivityIndicator />;
        }

      } catch (error) {
        console.log(error);
        alert('Sign up failed: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

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

    return (
      <ScrollView>
      <ImageBackground
      source={login_bg}
      resizeMode="cover"
      style={styles.container}
    >
      <View style={styles.Logos}>
        <Image style={styles.Logo} source={logo} />
      </View>
      <View style={styles.titles}>
        <Text style={styles.head}>Create Account</Text>
        <Text style={[styles.belowhead, styles.mb20]}>Create an account so you can explore all our puzzles</Text>
      </View>
        <KeyboardAvoidingView behavior='padding'>
          <TextInput
            style={{
              ...styles.input,
              borderColor: isFocused ? "#003090" : "#fff",
              borderWidth: 1,
              color: isFocused ? "#000" : "black",
            }}
            placeholder="Name"
            autoCapitalize="words"
            value={name}
            onChangeText={(text) => setName(text)}
            onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          />
          <TextInput
            style={{
              ...styles.input,
              borderColor: isFocusedd ? "#003090" : "#fff",
              borderWidth: 1,
              color: isFocusedd ? "#000" : "black",
            }}
            placeholder="Phone Number"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={(text) => setPhoneNumber(text)}
            onFocus={() => setFocusedd(true)}
            onBlur={() => setFocusedd(false)}
          />
          <TextInput
           style={{
            ...styles.input,
            borderColor: isFocuse ? "#003090" : "#fff",
            borderWidth: 1,
            color: isFocuse ? "#000" : "black",
          }}
            placeholder="Email"
            autoCapitalize="none"
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
            onFocus={() => setFocuse(true)}
            onBlur={() => setFocuse(false)}
          />
          <TextInput
           style={{
            ...styles.input,
            borderColor: isFocus ? "#003090" : "#fff",
            borderWidth: 1,
            color: isFocus ? "#000" : "black",
          }}
            placeholder="Password"
            secureTextEntry={true}
            autoCapitalize="none"
            value={password}
            onChangeText={(text) => setPassword(text)}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
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
              <TouchableOpacity onPress={signUp}>
                <Text style={styles.login}>Continue</Text>
              </TouchableOpacity>
            </LinearGradient>
            
              <TouchableOpacity onPress={goToSignIn}>
              <Text style={styles.new}>Already have an account ?</Text>
            </TouchableOpacity>
            </View>
          )}
        </KeyboardAvoidingView>
     </ImageBackground>
     </ScrollView>
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
      fontWeight: "800",
      marginBottom: 30,
    },
    belowhead: {
      color: "#000",
      textAlign: "center",
      fontFamily: "pop-bold",
      fontSize: 20,
      fontWeight: "600",
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
  });

  export default SignUpScreen;


