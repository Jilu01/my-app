import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Search, Mic, ChevronDown } from 'lucide-react-native';
import { useTranslation } from '../i18n';

const userAvatar = require('../../assets/images/user_avatar.jpg');

interface HeaderProps {
  onSearchChange?: (text: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearchChange }) => {
  const { t, language, setLanguage } = useTranslation();
  const nextLanguage = language === 'gu' ? 'hi' : language === 'hi' ? 'en' : 'gu';
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 20) + 14 }]}>
      {/* Top Header Row */}
      <View style={styles.topRow}>
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>
            {t('greetingHello')}<Text style={styles.boldGreeting}>{t('goodMorning')}</Text>
          </Text>
          <TouchableOpacity style={styles.dateSelector} activeOpacity={0.7}>
            <Text style={styles.dateText}>{t('dateLabel')}</Text>
            <ChevronDown size={14} color="#A7D5BE" style={styles.chevron} />
          </TouchableOpacity>
        </View>

        <View style={styles.rightActions}>
          <TouchableOpacity
            style={styles.languageButton}
            onPress={() => setLanguage(nextLanguage as 'gu' | 'hi' | 'en')}
            activeOpacity={0.7}
          >
            <Text style={styles.languageButtonText}>{language.toUpperCase()}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.avatarWrapper} activeOpacity={0.8}>
            <Image source={userAvatar} style={styles.avatarImage} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Input Bar */}
      <View style={styles.searchBar}>
        <Search size={18} color="#9ECCA4" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder={t('searchPlaceholder')}
          placeholderTextColor="#8FBD96"
          onChangeText={onSearchChange}
        />
        <TouchableOpacity activeOpacity={0.7}>
          <Mic size={18} color="#9ECCA4" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#074D28',
    paddingHorizontal: 20,
    paddingBottom: 75, // Extra space for overlapping weather card
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  greetingContainer: {
    flex: 1,
    minWidth: 0,
  },
  greetingText: {
    fontSize: 21,
    color: '#E0EFE8',
    fontWeight: '300',
  },
  boldGreeting: {
    fontWeight: '700',
    color: '#FFFFFF',
  },
  dateSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    flexWrap: 'wrap',
  },
  dateText: {
    fontSize: 13,
    color: '#A7D5BE',
    fontWeight: '400',
  },
  chevron: {
    marginLeft: 4,
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageButton: {
    backgroundColor: 'rgba(255,255,255,0.16)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
  },
  languageButtonText: {
    color: '#E0EFE8',
    fontSize: 12,
    fontWeight: '700',
  },
  avatarWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: '#3D7D5B',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.18)',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#FFFFFF',
    paddingVertical: 0,
  },
});
