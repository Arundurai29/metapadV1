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
    Linking
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
        <Text style={styles.content}>Play, engage and learn biochemistry with METAPAD– where education meets entertainment!         </Text>
          
          <Text style={styles.content}>
          <Text style={styles.step}>METAPAD</Text> (META bolic PA thways D ecoded) is a dynamic, game-based learning app specifically crafted to transform the way you learn and remember the intricate details of metabolic pathways in biochemistry. This innovative app simplifies these complex topics, making them accessible and engaging through puzzle-based gameplay and knowledge enhancing METABITES. By turning challenging content into a series of fun and interactive challenges, METAPAD ensures a deeper understanding and enhanced retention of biochemical pathways.  Get ready to dive into the fascinating world of biochemistry, master metabolic pathways with ease, and enjoy the thrill of learning like never before. 
          </Text>
          <TouchableOpacity style={styles.link}>
<Text style={styles.content}>If you want know more</Text>
          <Text style={{color: 'blue',fontSize:16,}}
      onPress={() => Linking.openURL('https://link.springer.com/epdf/10.1186/s12909-023-04587-5?sharing_token=bOI5eRmJI8yjPfJ3NYZL_G_BpE1tBhCbnbw3BuzI2RPUARdcy2IiTaqKHM-imeCP_OXwK-KjTnfpAgC31MQTOvWkY28LLSIRxY6sKTGevaUElR5Ko21Ia7ACsQx6cAoANAaR6aaX56kdeY5hMGor-y_7EAfjwEHdbCSCe-vdKUo%3D')}>
  Click Here
</Text>
          </TouchableOpacity>
          
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
      link:{
        flexDirection:'row',
        gap:20,
      },
    });

export default Welcome