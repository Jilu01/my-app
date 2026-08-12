import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MapPin } from 'lucide-react-native';
import { UserProfile } from '../../types/profile';
import { ProfileField } from './ProfileField';
import { useTranslation } from '../../i18n';

interface AddressDetailsCardProps {
  data: UserProfile;
  isEditing: boolean;
  onUpdateField: (key: keyof UserProfile, value: string) => void;
}

export const AddressDetailsCard: React.FC<AddressDetailsCardProps> = ({
  data,
  isEditing,
  onUpdateField,
}) => {
  const { t } = useTranslation();
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <MapPin size={20} color="#074D28" style={styles.cardHeaderIcon} />
        <Text style={styles.cardTitle}>{t('addressDetails')}</Text>
      </View>
      <View style={styles.cardBody}>
        <ProfileField
          label={t('villageName')}
          value={data.villageName}
          isEditing={isEditing}
          onChangeText={(v) => onUpdateField('villageName', v)}
        />
        <ProfileField
          label={t('taluka')}
          value={data.taluka}
          isEditing={isEditing}
          onChangeText={(v) => onUpdateField('taluka', v)}
        />
        <ProfileField
          label={t('district')}
          value={data.district}
          isEditing={isEditing}
          onChangeText={(v) => onUpdateField('district', v)}
        />
        <ProfileField
          label={t('state')}
          value={data.state}
          isEditing={isEditing}
          onChangeText={(v) => onUpdateField('state', v)}
        />
        <ProfileField
          label={t('pinCode')}
          value={data.pinCode}
          isEditing={isEditing}
          keyboardType="number-pad"
          onChangeText={(v) => onUpdateField('pinCode', v)}
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
