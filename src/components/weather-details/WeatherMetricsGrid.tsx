import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Droplets, Wind, Gauge, Cloud } from 'lucide-react-native';
import { useTranslation } from '../../i18n';

interface WeatherMetricsGridProps {
  humidity: number;
  windSpeed: number;
  pressure: number;
  precipitation: number;
}

export const WeatherMetricsGrid: React.FC<WeatherMetricsGridProps> = ({
  humidity,
  windSpeed,
  pressure,
  precipitation,
}) => {
  const { t } = useTranslation();
  return (
    <View style={styles.metricsSection}>
      <Text style={styles.sectionTitle}>{t('currentConditions')}</Text>
      <View style={styles.metricsGrid}>
        <MetricCard
          icon={<Droplets size={24} color="#4A90A4" />}
          label={t('humidity')}
          value={`${humidity}%`}
        />
        <MetricCard
          icon={<Wind size={24} color="#4A90A4" />}
          label={t('windSpeed')}
          value={`${windSpeed} km/h`}
        />
        <MetricCard
          icon={<Gauge size={24} color="#4A90A4" />}
          label={t('pressure')}
          value={`${pressure} hPa`}
        />
        <MetricCard
          icon={<Cloud size={24} color="#4A90A4" />}
          label={t('precipitation')}
          value={`${precipitation} mm`}
        />
      </View>
    </View>
  );
};

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ icon, label, value }) => {
  return (
    <View style={styles.metricCard}>
      <View style={styles.metricIconContainer}>{icon}</View>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  metricsSection: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A2822',
    marginBottom: 12,
    marginLeft: 4,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    width: '48%',
    marginBottom: 12,
    shadowColor: '#07361D',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 3,
  },
  metricIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E8F4F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  metricLabel: {
    fontSize: 13,
    color: '#7C8C85',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A2822',
  },
});
