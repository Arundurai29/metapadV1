// TimeTrackingContext.tsx

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface TimeTrackingContextType {
  totalTime: number;
}

const defaultValue: TimeTrackingContextType = {
  totalTime: 0,
};

export const TimeTrackingContext = createContext<TimeTrackingContextType>(defaultValue);

interface TimeTrackingProviderProps {
  children: ReactNode;
}

export const TimeTrackingProvider: React.FC<TimeTrackingProviderProps> = ({ children }) => {
  const [totalTime, setTotalTime] = useState<number>(0);

  useEffect(() => {
    const loadTotalTime = async () => {
      const savedTotalTime = await AsyncStorage.getItem('totalTime');
      if (savedTotalTime) {
        setTotalTime(parseInt(savedTotalTime, 10));
      }
    };

    loadTotalTime();

    const startTime = new Date().getTime();

    const interval = setInterval(() => {
      const endTime = new Date().getTime();
      const sessionTime = (endTime - startTime) / 1000; // in seconds
      setTotalTime(prevTotalTime => prevTotalTime + sessionTime);
    }, 1000);

    return () => {
      clearInterval(interval);
      AsyncStorage.setItem('totalTime', totalTime.toString());
    };
  }, []);

  return (
    <TimeTrackingContext.Provider value={{ totalTime }}>
      {children}
    </TimeTrackingContext.Provider>
  );
};
