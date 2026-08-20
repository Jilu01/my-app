import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Search, Mic, ChevronDown, MapPin } from 'lucide-react-native';
import { useTranslation } from '../i18n';
import { useAppContext } from '../context/AppContext';

const userAvatar = require('../../assets/images/user_avatar.jpg');

interface HeaderProps {
  onSearchChange?: (text: string) => void;
  navigation?: any;
}

// Format date based on language
const formatDate = (language: string): string => {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  };

  if (language === 'gu') {
    return now.toLocaleDateString('gu-IN', options);
  } else if (language === 'hi') {
    return now.toLocaleDateString('hi-IN', options);
  }
  return now.toLocaleDateString('en-IN', options);
};

// Get time-based greeting
const getGreetingKey = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return 'goodMorning';
  if (hour < 17) return 'goodMorning';
  return 'goodMorning';
};

export const Header: React.FC<HeaderProps> = ({ onSearchChange, navigation }) => {
  const { t, language, setLanguage } = useTranslation();
  const { appState } = useAppContext();
  const nextLanguage = language === 'gu' ? 'hi' : language === 'hi' ? 'en' : 'gu';
  const insets = useSafeAreaInsets();

  const displayLocation = appState.location || 'Ahmedabad';
  const liveDate = formatDate(language);

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 20) + 14 }]}>
      {/* Top Header Row */}
      <View style={styles.topRow}>
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>
            {t('greetingHello')}<Text style={styles.boldGreeting}>{t(getGreetingKey())}</Text>
          </Text>
          <TouchableOpacity
            style={styles.dateSelector}
            activeOpacity={0.7}
            onPress={() => navigation?.navigate('Setup')}
          >
            <Text style={styles.dateText}>{liveDate}</Text>
            <ChevronDown size={14} color="#A7D5BE" style={styles.chevron} />
          </TouchableOpacity>

          {/* Clickable Location Badge */}
          <TouchableOpacity
            style={styles.locationBadge}
            activeOpacity={0.75}
            onPress={() => navigation?.navigate('Setup')}
          >
            <MapPin size={13} color="#A7D5BE" />
            <Text style={styles.locationBadgeText}>{displayLocation}</Text>
            <Text style={styles.changeText}>({t('changeLocation')})</Text>
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
          <TouchableOpacity
            style={styles.avatarWrapper}
            activeOpacity={0.8}
            onPress={() => navigation?.navigate('Profile')}
          >
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
    paddingBottom: 75,
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
  locationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  locationBadgeText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  changeText: {
    fontSize: 11,
    color: '#A7D5BE',
    fontWeight: '400',
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
