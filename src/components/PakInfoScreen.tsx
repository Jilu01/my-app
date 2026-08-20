import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, MapPin } from 'lucide-react-native';
import { useTranslation } from '../i18n';
import { useAppContext } from '../context/AppContext';

export interface PakItem {
  id: string;
  name: string;
  region: string;
  weather: string;
  soil: string;
  cropType: string;
  details: string;
  // ─── New Fields ───
  startingTime: string;
  endingTime: string;
  sowingDate: string;
  harvestDate: string;
  fertilizerType: string;
  fertilizerSchedule: string;
  fertilizerQuantity: string;
  irrigationType: string;
  irrigationFrequency: string;
  seedVariety: string;
  seedRate: string;
  pesticideInfo: string;
  expectedYield: string;
  estimatedCost: string;
}

const pakList: PakItem[] = [
  {
    id: 'kapash',
    name: 'Kapash Pak',
    region: 'Ahmedabad',
    weather: 'Sunny, 34°C',
    soil: 'Loamy Sand',
    cropType: 'Cotton',
    details: 'High yield cotton pak with stable pH and full-season irrigation.',
    startingTime: 'June - Early',
    endingTime: 'November - Late',
    sowingDate: '15 Jun',
    harvestDate: '20 Nov',
    fertilizerType: 'NPK 10-26-26',
    fertilizerSchedule: 'Every 3 weeks',
    fertilizerQuantity: '50 kg/acre',
    irrigationType: 'Drip Irrigation',
    irrigationFrequency: 'Every 3 days',
    seedVariety: 'BT Cotton Hybrid (Bollgard II)',
    seedRate: '2.5 kg/acre',
    pesticideInfo: 'Imidacloprid 17.8 SL for sucking pests, Profenophos for bollworm',
    expectedYield: '15-18 quintals/acre',
    estimatedCost: '₹12,000/acre',
  },
  {
    id: 'manvi',
    name: 'Manvi Pak',
    region: 'Ahmedabad',
    weather: 'Warm, 31°C',
    soil: 'Sandy Loam',
    cropType: 'Maize',
    details: 'Best for early maize planting, requires regular nutrient monitoring.',
    startingTime: 'June - Mid',
    endingTime: 'October - Early',
    sowingDate: '20 Jun',
    harvestDate: '05 Oct',
    fertilizerType: 'Urea + DAP',
    fertilizerSchedule: 'Every 2 weeks',
    fertilizerQuantity: '60 kg/acre',
    irrigationType: 'Furrow Irrigation',
    irrigationFrequency: 'Every 5 days',
    seedVariety: 'Pioneer P3502 Hybrid',
    seedRate: '8 kg/acre',
    pesticideInfo: 'Chlorantraniliprole for stem borer, Atrazine for weed control',
    expectedYield: '25-30 quintals/acre',
    estimatedCost: '₹10,500/acre',
  },
  {
    id: 'sunflower',
    name: 'Sunflower Pak',
    region: 'Ahmedabad',
    weather: 'Bright, 33°C',
    soil: 'Silty Loam',
    cropType: 'Sunflower',
    details: 'Ideal for sunflower with good drainage and moderate moisture.',
    startingTime: 'January - Early',
    endingTime: 'April - Late',
    sowingDate: '10 Jan',
    harvestDate: '25 Apr',
    fertilizerType: 'NPK 12-32-16',
    fertilizerSchedule: 'Every 3 weeks',
    fertilizerQuantity: '40 kg/acre',
    irrigationType: 'Sprinkler Irrigation',
    irrigationFrequency: 'Every 4 days',
    seedVariety: 'KBSH-44 Hybrid',
    seedRate: '3 kg/acre',
    pesticideInfo: 'Quinalphos for leaf miner, Mancozeb for rust prevention',
    expectedYield: '8-10 quintals/acre',
    estimatedCost: '₹8,000/acre',
  },
  {
    id: 'vegetable',
    name: 'Vegetable Pak',
    region: 'Ahmedabad',
    weather: 'Mild, 29°C',
    soil: 'Rich Loam',
    cropType: 'Mixed Vegetables',
    details: 'Vegetable pak with balanced nutrition and drip irrigation guidance.',
    startingTime: 'October - Early',
    endingTime: 'March - Late',
    sowingDate: '05 Oct',
    harvestDate: '25 Mar',
    fertilizerType: 'Vermicompost + NPK 19-19-19',
    fertilizerSchedule: 'Every 2 weeks',
    fertilizerQuantity: '35 kg/acre',
    irrigationType: 'Drip Irrigation',
    irrigationFrequency: 'Every 2 days',
    seedVariety: 'Tomato (Arka Rakshak), Brinjal (Pusa Purple)',
    seedRate: '0.5 kg/acre',
    pesticideInfo: 'Neem oil spray for aphids, Trichoderma for soil-borne disease',
    expectedYield: '80-120 quintals/acre',
    estimatedCost: '₹15,000/acre',
  },
  {
    id: 'flavor',
    name: 'Flavor Pak',
    region: 'Ahmedabad',
    weather: 'Warm, 30°C',
    soil: 'Loamy Clay',
    cropType: 'Spices',
    details: 'Designed for chili and turmeric, supports aromatic crop rotation.',
    startingTime: 'May - Late',
    endingTime: 'December - Early',
    sowingDate: '28 May',
    harvestDate: '10 Dec',
    fertilizerType: 'FYM + Potash',
    fertilizerSchedule: 'Every 4 weeks',
    fertilizerQuantity: '45 kg/acre',
    irrigationType: 'Flood Irrigation',
    irrigationFrequency: 'Every 5 days',
    seedVariety: 'Guntur Sannam (Chili), Salem (Turmeric)',
    seedRate: '1.5 kg/acre',
    pesticideInfo: 'Fipronil for thrips, Copper oxychloride for leaf spot',
    expectedYield: '12-15 quintals/acre',
    estimatedCost: '₹14,000/acre',
  },
  {
    id: 'greenpulse',
    name: 'Green Pulse Pak',
    region: 'Ahmedabad',
    weather: 'Cloudy, 28°C',
    soil: 'Sandy Clay',
    cropType: 'Pulses',
    details: 'Pulse pak with nitrogen-fixing crops for soil recovery.',
    startingTime: 'June - Mid',
    endingTime: 'September - Late',
    sowingDate: '18 Jun',
    harvestDate: '28 Sep',
    fertilizerType: 'Rhizobium Culture + SSP',
    fertilizerSchedule: 'Basal + 1 top dressing',
    fertilizerQuantity: '20 kg/acre',
    irrigationType: 'Rain-fed + Protective Irrigation',
    irrigationFrequency: 'As needed (rain-fed)',
    seedVariety: 'Moong (IPM 02-3), Urad (PU-31)',
    seedRate: '6 kg/acre',
    pesticideInfo: 'Thiamethoxam for white fly, Carbendazim for wilt',
    expectedYield: '6-8 quintals/acre',
    estimatedCost: '₹6,500/acre',
  },
  {
    id: 'millet',
    name: 'Millet Pak',
    region: 'Ahmedabad',
    weather: 'Dry, 32°C',
    soil: 'Sandy Loam',
    cropType: 'Millet',
    details: 'Low-water millet pak with resilience to heat and low rainfall.',
    startingTime: 'June - Late',
    endingTime: 'October - Mid',
    sowingDate: '25 Jun',
    harvestDate: '15 Oct',
    fertilizerType: 'DAP + Zinc Sulphate',
    fertilizerSchedule: 'Basal + 25 DAS',
    fertilizerQuantity: '30 kg/acre',
    irrigationType: 'Rain-fed',
    irrigationFrequency: 'Minimal (drought tolerant)',
    seedVariety: 'GHB-558 (Bajra Hybrid)',
    seedRate: '1.5 kg/acre',
    pesticideInfo: 'Chlorpyriphos for shoot fly, seed treatment with Thiram',
    expectedYield: '10-14 quintals/acre',
    estimatedCost: '₹5,000/acre',
  },
  {
    id: 'orchard',
    name: 'Orchard Pak',
    region: 'Ahmedabad',
    weather: 'Warm, 30°C',
    soil: 'Rich Loam',
    cropType: 'Fruits',
    details: 'Orchard pak with citrus and sapota, suitable for consistent feed.',
    startingTime: 'Year-round (Perennial)',
    endingTime: 'Year-round (Perennial)',
    sowingDate: 'Monsoon planting preferred',
    harvestDate: 'Dec - Mar (seasonal harvest)',
    fertilizerType: 'NPK 15-15-15 + Micronutrient Mix',
    fertilizerSchedule: 'Every 6 weeks',
    fertilizerQuantity: '100 kg/acre/year',
    irrigationType: 'Drip Irrigation',
    irrigationFrequency: 'Daily in summer, 3 days in winter',
    seedVariety: 'Sapota (Kalipatti), Mosambi (Jaffa)',
    seedRate: '100 saplings/acre',
    pesticideInfo: 'Dimethoate for fruit fly, Bordeaux mixture for gummosis',
    expectedYield: '50-80 quintals/acre',
    estimatedCost: '₹25,000/acre',
  },
  {
    id: 'cotton',
    name: 'Cotton Pak',
    region: 'Ahmedabad',
    weather: 'Hot, 34°C',
    soil: 'Sandy Loam',
    cropType: 'Cotton',
    details: 'Cotton pak configured for pest management and good drainage.',
    startingTime: 'May - Late',
    endingTime: 'November - Mid',
    sowingDate: '25 May',
    harvestDate: '15 Nov',
    fertilizerType: 'NPK 10-26-26 + Sulphur',
    fertilizerSchedule: 'Every 3 weeks',
    fertilizerQuantity: '55 kg/acre',
    irrigationType: 'Drip Irrigation',
    irrigationFrequency: 'Every 3 days',
    seedVariety: 'Mahyco MRC-7351 BG-II',
    seedRate: '2 kg/acre',
    pesticideInfo: 'Spinosad for bollworm, Acetamiprid for jassid and whitefly',
    expectedYield: '14-17 quintals/acre',
    estimatedCost: '₹13,000/acre',
  },
  {
    id: 'herb',
    name: 'Herb & Flavor Pak',
    region: 'Ahmedabad',
    weather: 'Mild, 29°C',
    soil: 'Loamy Sand',
    cropType: 'Herbs',
    details: 'Herb pak for mint, coriander, and basil with irrigation control.',
    startingTime: 'October - Mid',
    endingTime: 'February - Late',
    sowingDate: '15 Oct',
    harvestDate: '25 Feb',
    fertilizerType: 'Organic Manure + Urea',
    fertilizerSchedule: 'Every 2 weeks',
    fertilizerQuantity: '25 kg/acre',
    irrigationType: 'Sprinkler Irrigation',
    irrigationFrequency: 'Every 2 days',
    seedVariety: 'Coriander (Gujarat-2), Mint (Mentha arvensis)',
    seedRate: '10 kg/acre',
    pesticideInfo: 'Neem oil for aphids, Trichoderma for damping off',
    expectedYield: '30-40 quintals/acre',
    estimatedCost: '₹7,500/acre',
  },
  {
    id: 'richveg',
    name: 'Rich Veg Pak',
    region: 'Ahmedabad',
    weather: 'Sunny, 31°C',
    soil: 'Rich Loam',
    cropType: 'Leafy Vegetables',
    details: 'High-production vegetable pak with moisture-retention nutrients.',
    startingTime: 'September - Late',
    endingTime: 'February - Mid',
    sowingDate: '28 Sep',
    harvestDate: '15 Feb',
    fertilizerType: 'Vermicompost + Urea',
    fertilizerSchedule: 'Every 10 days',
    fertilizerQuantity: '30 kg/acre',
    irrigationType: 'Drip Irrigation',
    irrigationFrequency: 'Daily',
    seedVariety: 'Spinach (All Green), Methi (Kasuri)',
    seedRate: '12 kg/acre',
    pesticideInfo: 'Beauveria bassiana for caterpillar, Neem for leaf miner',
    expectedYield: '60-90 quintals/acre',
    estimatedCost: '₹9,000/acre',
  },
  {
    id: 'seedflow',
    name: 'SeedFlow Pak',
    region: 'Ahmedabad',
    weather: 'Warm, 32°C',
    soil: 'Loamy Clay',
    cropType: 'Sunflower & Millet',
    details: 'Mixed crop pak with sunflowers and millets for diversified yield.',
    startingTime: 'June - Early',
    endingTime: 'October - Late',
    sowingDate: '05 Jun',
    harvestDate: '30 Oct',
    fertilizerType: 'DAP + MOP',
    fertilizerSchedule: 'Every 3 weeks',
    fertilizerQuantity: '45 kg/acre',
    irrigationType: 'Sprinkler + Rain-fed',
    irrigationFrequency: 'Every 4 days',
    seedVariety: 'Sunflower (KBSH-44) + Bajra (GHB-558)',
    seedRate: '4 kg/acre (combined)',
    pesticideInfo: 'Quinalphos for stem borer, seed treatment with Thiram',
    expectedYield: '12-16 quintals/acre (combined)',
    estimatedCost: '₹9,500/acre',
  },
];

