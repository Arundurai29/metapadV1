import { useState, useEffect } from "react";
import React from "react";
import { View, Text, StyleSheet,TouchableOpacity,ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import * as ScreenOrientation from "expo-screen-orientation";
import { StatusBar } from 'expo-status-bar';
import SoundButton from "../screens/SoundButton";

type RootStackParamList = {
    Home: { uid?: string };
  };
  
  type HomeScreenRouteProp = RouteProp<RootStackParamList, "Home">;

const MetaBites1: React.FC<{
    route: HomeScreenRouteProp;
  }> = ({ route }) => {
    const navigation = useNavigation();
    const { uid, level } = route.params ?? {};
  
    useEffect(() => {
      const lockScreenOrientation = async () => {
        await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.PORTRAIT
        );
      };
      const unsubscribe = navigation.addListener("focus", lockScreenOrientation);
     
      return unsubscribe;
    }, [navigation]);

    const navigateToPrices = async () => {
        navigation.navigate("Level",{uid: uid ,level});
    };

  return (
    <ScrollView >
    <View style={styles.container}>
    <SoundButton
        soundPath={require('../../src/sound.mp3')}
        onPress={navigateToPrices}
        style={styles.arrowButton}
      >
        <AntDesign name="arrowleft" size={24} color="black" />
      </SoundButton>
    <View style={styles.content} >    
      <Text style={styles.title}>META-BITES</Text>
      <View style={styles.item}>
        <Text style={styles.itemTitle}>1.	The Tricarboxylic Acid (TCA) cycle, also known as the Krebs cycle or the citric acid cycle is an amphibolic pathway occurring in the mitochondrial matrix of eukaryotic cells, linking glycolysis (which occurs in the cytosol) with oxidative phosphorylation.</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.itemTitle}>2.	The cycle starts with the condensation of acetyl-CoA with oxaloacetate to form citrate, with acetyl-CoA derived from carbohydrates via pyruvate, fats via β-oxidation, and ketogenic amino acids.</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.itemTitle}>3.	Anaplerotic reactions replenish TCA cycle intermediates that are used up, such as the conversion of pyruvate to oxaloacetate by pyruvate carboxylase.  </Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.itemTitle}>4.	The efflux of TCA cycle intermediates enters various biosynthetic pathways, such as fatty acid synthesis, heme synthesis, ketolysis, gluconeogenesis and also production of amino acids like aspartate and glutamic acid.</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.itemTitle}>5.	Fat cannot be converted to glucose, as pyruvate cannot be converted back to acetyl Co-A.</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.itemTitle}>6.	The only irreversible step in the TCA cycle is the reaction catalyzed by the enzyme, α-Ketoglutarate Dehydrogenase.</Text>
      </View>
     
      <View style={styles.item}>
        <Text style={styles.itemTitle}>7.	Oxaloacetate serves as the true catalyst for TCA cycle, entering and leaving the cycle unchanged.</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.itemTitle}>8.	For each turn of the cycle, 3 molecules of NAD+ are reduced to NADH, 1 molecule of FAD is reduced to FADH2, and 1 molecule of ATP is produced directly via substrate-level phosphorylation.</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.itemTitle}>9.	TCA cycle is regulated by the energy needs of the cell. ATP acts as a negative regulator for the TCA cycle.</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.itemTitle}>10.	The enzymes of TCA Cycle are inhibited by Fluoroacetate (Noncompetitive inhibition), Arsenite (Noncompetitive inhibition), Malonate (competitive inhibition) or Heavy Metal ions (Noncompetitive inhibition)</Text>
      </View>
      <View>
      <SoundButton
        soundPath={require('../../src/sound.mp3')}
        onPress={() => navigation.navigate(level, { uid: uid })}
        style={styles.puzzleBtns}
      >
        <View style={styles.playBtns}>
          <Text style={styles.pBtnHead}>Start To Play</Text>
          <AntDesign name="caretright" size={15} color="#fff" />
        </View>
      </SoundButton>
      </View>
    </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  item: {
    marginBottom: 20,
  },
  itemTitle: {
    fontSize: 16,
  },
  subItem: {
    marginLeft: 20,
  },
  playBtns: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 0,
    flex: 1,
    width: "80%",
   
  },
  pBtnHead: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
    paddingLeft:20,
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
content:{
    marginTop:70,
},
puzzleBtns: {
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#003090",
    paddingVertical: 10,
    paddingHorizontal:5,
    marginTop: 10,
    width: "60%",
    marginLeft:'20%'
  },
});

export default MetaBites1;
