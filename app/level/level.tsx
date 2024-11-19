import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import * as ScreenOrientation from 'expo-screen-orientation';
import { StatusBar } from 'expo-status-bar';
import ImageViewer from 'react-native-image-zoom-viewer';
import SoundButton from '../screens/SoundButton';

const doctor1 = require('../../assets/images/doctor3.png');
const doctor2 = require('../../assets/images/doctor4.png');
const login_bg = require('../../src/imgpanda.png');
const originalImage = require('../../assets/images/originalImage.jpg');

type RootStackParamList = {
  Home: { uid?: string };
};

type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

const Level: React.FC<{
  route: HomeScreenRouteProp;
}> = ({ route }) => {
  const navigation = useNavigation();
  const { uid, level } = route.params ?? {};
  const [modalVisible, setModalVisible] = useState(false);
  const scaleValue = useState(new Animated.Value(0))[0];

  useEffect(() => {
    const lockScreenOrientation = async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
      );
    };
    const unsubscribe = navigation.addListener('focus', lockScreenOrientation);
    openModal();
    return unsubscribe;
  }, [navigation]);

  const navigateToPrices = () => {
    navigation.navigate('Levels', { uid });
  };

  const openModal = () => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setModalVisible(true);
  };

  const closeModal = () => {
    Animated.timing(scaleValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };

  const images = [{ url: '', props: { source: originalImage } }];

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <StatusBar hidden={true} translucent={true} />
      <ImageBackground
        source={login_bg}
        resizeMode="cover"
        style={styles.container}
      >
        <SoundButton
          soundPath={require('../../src/sound.mp3')}
          onPress={navigateToPrices}
          style={styles.arrowButton}
        >
          <AntDesign name="arrowleft" size={24} color="black" />
        </SoundButton>
        <View style={styles.levelSection}>
          <Image source={doctor1} style={styles.doctorImg} />
          <View style={styles.levels}>
            <Text style={styles.level}>{level?.substr(-6)}</Text>
            <TouchableOpacity onPress={openModal}>
              <Image style={styles.puzzleBtn} source={originalImage} />
            </TouchableOpacity>
            <View style={styles.titles}>
              <Text style={styles.head}>Electron Transport Chain</Text>
              <SoundButton
                soundPath={require('../../src/sound.mp3')}
                onPress={() => navigation.navigate(level, { uid })}
                style={styles.puzzleBtns}
              >
                <Text style={styles.pBtnHead}>Start To Play</Text>
              </SoundButton>
            </View>
          </View>
          <Image source={doctor2} style={styles.doctorImg} />
        </View>
      </ImageBackground>

      {modalVisible && (
        <CustomPopup
          images={images}
          closeModal={closeModal}
          navigation={navigation}
          uid={uid}
          level={level}
        />
      )}
    </ScrollView>
  );
};

const CustomPopup: React.FC<{
  images: { url: string; props: any }[];
  closeModal: () => void;
  navigation: any;
  uid: string;
  level: string;
}> = ({ images, closeModal, navigation, uid, level }) => {
  const scaleValue = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.popupContainer}>
      <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
        <AntDesign name="close" size={24} color="#fff" />
      </TouchableOpacity>
      <Animated.View style={[styles.popupContent, { transform: [{ scale: scaleValue }] }]}>
        <ImageViewer
          style={styles.modalImage}
          backgroundColor="transparent"
          imageUrls={images}
          enableSwipeDown={true}
          onSwipeDown={closeModal}
        />
        <SoundButton
          title="Meta Bites"
          soundPath={require('../../src/sound.mp3')}
          onPress={() => navigation.navigate('MetaBites', { uid, level })}
          style={styles.viewmore}
          textStyle={styles.view}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingTop: 50,
    paddingBottom: 60,
  },
  levelSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  titles: {
    marginTop: 20,
    textAlign: 'center',
  },
  head: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'pop-bold',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 15,
  },
  puzzleBtn: {
    width: '100%',
    height: 150,
    borderRadius: 45 / 2,
    borderWidth: 6,
    borderColor: '#003090',
  },
  puzzleBtns: {
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#003090',
    paddingVertical: 10,
    marginTop: 10,
    width: 'auto',
  },
  viewmore: {
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#003090',
    paddingVertical: 20,
    paddingHorizontal: 30,
    marginTop: 10,
    width: 'auto',
  },
  view: {
    color: '#fff',
    fontSize:22,
  },
  levels: {
    width: '40%',
  },
  doctorImg: {
    width: '30%',
    height: 200,
    transform: [{ rotate: '-90deg' }],
  },
  pBtnHead: {
    color: '#fff',
  },
  level: {
    position: 'absolute',
    backgroundColor: '#003090',
    color: '#fff',
    padding: 5,
    borderRadius: 8,
    zIndex: 3,
    marginLeft: '40%',
    marginTop: -10,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  arrowButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 999,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
  },
  popupContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 30,
  },
  modalImage: {
    width: 550,
    height: 300,
    marginTop: 20,
  },
});

export default Level;
