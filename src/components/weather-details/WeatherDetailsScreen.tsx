import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from '../../i18n';
import { WeatherDetailsHeader } from './WeatherDetailsHeader';
import { LocationCard } from './LocationCard';
import { MainTemperatureCard } from './MainTemperatureCard';
import { WeatherMetricsGrid } from './WeatherMetricsGrid';
import { SunCycleCard } from './SunCycleCard';
import { AdditionalInfoCard } from './AdditionalInfoCard';

interface WeatherData {
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    precipitation: number;
    surface_pressure: number;
    wind_speed_10m: number;
    weather_code: number;
  };
  daily: {
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    sunrise: string[];
    sunset: string[];
  };
}

interface WeatherDetailsScreenProps {
  navigation: any;
}

export const WeatherDetailsScreen: React.FC<WeatherDetailsScreenProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    try {
      const url = 'https://api.open-meteo.com/v1/forecast?latitude=23.0225&longitude=72.5714&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,surface_pressure,wind_speed_10m,weather_code&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto';
      const response = await fetch(url);
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (code: number) => {
    if (code === 0) return 'Clear';
    if (code >= 1 && code <= 3) return 'Partly Cloudy';
    if (code >= 45 && code <= 48) return 'Foggy';
    if (code >= 51 && code <= 67) return 'Rainy';
    if (code >= 71 && code <= 77) return 'Snowy';
    if (code >= 80 && code <= 82) return 'Rain Showers';
    if (code >= 95 && code <= 99) return 'Thunderstorm';
    return 'Cloudy';
  };

  if (loading) {
    return (
      <View style={styles.webWrapper}>
        <View style={styles.mobileContainer}>
          <StatusBar style="light" />
          <WeatherDetailsHeader onBack={() => navigation.goBack()} />
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#1A2822" />
            <Text style={styles.loadingText}>{t('loadingWeatherData')}</Text>
          </View>
        </View>
      </View>
    );
  }

  if (!weatherData) {
    return (
      <View style={styles.webWrapper}>
        <View style={styles.mobileContainer}>
          <StatusBar style="light" />
          <WeatherDetailsHeader onBack={() => navigation.goBack()} />
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{t('failedWeatherData')}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={fetchWeatherData}>
              <Text style={styles.retryButtonText}>{t('retry')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  const { current, daily } = weatherData;

  return (
    <View style={styles.webWrapper}>
      <View style={styles.mobileContainer}>
        <StatusBar style="light" />
        <WeatherDetailsHeader onBack={() => navigation.goBack()} />
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <LocationCard
            location="Ahmedabad, India"
            coordinates="23.0225°N, 72.5714°E"
          />
          <MainTemperatureCard
            temperature={Math.round(current.temperature_2m)}
            feelsLike={Math.round(current.apparent_temperature)}
            highTemp={Math.round(daily.temperature_2m_max[0])}
            lowTemp={Math.round(daily.temperature_2m_min[0])}
            condition={getWeatherIcon(current.weather_code)}
          />
          <WeatherMetricsGrid
            humidity={current.relative_humidity_2m}
            windSpeed={current.wind_speed_10m}
            pressure={Math.round(current.surface_pressure)}
            precipitation={current.precipitation}
          />
          <SunCycleCard
            sunrise={daily.sunrise[0]}
            sunset={daily.sunset[0]}
          />
          <AdditionalInfoCard
            apparentTemperature={Math.round(current.apparent_temperature)}
            weatherCode={current.weather_code}
            condition={getWeatherIcon(current.weather_code)}
          />
          <View style={styles.bottomSpacer} />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#657770',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#657770',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#1A2822',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomSpacer: {
    height: 24,
  },
});
