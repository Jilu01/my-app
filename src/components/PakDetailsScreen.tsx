import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { useTranslation } from '../i18n';
import { PakItem, getTranslatedPak } from './PakInfoScreen';

// ─── Section Icon Components ─────────────────────────────
const CalendarIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20">
    <Rect x="2" y="4" width="16" height="14" rx="2" fill="#E8F5EE" stroke="#074D28" strokeWidth="1.5" />
    <Path d="M 6 2 L 6 6 M 14 2 L 14 6" stroke="#074D28" strokeWidth="1.5" strokeLinecap="round" />
    <Path d="M 2 8 L 18 8" stroke="#074D28" strokeWidth="1.5" />
  </Svg>
);

const SeedIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20">
    <Path d="M 10 3 C 5 3 3 8 3 12 C 5 10 8 9 10 9 C 12 9 15 10 17 12 C 17 8 15 3 10 3 Z" fill="#4CAF50" />
    <Path d="M 10 9 L 10 17" stroke="#2E7D32" strokeWidth="1.5" strokeLinecap="round" />
    <Path d="M 10 13 L 7 11 M 10 15 L 13 13" stroke="#2E7D32" strokeWidth="1.2" strokeLinecap="round" />
  </Svg>
);

const FertilizerIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20">
    <Path d="M 6 8 Q 10 4 14 8 L 16 17 Q 10 20 4 17 Z" fill="#FFC107" />
    <Path d="M 8 8 C 8 6 12 6 12 8" stroke="#F57F17" strokeWidth="1.5" fill="none" />
    <Circle cx="10" cy="12" r="2" fill="#FFFFFF" />
  </Svg>
);

const WaterIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20">
    <Path d="M 10 3 C 10 3 4 10 4 13 A 6 6 0 0 0 16 13 C 16 10 10 3 10 3 Z" fill="#2196F3" />
    <Path d="M 8 13 C 8 11 10 9 10 9" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" fill="none" />
  </Svg>
);

const ShieldIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20">
    <Path d="M 10 2 L 17 5 V 10 C 17 14 10 18 10 18 C 10 18 3 14 3 10 V 5 Z" fill="#FF7043" />
    <Path d="M 7 10 L 9 12 L 13 8" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </Svg>
);

const ChartIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20">
    <Rect x="3" y="11" width="3" height="6" rx="1" fill="#074D28" />
    <Rect x="8.5" y="7" width="3" height="10" rx="1" fill="#074D28" />
    <Rect x="14" y="4" width="3" height="13" rx="1" fill="#074D28" />
    <Path d="M 4 9 L 10 5 L 15 3" stroke="#FFC107" strokeWidth="1.5" strokeLinecap="round" fill="none" />
  </Svg>
);

// ─── Detail Row Component ─────────────────────────────
const DetailRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

// ─── Section Card Component ─────────────────────────────
const SectionCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}> = ({ icon, title, children }) => (
  <View style={styles.sectionCard}>
    <View style={styles.sectionHeader}>
      <View style={styles.sectionIconWrapper}>{icon}</View>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
    <View style={styles.sectionContent}>{children}</View>
  </View>
);

export const PakDetailsScreen: React.FC<{ navigation: any; route: any }> = ({ navigation, route }) => {
  const { pak: rawPak } = route.params as { pak: PakItem };
  const { t } = useTranslation();
  const pak = getTranslatedPak(rawPak, t);
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
        {/* Basic Info Cards */}
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

        {/* Quick Stats Row */}
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
            <Text style={styles.quickValue}>{pak.irrigationType || 'Moderate'}</Text>
          </View>
        </View>

        {/* ─── NEW: Season Timeline ────────────── */}
        <SectionCard icon={<CalendarIcon />} title={t('seasonTimeline')}>
          <DetailRow label={t('startingTime')} value={pak.startingTime} />
          <DetailRow label={t('endingTime')} value={pak.endingTime} />
          <DetailRow label={t('sowingDate')} value={pak.sowingDate} />
          <DetailRow label={t('harvestDate')} value={pak.harvestDate} />
        </SectionCard>

        {/* ─── NEW: Seed Information ────────────── */}
        <SectionCard icon={<SeedIcon />} title={t('seedInformation')}>
          <DetailRow label={t('seedVariety')} value={pak.seedVariety} />
          <DetailRow label={t('seedRate')} value={pak.seedRate} />
        </SectionCard>

        {/* ─── NEW: Fertilizer Schedule ────────────── */}
        <SectionCard icon={<FertilizerIcon />} title={t('fertilizerScheduleTitle')}>
          <DetailRow label={t('fertilizerType')} value={pak.fertilizerType} />
          <DetailRow label={t('fertilizerQuantity')} value={pak.fertilizerQuantity} />
          <DetailRow label={t('fertilizerSchedule')} value={pak.fertilizerSchedule} />
        </SectionCard>

        {/* ─── NEW: Irrigation Plan ────────────── */}
        <SectionCard icon={<WaterIcon />} title={t('irrigationPlan')}>
          <DetailRow label={t('irrigationType')} value={pak.irrigationType} />
          <DetailRow label={t('irrigationFrequency')} value={pak.irrigationFrequency} />
        </SectionCard>

        {/* ─── NEW: Pest Management ────────────── */}
        <SectionCard icon={<ShieldIcon />} title={t('pestManagement')}>
          <DetailRow label={t('pesticideInfo')} value={pak.pesticideInfo} />
        </SectionCard>

        {/* ─── NEW: Expected Results ────────────── */}
        <SectionCard icon={<ChartIcon />} title={t('expectedResults')}>
          <DetailRow label={t('expectedYield')} value={pak.expectedYield} />
          <DetailRow label={t('estimatedCost')} value={pak.estimatedCost} />
        </SectionCard>
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

  // ─── Section Card Styles ───────────────────────────
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 14,
    elevation: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EFF3F1',
    paddingBottom: 12,
  },
  sectionIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#F7FAF8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#074D28',
  },
  sectionContent: {
    gap: 4,
  },

  // ─── Detail Row Styles ───────────────────────────
  detailRow: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F7F6',
  },
  detailLabel: {
    fontSize: 12,
    color: '#657770',
    fontWeight: '600',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 15,
    color: '#1A2822',
    lineHeight: 22,
    fontWeight: '500',
  },
});
