import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MapPin } from 'lucide-react-native';
import Svg, { Path, Circle, G } from 'react-native-svg';
import { useTranslation } from '../i18n';
import { useAppContext } from '../context/AppContext';

interface WeatherInfo {
  temperature: number;
  humidity: number;
  precipitation: number;
  pressure: number;
  windSpeed: number;
  tempHigh: number;
  tempLow: number;
  sunrise: string;
  sunset: string;
}

export const WeatherCard: React.FC<{ navigation?: any }> = ({ navigation }) => {
  const { t } = useTranslation();
  const { appState } = useAppContext();
  const [weather, setWeather] = useState<WeatherInfo | null>(null);
  const [loading, setLoading] = useState(false);

  const displayLocation = appState.location || 'Ahmedabad';
  const lat = appState.latitude || 23.0225;
  const lon = appState.longitude || 72.5714;

  useEffect(() => {
    fetchWeather();
  }, [appState.latitude, appState.longitude]);

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,surface_pressure,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto`;
      const response = await fetch(url);
      const data = await response.json();

      const sunriseTime = data.daily?.sunrise?.[0]
        ? new Date(data.daily.sunrise[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : '6:00 AM';
      const sunsetTime = data.daily?.sunset?.[0]
        ? new Date(data.daily.sunset[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : '6:30 PM';

      setWeather({
        temperature: Math.round(data.current.temperature_2m),
        humidity: data.current.relative_humidity_2m,
        precipitation: data.current.precipitation,
        pressure: Math.round(data.current.surface_pressure),
        windSpeed: data.current.wind_speed_10m,
        tempHigh: Math.round(data.daily.temperature_2m_max[0]),
        tempLow: Math.round(data.daily.temperature_2m_min[0]),
        sunrise: sunriseTime,
        sunset: sunsetTime,
      });
    } catch (e) {
      // Fallback to static data
      setWeather({
        temperature: 17,
        humidity: 40,
        precipitation: 5.1,
        pressure: 450,
        windSpeed: 23,
        tempHigh: 23,
        tempLow: 14,
        sunrise: '5:25 AM',
        sunset: '8:04 PM',
      });
    } finally {
      setLoading(false);
    }
  };

  const temp = weather?.temperature ?? 17;
  const isPositive = temp >= 0;

  return (
    <TouchableOpacity 
      style={styles.cardContainer}
      onPress={() => navigation?.navigate('WeatherDetails')}
      activeOpacity={0.7}
    >
      {/* Top Header Row: Location & Weather Illustration */}
      <View style={styles.topRow}>
        <View style={styles.locationContainer}>
          <MapPin size={18} color="#1A2822" style={styles.pinIcon} />
          <Text style={styles.locationText}>{displayLocation}</Text>
        </View>

        {/* Night Weather SVG Graphic */}
        <View style={styles.weatherIconWrapper}>
          <Svg width={70} height={52} viewBox="0 0 70 52">
            {/* Stars */}
            <G fill="#FFD700">
              <Path d="M 16,8 L 17,11 L 20,11 L 18,13 L 19,16 L 16,14 L 13,16 L 14,13 L 12,11 L 15,11 Z" transform="scale(0.45) translate(10, 0)" />
              <Path d="M 16,8 L 17,11 L 20,11 L 18,13 L 19,16 L 16,14 L 13,16 L 14,13 L 12,11 L 15,11 Z" transform="scale(0.35) translate(65, 10)" />
              <Path d="M 16,8 L 17,11 L 20,11 L 18,13 L 19,16 L 16,14 L 13,16 L 14,13 L 12,11 L 15,11 Z" transform="scale(0.3) translate(40, -10)" />
            </G>
            {/* Crescent Moon */}
            <Path
              d="M 50 8 A 12 12 0 1 0 60 25 A 14 14 0 0 1 50 8 Z"
              fill="#FFC72C"
              stroke="#D8A010"
              strokeWidth={1}
            />
            {/* Cloud */}
            <Path
              d="M 15 36 A 10 10 0 0 1 30 26 A 12 12 0 0 1 48 30 A 9 9 0 0 1 50 46 L 16 46 A 8 8 0 0 1 15 36 Z"
              fill="#BBE2FF"
              stroke="#8EC5FC"
              strokeWidth={1.5}
            />
          </Svg>
        </View>
      </View>

      {/* Main Temperature display */}
      {loading ? (
        <View style={styles.loadingRow}>
          <ActivityIndicator size="small" color="#074D28" />
        </View>
      ) : (
        <View style={styles.tempRow}>
          <View style={styles.mainTempWrapper}>
            <Text style={styles.tempPlus}>{isPositive ? '+' : '-'}</Text>
            <Text style={styles.tempValue}>{Math.abs(temp)}</Text>
            <Text style={styles.tempUnit}>°C</Text>
          </View>

          <View style={styles.hiLoContainer}>
            <Text style={styles.hiLoText}>H: {weather?.tempHigh ?? 23}°C</Text>
            <Text style={styles.hiLoText}>L: {weather?.tempLow ?? 14}°C</Text>
          </View>
        </View>
      )}

      {/* Dotted Line Separator */}
      <View style={styles.dottedLineContainer}>
        <Svg height="2" width="100%">
          <Path
            d="M0 1 L500 1"
            stroke="#E1ECE5"
            strokeWidth="2"
            strokeDasharray="4, 4"
          />
        </Svg>
      </View>

      {/* Weather Metrics Grid */}
      <View style={styles.metricsGrid}>
        <View style={styles.metricItem}>
          <Text style={styles.metricLabel} numberOfLines={1}>{t('humidity')}</Text>
          <Text style={styles.metricValue}>{weather?.humidity ?? 40}%</Text>
        </View>

        <View style={styles.metricItem}>
          <Text style={styles.metricLabel} numberOfLines={1}>{t('precipitation')}</Text>
          <Text style={styles.metricValue}>{weather?.precipitation ?? 5.1}ml</Text>
        </View>

        <View style={styles.metricItem}>
          <Text style={styles.metricLabel} numberOfLines={1}>{t('pressure')}</Text>
          <Text style={styles.metricValue}>{weather?.pressure ?? 450} hpa</Text>
        </View>

        <View style={styles.metricItem}>
          <Text style={styles.metricLabel} numberOfLines={1}>{t('windSpeed')}</Text>
          <Text style={styles.metricValue}>{weather?.windSpeed ?? 23}m/s</Text>
        </View>
      </View>

      {/* Sunrise & Sunset Arc Timeline */}
      <View style={styles.sunTimelineRow}>
        <View style={styles.sunTimeCol}>
          <Text style={styles.sunTimeText}>{weather?.sunrise ?? '5:25 AM'}</Text>
          <Text style={styles.sunTimeLabel}>{t('sunrise')}</Text>
        </View>

        {/* Curved Dotted Arc with Sun */}
        <View style={styles.arcContainer}>
          <Svg width={130} height={34} viewBox="0 0 130 34">
            <Path
              d="M 8 30 Q 65 -4 122 30"
              fill="none"
              stroke="#A8BDB4"
              strokeWidth="1.5"
              strokeDasharray="3, 3"
            />
            {/* Sun Icon positioned on the arc curve */}
            <G transform="translate(86, 9)">
              <Circle r={6.5} fill="#FFC72C" />
              {/* Sun rays */}
              <Path
                d="M 0 -9 L 0 -7 M 0 7 L 0 9 M -9 0 L -7 0 M 7 0 L 9 0 M -6 -6 L -4.5 -4.5 M 4.5 4.5 L 6 6 M -6 6 L -4.5 4.5 M 4.5 -4.5 L 6 -6"
                stroke="#FFB800"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </G>
          </Svg>
        </View>

        <View style={[styles.sunTimeCol, { alignItems: 'flex-end' }]}>
          <Text style={styles.sunTimeText}>{weather?.sunset ?? '8:04 PM'}</Text>
          <Text style={styles.sunTimeLabel}>{t('sunset')}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 18,
    marginTop: -55,
    borderRadius: 24,
    paddingVertical: 18,
    paddingHorizontal: 16,
    shadowColor: '#07361D',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 6,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pinIcon: {
    marginRight: 6,
  },
  locationText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A2822',
  },
  weatherIconWrapper: {
    width: 65,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingRow: {
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tempRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 2,
    marginBottom: 10,
  },
  mainTempWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  tempPlus: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1A2822',
    marginTop: 2,
  },
  tempValue: {
    fontSize: 46,
    fontWeight: '700',
    color: '#1A2822',
    lineHeight: 50,
  },
  tempUnit: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1A2822',
    marginTop: 4,
    marginLeft: 2,
  },
  hiLoContainer: {
    justifyContent: 'center',
  },
  hiLoText: {
    fontSize: 13,
    color: '#657770',
    lineHeight: 18,
    fontWeight: '500',
  },
  dottedLineContainer: {
    marginVertical: 10,
    height: 2,
    overflow: 'hidden',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  metricItem: {
    alignItems: 'flex-start',
    flexBasis: '48%',
    minWidth: 120,
    paddingRight: 2,
    marginBottom: 10,
  },
  metricLabel: {
    fontSize: 11,
    color: '#7C8C85',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#1A2822',
  },
  sunTimelineRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  sunTimeCol: {
    justifyContent: 'center',
  },
  sunTimeText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1A2822',
  },
  sunTimeLabel: {
    fontSize: 11,
    color: '#7C8C85',
    marginTop: 2,
  },
  arcContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
});
