import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, MapPin } from 'lucide-react-native';
import { useTranslation } from '../i18n';
import { useAppContext } from '../context/AppContext';

export interface SoilRecord {
  soilType: string;
  ph: number;
  nitrogen: string;
  phosphorus: string;
  potassium: string;
  moisture: string;
  status: string;
}

const DEFAULT_SOIL_DATA: SoilRecord = {
  soilType: 'Loamy Sand',
  ph: 7.2,
  nitrogen: '18 mg/kg',
  phosphorus: '12 mg/kg',
  potassium: '180 mg/kg',
  moisture: '24%',
  status: 'Suitable for millet, groundnut and cotton',
};

// Region-based soil data estimates
const SOIL_DATA_BY_REGION: { [key: string]: SoilRecord } = {
  'Ahmedabad': {
    soilType: 'Loamy Sand',
    ph: 7.2,
    nitrogen: '18 mg/kg',
    phosphorus: '12 mg/kg',
    potassium: '180 mg/kg',
    moisture: '24%',
    status: 'Suitable for millet, groundnut and cotton',
  },
  'Surat': {
    soilType: 'Black Cotton Soil',
    ph: 7.8,
    nitrogen: '22 mg/kg',
    phosphorus: '15 mg/kg',
    potassium: '200 mg/kg',
    moisture: '30%',
    status: 'Suitable for sugarcane, cotton and banana',
  },
  'Vadodara': {
    soilType: 'Medium Black Soil',
    ph: 7.5,
    nitrogen: '20 mg/kg',
    phosphorus: '14 mg/kg',
    potassium: '190 mg/kg',
    moisture: '28%',
    status: 'Suitable for tobacco, wheat and rice',
  },
  'Rajkot': {
    soilType: 'Sandy Loam',
    ph: 7.0,
    nitrogen: '15 mg/kg',
    phosphorus: '10 mg/kg',
    potassium: '160 mg/kg',
    moisture: '20%',
    status: 'Suitable for groundnut, cotton and sesame',
  },
  'Bhavnagar': {
    soilType: 'Saline Clay',
    ph: 8.1,
    nitrogen: '12 mg/kg',
    phosphorus: '8 mg/kg',
    potassium: '145 mg/kg',
    moisture: '18%',
    status: 'Suitable for bajra, jowar and castor',
  },
  'Jamnagar': {
    soilType: 'Calcareous Soil',
    ph: 7.9,
    nitrogen: '14 mg/kg',
    phosphorus: '11 mg/kg',
    potassium: '170 mg/kg',
    moisture: '22%',
    status: 'Suitable for groundnut, wheat and cumin',
  },
  'Junagadh': {
    soilType: 'Laterite Soil',
    ph: 6.5,
    nitrogen: '25 mg/kg',
    phosphorus: '18 mg/kg',
    potassium: '210 mg/kg',
    moisture: '35%',
    status: 'Suitable for mango, sugarcane and coconut',
  },
  'Gandhinagar': {
    soilType: 'Loamy Sand',
    ph: 7.3,
    nitrogen: '17 mg/kg',
    phosphorus: '13 mg/kg',
    potassium: '175 mg/kg',
    moisture: '25%',
    status: 'Suitable for wheat, mustard and vegetables',
  },
  'Anand': {
    soilType: 'Alluvial Soil',
    ph: 7.1,
    nitrogen: '23 mg/kg',
    phosphorus: '16 mg/kg',
    potassium: '195 mg/kg',
    moisture: '32%',
    status: 'Suitable for tobacco, rice and vegetables',
  },
  'Mehsana': {
    soilType: 'Sandy Loam',
    ph: 7.4,
    nitrogen: '16 mg/kg',
    phosphorus: '11 mg/kg',
    potassium: '165 mg/kg',
    moisture: '21%',
    status: 'Suitable for potato, cumin and fennel',
  },
  'Kutch': {
    soilType: 'Desert Sandy',
    ph: 8.3,
    nitrogen: '8 mg/kg',
    phosphorus: '6 mg/kg',
    potassium: '120 mg/kg',
    moisture: '12%',
    status: 'Suitable for dates, castor and bajra',
  },
  'Nashik': {
    soilType: 'Red Laterite',
    ph: 6.8,
    nitrogen: '20 mg/kg',
    phosphorus: '14 mg/kg',
    potassium: '185 mg/kg',
    moisture: '28%',
    status: 'Suitable for grapes, onion and tomato',
  },
  'Pune': {
    soilType: 'Red Soil',
    ph: 6.5,
    nitrogen: '19 mg/kg',
    phosphorus: '13 mg/kg',
    potassium: '178 mg/kg',
    moisture: '26%',
    status: 'Suitable for sugarcane, pomegranate and jowar',
  },
  'Nagpur': {
    soilType: 'Black Cotton Soil',
    ph: 7.6,
    nitrogen: '21 mg/kg',
    phosphorus: '15 mg/kg',
    potassium: '205 mg/kg',
    moisture: '29%',
    status: 'Suitable for oranges, cotton and soybean',
  },
};

