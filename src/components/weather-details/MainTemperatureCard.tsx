import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path, Circle, G } from 'react-native-svg';

interface MainTemperatureCardProps {
  temperature: number;
  feelsLike: number;
  highTemp: number;
  lowTemp: number;
  condition: string;
}

export const MainTemperatureCard: React.FC<MainTemperatureCardProps> = ({
  temperature,
  feelsLike,
  highTemp,
  lowTemp,
  condition,
}) => {
  return (
    <View style={styles.mainTempCard}>
      <View style={styles.weatherConditionRow}>
        <Text style={styles.weatherCondition}>{condition}</Text>
        <View style={styles.weatherIconContainer}>
          <Svg width={80} height={60} viewBox="0 0 80 60">
            <G transform="translate(40, 30)">
              <Circle r={12} fill="#FFC72C" />
              <Path
                d="M 0 -18 L 0 -14 M 0 14 L 0 18 M -18 0 L -14 0 M 14 0 L 18 0 M -12 -12 L -9 -9 M 9 9 L 12 12 M -12 12 L -9 9 M 9 -9 L 12 -12"
                stroke="#FFB800"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </G>
            <Path
              d="M 15 45 A 12 12 0 0 1 35 32 A 14 14 0 0 1 57 37 A 10 10 0 0 1 60 55 L 18 55 A 10 10 0 0 1 15 45 Z"
              fill="#BBE2FF"
              stroke="#8EC5FC"
              strokeWidth={2}
            />
          </Svg>
        </View>
      </View>

      <View style={styles.tempDisplayRow}>
        <View style={styles.mainTempWrapper}>
          <Text style={styles.tempPlus}>+</Text>
          <Text style={styles.tempValue}>{temperature}</Text>
          <Text style={styles.tempUnit}>°C</Text>
        </View>
        <View style={styles.tempDetails}>
          <Text style={styles.feelsLike}>Feels like {feelsLike}°C</Text>
          <View style={styles.hiLoContainer}>
            <Text style={styles.hiLoText}>H: {highTemp}°C</Text>
            <Text style={styles.hiLoText}>L: {lowTemp}°C</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainTempCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#07361D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  },
  weatherConditionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  weatherCondition: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A2822',
  },
  weatherIconContainer: {
    width: 80,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tempDisplayRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mainTempWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  tempPlus: {
    fontSize: 36,
    fontWeight: '700',
    color: '#1A2822',
    marginTop: 4,
  },
  tempValue: {
    fontSize: 52,
    fontWeight: '700',
    color: '#1A2822',
    lineHeight: 56,
  },
  tempUnit: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1A2822',
    marginTop: 6,
    marginLeft: 2,
  },
  tempDetails: {
    alignItems: 'flex-end',
  },
  feelsLike: {
    fontSize: 14,
    color: '#657770',
    marginBottom: 8,
  },
  hiLoContainer: {
    justifyContent: 'center',
  },
  hiLoText: {
    fontSize: 14,
    color: '#657770',
    lineHeight: 20,
    fontWeight: '500',
  },
});
