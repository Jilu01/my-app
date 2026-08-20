import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface AppState {
  location: string;
  latitude: number;
  longitude: number;
  startDate: string;
  startTime: string;
  isSetupComplete: boolean;
}

interface AppContextValue {
  appState: AppState;
  setLocation: (name: string, lat: number, lon: number) => void;
  setStartDate: (date: string) => void;
  setStartTime: (time: string) => void;
  completeSetup: () => void;
}

const defaultState: AppState = {
  location: 'Ahmedabad',
  latitude: 23.0225,
  longitude: 72.5714,
  startDate: '20/08/2026',
  startTime: '06:00',
  isSetupComplete: true,
};

const AppContext = createContext<AppContextValue>({
  appState: defaultState,
  setLocation: () => {},
  setStartDate: () => {},
  setStartTime: () => {},
  completeSetup: () => {},
});

export const AppContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [appState, setAppState] = useState<AppState>(defaultState);

  const setLocation = (name: string, lat: number, lon: number) => {
    setAppState((prev) => ({ ...prev, location: name, latitude: lat, longitude: lon }));
  };

  const setStartDate = (date: string) => {
    setAppState((prev) => ({ ...prev, startDate: date }));
  };

  const setStartTime = (time: string) => {
    setAppState((prev) => ({ ...prev, startTime: time }));
  };

  const completeSetup = () => {
    setAppState((prev) => ({ ...prev, isSetupComplete: true }));
  };

  return (
    <AppContext.Provider value={{ appState, setLocation, setStartDate, setStartTime, completeSetup }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppContextProvider');
  return ctx;
};