interface PakInfoScreenProps {
  navigation: any;
}

export const getTranslatedPak = (pak: PakItem, t: (k: any) => string): PakItem => {
  const id = pak.id;
  const nameKey = `pak_${id}_name`;
  const cropKey = `pak_${id}_crop`;
  const detailsKey = `pak_${id}_details`;

  const translatedName = t(nameKey as any);
  const translatedCrop = t(cropKey as any);
  const translatedDetails = t(detailsKey as any);

  const soilKeyMap: { [key: string]: string } = {
    'Loamy Sand': 'soil_loamy_sand',
    'Black Cotton Soil': 'soil_black_cotton',
    'Medium Black Soil': 'soil_medium_black',
    'Sandy Loam': 'soil_sandy_loam',
    'Saline Clay': 'soil_saline_clay',
    'Calcareous Soil': 'soil_calcareous',
    'Laterite Soil': 'soil_laterite',
    'Alluvial Soil': 'soil_alluvial',
    'Desert Sandy': 'soil_desert_sandy',
    'Red Laterite': 'soil_red_laterite',
    'Red Soil': 'soil_red',
    'Silty Loam': 'soil_silty_loam',
    'Rich Loam': 'soil_rich_loam',
    'Loamy Clay': 'soil_loamy_clay',
    'Sandy Clay': 'soil_sandy_clay',
  };

  const translatedSoil = soilKeyMap[pak.soil] ? t(soilKeyMap[pak.soil] as any) : pak.soil;

  return {
    ...pak,
    name: translatedName !== nameKey ? translatedName : pak.name,
    cropType: translatedCrop !== cropKey ? translatedCrop : pak.cropType,
    details: translatedDetails !== detailsKey ? translatedDetails : pak.details,
    soil: translatedSoil,
  };
};

