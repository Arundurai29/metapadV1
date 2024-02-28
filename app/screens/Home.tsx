import React, { useState ,useEffect} from "react";
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
  Platform,
  ScrollView
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { ref, get, child } from 'firebase/database';
import { DATABASE } from '../../FireBaseConfig';
import { useFonts } from "expo-font";
import { useRoute,RouteProp } from '@react-navigation/native';

const logo = require("../../assets/images/metapad.png");
const login_bg = require("../../assets/images/login-bg.png");

type RootStackParamList = {
  Home: { uid?: string };
};

type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

const Home: React.FC<{
 

  route: HomeScreenRouteProp;
}> = ({ route }) => {
  const navigation = useNavigation();
  const { uid } = route.params ?? {};
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const [isFocused, setFocused] = useState(false);
  const [isFocusedd, setFocusedd] = useState(false);
  const [isFocuse, setFocuse] = useState(false);
  const [isFocus, setFocus] = useState(false);
  const [isLoaded] = useFonts({
    "pop-mid": require("../../assets/fonts/Poppins-Medium.ttf"),
    "pop-reg": require("../../assets/fonts/Poppins-Regular.ttf"),
    "pop-bold": require("../../assets/fonts/Poppins-Bold.ttf"),
    "pop-xbold": require("../../assets/fonts/Poppins-ExtraBold.ttf"),
  });
  useEffect(() => {
    if (uid) {
      const userRef = ref(DATABASE, `users/${uid}`);
      get(userRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            setUserData(snapshot.val());
          } else {
            console.log('User data not found');
          }
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [uid]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  
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
        <Text style={styles.head}>Welcome</Text>
        {userData && (
            <View>
              <Text style={[styles.belowhead]}>{userData.name}</Text>
            </View>
          )}
        <Text style={[styles.subheading, styles.mb30]}>
          What would you Like to Play?
        </Text>
      </View>

      <View>
        <TouchableOpacity style={[styles.puzzleBtns, styles.boxShadow]} onPress={() => navigation.navigate("puzzle")} >
          <Text style={styles.puzzleHead}>Puzzle 1</Text>
          <Image
            style={styles.puzzleBtn}
            source={require("../../assets/images/originalImage.png")}
          />
          <View style={styles.playBtns}>
            <View>
            
              <Text style={styles.pBtnHead} >Electron Transport Chain</Text>
            </View>
            <View style={styles.playBtn}>
              <AntDesign name="caretright" size={20} color="#fff" />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.puzzleBtns, styles.boxShadow]} onPress={() => navigation.navigate("draggblebox")} >
          <Text style={styles.puzzleHead}>Puzzle 2</Text>
          <Image
            style={styles.puzzleBtn}
            source={require("../../assets/images/originalImage.png")}
          />
          <View style={styles.playBtns}>
            <View>
            
              <Text style={styles.pBtnHead} >Glycogen Metabolism</Text>
            </View>
            <View style={styles.playBtn}>
              <AntDesign name="caretright" size={20} color="#fff" />
            </View>
          </View>
        </TouchableOpacity>
      </View>
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
    marginTop: 30,
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
    fontWeight: "500",
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
    width: 250,
    height: 70,
    objectFit: "contain",
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
    marginBottom: 15,
  },
  belowhead: {
    color: "#000",
    textAlign: "center",
    fontFamily: "pop-bold",
    fontSize: 20,
    fontWeight: "800",
    marginBottom:13,
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
  subheading: {
    color: "#003090",
    textAlign: "center",
    fontSize:18,
    fontFamily: "pop-bold",
  },
  puzzleBtn: {
    width: 200,
    height: 120,
    borderRadius: 45 / 2,
    borderWidth: 6,
    borderColor: "#003090",
  },
  puzzleBtns: {
    alignItems: "center",
    borderRadius: 20,
    marginBottom: 20,
    backgroundColor: "#003090",
    paddingVertical: 20,
  },

  boxShadow: {
    backgroundColor: "white",
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: "rgba(0, 0, 0, 0.3)",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  pb50: {
    paddingBottom: 50,
  },
  playBtn: {
    backgroundColor: "#003090",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,

    borderRadius: 100,
  },
  whiteColor: { color: "#fff" },
  playBtns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop:10,
   gap:20,
  },
  puzzleHead: {
    fontSize: 20,
    fontFamily: "pop-bold",
    color: "#003090",
  },
  pBtnHead:{
    fontFamily: "pop-reg",
  },
});

export default Home;
