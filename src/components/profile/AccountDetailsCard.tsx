import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Switch } from 'react-native';
import { ShieldCheck, Eye, EyeOff } from 'lucide-react-native';
import { UserProfile } from '../../types/profile';
import { ProfileField } from './ProfileField';
import { useTranslation } from '../../i18n';

interface AccountDetailsCardProps {
  data: UserProfile;
  isEditing: boolean;
  onUpdateField: (key: keyof UserProfile, value: string) => void;
  onUpdateNotification: (key: keyof UserProfile['notifications'], val: boolean) => void;
}

export const AccountDetailsCard: React.FC<AccountDetailsCardProps> = ({
  data,
  isEditing,
  onUpdateField,
  onUpdateNotification,
}) => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <ShieldCheck size={20} color="#074D28" style={styles.cardHeaderIcon} />
        <Text style={styles.cardTitle}>{t('accountDetails')}</Text>
      </View>
      <View style={styles.cardBody}>
        <ProfileField
          label={t('username')}
          value={data.username}
          isEditing={isEditing}
          onChangeText={(v) => onUpdateField('username', v)}
        />

        {/* Password Field */}
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>{t('password')}</Text>
          {isEditing ? (
            <View style={styles.passwordInputWrapper}>
              <TextInput
                style={styles.passwordInput}
                value={data.password}
                secureTextEntry={!showPassword}
                onChangeText={(v) => onUpdateField('password', v)}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                {showPassword ? (
                  <EyeOff size={18} color="#7C8C85" />
                ) : (
                  <Eye size={18} color="#7C8C85" />
                )}
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.passwordDisplayRow}>
              <Text style={styles.fieldValue}>
                {showPassword ? data.password : '••••••••••••'}
              </Text>
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={{ paddingLeft: 8 }}
              >
                {showPassword ? (
                  <EyeOff size={16} color="#074D28" />
                ) : (
                  <Eye size={16} color="#074D28" />
                )}
              </TouchableOpacity>
            </View>
          )}
        </View>

        <ProfileField
          label={t('languagePreference')}
          value={data.languagePreference}
          isEditing={isEditing}
          onChangeText={(v) => onUpdateField('languagePreference', v)}
        />

        {/* Notification Settings Toggles */}
        <View style={styles.notificationsContainer}>
          <Text style={[styles.fieldLabel, { marginBottom: 8, marginTop: 10 }]}>
            Notification Preferences
          </Text>

          <ToggleItem
            label="SMS Alerts"
            value={data.notifications.smsAlerts}
            onValueChange={(val) => onUpdateNotification('smsAlerts', val)}
          />
          <ToggleItem
            label="Push Notifications"
            value={data.notifications.pushNotifications}
            onValueChange={(val) => onUpdateNotification('pushNotifications', val)}
          />
          <ToggleItem
            label="Weather Alerts"
            value={data.notifications.weatherAlerts}
            onValueChange={(val) => onUpdateNotification('weatherAlerts', val)}
          />
          <ToggleItem
            label="Investment Updates"
            value={data.notifications.investmentUpdates}
            onValueChange={(val) => onUpdateNotification('investmentUpdates', val)}
          />
        </View>
      </View>
    </View>
  );
};

interface ToggleItemProps {
  label: string;
  value: boolean;
  onValueChange: (val: boolean) => void;
}

const ToggleItem: React.FC<ToggleItemProps> = ({ label, value, onValueChange }) => (
  <View style={styles.toggleRow}>
    <Text style={styles.toggleLabel}>{label}</Text>
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{ false: '#D0DDD7', true: '#89C59B' }}
      thumbColor={value ? '#074D28' : '#F4F4F4'}
    />
  </View>
);

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
  fieldContainer: {
    marginBottom: 12,
  },
  fieldLabel: {
    fontSize: 12,
    color: '#7C8C85',
    fontWeight: '600',
    marginBottom: 4,
  },
  fieldValue: {
    fontSize: 14,
    color: '#1A2822',
    fontWeight: '500',
  },
  passwordInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7FAF8',
    borderWidth: 1,
    borderColor: '#D0DDD7',
    borderRadius: 10,
    paddingHorizontal: 12,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 14,
    color: '#1A2822',
  },
  passwordDisplayRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeIcon: {
    padding: 4,
  },
  notificationsContainer: {
    marginTop: 6,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  toggleLabel: {
    fontSize: 13,
    color: '#1A2822',
    fontWeight: '500',
  },
});
