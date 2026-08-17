import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Check, Edit3, Sprout } from 'lucide-react-native';
import { useTranslation } from '../../i18n';

const userAvatar = require('../../../assets/images/user_avatar.jpg');

interface ProfileHeaderProps {
  fullName: string;
  villageName: string;
  district: string;
  isEditing: boolean;
  onToggleEdit: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  fullName,
  villageName,
  district,
  isEditing,
  onToggleEdit,
}) => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.header, { paddingTop: Math.max(insets.top, 20) + 14 }]}>
      <View style={styles.headerTitleRow}>
        <Text style={styles.headerTitle}>{t('myProfile')}</Text>
        <TouchableOpacity
          style={[styles.editButton, isEditing && styles.saveButton]}
          onPress={onToggleEdit}
          activeOpacity={0.8}
        >
          {isEditing ? (
            <>
              <Check size={16} color="#FFFFFF" style={styles.buttonIcon} />
              <Text style={styles.editButtonText}>{t('save')}</Text>
            </>
          ) : (
            <>
              <Edit3 size={16} color="#074D28" style={styles.buttonIcon} />
              <Text style={[styles.editButtonText, { color: '#074D28' }]}>{t('edit')}</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.userInfoWrapper}>
        <View style={styles.avatarContainer}>
          <Image source={userAvatar} style={styles.avatarImage} />
          <View style={styles.verifiedBadge}>
            <Check size={12} color="#FFFFFF" />
          </View>
        </View>
        <View style={styles.userNameContainer}>
          <Text style={styles.userName}>{fullName}</Text>
          <View style={styles.roleTag}>
            <Sprout size={13} color="#D4EAE0" style={{ marginRight: 4 }} />
            <Text style={styles.roleTagText}>{t('verifiedFarmerInvestor')}</Text>
          </View>
          <Text style={styles.userLocation}>
            📍 {villageName}, {district}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#074D28',
    paddingTop: 14,
    paddingHorizontal: 20,
    paddingBottom: 24,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  headerTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    flexShrink: 1,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  saveButton: {
    backgroundColor: '#27AE60',
  },
  editButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  buttonIcon: {
    marginRight: 4,
  },
  userInfoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatarImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#27AE60',
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  userNameContainer: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  roleTag: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },
  roleTagText: {
    fontSize: 12,
    color: '#D4EAE0',
    fontWeight: '500',
  },
  userLocation: {
    fontSize: 12,
    color: '#A7D5BE',
    marginTop: 3,
  },
});