interface SoilDataScreenProps {
  navigation: any;
}

export const SoilDataScreen: React.FC<SoilDataScreenProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const { appState } = useAppContext();
  const insets = useSafeAreaInsets();

  const displayLocation = appState.location || 'Ahmedabad';
  const soilData = SOIL_DATA_BY_REGION[displayLocation] || DEFAULT_SOIL_DATA;

  const getSoilTypeTranslation = (soilType: string) => {
    switch (soilType) {
      case 'Loamy Sand': return t('soil_loamy_sand');
      case 'Black Cotton Soil': return t('soil_black_cotton');
      case 'Medium Black Soil': return t('soil_medium_black');
      case 'Sandy Loam': return t('soil_sandy_loam');
      case 'Saline Clay': return t('soil_saline_clay');
      case 'Calcareous Soil': return t('soil_calcareous');
      case 'Laterite Soil': return t('soil_laterite');
      case 'Alluvial Soil': return t('soil_alluvial');
      case 'Desert Sandy': return t('soil_desert_sandy');
      case 'Red Laterite': return t('soil_red_laterite');
      case 'Red Soil': return t('soil_red');
      case 'Silty Loam': return t('soil_silty_loam');
      case 'Rich Loam': return t('soil_rich_loam');
      case 'Loamy Clay': return t('soil_loamy_clay');
      case 'Sandy Clay': return t('soil_sandy_clay');
      default: return soilType;
    }
  };

  const getSoilStatusTranslation = (status: string) => {
    switch (status) {
      case 'Suitable for millet, groundnut and cotton': return t('status_millet_groundnut_cotton');
      case 'Suitable for sugarcane, cotton and banana': return t('status_sugarcane_cotton_banana');
      case 'Suitable for tobacco, wheat and rice': return t('status_tobacco_wheat_rice');
      case 'Suitable for groundnut, cotton and sesame': return t('status_groundnut_cotton_sesame');
      case 'Suitable for bajra, jowar and castor': return t('status_bajra_jowar_castor');
      case 'Suitable for groundnut, wheat and cumin': return t('status_groundnut_wheat_cumin');
      case 'Suitable for mango, sugarcane and coconut': return t('status_mango_sugarcane_coconut');
      case 'Suitable for wheat, mustard and vegetables': return t('status_wheat_mustard_vegetables');
      case 'Suitable for tobacco, rice and vegetables': return t('status_tobacco_rice_vegetables');
      case 'Suitable for potato, cumin and fennel': return t('status_potato_cumin_fennel');
      case 'Suitable for dates, castor and bajra': return t('status_dates_castor_bajra');
      case 'Suitable for grapes, onion and tomato': return t('status_grapes_onion_tomato');
      case 'Suitable for sugarcane, pomegranate and jowar': return t('status_sugarcane_pomegranate_jowar');
      case 'Suitable for oranges, cotton and soybean': return t('status_oranges_cotton_soybean');
      default: return status;
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.headerRow, { paddingTop: Math.max(insets.top, 20) + 14 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ArrowLeft size={24} color="#1A2822" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('soilData')}</Text>
        <View style={styles.spacer} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.subTitle}>{displayLocation} {t('soilReport')}</Text>
        
        {/* Location indicator */}
        <View style={styles.locationRow}>
          <MapPin size={14} color="#074D28" />
          <Text style={styles.locationText}>{displayLocation}, India</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>{t('location')}</Text>
          <Text style={styles.cardValue}>{displayLocation}, India</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>{t('soilType')}</Text>
          <Text style={styles.cardValue}>{getSoilTypeTranslation(soilData.soilType)}</Text>
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
          <Text style={styles.statusValue}>{getSoilStatusTranslation(soilData.status)}</Text>
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
    paddingTop: 14,
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
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
  },
  locationText: {
    fontSize: 13,
    color: '#657770',
    fontWeight: '500',
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
