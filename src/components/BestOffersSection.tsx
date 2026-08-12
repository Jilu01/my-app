import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useTranslation } from '../i18n';

const farmOffer1 = require('../../assets/images/farm_offer_1.jpg');
const farmOffer2 = require('../../assets/images/farm_offer_2.jpg');

export const BestOffersSection: React.FC = () => {
  const { t } = useTranslation();
  const { width } = useWindowDimensions();
  const itemWidth = Math.min(Math.max(width * 0.72, 180), 260);
  const itemHeight = itemWidth * 0.6;

  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>{t('bestOffers')}</Text>
        <TouchableOpacity activeOpacity={0.7}>
          <Text style={styles.viewAllText}>{t('viewAll')}</Text>
        </TouchableOpacity>
      </View>

      {/* Horizontal Scrollable Offers List */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        snapToInterval={itemWidth + 14}
        decelerationRate="fast"
      >
        <TouchableOpacity style={[styles.offerCard, { width: itemWidth, height: itemHeight }]} activeOpacity={0.85}>
          <Image source={farmOffer1} style={styles.offerImage} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.offerCard, { width: itemWidth, height: itemHeight }]} activeOpacity={0.85}>
          <Image source={farmOffer2} style={styles.offerImage} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 22,
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A2822',
  },
  viewAllText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#074D28',
  },
  scrollContent: {
    paddingLeft: 20,
    paddingRight: 10,
  },
  offerCard: {
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 14,
    backgroundColor: '#E0E8E4',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  offerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
