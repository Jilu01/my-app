import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MapPin, Clock, Calendar, ChevronDown, Navigation } from 'lucide-react-native';
import * as Location from 'expo-location';
import { useTranslation } from '../i18n';
import { useAppContext } from '../context/AppContext';

// Gujarat & nearby districts with coordinates
const LOCATION_OPTIONS = [
  { name: 'Ahmedabad', lat: 23.0225, lon: 72.5714 },
  { name: 'Surat', lat: 21.1702, lon: 72.8311 },
  { name: 'Vadodara', lat: 22.3072, lon: 73.1812 },
  { name: 'Rajkot', lat: 22.3039, lon: 70.8022 },
  { name: 'Bhavnagar', lat: 21.7645, lon: 72.1519 },
  { name: 'Jamnagar', lat: 22.4707, lon: 70.0577 },
  { name: 'Junagadh', lat: 21.5222, lon: 70.4579 },
  { name: 'Gandhinagar', lat: 23.2156, lon: 72.6369 },
  { name: 'Anand', lat: 22.5645, lon: 72.928 },
  { name: 'Mehsana', lat: 23.5880, lon: 72.3693 },
  { name: 'Kutch', lat: 23.7337, lon: 69.8597 },
  { name: 'Nashik', lat: 19.9975, lon: 73.7898 },
  { name: 'Pune', lat: 18.5204, lon: 73.8567 },
  { name: 'Nagpur', lat: 21.1458, lon: 79.0882 },
];

interface SetupScreenProps {
  onComplete: () => void;
}

