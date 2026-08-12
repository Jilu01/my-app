import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Sprout } from 'lucide-react-native';
import { UserProfile } from '../../types/profile';
import { ProfileField } from './ProfileField';
import { useTranslation } from '../../i18n';

interface FarmingDetailsCardProps {
  data: UserProfile;
  isEditing: boolean;
  onUpdateField: (key: keyof UserProfile, value: string) => void;
}

export const FarmingDetailsCard: React.FC<FarmingDetailsCardProps> = ({
  data,
  isEditing,
  onUpdateField,
}) => {
  const { t } = useTranslation();
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Sprout size={20} color="#074D28" style={styles.cardHeaderIcon} />
        <Text style={styles.cardTitle}>{t('farmingDetails')}</Text>
      </View>
      <View style={styles.cardBody}>
        <ProfileField
          label={t('farmName')}
          value={data.farmName}
          isEditing={isEditing}
          onChangeText={(v) => onUpdateField('farmName', v)}
        />
        <ProfileField
          label={t('landArea')}
          value={data.landArea}
          isEditing={isEditing}
          onChangeText={(v) => onUpdateField('landArea', v)}
        />
        <ProfileField
          label={t('mainCrops')}
          value={data.mainCrops}
          isEditing={isEditing}
          onChangeText={(v) => onUpdateField('mainCrops', v)}
        />
        <ProfileField
          label={t('farmingExperience')}
          value={data.farmingExperience}
          isEditing={isEditing}
          onChangeText={(v) => onUpdateField('farmingExperience', v)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF4F0',
    marginBottom: 12,
  },
  cardHeaderIcon: {
    marginRight: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A2822',
  },
  cardBody: {},
});
