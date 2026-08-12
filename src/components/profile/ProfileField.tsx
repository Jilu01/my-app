import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

interface ProfileFieldProps {
  label: string;
  value: string;
  isEditing: boolean;
  onChangeText?: (text: string) => void;
  keyboardType?: 'default' | 'email-address' | 'phone-pad' | 'number-pad';
  placeholder?: string;
}

export const ProfileField: React.FC<ProfileFieldProps> = ({
  label,
  value,
  isEditing,
  onChangeText,
  keyboardType = 'default',
  placeholder,
}) => {
  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>{label}</Text>
      {isEditing ? (
        <TextInput
          style={styles.textInput}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          placeholder={placeholder}
          placeholderTextColor="#A8BDB4"
        />
      ) : (
        <Text style={styles.fieldValue}>{value || '—'}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
  textInput: {
    backgroundColor: '#F7FAF8',
    borderWidth: 1,
    borderColor: '#D0DDD7',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    color: '#1A2822',
  },
});
