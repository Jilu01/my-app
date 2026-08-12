export interface UserProfile {
  // Personal Details
  fullName: string;
  profilePhoto: string;
  mobileNumber: string;
  emailAddress: string;
  dateOfBirth: string;
  gender: string;

  // Address Details
  villageName: string;
  taluka: string;
  district: string;
  state: string;
  pinCode: string;

  // Farming Details
  farmName: string;
  landArea: string;
  mainCrops: string;
  farmingExperience: string;

  // Account Details
  username: string;
  password: string;
  languagePreference: string;
  notifications: {
    smsAlerts: boolean;
    pushNotifications: boolean;
    weatherAlerts: boolean;
    investmentUpdates: boolean;
  };
}

export const initialProfile: UserProfile = {
  fullName: 'Rajesh Patil',
  profilePhoto: '',
  mobileNumber: '+91 98765 43210',
  emailAddress: 'rajesh.patil@farmmail.com',
  dateOfBirth: '15/08/1985',
  gender: 'Male',

  villageName: 'Chateauneuf Village',
  taluka: 'Nashik Central',
  district: 'Nashik',
  state: 'Maharashtra',
  pinCode: '422003',

  farmName: 'Green Valley Agro Farm',
  landArea: '14.5 Acres',
  mainCrops: 'Wheat, Grapes & Sugarcane',
  farmingExperience: '18 Years',

  username: 'rajesh_farmer85',
  password: '••••••••••••',
  languagePreference: 'English',
  notifications: {
    smsAlerts: true,
    pushNotifications: true,
    weatherAlerts: true,
    investmentUpdates: false,
  },
};
