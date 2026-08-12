import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { UserProfile } from '../types/profile';
import { useTranslation } from '../i18n';
import { ProfileHeader } from './profile/ProfileHeader';
import { PersonalDetailsCard } from './profile/PersonalDetailsCard';
import { AddressDetailsCard } from './profile/AddressDetailsCard';
import { FarmingDetailsCard } from './profile/FarmingDetailsCard';
import { AccountDetailsCard } from './profile/AccountDetailsCard';

interface ProfileScreenProps {
  profile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  profile,
  onUpdateProfile,
}) => {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserProfile>(profile);

  const handleSave = () => {
    onUpdateProfile(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
  };

  const updateField = (key: keyof UserProfile, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const updateNotification = (key: keyof UserProfile['notifications'], val: boolean) => {
    setFormData((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: val,
      },
    }));
  };

  return (
    <View style={styles.container}>
      {/* Header Banner */}
      <ProfileHeader
        fullName={formData.fullName}
        villageName={formData.villageName}
        district={formData.district}
        isEditing={isEditing}
        onToggleEdit={isEditing ? handleSave : () => setIsEditing(true)}
      />

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {isEditing && (
          <View style={styles.editingBanner}>
            <Text style={styles.editingBannerText}>{t('editModeHint')}</Text>
          </View>
        )}

        {/* Modular Profile Cards */}
        <PersonalDetailsCard
          data={formData}
          isEditing={isEditing}
          onUpdateField={updateField}
        />

        <AddressDetailsCard
          data={formData}
          isEditing={isEditing}
          onUpdateField={updateField}
        />

        <FarmingDetailsCard
          data={formData}
          isEditing={isEditing}
          onUpdateField={updateField}
        />

        <AccountDetailsCard
          data={formData}
          isEditing={isEditing}
          onUpdateField={updateField}
          onUpdateNotification={updateNotification}
        />

        {/* Action Buttons in Edit Mode */}
        {isEditing && (
          <View style={styles.actionButtonsRow}>
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={handleCancel}
              activeOpacity={0.8}
            >
              <Text style={styles.cancelBtnText}>{t('cancel')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.saveBtn}
              onPress={handleSave}
              activeOpacity={0.8}
            >
              <Text style={styles.saveBtnText}>{t('saveProfile')}</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F5F4',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 40,
  },
  editingBanner: {
    backgroundColor: '#E8F5EE',
    borderWidth: 1,
    borderColor: '#A3D9B6',
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
  },
  editingBannerText: {
    fontSize: 12,
    color: '#074D28',
    fontWeight: '600',
  },
  actionButtonsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 20,
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: '#E2ECE7',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 10,
  },
  cancelBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#4A5B53',
  },
  saveBtn: {
    flex: 1.5,
    minWidth: 120,
    backgroundColor: '#074D28',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  saveBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
