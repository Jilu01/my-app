import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'gu' | 'hi' | 'en';

type TranslationsShape = { [key: string]: { gu: string; hi: string; en: string } };

const translations: TranslationsShape = {
  greetingHello: { gu: 'નમસ્તે, ', hi: 'नमस्ते, ', en: 'Hello, ' },
  goodMorning: { gu: 'સુપ્રભાત', hi: 'सुप्रभात', en: 'Good Morning' },
  dateLabel: { gu: 'રવિવાર, 01 ડિસેમ્બર 2024', hi: 'रविवार, 01 दिसंबर 2024', en: 'Sunday, 01 Dec 2024' },
  searchPlaceholder: { gu: 'અહીં શોધો...', hi: 'यहाँ खोजें...', en: 'Search here...' },

  investByCategory: { gu: 'કેટેગરી દ્વારા રોકાણ', hi: 'श्रेणी द्वारा निवेश', en: 'Invest by Category' },
  bestOffers: { gu: 'શ્રેષ્ઠ ઓફર્સ', hi: 'सर्वश्रेष्ठ ऑफ़र', en: 'Best Offers' },
  viewAll: { gu: 'બધા જુઓ', hi: 'सभी देखें', en: 'View all' },

  home: { gu: 'ઘર', hi: 'होम', en: 'Home' },
  allFarms: { gu: 'બધા ખેતરો', hi: 'सभी खेत', en: 'All Farms' },
  statistic: { gu: 'પરિસાંખ્યિકી', hi: 'सांख्यिकी', en: 'Statistic' },
  myProfile: { gu: 'મારો પ્રોફાઇલ', hi: 'मेरा प्रोफ़ाइल', en: 'My Profile' },

  duration: { gu: 'મદદગાળો સમય', hi: 'अवधि', en: 'Duration' },
  soil: { gu: 'માટી', hi: 'मिट्टी', en: 'Soil' },
  lowRisk: { gu: 'ન્યૂન જોખમ', hi: 'कम जोखिम', en: 'Low Risk' },
  safety: { gu: 'સુરક્ષા', hi: 'सुरक्षा', en: 'Safety' },

  pakInformation: { gu: 'પેક માહિતી', hi: 'पैक जानकारी', en: 'Pak Information' },
  selectAPak: { gu: 'એક પેક પસંદ કરો', hi: 'एक पैक चुनें', en: 'Select a Pak' },
  pakDetails: { gu: 'પેક વિગતો', hi: 'पैक विवरण', en: 'Pak Details' },

  weatherDetails: { gu: 'આબોહવા વિગતો', hi: 'मौसम विवरण', en: 'Weather Details' },
  loadingWeatherData: { gu: 'આબોહવા ડેટા લોડ થઈ રહ્યું છે...', hi: 'मौसम डेटा लोड हो रहा है...', en: 'Loading weather data...' },
  failedWeatherData: { gu: 'આબોહવા ડેટા ઉપલબ્ધ નથી', hi: 'मौसम डेटा उपलब्ध नहीं है', en: 'Failed to load weather data' },
  retry: { gu: 'ફેરવાર પ્રયત્ન કરો', hi: 'पुनः प्रयास करें', en: 'Retry' },

  soilData: { gu: 'માટી ડેટા', hi: 'मिट्टी डेटा', en: 'Soil Data' },
  ahmedabadSoilReport: { gu: 'અમદાવાદ માટੀ રિપોર્ટ', hi: 'अहमदाबाद मिट्टी रिपोर्ट', en: 'Ahmedabad Soil Report' },
  location: { gu: 'સ્થાન', hi: 'स्थान', en: 'Location' },
  soilType: { gu: 'માટી પ્રકારે', hi: 'मिट्टी प्रकार', en: 'Soil Type' },
  phLabel: { gu: 'pH', hi: 'pH', en: 'pH' },
  moisture: { gu: 'ભીન્નતા', hi: 'नमी', en: 'Moisture' },
  nitrogen: { gu: 'નાઇટ્રોજન', hi: 'नाइट्रोजन', en: 'Nitrogen' },
  phosphorus: { gu: 'ફોસ્ફોરસ', hi: 'फॉस्फोरस', en: 'Phosphorus' },
  potassium: { gu: 'પોટેશિયમ', hi: 'पोटेशियम', en: 'Potassium' },
  cropRecommendation: { gu: 'ફસલની ભલામણ', hi: 'फसल सिफारिश', en: 'Crop recommendation' },

  cancel: { gu: 'રદ કરો', hi: 'रद्द करें', en: 'Cancel' },
  saveProfile: { gu: 'પ્રોફાઇલ સાચવો', hi: 'प्रोफ़ाइल सहेजें', en: 'Save Profile' },
  save: { gu: 'સાચવો', hi: 'सहेजें', en: 'Save' },
  editModeHint: { gu: 'કૃપા કરી ફેરફારો કરવાની પૂર્ણ કરો અને સાચવો', hi: 'कृपया परिवर्तन करें और सहेजें', en: 'You are in edit mode. Make changes and save.' },

  region: { gu: 'પ્રદેશ', hi: 'क्षेत्र', en: 'Region' },
  weather: { gu: 'હવામાન', hi: 'मौसम', en: 'Weather' },
  primaryCrop: { gu: 'પ્રાથમિક ફસલ', hi: 'प्राथमिक फसल', en: 'Primary Crop' },
  recommendations: { gu: 'સૂચનો', hi: 'सिफारिशें', en: 'Recommendations' },

  rainfall: { gu: 'વરસાદ', hi: 'वर्षा', en: 'Rainfall' },
  humidity: { gu: 'નમી', hi: 'आर्द्रता', en: 'Humidity' },
  windSpeed: { gu: 'પવન ઝડપ', hi: 'वायु गति', en: 'Wind Speed' },
  pressure: { gu: 'દબાણ', hi: 'दबाव', en: 'Pressure' },
  precipitation: { gu: 'પૃષ્ઠભૂમિ', hi: 'वृष्टि', en: 'Precipitation' },
  currentConditions: { gu: 'વર્તમાન પરિસ્થિતિઓ', hi: 'वर्तमान स्थिति', en: 'Current Conditions' },
  apparentTemperature: { gu: 'અનુભવ તાપમાન', hi: 'अनुभव तापमान', en: 'Apparent Temperature' },
  weatherCode: { gu: 'હવામાન કોડ', hi: 'मौसम कोड', en: 'Weather Code' },
  condition: { gu: 'શરત', hi: 'स्थिति', en: 'Condition' },
  sunrise: { gu: 'সূર્યોદય', hi: 'सूर्योदय', en: 'Sunrise' },
  sunset: { gu: 'সূর্যাস্ত', hi: 'सूर्यास्त', en: 'Sunset' },

  statistics: { gu: 'આંકડાકીય માહિતી', hi: 'सांख्यिकीय जानकारी', en: 'Statistics' },
  totalPakCount: { gu: 'કુલ પેક સંખ્યા', hi: 'कुल पैक संख्या', en: 'Total Pak Count' },
  ahmedabadWeather: { gu: 'અમદાવાદ હવામાન', hi: 'अहमदाबाद मौसम', en: 'Ahmedabad Weather' },
  soilTrend: { gu: 'માટી ટ્રેન્ડ', hi: 'मिट्टी रुझान', en: 'Soil Trend' },
  recommendedCrops: { gu: 'સasyaંદર્સવર્તિત ફસલ', hi: 'अनुशंसित फसलें', en: 'Recommended Crops' },
};

type I18nContextValue = {
  language: Language;
  setLanguage: (l: Language) => void;
  t: (key: keyof typeof translations) => string;
};

const I18nContext = createContext<I18nContextValue>({
  language: 'gu',
  setLanguage: () => {},
  t: (k) => (translations[k] ? translations[k].gu : String(k)),
});

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('gu');

  const t = (key: keyof typeof translations) => {
    const entry = translations[key as string];
    if (!entry) return String(key);
    return entry[language];
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useTranslation = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useTranslation must be used within LanguageProvider');
  return { t: ctx.t, language: ctx.language, setLanguage: ctx.setLanguage };
};

export default translations;