export const SetupScreen: React.FC<SetupScreenProps> = ({ onComplete }) => {
  const { t } = useTranslation();
  const { setLocation, setStartDate, setStartTime, completeSetup } = useAppContext();
  const insets = useSafeAreaInsets();

  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedLat, setSelectedLat] = useState(0);
  const [selectedLon, setSelectedLon] = useState(0);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [detectingGPS, setDetectingGPS] = useState(false);
  const [errors, setErrors] = useState<{ location?: string; date?: string }>({});

  const handleGPSDetect = async () => {
    setDetectingGPS(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrors({ ...errors, location: t('locationPermissionDenied') });
        setDetectingGPS(false);
        return;
      }
      const loc = await Location.getCurrentPositionAsync({});
      const lat = loc.coords.latitude;
      const lon = loc.coords.longitude;

      // Reverse geocode to get city name
      const addresses = await Location.reverseGeocodeAsync({ latitude: lat, longitude: lon });
      const cityName = addresses[0]?.city || addresses[0]?.subregion || addresses[0]?.region || 'Unknown';

      setSelectedLocation(cityName);
      setSelectedLat(lat);
      setSelectedLon(lon);
      setErrors({ ...errors, location: undefined });
    } catch (e) {
      // Fallback: try nearest from list
      setErrors({ ...errors, location: t('locationPermissionDenied') });
    } finally {
      setDetectingGPS(false);
    }
  };

  const handleSelectManual = (loc: typeof LOCATION_OPTIONS[0]) => {
    setSelectedLocation(loc.name);
    setSelectedLat(loc.lat);
    setSelectedLon(loc.lon);
    setShowDropdown(false);
    setErrors({ ...errors, location: undefined });
  };

  const handleContinue = () => {
    const newErrors: { location?: string; date?: string } = {};
    if (!selectedLocation) newErrors.location = t('locationRequired');
    if (!date) newErrors.date = t('dateRequired');

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLocation(selectedLocation, selectedLat, selectedLon);
    setStartDate(date);
    setStartTime(time || '06:00');
    completeSetup();
    onComplete();
  };

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 20) + 20 }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Welcome Header */}
        <View style={styles.headerSection}>
          <View style={styles.iconCircle}>
            <MapPin size={32} color="#FFFFFF" />
          </View>
          <Text style={styles.title}>{t('setupTitle')}</Text>
          <Text style={styles.subtitle}>{t('welcomeMessage')}</Text>
        </View>

        {/* ─── Location Section ────────────────────────── */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionLabel}>{t('selectLocation')}</Text>

          {/* GPS Button */}
          <TouchableOpacity
            style={styles.gpsButton}
            onPress={handleGPSDetect}
            activeOpacity={0.8}
            disabled={detectingGPS}
          >
            {detectingGPS ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Navigation size={18} color="#FFFFFF" />
            )}
            <Text style={styles.gpsButtonText}>
              {detectingGPS ? t('detectingLocation') : t('useCurrentLocation')}
            </Text>
          </TouchableOpacity>

          {/* Divider with text */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>{t('orSelectManually')}</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Manual Dropdown */}
          <TouchableOpacity
            style={[styles.dropdownButton, errors.location ? styles.errorBorder : null]}
            onPress={() => setShowDropdown(!showDropdown)}
            activeOpacity={0.8}
          >
            <MapPin size={18} color={selectedLocation ? '#074D28' : '#A0ADA6'} />
            <Text style={[styles.dropdownText, !selectedLocation && styles.placeholderText]}>
              {selectedLocation || t('selectLocation')}
            </Text>
            <ChevronDown size={18} color="#657770" />
          </TouchableOpacity>

          {errors.location && <Text style={styles.errorText}>{errors.location}</Text>}

          {showDropdown && (
            <View style={styles.dropdownList}>
              <ScrollView style={styles.dropdownScroll} nestedScrollEnabled>
                {LOCATION_OPTIONS.map((loc) => (
                  <TouchableOpacity
                    key={loc.name}
                    style={[
                      styles.dropdownItem,
                      selectedLocation === loc.name && styles.dropdownItemActive,
                    ]}
                    onPress={() => handleSelectManual(loc)}
                  >
                    <Text
                      style={[
                        styles.dropdownItemText,
                        selectedLocation === loc.name && styles.dropdownItemTextActive,
                      ]}
                    >
                      {loc.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>

        {/* ─── Date Section ────────────────────────── */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionLabel}>{t('startDate')}</Text>
          <View style={[styles.inputRow, errors.date ? styles.errorBorder : null]}>
            <Calendar size={18} color="#074D28" />
            <TextInput
              style={styles.input}
              placeholder="DD/MM/YYYY"
              placeholderTextColor="#A0ADA6"
              value={date}
              onChangeText={(val) => {
                setDate(val);
                if (val) setErrors({ ...errors, date: undefined });
              }}
              keyboardType="default"
            />
          </View>
          {errors.date && <Text style={styles.errorText}>{errors.date}</Text>}
        </View>

        {/* ─── Time Section ────────────────────────── */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionLabel}>{t('startTime')}</Text>
          <View style={styles.inputRow}>
            <Clock size={18} color="#074D28" />
            <TextInput
              style={styles.input}
              placeholder="HH:MM (e.g. 06:00)"
              placeholderTextColor="#A0ADA6"
              value={time}
              onChangeText={setTime}
              keyboardType="default"
            />
          </View>
        </View>

        {/* ─── Continue Button ────────────────────────── */}
        <TouchableOpacity
          style={[
            styles.continueButton,
            (!selectedLocation || !date) && styles.continueButtonDisabled,
          ]}
          onPress={handleContinue}
          activeOpacity={0.85}
        >
          <Text style={styles.continueButtonText}>{t('continueBtn')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F5F4',
  },
  scrollContent: {
    paddingHorizontal: 22,
    paddingBottom: 40,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#074D28',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
    shadowColor: '#074D28',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1A2822',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#657770',
    textAlign: 'center',
    lineHeight: 22,
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#074D28',
    marginBottom: 14,
  },
  gpsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#074D28',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 20,
    gap: 10,
  },
  gpsButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
    gap: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E1ECE5',
  },
  dividerText: {
    fontSize: 12,
    color: '#A0ADA6',
    fontWeight: '500',
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7FAF8',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1.5,
    borderColor: '#E1ECE5',
    gap: 10,
  },
  dropdownText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#1A2822',
  },
  placeholderText: {
    color: '#A0ADA6',
    fontWeight: '400',
  },
  dropdownList: {
    marginTop: 8,
    backgroundColor: '#F7FAF8',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E1ECE5',
    overflow: 'hidden',
  },
  dropdownScroll: {
    maxHeight: 200,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EFF3F1',
  },
  dropdownItemActive: {
    backgroundColor: '#E8F5EE',
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#1A2822',
  },
  dropdownItemTextActive: {
    color: '#074D28',
    fontWeight: '700',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7FAF8',
    borderRadius: 14,
    paddingVertical: Platform.OS === 'web' ? 14 : 10,
    paddingHorizontal: 16,
    borderWidth: 1.5,
    borderColor: '#E1ECE5',
    gap: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#1A2822',
    paddingVertical: 0,
  },
  errorBorder: {
    borderColor: '#E54D4D',
  },
  errorText: {
    fontSize: 12,
    color: '#E54D4D',
    marginTop: 6,
    marginLeft: 4,
    fontWeight: '500',
  },
  continueButton: {
    backgroundColor: '#074D28',
    borderRadius: 18,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#074D28',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 14,
    elevation: 6,
  },
  continueButtonDisabled: {
    opacity: 0.5,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },
});
