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

const MetaBites: React.FC<{
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
        <Text style={styles.itemTitle}>1. The electron transport chain (ETC) is located in the inner mitochondrial membrane and its primary function is to produce ATP through a process known as oxidative phosphorylation.</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.itemTitle}>2. Electrons are transferred through a series of protein complexes (I, II, III, IV) and mobile carriers like ubiquinone (CoQ) and cytochrome c.</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.itemTitle}>3. Electrons are donated by NADH and FADH2, which are produced during earlier stages of cellular respiration.</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.itemTitle}>4. In aerobic respiration, molecular oxygen serves as the final electron acceptor, forming water when it gains electrons and combines with protons.</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.itemTitle}>5. As electrons move through the ETC, protons (H+) are pumped from the mitochondrial matrix into the intermembrane space creating a proton gradient for the synthesis of ATP.</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.itemTitle}>6. The ETC is responsible for most of the ATP generated during cellular respiration—about 34 out of a total of 38 ATP molecules produced per glucose molecule in aerobic conditions.</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.itemTitle}>7. Various substances can inhibit the electron transport chain at different stages, affecting energy production.</Text>
        <Text style={styles.subItem}>• Complex I - Rotenone, Barbiturates</Text>
        <Text style={styles.subItem}>• Complex II - Carboxin, Malonate</Text>
        <Text style={styles.subItem}>• Complex III - British anti-lewisite (BAL), Antimycin A</Text>
        <Text style={styles.subItem}>• Complex IV - Cyanide, Carbon Monoxide</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.itemTitle}>8. Agents like 2,4-dinitrophenol, 2,4-dinitrocresol decouple oxidative phosphorylation, allowing for heat generation instead of ATP.</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.itemTitle}>9. Electron leakage from the ETC can form reactive oxygen species, which are damaging to cells and play a role in aging and various diseases.</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.itemTitle}>10. Dysfunctions in the ETC are linked to numerous diseases Mitochondrial Diseases, Leber's Hereditary Optic Neuropathy, Myoclonic epilepsy, and other neurodegenerative diseases.</Text>
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

export default MetaBites;
