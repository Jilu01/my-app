import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Sun, Moon } from 'lucide-react-native';
import Svg, { Path, Circle, G } from 'react-native-svg';
import { useTranslation } from '../../i18n';

interface SunCycleCardProps {
  sunrise: string;
  sunset: string;
}

export const SunCycleCard: React.FC<SunCycleCardProps> = ({ sunrise, sunset }) => {
  const { t } = useTranslation();
  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  return (
    <View style={styles.sunCard}>
      <Text style={styles.sectionTitle}>{t('sunCycle')}</Text>
      <View style={styles.sunTimelineRow}>
        <View style={styles.sunTimeCol}>
          <Sun size={28} color="#FFC72C" style={styles.sunIcon} />
          <Text style={styles.sunTimeText}>{formatTime(sunrise)}</Text>
            <Text style={styles.sunTimeLabel}>{t('sunrise')}</Text>
          <Svg width={150} height={40} viewBox="0 0 150 40">
            <Path
              d="M 10 35 Q 75 -5 140 35"
              fill="none"
              stroke="#A8BDB4"
              strokeWidth="2"
              strokeDasharray="4, 4"
            />
            <G transform="translate(95, 12)">
              <Circle r={8} fill="#FFC72C" />
              <Path
                d="M 0 -12 L 0 -9 M 0 9 L 0 12 M -12 0 L -9 0 M 9 0 L 12 0 M -8 -8 L -6 -6 M 6 6 L 8 8 M -8 8 L -6 6 M 6 -6 L 8 -8"
                stroke="#FFB800"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </G>
          </Svg>
        </View>

        <View style={[styles.sunTimeCol, { alignItems: 'flex-end' }]}>
          <Moon size={28} color="#FFC72C" style={styles.sunIcon} />
          <Text style={styles.sunTimeText}>{formatTime(sunset)}</Text>
          <Text style={styles.sunTimeLabel}>Sunset</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sunCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#07361D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A2822',
    marginBottom: 12,
  },
  sunTimelineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  sunTimeCol: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  sunIcon: {
    marginBottom: 8,
  },
  sunTimeText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A2822',
  },
  sunTimeLabel: {
    fontSize: 13,
    color: '#7C8C85',
    marginTop: 4,
  },
  arcContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
});