export const PakInfoScreen: React.FC<PakInfoScreenProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const { appState } = useAppContext();
  const insets = useSafeAreaInsets();

  // Show location-aware info
  const displayLocation = appState.location || 'Ahmedabad';

  return (
    <View style={styles.container}>
      <View style={[styles.headerRow, { paddingTop: Math.max(insets.top, 20) + 14 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ArrowLeft size={24} color="#1A2822" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('pakInformation')}</Text>
        <View style={styles.spacer} />
      </View>

      {/* Location indicator */}
      <View style={styles.locationBanner}>
        <MapPin size={14} color="#074D28" />
        <Text style={styles.locationBannerText}>{displayLocation}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.subTitle}>{t('selectAPak')}</Text>
        {pakList.map((rawPak) => {
          const pak = getTranslatedPak(rawPak, t);
          return (
            <TouchableOpacity
              key={pak.id}
              style={styles.pakCard}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('PakDetails', { pak: rawPak })}
            >
              <View style={styles.pakRow}>
                <View style={styles.pakLeft}>
                  <Text style={styles.pakName}>{pak.name}</Text>
                  <Text style={styles.pakRegion}>{displayLocation}</Text>
                </View>
                <View style={styles.pakMeta}>
                  <Text style={styles.pakWeather}>{pak.weather}</Text>
                  <Text style={styles.pakCrop}>{pak.cropType}</Text>
                </View>
              </View>
              <View style={styles.pakBottomRow}>
                <Text style={styles.pakSoil}>{t('soilType')}: {pak.soil}</Text>
                <Text style={styles.pakSeason}>{pak.startingTime} → {pak.endingTime}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
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
  locationBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#E8F5EE',
    gap: 6,
  },
  locationBannerText: {
    fontSize: 13,
    color: '#074D28',
    fontWeight: '600',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 38,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#074D28',
    marginBottom: 16,
  },
  pakCard: {
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
  pakRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  pakLeft: {
    flex: 1,
    minWidth: 0,
  },
  pakName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1A2822',
  },
  pakRegion: {
    fontSize: 13,
    color: '#657770',
    marginTop: 4,
  },
  pakWeather: {
    fontSize: 13,
    color: '#074D28',
    fontWeight: '700',
  },
  pakCrop: {
    fontSize: 12,
    color: '#4A5B53',
    marginTop: 4,
  },
  pakMeta: {
    alignItems: 'flex-end',
  },
  pakBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  pakSoil: {
    fontSize: 13,
    color: '#4A5B53',
  },
  pakSeason: {
    fontSize: 12,
    color: '#074D28',
    fontWeight: '600',
  },
});
