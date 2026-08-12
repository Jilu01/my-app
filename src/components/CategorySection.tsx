import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Path, Circle, Rect, Text as SvgText } from 'react-native-svg';
import { useTranslation } from '../i18n';

interface CategoryItem {
  id: string;
  title: string;
  renderIcon: () => React.ReactNode;
}

interface CategorySectionProps {
  onSelectCategory?: (categoryId: string) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({ onSelectCategory }) => {
  const { t } = useTranslation();

  const categories: CategoryItem[] = [
    {
      id: 'duration',
      title: t('duration'),
      renderIcon: () => (
        <Svg width={40} height={40} viewBox="0 0 40 40">
          {/* Blue Bag */}
          <Path
            d="M 12 16 Q 20 10 28 16 L 31 32 Q 20 37 9 32 Z"
            fill="#0F6CBD"
          />
          {/* Bag Drawstring */}
          <Path d="M 14 16 C 14 14 26 14 26 16" stroke="#003E78" strokeWidth="2.5" fill="none" />
          {/* Embedded Clock Circle */}
          <Circle cx="24" cy="24" r="8" fill="#FFFFFF" stroke="#0F6CBD" strokeWidth="2" />
          {/* Clock Hands */}
          <Path d="M 24 19 L 24 24 L 27 24" stroke="#0F6CBD" strokeWidth="1.8" strokeLinecap="round" />
        </Svg>
      ),
    },
    {
      id: 'soil',
      title: t('soil'),
      renderIcon: () => (
        <Svg width={40} height={40} viewBox="0 0 40 40">
          {/* Green Bag */}
          <Path
            d="M 11 17 Q 20 11 29 17 L 31 33 Q 20 38 9 33 Z"
            fill="#107C41"
          />
          {/* Bag tie */}
          <Circle cx="20" cy="16" r="3" fill="#DFF6DD" />
          {/* Yellow Dollar Sign & Upward Arrow Chart */}
          <Circle cx="19" cy="25" r="5" fill="#FFC72C" />
          <SvgText fontSize="8" fontWeight="bold" fill="#107C41" x="17" y="27.5">$</SvgText>
          <Path
            d="M 24 24 L 30 16 M 30 16 L 25 16 M 30 16 L 30 21"
            stroke="#FFB900"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      ),
    },
    {
      id: 'low_risk',
      title: t('lowRisk'),
      renderIcon: () => (
        <Svg width={40} height={40} viewBox="0 0 40 40">
          {/* Briefcase */}
          <Rect x="12" y="16" width="18" height="15" rx="3" fill="#E8EEF5" stroke="#7A8B9E" strokeWidth="1.5" />
          <Path d="M 17 16 V 13 C 17 11.5 23 11.5 23 13 V 16" fill="none" stroke="#7A8B9E" strokeWidth="1.5" />
          <Rect x="18" y="18" width="6" height="2" fill="#7A8B9E" />
          {/* Warning Red Triangle */}
          <Path d="M 12 18 L 16 10 L 20 18 Z" fill="#E81123" />
          <Circle cx="16" cy="16" r="0.8" fill="#FFFFFF" />
          <Rect x="15.5" y="13" width="1" height="2.2" fill="#FFFFFF" />
          {/* Growth chart bars */}
          <Rect x="23" y="24" width="2" height="4" fill="#0078D4" />
          <Rect x="26" y="21" width="2" height="7" fill="#0078D4" />
          <Rect x="29" y="18" width="2" height="10" fill="#E81123" />
        </Svg>
      ),
    },
    {
      id: 'safety',
      title: t('safety'),
      renderIcon: () => (
        <Svg width={40} height={40} viewBox="0 0 40 40">
          {/* Shield */}
          <Path
            d="M 20 8 L 29 12 V 20 C 29 26 20 31 20 31 C 20 31 11 26 11 20 V 12 Z"
            fill="#107C41"
          />
          {/* Checkmark inside shield */}
          <Path
            d="M 16 19 L 19 22 L 24 16"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Supporting Hands */}
          <Path
            d="M 8 28 C 12 25 15 28 17 32 M 32 28 C 28 25 25 28 23 32"
            stroke="#F19E8E"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
        </Svg>
      ),
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{t('investByCategory')}</Text>
      <View style={styles.categoriesRow}>
        {categories.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.categoryCard}
            activeOpacity={0.75}
            onPress={() => onSelectCategory?.(item.id)}
          >
            <View style={styles.iconContainer}>{item.renderIcon()}</View>
            <Text style={styles.categoryTitle} numberOfLines={2} ellipsizeMode="tail">
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 22,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A2822',
    marginBottom: 14,
  },
  categoriesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 8,
    alignItems: 'center',
    flexBasis: '48%',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  iconContainer: {
    height: 42,
    width: 42,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A2822',
    textAlign: 'center',
    flexShrink: 1,
  },
});
