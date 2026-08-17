import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import { useTranslation } from '../i18n';

const pakList = [
  {
    id: 'kapash',
    name: 'Kapash Pak',
    region: 'Ahmedabad',
    weather: 'Sunny, 34°C',
    soil: 'Loamy Sand',
    cropType: 'Cotton',
    details: 'High yield cotton pak with stable pH and full-season irrigation.',
  },
  {
    id: 'manvi',
    name: 'Manvi Pak',
    region: 'Ahmedabad',
    weather: 'Warm, 31°C',
    soil: 'Sandy Loam',
    cropType: 'Maize',
    details: 'Best for early maize planting, requires regular nutrient monitoring.',
  },
  {
    id: 'sunflower',
    name: 'Sunflower Pak',
    region: 'Ahmedabad',
    weather: 'Bright, 33°C',
    soil: 'Silty Loam',
    cropType: 'Sunflower',
    details: 'Ideal for sunflower with good drainage and moderate moisture.',
  },
  {
    id: 'vegetable',
    name: 'Vegetable Pak',
    region: 'Ahmedabad',
    weather: 'Mild, 29°C',
    soil: 'Rich Loam',
    cropType: 'Mixed Vegetables',
    details: 'Vegetable pak with balanced nutrition and drip irrigation guidance.',
  },
  {
    id: 'flavor',
    name: 'Flavor Pak',
    region: 'Ahmedabad',
    weather: 'Warm, 30°C',
    soil: 'Loamy Clay',
    cropType: 'Spices',
    details: 'Designed for chili and turmeric, supports aromatic crop rotation.',
  },
  {
    id: 'greenpulse',
    name: 'Green Pulse Pak',
    region: 'Ahmedabad',
    weather: 'Cloudy, 28°C',
    soil: 'Sandy Clay',
    cropType: 'Pulses',
    details: 'Pulse pak with nitrogen-fixing crops for soil recovery.',
  },
  {
    id: 'millet',
    name: 'Millet Pak',
    region: 'Ahmedabad',
    weather: 'Dry, 32°C',
    soil: 'Sandy Loam',
    cropType: 'Millet',
    details: 'Low-water millet pak with resilience to heat and low rainfall.',
  },
  {
    id: 'orchard',
    name: 'Orchard Pak',
    region: 'Ahmedabad',
    weather: 'Warm, 30°C',
    soil: 'Rich Loam',
    cropType: 'Fruits',
    details: 'Orchard pak with citrus and sapota, suitable for consistent feed.',
  },
  {
    id: 'cotton',
    name: 'Cotton Pak',
    region: 'Ahmedabad',
    weather: 'Hot, 34°C',
    soil: 'Sandy Loam',
    cropType: 'Cotton',
    details: 'Cotton pak configured for pest management and good drainage.',
  },
  {
    id: 'herb',
    name: 'Herb & Flavor Pak',
    region: 'Ahmedabad',
    weather: 'Mild, 29°C',
    soil: 'Loamy Sand',
    cropType: 'Herbs',
    details: 'Herb pak for mint, coriander, and basil with irrigation control.',
  },
  {
    id: 'richveg',
    name: 'Rich Veg Pak',
    region: 'Ahmedabad',
    weather: 'Sunny, 31°C',
    soil: 'Rich Loam',
    cropType: 'Leafy Vegetables',
    details: 'High-production vegetable pak with moisture-retention nutrients.',
  },
  {
    id: 'seedflow',
    name: 'SeedFlow Pak',
    region: 'Ahmedabad',
    weather: 'Warm, 32°C',
    soil: 'Loamy Clay',
    cropType: 'Sunflower & Millet',
    details: 'Mixed crop pak with sunflowers and millets for diversified yield.',
  },
];

interface PakInfoScreenProps {
  navigation: any;
}

export const PakInfoScreen: React.FC<PakInfoScreenProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <View style={[styles.headerRow, { paddingTop: Math.max(insets.top, 20) + 14 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ArrowLeft size={24} color="#1A2822" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('pakInformation')}</Text>
        <View style={styles.spacer} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.subTitle}>{t('selectAPak')}</Text>
        {pakList.map((pak) => (
          <TouchableOpacity
            key={pak.id}
            style={styles.pakCard}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('PakDetails', { pak })}
          >
            <View style={styles.pakRow}>
              <View>
                <Text style={styles.pakName}>{pak.name}</Text>
                <Text style={styles.pakRegion}>{pak.region}</Text>
              </View>
              <View style={styles.pakMeta}>
                <Text style={styles.pakWeather}>{pak.weather}</Text>
                <Text style={styles.pakCrop}>{pak.cropType}</Text>
              </View>
            </View>
            <Text style={styles.pakSoil}>Soil: {pak.soil}</Text>
          </TouchableOpacity>
        ))}
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
  pakSoil: {
    fontSize: 13,
    color: '#4A5B53',
  },
});
