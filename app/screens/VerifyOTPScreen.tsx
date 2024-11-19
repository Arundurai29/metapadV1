import React, { useState, useRef } from 'react';
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
    ScrollView,
    Alert,
    Platform
 } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH, DATABASE } from '../../FireBaseConfig';
import { ref, set } from 'firebase/database';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SoundButton from './SoundButton';

const logo = require('../../assets/images/metapad.png');
const login_bg = require('../../assets/images/login-bg.png');

const VerifyOTPScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { email, password, name, phone } = route.params;
    const [otp, setOtp] = useState(['', '', '', '', '', '']); // An array to store OTP characters
    const [loading, setLoading] = useState(false);
    const [verificationMessage, setVerificationMessage] = useState('');
    const otpInputs = useRef([]);

    const handleVerifyOTP = async () => {
        const enteredOTP = otp.join('');
        setLoading(true);
        setVerificationMessage('');

        try {
            const response = await fetch('https://extreme-deadpan-border.glitch.me/api/verifyOTP', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, otp: enteredOTP }), // Use the entered OTP
            });
            const data = await response.json();

            if (data.success) {
                try {
                    const userCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);

                    await set(ref(DATABASE, 'users/' + userCredential.user.uid), {
                        name,
                        phone,
                        email,
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

                    await AsyncStorage.setItem('userCredential', JSON.stringify(userCredential.user));
      await AsyncStorage.setItem('uid', userCredential.user.uid);

                    navigation.navigate('Home', { uid: userCredential.user.uid });
                } catch (error) {
                    console.error(error);
                    Alert.alert('Sign Up Failed', error.message);
                }
            } else {
                Alert.alert('OTP Verification Failed', data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Verification Error', 'There was an error verifying the OTP.');
        } finally {
            setLoading(false);
        }
    };

    const handleOtpChange = (index, value) => {
        if (value === '') {
            // If the input is empty, clear the current input and focus to the previous input
            const updatedOTP = [...otp];
            updatedOTP[index] = '';
            setOtp(updatedOTP);
            if (index > 0) {
                otpInputs.current[index - 1].focus();
            }
        } else if (!isNaN(value) && value.length === 1) {
            // If input is a number and its length is 1
            const updatedOTP = [...otp];
            updatedOTP[index] = value;
            setOtp(updatedOTP);
            if (index < otp.length - 1) {
                otpInputs.current[index + 1].focus(); // Move focus to the next input
            }
        }
    };

    return (
      <ImageBackground
      source={login_bg}
      resizeMode="cover"
      style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={styles.keyboardAvoidingContainer}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
           
        <View style={styles.Logos}>
          <Image style={styles.Logo} source={logo} />
        </View>
        <View style={styles.titles}>
          <Text style={styles.head}>Verify OTP</Text>
          <Text style={styles.belowhead}>
          Enter the OTP sent to 
          </Text>
          <Text style={[styles.belowhead, styles.mb20]}>
         {email}
          </Text>
        </View>
        
            <View style={styles.otpContainer}>
            <View style={styles.otpcon}>
                {otp.map((value, index) => (
                    <TextInput
                        key={index}
                        style={styles.otpInput}
                        value={value}
                        onChangeText={(text) => handleOtpChange(index, text)}
                        keyboardType="numeric"
                        ref={(ref) => (otpInputs.current[index] = ref)} // Store reference to each input
                        maxLength={1} // Restrict input to one character
                    />
                ))}
            </View>
            </View>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                
                <LinearGradient
                start={{ x: 0, y: 0.2 }}
                colors={['#003090', '#3B66CF']}
                end={{ x: 1, y: 2 }}
                style={styles.Button}>
              
                <SoundButton
        title="Verify OTP"
        soundPath={require('../../src/sound.mp3')}
        onPress={handleVerifyOTP}
        style={styles}
        textStyle={styles.login}
      />
              </LinearGradient>
              
            )}
            {verificationMessage ? <Text style={styles.message}>{verificationMessage}</Text> : null}
        
        </KeyboardAvoidingView>
        </ScrollView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
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
    subHeader: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    otpContainer: {
       
        justifyContent: 'center', // Center horizontally
        alignItems: 'center',
    },
    otpcon:{
      flexDirection: 'row',
      width: '60%',
      margin:"auto"
    },
    otpInput: {
        width: 40,
        height: 45,
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 5,
        textAlign: 'center',
        marginBottom: 10,
        marginRight:5,
    },
    message: {
        marginTop: 20,
        textAlign: 'center',
    },
    ScrollView:{
        backgroundColor:'#fff'
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
        paddingHorizontal:60,
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
        fontSize: 18,
        fontWeight: "500",
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
      checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        marginTop:10,
      },
      checkbox: {
        width: 24,
        height: 24,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#003090',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
      },
      checkboxInner: {
        width: 12,
        height: 12,
        backgroundColor: '#003090',
        borderRadius: 2,
        display: 'none',
      },
      checked: {
        display: 'flex',
      },
      checkboxText: {
        fontSize: 16,
        color: 'black',
      },
});

export default VerifyOTPScreen;
