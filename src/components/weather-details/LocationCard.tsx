import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MapPin } from 'lucide-react-native';

interface LocationCardProps {
  location: string;
  coordinates: string;
}

export const LocationCard: React.FC<LocationCardProps> = ({ location, coordinates }) => {
  return (
    <View style={styles.locationCard}>
      <View style={styles.locationRow}>
        <MapPin size={20} color="#1A2822" style={styles.locationIcon} />
        <Text style={styles.locationText}>{location}</Text>
      </View>
      <Text style={styles.coordinatesText}>{coordinates}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  locationCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#07361D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    marginRight: 8,
  },
  locationText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A2822',
  },
  coordinatesText: {
    fontSize: 14,
    color: '#657770',
    marginTop: 4,
    marginLeft: 28,
  },
});
