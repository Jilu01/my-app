import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTranslation } from '../i18n';

export const StatsScreen: React.FC = () => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.headerTitle}>{t('statistics')}</Text>

        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>{t('totalPakCount')}</Text>
          <Text style={styles.metricValue}>2</Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>{t('ahmedabadWeather')}</Text>
          <Text style={styles.metricValue}>Sunny, 32°C</Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>{t('soilTrend')}</Text>
          <Text style={styles.metricValue}>Stable pH, Moderate Moisture</Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>{t('recommendedCrops')}</Text>
          <Text style={styles.metricValue}>Groundnut, Millet, Cotton</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F5F4',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 54,
    paddingBottom: 38,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#074D28',
    marginBottom: 20,
  },
  metricCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 18,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 4,
  },
  metricLabel: {
    fontSize: 13,
    color: '#657770',
    marginBottom: 10,
    fontWeight: '700',
  },
  metricValue: {
    fontSize: 16,
    color: '#1A2822',
    fontWeight: '700',
    lineHeight: 22,
  },
});
