import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import Login from './app/screens/Login';
import Home from './app/screens/Home';
import { useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_APP, FIREBASE_AUTH } from './FireBaseConfig';
import SignUpScreen from './app/screens/Signup';
import Jigsaw from './app/screens/Puzzle';
import NextScreen from './app/screens/NextLevelScreen';

import PlaceholderScreen from './app/screens/Piece';
import Puzzle from './src/Puzzle'

const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();
const puzzlegmae=createNativeStackNavigator();

function Insidelayout(){
  return(
    <InsideStack.Navigator>
      <InsideStack.Screen name='Home' component={Home} />
      
    </InsideStack.Navigator>
  )
}




export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('user', user);
      setUser(user);
    }, (error) => {
      console.error('Auth state change error:', error);
    });

    return () => unsubscribe();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        {user ? (
            <Stack.Screen name='Inside' component={Insidelayout} options={{headerShown:false}} />
        ):(
  <Stack.Screen name='Login' component={Login} options={{headerShown:false}} />
        )}
       <Stack.Screen name='SignUp' component={SignUpScreen} options={{headerShown:false}} />
       <Stack.Screen name='Home' component={Home} options={{headerShown:false}} />
       <Stack.Screen name='puzzle' component={Jigsaw} options={{headerShown:false}} />
       <Stack.Screen name='draggblebox' component={PlaceholderScreen} options={{headerShown:false}} />
       <Stack.Screen name="NextScreen" component={NextScreen} />
      </Stack.Navigator>
      
    </NavigationContainer>
  );
}

