import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { User } from 'lucide-react-native';
import { UserProfile } from '../../types/profile';
import { ProfileField } from './ProfileField';
import { useTranslation } from '../../i18n';

interface PersonalDetailsCardProps {
  data: UserProfile;
  isEditing: boolean;
  onUpdateField: (key: keyof UserProfile, value: string) => void;
}

export const PersonalDetailsCard: React.FC<PersonalDetailsCardProps> = ({
  data,
  isEditing,
  onUpdateField,
}) => {
  const { t } = useTranslation();
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <User size={20} color="#074D28" style={styles.cardHeaderIcon} />
        <Text style={styles.cardTitle}>{t('personalDetails')}</Text>
      </View>
      <View style={styles.cardBody}>
        <ProfileField
          label={t('fullName')}
          value={data.fullName}
          isEditing={isEditing}
          onChangeText={(v) => onUpdateField('fullName', v)}
        />
        <ProfileField
          label={t('mobileNumber')}
          value={data.mobileNumber}
          isEditing={isEditing}
          keyboardType="phone-pad"
          onChangeText={(v) => onUpdateField('mobileNumber', v)}
        />
        <ProfileField
          label={t('emailAddress')}
          value={data.emailAddress}
          isEditing={isEditing}
          keyboardType="email-address"
          onChangeText={(v) => onUpdateField('emailAddress', v)}
        />
        <ProfileField
          label={t('dateOfBirth')}
          value={data.dateOfBirth}
          isEditing={isEditing}
          placeholder="DD/MM/YYYY"
          onChangeText={(v) => onUpdateField('dateOfBirth', v)}
        />
        <ProfileField
          label={t('gender')}
          value={data.gender}
          isEditing={isEditing}
          onChangeText={(v) => onUpdateField('gender', v)}
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
