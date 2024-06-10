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
  } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useFonts } from 'expo-font';
import SoundButton from './SoundButton';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useFocusEffect } from "@react-navigation/native";

const logo = require('../../assets/images/metapad.png');
const login_bg = require('../../assets/images/login-bg.png');


const Welcome = () => {
    const navigation = useNavigation();
    useEffect(() => {
        async function changeScreenOrientation() {
          try {
            await ScreenOrientation.lockAsync(
              ScreenOrientation.OrientationLock.PORTRAIT
            );
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
        <ScrollView >
            <ImageBackground
        source={login_bg}
        resizeMode="cover"
        style={styles.container}>
        <View style={styles.Logos}>
          <Image style={styles.Logo} source={logo} />
        </View>
        <Text style={styles.title}>Dear Children,</Text>
          
          <Text style={styles.content}>
            Now, METAPAD has been developed as a digital app with various features and highlights.
          </Text>
          
          <Text style={styles.content}>
            This digital app further eases the learning with more accessible and immersive content.
          </Text>
          
          <Text style={styles.content}>
            In order to validate this newly developed METAPAD app, you all have been invited to use the app and provide your feedback through survey links that will be shared with you.
          </Text>
          
          <Text style={styles.content}>
            I thank you all for agreeing to participate in this validation.
          </Text>
          
          <Text style={styles.content}>
            Kindly spare some of your valuable time in completing this task. Below are the step-by-step instructions that you need to follow:
          </Text>
          
          <Text style={styles.step}>Step 1: Download METAPAD app from App Store or Play Store using the link that will be shared with you in this group</Text>          
          <Text style={styles.step}>Step 2: Create your account in the METAPAD app</Text>
          <Text style={styles.step}>Step 3: Login to your account to start playing the game and exploring the features of METAPAD App.</Text>
          <Text style={styles.note}>(A list of all features of the app will be sent separately)</Text>
          
          <Text style={styles.step}>Step 4: Provide your feedback regarding different metrics that will be asked in the survey links to be shared in the group.</Text>
          
          <Text style={styles.content}>
            None of your identifying information will be revealed in the survey forms and all your responses will remain anonymous and used only for the validation results of this study.
          </Text>
          
          <Text style={styles.thankYou}>Thanking you all once again.</Text>
          <LinearGradient
                start={{ x: 0, y: 0.2 }}
                colors={['#003090', '#3B66CF']}
                end={{ x: 1, y: 2 }}
                style={styles.Button}>
             
                <SoundButton
        title="Continue To Play"
        soundPath={require('../../src/sound.mp3')}
        onPress={() => navigation.navigate('Home')}
        style={styles}
        textStyle={styles.login} // Use the same style as the button
      />
              </LinearGradient>
        </ImageBackground>
        </ScrollView>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
        paddingTop:80,
      },
      login: {
        color: "#FFF",
        fontWeight: "bold",
        fontSize: 20,
        fontFamily: "pop-bold",
        textAlign: "center",
      },
      title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color:"#002693",
      },
      content: {
        fontSize: 16,
        marginBottom: 10,
        lineHeight: 24,
      },
      step: {
        fontSize: 16,
        fontFamily: "pop-bold",
        marginVertical: 5,
      },
      Button: {
        padding: 20,
        borderRadius: 10,
        marginTop:30,
      },
      note: {
        fontSize: 14,
        fontStyle: 'italic',
        marginVertical: 5,
      },
      thankYou: {
        fontSize: 16,
        marginTop: 20,
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
       marginBottom:20,
        
      },
    });

export default Welcome