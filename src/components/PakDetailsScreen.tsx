import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import { useTranslation } from '../i18n';

export const PakDetailsScreen: React.FC<{ navigation: any; route: any }> = ({ navigation, route }) => {
  const { pak } = route.params;
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <View style={[styles.headerRow, { paddingTop: Math.max(insets.top, 20) + 14 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ArrowLeft size={24} color="#1A2822" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{pak.name}</Text>
        <View style={styles.spacer} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.infoCard}>
          <Text style={styles.label}>{t('region')}</Text>
          <Text style={styles.value}>{pak.region}</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.label}>{t('weather')}</Text>
          <Text style={styles.value}>{pak.weather}</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.label}>{t('primaryCrop')}</Text>
          <Text style={styles.value}>{pak.cropType}</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.label}>{t('soilType')}</Text>
          <Text style={styles.value}>{pak.soil}</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.label}>{t('recommendations')}</Text>
          <Text style={styles.value}>{pak.details}</Text>
        </View>
        <View style={styles.quickStatsRow}>
          <View style={styles.quickCard}>
            <Text style={styles.quickLabel}>{t('rainfall')}</Text>
            <Text style={styles.quickValue}>12 mm</Text>
          </View>
          <View style={styles.quickCard}>
            <Text style={styles.quickLabel}>{t('humidity')}</Text>
            <Text style={styles.quickValue}>62%</Text>
          </View>
        </View>
        <View style={styles.quickStatsRow}>
          <View style={styles.quickCard}>
            <Text style={styles.quickLabel}>{t('phLabel')}</Text>
            <Text style={styles.quickValue}>7.0</Text>
          </View>
          <View style={styles.quickCard}>
            <Text style={styles.quickLabel}>{t('irrigation')}</Text>
            <Text style={styles.quickValue}>Moderate</Text>
          </View>
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,

    paddingBottom: 18,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E1ECE5',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A2822',
  },
  spacer: {
    width: 32,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 38,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 14,
    elevation: 4,
  },
  label: {
    fontSize: 12,
    color: '#657770',
    marginBottom: 8,
    fontWeight: '700',
  },
  value: {
    fontSize: 16,
    color: '#1A2822',
    lineHeight: 24,
  },
  quickStatsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  quickCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    flexBasis: '48%',
    minWidth: 140,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  quickLabel: {
    fontSize: 12,
    color: '#657770',
    marginBottom: 8,
    fontWeight: '700',
  },
  quickValue: {
    fontSize: 16,
    color: '#1A2822',
    fontWeight: '700',
  },
});
