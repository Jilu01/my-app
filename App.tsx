import React, { useState, useRef } from 'react';
import { StyleSheet, View, ScrollView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Header } from './src/components/Header';
import { LanguageProvider } from './src/i18n';
import { WeatherCard } from './src/components/WeatherCard';
import { CategorySection } from './src/components/CategorySection';
import { BestOffersSection } from './src/components/BestOffersSection';
import { BottomNavigation, TabType } from './src/components/BottomNavigation';
import { ProfileScreen } from './src/components/ProfileScreen';
import { WeatherDetailsScreen } from './src/components/weather-details/WeatherDetailsScreen';
import { SoilDataScreen } from './src/components/SoilDataScreen';
import { PakInfoScreen } from './src/components/PakInfoScreen';
import { PakDetailsScreen } from './src/components/PakDetailsScreen';
import { StatsScreen } from './src/components/StatsScreen';
import { initialProfile, UserProfile } from './src/types/profile';

const Stack = createNativeStackNavigator();

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <View style={styles.webWrapper}>
      <View style={styles.mobileContainer}>
        <StatusBar style="light" />
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <Header />
          <WeatherCard navigation={navigation} />
          <CategorySection
            onSelectCategory={(categoryId) => {
              if (categoryId === 'soil') {
                navigation.navigate('SoilData');
              } else if (categoryId === 'duration') {
                navigation.navigate('PakInfo');
              }
            }}
          />
          <BestOffersSection />
        </ScrollView>
      </View>
    </View>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [userProfile, setUserProfile] = useState<UserProfile>(initialProfile);
  const navigationRef = useRef<NavigationContainerRef<any>>(null);

  const getRouteName = (tab: TabType) => {
    switch (tab) {
      case 'home':
        return 'Home';
      case 'farms':
        return 'PakInfo';
      case 'stats':
        return 'Stats';
      case 'profile':
        return 'Profile';
      default:
        return 'Home';
    }
  };

  const routeNameToTab = (routeName?: string): TabType => {
    switch (routeName) {
      case 'Home':
      case 'SoilData':
      case 'WeatherDetails':
        return 'home';
      case 'PakInfo':
      case 'PakDetails':
        return 'farms';
      case 'Stats':
        return 'stats';
      case 'Profile':
        return 'profile';
      default:
        return 'home';
    }
  };

  const handleTabSelect = (tab: TabType) => {
    setActiveTab(tab);
    const routeName = getRouteName(tab);
    navigationRef.current?.navigate(routeName);
  };

  return (
    <LanguageProvider>
      <NavigationContainer ref={navigationRef}>
        <View style={styles.appWrapper}>
          <View style={styles.stackContainer}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="PakInfo" component={PakInfoScreen} />
            <Stack.Screen name="Stats" component={StatsScreen} />
            <Stack.Screen name="Profile">
              {(props) => (
                <ProfileScreen
                  {...props}
                  profile={userProfile}
                  onUpdateProfile={setUserProfile}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="WeatherDetails" component={WeatherDetailsScreen} />
            <Stack.Screen name="SoilData" component={SoilDataScreen} />
            <Stack.Screen name="PakDetails" component={PakDetailsScreen} />
          </Stack.Navigator>
        </View>

        <BottomNavigation activeTab={activeTab} onSelectTab={handleTabSelect} />
      </View>
    </NavigationContainer>
    </LanguageProvider>
  );
}

const styles = StyleSheet.create({
  appWrapper: {
    flex: 1,
    backgroundColor: '#0F1E17',
  },
  stackContainer: {
    flex: 1,
  },
  webWrapper: {
    flex: 1,
    backgroundColor: '#0F1E17',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mobileContainer: {
    width: '100%',
    maxWidth: 412,
    height: Platform.OS === 'web' ? '96%' : '100%',
    maxHeight: 880,
    backgroundColor: '#F3F5F4',
    borderRadius: Platform.OS === 'web' ? 36 : 0,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.35,
    shadowRadius: 24,
    elevation: 10,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
});
