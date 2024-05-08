import { useState, useEffect } from "react";
import React from "react";
import { View, Text, StyleSheet,TouchableOpacity,ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import * as ScreenOrientation from "expo-screen-orientation";
import { StatusBar } from 'expo-status-bar';

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
         <TouchableOpacity style={styles.arrowButton} onPress={navigateToPrices}>
          <AntDesign name="arrowleft" size={24} color="#003090" />
        </TouchableOpacity>
    <View style={styles.content} >    
      <Text style={styles.title}>META-BITES</Text>
      <View style={styles.item}>
        <Text style={styles.itemTitle}>1.	Gluconeogenesis is the metabolic pathway that synthesizes glucose from non-carbohydrate sources.</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.itemTitle}>2.	Major substrates include lactate (from muscle glycolysis), glycerol (from fat breakdown), and glucogenic amino acids (from protein breakdown).</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.itemTitle}>3.	The liver is the main site of gluconeogenesis and critical for maintaining blood glucose during low energy level.</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.itemTitle}>4.	The key enzymes in Gluconeogenesis are pyruvate carboxylase, phosphoenolpyruvate carboxykinase (PEPCK), fructose-1,6-bisphosphatase, and glucose-6-phosphatase.</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.itemTitle}>5.	Initially, pyruvate from cytoplasm is transported to mitochondria and converted to oxaloacetate by pyruvate carboxylase and with co-enzyme Biotin</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.itemTitle}>6.	This oxaloacetate is transported back to cytosol with the help of Malate-Aspartate Shuttle and further steps of gluconeogenesis continue.</Text>
      </View>
     
      <View style={styles.item}>
        <Text style={styles.itemTitle}>7.	The process is energy-intensive, requiring ATP. The production of one glucose from two pyruvate residues require a total of 6 ATPs.</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.itemTitle}>8.	Gluconeogenesis is stimulated by glucagon and cortisol, which increase during periods of low glucose availability (e.g., fasting, intense exercise).</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.itemTitle}>9.	Insulin inhibits gluconeogenesis, reducing the production of glucose from the liver, which helps lower blood glucose levels post-meal.</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.itemTitle}>10.	Ethanol inhibits gluconeogenesis in the liver by increasing the NADH/NAD+ ratio. Thus, excessive alcohol intake leads to hypoglycemia.</Text>
      </View>
      <View>
      <TouchableOpacity
              style={styles.puzzleBtns}
              onPress={() => navigation.navigate(level, { uid: uid })}
            >
              <View style={styles.playBtns}>
 
                  <Text style={styles.pBtnHead}>Start To Play</Text>
             
                <AntDesign name="caretright" style={styles.play} size={15} color="#fff" />
              </View>
        </TouchableOpacity>
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
