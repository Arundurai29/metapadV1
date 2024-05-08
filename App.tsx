import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import Login from './app/screens/Login';
import Home from './app/screens/Home';
import { useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_APP, FIREBASE_AUTH } from './FireBaseConfig';
import SignUpScreen from './app/screens/Signup';
import NextScreen from './app/nextlevel/NextLevelScreen';
import NextLevelScreen2 from './app/nextlevel/NextLevelScreen2';
import NextLevelScreen3 from './app/nextlevel/NextLevelScreen3';
import NextLevelScreen4 from './app/nextlevel/NextLevelScreen4';
import Levels from './app/levels/levels';
import Game2Levels from './app/levels/Game2Levels';
import Game3Levels from './app/levels/Game3Levels';
import Game4Levels from './app/levels/Game4Levels';
import Level from './app/level/level';
import Level1 from './app/game1/level1';
import Level3 from './app/game1/level3';
import Level2 from './app/game1/level2';
import Level4 from './app/game1/level4';
import Level5 from './app/game1/level5';
import Game2Level1 from './app/game2/game2level1';
import Game2Level2 from './app/game2/game2level2';
import Game2Level3 from './app/game2/game2level3';
import Game2Level4 from './app/game2/game2level4';
import Game2Level5 from './app/game2/game2level5';
import Game3Level1 from './app/game3/game3level1';
import Game3Level2 from './app/game3/game3level2';
import Game3Level3 from './app/game3/game3level3';
import Game3Level4 from './app/game3/game3level4';
import Game3Level5 from './app/game3/game3level5';
import Game4Level1 from './app/game4/game4level1';
import Game4Level2 from './app/game4/game4level2';
import Game4Level3 from './app/game4/game4level3';
import Game4Level4 from './app/game4/game4level4';
import Game4Level5 from './app/game4/game4level5';
import Game2level from './app/level/game2level';
import Game3level from './app/level/game3level';
import Game4level from './app/level/game4level';
import PlaceholderScreen from './app/screens/Piece';
import Puzzle from './src/Puzzle';
import MetaBites from './app/metabites/metaBites';
import MetaBites1 from './app/metabites/metaBites1';
import MetaBites3 from './app/metabites/metaBites3';
import MetaBites4 from './app/metabites/metaBites4';
import PuzzleGameApp from './app/screens/SoundButton';

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
      <Stack.Navigator screenOptions={{ headerShown: false }}  initialRouteName='PuzzleGameApp'>
        {user ? (
            <Stack.Screen name='Inside' component={Insidelayout} options={{headerShown:false}} />
        ):(
  <Stack.Screen name='Login' component={Login} options={{headerShown:false}} />
        )}
       <Stack.Screen name='SignUp' component={SignUpScreen} options={{headerShown:false}} />
       <Stack.Screen name='Home' component={Home}  options={{headerShown:false}} />
       <Stack.Screen name='level1' component={Level1} options={{headerShown:false}} />
       <Stack.Screen name='draggblebox' component={PlaceholderScreen} options={{headerShown:false}} />
       <Stack.Screen name="NextScreen" component={NextScreen} />
       <Stack.Screen name="NextLevelScreen2" component={NextLevelScreen2} />
       <Stack.Screen name="NextLevelScreen3" component={NextLevelScreen3} />
       <Stack.Screen name="NextLevelScreen4" component={NextLevelScreen4} />
       <Stack.Screen name="MetaBites" component={MetaBites} />
       <Stack.Screen name="MetaBites1" component={MetaBites1} />
       <Stack.Screen name="MetaBites3" component={MetaBites3} />
       <Stack.Screen name="MetaBites4" component={MetaBites4} />
       <Stack.Screen name="Levels" component={Levels} />
       <Stack.Screen name="level2" component={Level2} />
       <Stack.Screen name="level3" component={Level3} />
       <Stack.Screen name="level4" component={Level4} />
       <Stack.Screen name="level5" component={Level5} />
       <Stack.Screen name="game2level1" component={Game2Level1} />
       <Stack.Screen name="game2level2" component={Game2Level2} />
       <Stack.Screen name="game2level3" component={Game2Level3} />
       <Stack.Screen name="game2level4" component={Game2Level4} />
       <Stack.Screen name="game2level5" component={Game2Level5} />
       <Stack.Screen name="game3level1" component={Game3Level1} />
       <Stack.Screen name="game3level2" component={Game3Level2} />
       <Stack.Screen name="game3level3" component={Game3Level3} />
       <Stack.Screen name="game3level4" component={Game3Level4} />
       <Stack.Screen name="game3level5" component={Game3Level5} />
       <Stack.Screen name="game4level1" component={Game4Level1} />
       <Stack.Screen name="game4level2" component={Game4Level2} />
       <Stack.Screen name="game4level3" component={Game4Level3} />
       <Stack.Screen name="game4level4" component={Game4Level4} />
       <Stack.Screen name="game4level5" component={Game4Level5} />
       <Stack.Screen name="game2levels" component={Game2Levels} />
       <Stack.Screen name="game3levels" component={Game3Levels} />
       <Stack.Screen name="game4levels" component={Game4Levels} />
       <Stack.Screen name="Level" component={Level} />
       <Stack.Screen name="game2level" component={Game2level} />
       <Stack.Screen name="game3level" component={Game3level} />
       <Stack.Screen name="game4level" component={Game4level} />
       
      </Stack.Navigator>
      
    </NavigationContainer>
  );
}

