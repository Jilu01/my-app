import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { useTranslation } from '../i18n';

const soilData = {
  location: 'Ahmedabad, India',
  soilType: 'Loamy Sand',
  ph: 7.2,
  nitrogen: '18 mg/kg',
  phosphorus: '12 mg/kg',
  potassium: '180 mg/kg',
  moisture: '24%',
  status: 'Suitable for millet, groundnut and cotton',
};

interface SoilDataScreenProps {
  navigation: any;
}

export const SoilDataScreen: React.FC<SoilDataScreenProps> = ({ navigation }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ArrowLeft size={24} color="#1A2822" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('soilData')}</Text>
        <View style={styles.spacer} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.subTitle}>{t('ahmedabadSoilReport')}</Text>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>{t('location')}</Text>
          <Text style={styles.cardValue}>{soilData.location}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>{t('soilType')}</Text>
          <Text style={styles.cardValue}>{soilData.soilType}</Text>
        </View>

        <View style={styles.gridRow}>
          <View style={styles.smallCard}>
            <Text style={styles.cardLabel}>{t('phLabel')}</Text>
            <Text style={styles.cardValue}>{soilData.ph}</Text>
          </View>
          <View style={styles.smallCard}>
            <Text style={styles.cardLabel}>{t('moisture')}</Text>
            <Text style={styles.cardValue}>{soilData.moisture}</Text>
          </View>
        </View>

        <View style={styles.gridRow}>
          <View style={styles.smallCard}>
            <Text style={styles.cardLabel}>{t('nitrogen')}</Text>
            <Text style={styles.cardValue}>{soilData.nitrogen}</Text>
          </View>
          <View style={styles.smallCard}>
            <Text style={styles.cardLabel}>{t('phosphorus')}</Text>
            <Text style={styles.cardValue}>{soilData.phosphorus}</Text>
          </View>
        </View>

        <View style={styles.smallCardFull}> 
          <Text style={styles.cardLabel}>{t('potassium')}</Text>
          <Text style={styles.cardValue}>{soilData.potassium}</Text>
        </View>

        <View style={styles.statusCard}>
          <Text style={styles.statusLabel}>{t('cropRecommendation')}</Text>
          <Text style={styles.statusValue}>{soilData.status}</Text>
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
    paddingHorizontal: 16,
    paddingTop: 44,
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
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 38,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#074D28',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 14,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 14,
    elevation: 4,
  },
  smallCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 12,
    flexBasis: '48%',
    minWidth: 140,
    marginRight: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  smallCardFull: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 14,
    width: '100%',
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  gridRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  cardLabel: {
    fontSize: 13,
    color: '#657770',
    marginBottom: 6,
    fontWeight: '600',
  },
  cardValue: {
    fontSize: 18,
    color: '#1A2822',
    fontWeight: '700',
  },
  statusCard: {
    backgroundColor: '#E8F4EE',
    borderRadius: 20,
    padding: 18,
    marginTop: 6,
  },
  statusLabel: {
    fontSize: 13,
    color: '#16603D',
    marginBottom: 8,
    fontWeight: '700',
  },
  statusValue: {
    fontSize: 15,
    color: '#1A2822',
    lineHeight: 22,
  },
});
