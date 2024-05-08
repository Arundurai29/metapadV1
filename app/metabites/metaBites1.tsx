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
        <Text style={styles.itemTitle}>1.	Glycogenesis is the process of glycogen synthesis and Glycogenolysis is the breakdown of glycogen into glucose primarily occurring in liver and muscle cells.</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.itemTitle}>2.	Glycogen synthase is the key enzyme that catalyzes the addition of UDP-glucose to the growing glycogen chain. The branching enzyme (amylo-(1,4 to 1,6) Transglucosidase) introduces branches into the glycogen molecule.</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.itemTitle}>3.	Glycogen phosphorylase is the main enzyme in glycogenolysis, breaking down glycogen into glucose-1-phosphate. The debranching enzyme (alpha 1,6-glucosidase) is crucial for removing branches in glycogen as it is degraded.</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.itemTitle}>4.	Glucose-6-Phosphatase hydrolyses Glucose-6-Phosphate into glucose in liver. Muscles will not release free glucose due to the absence of this enzyme.</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.itemTitle}>5.	Hence, the energy yield from glycolysis of one glucose residue derived from glycogen is 3 ATP (as no ATP is required for initial phosphorylation)</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.itemTitle}>6.	Insulin promotes glycogenesis by activating glycogen synthase and inhibiting glycogen phosphorylase. Glucagon and adrenaline, in contrast, stimulate glycogenolysis through the activation of glycogen phosphorylase.</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.itemTitle}>7.	Diseases Associated with Glycogen Metabolism</Text>
        <Text style={styles.subItem}>•	Type I Glycogen Storage Disease (von Gierke’s Disease): Deficiency of glucose-6-phosphatase.</Text>
        <Text style={styles.subItem}>•	Type II Glycogen Storage Disease (Pompe’s Disease): Deficiency in Lysosomal Maltase.</Text>
        <Text style={styles.subItem}>•	Type III Glycogen Storage Disease (Cori Disease): Deficiency in debranching enzyme.</Text>
        <Text style={styles.subItem}>•	Type IV Glycogen Storage Disease (Anderson’s Disease): Deficiency in branching enzyme.</Text>
        <Text style={styles.subItem}>•	Type V Glycogen Storage Disease (McArdle’s Disease): Deficiency in muscle phosphorylase.</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.itemTitle}>8.	Glycogenesis is favored when energy and glucose levels are high, signaling an anabolic state. Glycogenolysis is activated during low energy states (like fasting), providing glucose to maintain blood sugar levels.</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.itemTitle}>9.	Glycogenesis and glycogenolysis are also regulated by secondary messengers like cyclic AMP (cAMP), which mediates the hormonal regulation through protein kinase A (PKA).</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.itemTitle}>10. Dysfunctions in the ETC are linked to numerous diseases Mitochondrial Diseases, Leber's Hereditary Optic Neuropathy, Myoclonic epilepsy, and other neurodegenerative diseases.</Text>
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
