import React, { useState, useRef } from 'react';
import { StyleSheet, View, ScrollView, Platform, useWindowDimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Header } from './src/components/Header';
import { LanguageProvider } from './src/i18n';
import { AppContextProvider } from './src/context/AppContext';
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
import { SetupScreen } from './src/components/SetupScreen';
import { initialProfile, UserProfile } from './src/types/profile';

const Stack = createNativeStackNavigator();

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <View style={styles.screenContainer}>
      <StatusBar style="light" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <Header navigation={navigation} />
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
  );
};

// Inner component that has access to AppContext
const AppInner = () => {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [userProfile, setUserProfile] = useState<UserProfile>(initialProfile);
  const navigationRef = useRef<NavigationContainerRef<any>>(null);
  const { width: windowWidth } = useWindowDimensions();

  const isWeb = Platform.OS === 'web';
  const isWideScreen = isWeb && windowWidth >= 768;

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
    <NavigationContainer
      ref={navigationRef}
      onStateChange={(state) => {
        if (state) {
          const currentRoute = state.routes[state.index];
          setActiveTab(routeNameToTab(currentRoute?.name));
        }
      }}
    >
      <View style={isWideScreen ? styles.webWrapper : styles.mobileWrapper}>
        <View style={isWideScreen ? styles.webContainer : styles.mobileContainer}>
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
              <Stack.Screen name="Setup">
                {(props) => (
                  <SetupScreen {...props} onComplete={() => props.navigation.goBack()} />
                )}
              </Stack.Screen>
            </Stack.Navigator>
          </View>

          <BottomNavigation activeTab={activeTab} onSelectTab={handleTabSelect} />
        </View>
      </View>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <LanguageProvider>
        <AppContextProvider>
          <AppInner />
        </AppContextProvider>
      </LanguageProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  // ─── Web: Full-width website layout ───────────────────
  webWrapper: {
    flex: 1,
    backgroundColor: '#0F1E17',
    alignItems: 'center',
    justifyContent: 'center',
  },
  webContainer: {
    flex: 1,
    width: '100%',
    maxWidth: 480,
    backgroundColor: '#F3F5F4',
    borderRadius: 0,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.35,
    shadowRadius: 24,
    elevation: 10,
  },

  // ─── Mobile: Phone-fit layout ──────────────────────────
  mobileWrapper: {
    flex: 1,
    backgroundColor: '#F3F5F4',
  },
  mobileContainer: {
    flex: 1,
    backgroundColor: '#F3F5F4',
  },

  // ─── Shared ──────────────────────────────────────────
  stackContainer: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: '#F3F5F4',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
});
