import React, { useState, useEffect } from 'react';
import { View, Text,AppState } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TimeSpentDisplay = () => {
    const [timeSpent, setTimeSpent] = useState(0);
  
    useEffect(() => {
      loadTimeSpent();
      
      const subscription = AppState.addEventListener('change', handleAppStateChange);
  
      return () => {
        subscription.remove();
      };
    }, []);
  
    const handleAppStateChange = async (nextAppState: string) => {
        if (nextAppState === 'background') {
          // App is transitioning to background, calculate time spent
          const startTime = await AsyncStorage.getItem('startTime');
          if (startTime) {
            const endTime = Date.now();
            const timeDifference = endTime - parseInt(startTime, 10);
            const updatedTimeSpent = timeSpent + timeDifference;
            await AsyncStorage.setItem('timeSpent', updatedTimeSpent.toString());
            setTimeSpent(updatedTimeSpent);
          }
        } else if (nextAppState === 'active') {
          // App is transitioning to active, record start time
          await AsyncStorage.setItem('startTime', Date.now().toString());
        }
      };
      
  
    const loadTimeSpent = async () => {
      const storedTimeSpent = await AsyncStorage.getItem('timeSpent');
      if (storedTimeSpent) {
        setTimeSpent(parseInt(storedTimeSpent, 10));
      }
    };
  
    const hours = Math.floor(timeSpent / 3600000);
    const minutes = Math.floor((timeSpent % 3600000) / 60000);
  
    return (
      <View>
        <Text style={{fontSize:18,alignItems:'center',textAlign:'center',marginLeft:5,marginVertical:0}}>{`${hours} : ${minutes} `}</Text>
      </View>
    );
  };
  
  export default TimeSpentDisplay;