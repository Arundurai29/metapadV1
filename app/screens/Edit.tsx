import React, { useEffect, useState } from 'react';
import { 
    View, 
    TextInput, 
    ActivityIndicator, 
    ImageBackground, 
    StyleSheet, 
    Image, 
    KeyboardAvoidingView,
    Platform,
    Text, 
    TouchableOpacity, 
    ScrollView, 
    Alert 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_AUTH, DATABASE } from '../../FireBaseConfig';
import { ref, update } from 'firebase/database';

const profile_bg = require('../../assets/images/login-bg.png');
const logo = require('../../assets/images/metapad.png');

const ProfileEditScreen = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isFocused, setFocused] = useState({
        name: false,
      
      });
      const [isChecked, setChecked] = useState(false); // State to track checkbox status
    
      const localImagePaths = [
        { path: require('../../assets/player/boy.png'), name: 'boy' },
        { path: require('../../assets/player/girl.png'), name: 'girl' },
        { path: require('../../assets/player/man.png'), name: 'man' },
        { path: require('../../assets/player/woman.png'), name: 'woman' },
        { path: require('../../assets/player/man1.png'), name: 'man1' },
    ];

    useEffect(() => {
        const currentUser = FIREBASE_AUTH.currentUser;
        if (currentUser) {
            setUser(currentUser);
            setEmail(currentUser.email);
        }
    }, []);

    const handleSaveProfile = async () => {
        setLoading(true);

        try {
            if (user) {
                const uid = user.uid;
                const userRef = ref(DATABASE, 'users/' + uid);

                await update(userRef, { 
                    name, 
                  
                    profileImage: selectedImage 
                });

                Alert.alert('Success', 'Profile updated successfully');
                navigation.goBack();
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Update Failed', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ImageBackground source={profile_bg} resizeMode="cover" style={styles.container}>
            <KeyboardAvoidingView
  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  style={styles.keyboardAvoidingContainer}
  keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
>
            <ScrollView contentContainerStyle={styles.contentContainer}>
      
                <Text style={styles.head}>Edit Profile</Text>

                <View style={styles.imageContainer}>
                    {localImagePaths.map((image, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => setSelectedImage(image.name)}
                            style={[
                                styles.imageWrapper,
                                selectedImage === image.name && styles.selectedImageWrapper,
                            ]}
                        >
                            <Image source={image.path} style={styles.image} />
                        </TouchableOpacity>
                    ))}
                </View>

                <TextInput
                     style={{
                        ...styles.input,
                        borderColor: isFocused.name ? '#003090' : '#fff',
                        borderWidth: 1,
                        color: isFocused.name ? '#000' : 'black',
                      }}
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                />
              

                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <TouchableOpacity style={styles.button} onPress={handleSaveProfile}>
                        <Text style={styles.buttonText}>Save Profile</Text>
                    </TouchableOpacity>
                )}
            </ScrollView>
            </KeyboardAvoidingView>
            
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#fff",
    },
    contentContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    Logos: {
        alignItems: 'center',
        marginBottom: 20,
    },
    Logo: {
        width: 100,
        height: 100,
    },
    head: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#3B66CF',
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
        width:'100%',
      },
      keyboardAvoidingContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
      },
    button: {
        marginTop: 20,
        padding: 15,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#3B66CF',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    imageWrapper: {
        padding: 5,
        borderRadius: 5,
        marginHorizontal: 5,
        borderWidth: 2,
        borderColor: '#fff',
    },
    selectedImageWrapper: {
        borderColor: '#3B66CF',
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 50,
    },
});

export default ProfileEditScreen;
