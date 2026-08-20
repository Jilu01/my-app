import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from '../../i18n';

interface AdditionalInfoCardProps {
  apparentTemperature: number;
  weatherCode: number;
  condition: string;
}

export const AdditionalInfoCard: React.FC<AdditionalInfoCardProps> = ({
  apparentTemperature,
  weatherCode,
  condition,
}) => {
  const { t } = useTranslation();
  return (
    <View style={styles.infoCard}>
      <Text style={styles.sectionTitle}>{t('additionalInfo')}</Text>
      <InfoRow label={t('apparentTemperature')} value={`${apparentTemperature}°C`} />
      <InfoRow label={t('weatherCode')} value={weatherCode.toString()} />
      <InfoRow label={t('condition')} value={condition} />
    </View>
  );
};

interface InfoRowProps {
  label: string;
  value: string;
}

const InfoRow: React.FC<InfoRowProps> = ({ label, value }) => {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  infoCard: {
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A2822',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E1ECE5',
  },
  infoLabel: {
    fontSize: 15,
    color: '#657770',
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A2822',
  },
});
