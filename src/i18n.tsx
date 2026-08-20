import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'gu' | 'hi' | 'en';

type TranslationsShape = { [key: string]: { gu: string; hi: string; en: string } };

const translations: TranslationsShape = {
  greetingHello: { gu: 'નમસ્તે, ', hi: 'नमस्ते, ', en: 'Hello, ' },
  goodMorning: { gu: 'સુપ્રભાત', hi: 'सुप्रभात', en: 'Good Morning' },
  dateLabel: { gu: 'રવિવાર, 01 ડિસેમ્બર 2024', hi: 'रविवार, 01 दिसंबर 2024', en: 'Sunday, 01 Dec 2024' },
  searchPlaceholder: { gu: 'અહીં શોધો...', hi: 'यहाँ खोजें...', en: 'Search here...' },

  investByCategory: { gu: 'કેટેગરી પ્રમાણે રોકાણ', hi: 'श्रेणी द्वारा निवेश', en: 'Invest by Category' },
  bestOffers: { gu: 'શ્રેષ્ઠ ઓફર્સ', hi: 'सर्वश्रेष्ठ ऑफ़र', en: 'Best Offers' },
  viewAll: { gu: 'બધા જુઓ', hi: 'सभी देखें', en: 'View all' },

  home: { gu: 'હોમ', hi: 'होम', en: 'Home' },
  allFarms: { gu: 'બધા ખેતરો', hi: 'सभी खेत', en: 'All Farms' },
  statistic: { gu: 'આંકડા', hi: 'सांख्यिकी', en: 'Statistic' },
  myProfile: { gu: 'મારો પ્રોફાઇલ', hi: 'मेरा प्रोफ़ाइल', en: 'My Profile' },

  duration: { gu: 'સમયગાળો', hi: 'अवधि', en: 'Duration' },
  soil: { gu: 'માટી', hi: 'मिट्टी', en: 'Soil' },
  lowRisk: { gu: 'ઓછું જોખમ', hi: 'कम जोखिम', en: 'Low Risk' },
  safety: { gu: 'સુરક્ષા', hi: 'सुरक्षा', en: 'Safety' },

  pakInformation: { gu: 'પાક માહિતી', hi: 'फसल जानकारी', en: 'Crop Information' },
  selectAPak: { gu: 'એક પાક પસંદ કરો', hi: 'एक फसल चुनें', en: 'Select a Crop' },
  pakDetails: { gu: 'પાક વિગતો', hi: 'फसल विवरण', en: 'Crop Details' },

  weatherDetails: { gu: 'હવામાન વિગતો', hi: 'मौसम विवरण', en: 'Weather Details' },
  loadingWeatherData: { gu: 'હવામાન ડેટા લોડ થઈ રહ્યો છે...', hi: 'मौसम डेटा लोड हो रहा है...', en: 'Loading weather data...' },
  failedWeatherData: { gu: 'હવામાન ડેટા ઉપલબ્ધ નથી', hi: 'मौसम डेटा उपलब्ध नहीं है', en: 'Failed to load weather data' },
  retry: { gu: 'ફરીથી પ્રયત્ન કરો', hi: 'पुनः प्रयास करें', en: 'Retry' },

  soilData: { gu: 'માટી ડેટા', hi: 'मिट्टी डेटा', en: 'Soil Data' },
  ahmedabadSoilReport: { gu: 'અમદાવાદ માટી રિપોર્ટ', hi: 'अहमदाबाद मिट्टी रिपोर्ट', en: 'Ahmedabad Soil Report' },
  soilReport: { gu: 'માટી રિપોર્ટ', hi: 'मिट्टी रिपोर्ट', en: 'Soil Report' },
  location: { gu: 'સ્થાન', hi: 'स्थान', en: 'Location' },
  soilType: { gu: 'માટીનો પ્રકાર', hi: 'मिट्टी प्रकार', en: 'Soil Type' },
  phLabel: { gu: 'pH', hi: 'pH', en: 'pH' },
  moisture: { gu: 'ભેજ', hi: 'नमी', en: 'Moisture' },
  nitrogen: { gu: 'નાઇટ્રોજન', hi: 'नाइट्रोजन', en: 'Nitrogen' },
  phosphorus: { gu: 'ફોસ્ફરસ', hi: 'फॉस्फोरस', en: 'Phosphorus' },
  potassium: { gu: 'પોટેશિયમ', hi: 'पोटेशियम', en: 'Potassium' },
  cropRecommendation: { gu: 'પાકની ભલામણ', hi: 'फसल सिफारिश', en: 'Crop Recommendation' },

  cancel: { gu: 'રદ કરો', hi: 'रद्द करें', en: 'Cancel' },
  saveProfile: { gu: 'પ્રોફાઇલ સાચવો', hi: 'प्रोफ़ाइल सहेजें', en: 'Save Profile' },
  save: { gu: 'સાચવો', hi: 'सहेजें', en: 'Save' },
  editModeHint: { gu: 'કૃપા કરી ફેરફારો કરો અને સાચવો', hi: 'कृपया परिवर्तन करें और सहेजें', en: 'You are in edit mode. Make changes and save.' },

  region: { gu: 'પ્રદેશ', hi: 'क्षेत्र', en: 'Region' },
  weather: { gu: 'હવામાન', hi: 'मौसम', en: 'Weather' },
  primaryCrop: { gu: 'મુખ્ય પાક', hi: 'प्राथमिक फसल', en: 'Primary Crop' },
  recommendations: { gu: 'ભલામણો', hi: 'सिफारिशें', en: 'Recommendations' },

  rainfall: { gu: 'વરસાદ', hi: 'वर्षा', en: 'Rainfall' },
  humidity: { gu: 'ભેજ', hi: 'आर्द्रता', en: 'Humidity' },
  windSpeed: { gu: 'પવનની ઝડપ', hi: 'वायु गति', en: 'Wind Speed' },
  pressure: { gu: 'દબાણ', hi: 'दबाव', en: 'Pressure' },
  precipitation: { gu: 'વરસાદ', hi: 'वर्षण', en: 'Precipitation' },
  currentConditions: { gu: 'વર્તમાન સ્થિતિ', hi: 'वर्तमान स्थिति', en: 'Current Conditions' },
  apparentTemperature: { gu: 'અનુભવ તાપમાન', hi: 'अनुभव तापमान', en: 'Apparent Temperature' },
  weatherCode: { gu: 'હવામાન કોડ', hi: 'मौसम कोड', en: 'Weather Code' },
  condition: { gu: 'સ્થિતિ', hi: 'स्थिति', en: 'Condition' },
  sunrise: { gu: 'સૂર્યોદય', hi: 'सूर्योदय', en: 'Sunrise' },
  sunset: { gu: 'સૂર્યાસ્ત', hi: 'सूर्यास्त', en: 'Sunset' },

  statistics: { gu: 'આંકડાકીય માહિતી', hi: 'सांख्यिकीय जानकारी', en: 'Statistics' },
  totalPakCount: { gu: 'કુલ પાક સંખ્યા', hi: 'कुल फसल संख्या', en: 'Total Crop Count' },
  ahmedabadWeather: { gu: 'અમદાવાદ હવામાન', hi: 'अहमदाबाद मौसम', en: 'Ahmedabad Weather' },
  soilTrend: { gu: 'માટી ટ્રેન્ડ', hi: 'मिट्टी रुझान', en: 'Soil Trend' },
  recommendedCrops: { gu: 'ભલામણ કરેલ પાક', hi: 'अनुशंसित फसलें', en: 'Recommended Crops' },

  // Irrigation (was missing)
  irrigation: { gu: 'સિંચાઈ', hi: 'सिंचाई', en: 'Irrigation' },

  // ─── Crop (Pak) Page New Fields ───────────────────────────────
  seasonTimeline: { gu: 'ઋતુ સમયરેખા', hi: 'मौसम समयरेखा', en: 'Season Timeline' },
  startingTime: { gu: 'શરૂઆતનો સમય', hi: 'शुरुआत का समय', en: 'Starting Time' },
  endingTime: { gu: 'સમાપ્તિનો સમય', hi: 'समाप्ति का समय', en: 'Ending Time' },
  sowingDate: { gu: 'વાવણી તારીખ', hi: 'बुवाई तिथि', en: 'Sowing Date' },
  harvestDate: { gu: 'લણણી તારીખ', hi: 'कटाई तिथि', en: 'Harvest Date' },

  seedInformation: { gu: 'બીજ માહિતી', hi: 'बीज जानकारी', en: 'Seed Information' },
  seedVariety: { gu: 'બીજની જાત', hi: 'बीज की किस्म', en: 'Seed Variety' },
  seedRate: { gu: 'બીજનો દર', hi: 'बीज दर', en: 'Seed Rate' },

  fertilizerScheduleTitle: { gu: 'ખાતર શેડ્યૂલ', hi: 'उर्वरक अनुसूची', en: 'Fertilizer Schedule' },
  fertilizerType: { gu: 'ખાતરનો પ્રકાર', hi: 'उर्वरक प्रकार', en: 'Fertilizer Type' },
  fertilizerQuantity: { gu: 'ખાતરની માત્રા', hi: 'उर्वरक मात्रा', en: 'Fertilizer Quantity' },
  fertilizerSchedule: { gu: 'ખાતર શેડ્યૂલ', hi: 'उर्वरक अनुसूची', en: 'Schedule' },

  irrigationPlan: { gu: 'સિંચાઈ યોજના', hi: 'सिंचाई योजना', en: 'Irrigation Plan' },
  irrigationType: { gu: 'સિંચાઈનો પ્રકાર', hi: 'सिंचाई प्रकार', en: 'Irrigation Type' },
  irrigationFrequency: { gu: 'સિંચાઈની આવૃત્તિ', hi: 'सिंचाई आवृत्ति', en: 'Irrigation Frequency' },

  pestManagement: { gu: 'જીવાત વ્યવસ્થાપન', hi: 'कीट प्रबंधन', en: 'Pest Management' },
  pesticideInfo: { gu: 'જંતુનાશક માહિતી', hi: 'कीटनाशक जानकारी', en: 'Pesticide Information' },

  expectedResults: { gu: 'અપેક્ષિત પરિણામ', hi: 'अपेक्षित परिणाम', en: 'Expected Results' },
  expectedYield: { gu: 'અપેક્ષિત ઉપજ', hi: 'अपेक्षित उपज', en: 'Expected Yield' },
  estimatedCost: { gu: 'અંદાજિત ખર્ચ', hi: 'अनुमानित लागत', en: 'Estimated Cost' },

  // ─── Setup Screen ─────────────────────────────────────────────
  setupTitle: { gu: 'સેટઅપ', hi: 'सेटअप', en: 'Setup' },
  setupSubtitle: { gu: 'શરૂ કરવા માટે માહિતી ભરો', hi: 'शुरू करने के लिए जानकारी भरें', en: 'Fill in details to get started' },
  selectLocation: { gu: 'સ્થાન પસંદ કરો', hi: 'स्थान चुनें', en: 'Select Location' },
  useCurrentLocation: { gu: 'વર્તમાન સ્થાન વાપરો', hi: 'वर्तमान स्थान का उपयोग करें', en: 'Use Current Location' },
  orSelectManually: { gu: 'અથવા મેન્યુઅલ પસંદ કરો', hi: 'या मैन्युअल चुनें', en: 'Or select manually' },
  startDate: { gu: 'શરૂઆત તારીખ', hi: 'आरंभ तिथि', en: 'Start Date' },
  startTime: { gu: 'શરૂઆત સમય', hi: 'आरंभ समय', en: 'Start Time' },
  continueBtn: { gu: 'આગળ વધો', hi: 'आगे बढ़ें', en: 'Continue' },
  locationRequired: { gu: 'સ્થાન જરૂરી છે', hi: 'स्थान आवश्यक है', en: 'Location is required' },
  dateRequired: { gu: 'તારીખ જરૂરી છે', hi: 'तिथि आवश्यक है', en: 'Date is required' },
  detectingLocation: { gu: 'સ્થાન શોધી રહ્યા છીએ...', hi: 'स्थान खोज रहे हैं...', en: 'Detecting location...' },
  locationPermissionDenied: { gu: 'સ્થાન પરવાનગી નકારી', hi: 'स्थान अनुमति अस्वीकृत', en: 'Location permission denied' },
  changeLocation: { gu: 'સ્થાન બદલો', hi: 'स्थान बदलें', en: 'Change Location' },
  welcomeMessage: { gu: 'તમારા ખેતર માટે સેટઅપ કરો', hi: 'अपने खेत के लिए सेटअप करें', en: 'Set up for your farm' },

  // ─── Weather Details (SunCycleCard) ───────────────────────────
  sunCycle: { gu: 'સૂર્ય ચક્ર', hi: 'सूर्य चक्र', en: 'Sun Cycle' },

  // ─── Profile Screen ───────────────────────────────────────────
  edit: { gu: 'સંપાદન', hi: 'संपादन', en: 'Edit' },
  verifiedFarmerInvestor: { gu: 'ચકાસાયેલ ખેડૂત', hi: 'सत्यापित किसान', en: 'Verified Farmer' },

  // Personal Details
  personalDetails: { gu: 'વ્યક્તિગત વિગતો', hi: 'व्यक्तिगत विवरण', en: 'Personal Details' },
  fullName: { gu: 'પૂરું નામ', hi: 'पूरा नाम', en: 'Full Name' },
  mobileNumber: { gu: 'મોબાઇલ નંબર', hi: 'मोबाइल नंबर', en: 'Mobile Number' },
  emailAddress: { gu: 'ઈમેલ', hi: 'ईमेल', en: 'Email Address' },
  dateOfBirth: { gu: 'જન્મ તારીખ', hi: 'जन्म तिथि', en: 'Date of Birth' },
  gender: { gu: 'લિંગ', hi: 'लिंग', en: 'Gender' },

  // Address Details
  addressDetails: { gu: 'સરનામા વિગતો', hi: 'पता विवरण', en: 'Address Details' },
  villageName: { gu: 'ગામનું નામ', hi: 'गाँव का नाम', en: 'Village Name' },
  taluka: { gu: 'તાલુકો', hi: 'तहसील', en: 'Taluka' },
  district: { gu: 'જિલ્લો', hi: 'जिला', en: 'District' },
  state: { gu: 'રાજ્ય', hi: 'राज्य', en: 'State' },
  pinCode: { gu: 'પિન કોડ', hi: 'पिन कोड', en: 'Pin Code' },

  // Farming Details
  farmingDetails: { gu: 'ખેતી વિગતો', hi: 'खेती विवरण', en: 'Farming Details' },
  farmName: { gu: 'ખેતરનું નામ', hi: 'खेत का नाम', en: 'Farm Name' },
  landArea: { gu: 'જમીન વિસ્તાર', hi: 'भूमि क्षेत्र', en: 'Land Area' },
  mainCrops: { gu: 'મુખ્ય પાક', hi: 'मुख्य फसलें', en: 'Main Crops' },
  farmingExperience: { gu: 'ખેતી અનુભવ', hi: 'खेती अनुभव', en: 'Farming Experience' },

  // Account Details
  accountDetails: { gu: 'ખાતા વિગતો', hi: 'खाता विवरण', en: 'Account Details' },
  username: { gu: 'વપરાશકર્તા નામ', hi: 'उपयोगकर्ता नाम', en: 'Username' },
  password: { gu: 'પાસવર્ડ', hi: 'पासवर्ड', en: 'Password' },
  languagePreference: { gu: 'ભાષા પસંદગી', hi: 'भाषा वरीयता', en: 'Language Preference' },

  // ─── Soil Types Translations ──────────────────────────────────
  soil_loamy_sand: { gu: 'રેતાળ ગોરાડુ માટી', hi: 'बलुई दोमट मिट्टी', en: 'Loamy Sand' },
  soil_black_cotton: { gu: 'કાળી કપાસની માટી', hi: 'काली कपास मिट्टी', en: 'Black Cotton Soil' },
  soil_medium_black: { gu: 'મધ્યમ કાળી માટી', hi: 'मध्यम काली मिट्टी', en: 'Medium Black Soil' },
  soil_sandy_loam: { gu: 'રેતાળ કાંપ માટી', hi: 'बलुई दोमट', en: 'Sandy Loam' },
  soil_saline_clay: { gu: 'ક્ષારયુક્ત કાંપ માટી', hi: 'लवणीय मिट्टी', en: 'Saline Clay' },
  soil_calcareous: { gu: 'ચૂનાયુક્ત માટી', hi: 'चूनेदार मिट्टी', en: 'Calcareous Soil' },
  soil_laterite: { gu: 'રાતી માટી', hi: 'लैटेराइट मिट्टी', en: 'Laterite Soil' },
  soil_alluvial: { gu: 'કાંપની માટી', hi: 'जलोढ़ मिट्टी', en: 'Alluvial Soil' },
  soil_desert_sandy: { gu: 'રણની રેતાળ માટી', hi: 'रेगिस्तानी बलुई मिट्टी', en: 'Desert Sandy' },
  soil_red_laterite: { gu: 'લાલ રાતી માટી', hi: 'लाल लैटेराइट मिट्टी', en: 'Red Laterite' },
  soil_red: { gu: 'લાલ માટી', hi: 'लाल मिट्टी', en: 'Red Soil' },
  soil_silty_loam: { gu: 'કાંપ વાળી ગોરાડુ માટી', hi: 'सिल्टी दोमट', en: 'Silty Loam' },
  soil_rich_loam: { gu: 'ફળદ્રુપ ગોરાડુ માટી', hi: 'समृद्ध दोमट', en: 'Rich Loam' },
  soil_loamy_clay: { gu: 'ગોરાડુ કાંપ માટી', hi: 'दोमट चिकनी मिट्टी', en: 'Loamy Clay' },
  soil_sandy_clay: { gu: 'રેતાળ કાળી માટી', hi: 'बलुई चिकनी मिट्टी', en: 'Sandy Clay' },

  // ─── Soil Statuses / Recommendations Translations ─────────────
  status_millet_groundnut_cotton: { gu: 'બાજરી, મગફળી અને કપાસ માટે યોગ્ય', hi: 'बाजरा, मूंगफली और कपास के लिए उपयुक्त', en: 'Suitable for millet, groundnut and cotton' },
  status_sugarcane_cotton_banana: { gu: 'શેરડી, કપાસ અને કેળા માટે યોગ્ય', hi: 'गन्ना, कपास और केले के लिए उपयुक्त', en: 'Suitable for sugarcane, cotton and banana' },
  status_tobacco_wheat_rice: { gu: 'તમાકુ, ઘઉં અને ડાંગર માટે યોગ્ય', hi: 'तंबाकू, गेहूं और चावल के लिए उपयुक्त', en: 'Suitable for tobacco, wheat and rice' },
  status_groundnut_cotton_sesame: { gu: 'મગફળી, કપાસ અને તલ માટે યોગ્ય', hi: 'मूंगफली, कपास और तिल के लिए उपयुक्त', en: 'Suitable for groundnut, cotton and sesame' },
  status_bajra_jowar_castor: { gu: 'બાજરી, જુવાર અને દિવેલા માટે યોગ્ય', hi: 'बाजरा, ज्वार और अरंडी के लिए उपयुक्त', en: 'Suitable for bajra, jowar and castor' },
  status_groundnut_wheat_cumin: { gu: 'મગફળી, ઘઉં અને જીરૂ માટે યોગ્ય', hi: 'मूंगफली, गेहूं और जीरा के लिए उपयुक्त', en: 'Suitable for groundnut, wheat and cumin' },
  status_mango_sugarcane_coconut: { gu: 'કેરી, શેરડી અને નાળિયેર માટે યોગ્ય', hi: 'आम, गन्ना और नारियल के लिए उपयुक्त', en: 'Suitable for mango, sugarcane and coconut' },
  status_wheat_mustard_vegetables: { gu: 'ઘઉં, રાયડો અને શાકભાજી માટે યોગ્ય', hi: 'गेहूं, सरसों और सब्जियों के लिए उपयुक्त', en: 'Suitable for wheat, mustard and vegetables' },
  status_tobacco_rice_vegetables: { gu: 'તમાકુ, ડાંગર અને શાકભાજી માટે યોગ્ય', hi: 'तंबाकू, चावल और सब्जियों के लिए उपयुक्त', en: 'Suitable for tobacco, rice and vegetables' },
  status_potato_cumin_fennel: { gu: 'બટાકા, જીરૂ અને વરિયાળી માટે યોગ્ય', hi: 'आलू, जीरा और सौंफ के लिए उपयुक्त', en: 'Suitable for potato, cumin and fennel' },
  status_dates_castor_bajra: { gu: 'ખજૂર, દિવેલા અને બાજરી માટે યોગ્ય', hi: 'खजूर, अरंडी और बाजरा के लिए उपयुक्त', en: 'Suitable for dates, castor and bajra' },
  status_grapes_onion_tomato: { gu: 'દ્રાક્ષ, ડુંગળી અને ટામેટા માટે યોગ્ય', hi: 'अंगूर, प्याज और टमाटर के लिए उपयुक्त', en: 'Suitable for grapes, onion and tomato' },
  status_sugarcane_pomegranate_jowar: { gu: 'શેરડી, દાડમ અને જુવાર માટે યોગ્ય', hi: 'गन्ना, अनार और ज्वार के लिए उपयुक्त', en: 'Suitable for sugarcane, pomegranate and jowar' },
  status_oranges_cotton_soybean: { gu: 'સંતરા, કપાસ અને સોયાબીન માટે યોગ્ય', hi: 'संतरा, कपास और सोयाबीन के लिए उपयुक्त', en: 'Suitable for oranges, cotton and soybean' },

  // ─── Weather Descriptions ─────────────────────────────────────
  weather_sunny: { gu: 'સાફ તડકો', hi: 'धूप', en: 'Sunny' },
  weather_warm: { gu: 'હૂંફાળું', hi: 'गर्म', en: 'Warm' },
  weather_bright: { gu: 'તેજસ્વી', hi: 'उज्ज्वल', en: 'Bright' },
  weather_mild: { gu: 'મધ્યમ', hi: 'हल्का', en: 'Mild' },
  weather_cloudy: { gu: 'વાદળછાયું', hi: 'बादल', en: 'Cloudy' },
  weather_dry: { gu: 'સૂકું', hi: 'सूखा', en: 'Dry' },
  weather_hot: { gu: 'ગરમ', hi: 'बहुत गर्म', en: 'Hot' },
  weather_clear: { gu: 'સ્વચ્છ આકાશ', hi: 'साफ मौसम', en: 'Clear' },
  weather_partly_cloudy: { gu: 'આંશિક વાદળછાયું', hi: 'आंशिक रूप से बादल', en: 'Partly Cloudy' },
  weather_foggy: { gu: 'ઝાકળવાળું', hi: 'कोहरा', en: 'Foggy' },
  weather_rainy: { gu: 'વરસાદી', hi: 'बरसाती', en: 'Rainy' },
  weather_snowy: { gu: 'બરફીલું', hi: 'बर्फीला', en: 'Snowy' },

  // ─── Pak (Crop) Specific Translations ─────────────────────────
  pak_kapash_name: { gu: 'કપાસ પાક', hi: 'कपास फसल', en: 'Kapash Pak' },
  pak_kapash_crop: { gu: 'કપાસ', hi: 'कपास', en: 'Cotton' },
  pak_kapash_details: { gu: 'સ્થિર pH અને પૂરા મોસમની સિંચાઈ સાથે ઉચ્ચ ઉપજ આપતો કપાસ પાક.', hi: 'स्थिर pH और पूरे सीजन की सिंचाई के साथ उच्च उपज वाली कपास फसल।', en: 'High yield cotton pak with stable pH and full-season irrigation.' },

  pak_manvi_name: { gu: 'માનવી પાક', hi: 'मानवी फसल', en: 'Manvi Pak' },
  pak_manvi_crop: { gu: 'મકાઈ', hi: 'मक्का', en: 'Maize' },
  pak_manvi_details: { gu: 'વહેલી મકાઈ વાવણી માટે ઉત્તમ, નિયમિત પોષક તત્વોની દેખરેખ જરૂરી.', hi: 'अगेती मक्का बुवाई के लिए सर्वोत्तम, नियमित पोषक तत्व निगरानी आवश्यक।', en: 'Best for early maize planting, requires regular nutrient monitoring.' },

  pak_sunflower_name: { gu: 'સૂર્યમુખી પાક', hi: 'सूरजमुखी फसल', en: 'Sunflower Pak' },
  pak_sunflower_crop: { gu: 'સૂર્યમુખી', hi: 'सूरजमुखी', en: 'Sunflower' },
  pak_sunflower_details: { gu: 'સારા નિકાલ અને મધ્યમ ભેજ સાથે સૂર્યમુખી માટે આદર્શ.', hi: 'अच्छे जल निकासी और मध्यम नमी के साथ सूरजमुखी के लिए आदर्श।', en: 'Ideal for sunflower with good drainage and moderate moisture.' },

  pak_vegetable_name: { gu: 'શાકભાજી પાક', hi: 'सब्जी फसल', en: 'Vegetable Pak' },
  pak_vegetable_crop: { gu: 'મિશ્ર શાકભાજી', hi: 'मिश्रित सब्जियां', en: 'Mixed Vegetables' },
  pak_vegetable_details: { gu: 'સંતુલિત પોષણ અને ટપક સિંચાઈ માર્ગદર્શન સાથે શાકભાજી પાક.', hi: 'संतुलित पोषण और ड्रिप सिंचाई मार्गदर्शन के साथ सब्जी फसल।', en: 'Vegetable pak with balanced nutrition and drip irrigation guidance.' },

  pak_flavor_name: { gu: 'મસાલા પાક', hi: 'मसाला फसल', en: 'Flavor Pak' },
  pak_flavor_crop: { gu: 'મસાલા', hi: 'मसाले', en: 'Spices' },
  pak_flavor_details: { gu: 'મરચાં અને હળદર માટે ડિઝાઇન કરાયેલ, સુગંધિત પાક ફેરબદલીને સપોર્ટ કરે છે.', hi: 'मिर्च और हल्दी के लिए डिज़ाइन किया गया, सुगन्धित फसल चक्र का समर्थन करता है।', en: 'Designed for chili and turmeric, supports aromatic crop rotation.' },

  pak_greenpulse_name: { gu: 'ગ્રીન પલ્સ પાક', hi: 'ग्रीन पल्स फसल', en: 'Green Pulse Pak' },
  pak_greenpulse_crop: { gu: 'કઠોળ', hi: 'दलहन', en: 'Pulses' },
  pak_greenpulse_details: { gu: 'જમીન સુધારણા માટે નાઇટ્રોજન સ્થિર કરતા પાક સાથે કઠોળ પાક.', hi: 'मिट्टी सुधार के लिए नाइट्रोजन फिक्सिंग फसलों के साथ दलहन फसल।', en: 'Pulse pak with nitrogen-fixing crops for soil recovery.' },

  pak_millet_name: { gu: 'બાજરી પાક', hi: 'बाजरा फसल', en: 'Millet Pak' },
  pak_millet_crop: { gu: 'બાજરી', hi: 'बाजरा', en: 'Millet' },
  pak_millet_details: { gu: 'ગરમી અને ઓછા વરસાદ સામે પ્રતિકારકતા સાથે ઓછી પાણીની જરૂરિયાત વાળો બાજરી પાક.', hi: 'गर्मी और कम वर्षा के प्रति सहनशीलता के साथ कम पानी वाला बाजरा पैक।', en: 'Low-water millet pak with resilience to heat and low rainfall.' },

  pak_orchard_name: { gu: 'ઓર્ચાર્ડ પાક', hi: 'ऑर्चर्ड फसल', en: 'Orchard Pak' },
  pak_orchard_crop: { gu: 'ફળો', hi: 'फल', en: 'Fruits' },
  pak_orchard_details: { gu: 'લીંબુ વર્ગ અને ચીકુ સાથે ફળઝાડ પાક, સતત પોષણ માટે યોગ્ય.', hi: 'खट्टे फल और चीकू के साथ फलदार फसल, निरंतर पोषण के लिए उपयुक्त।', en: 'Orchard pak with citrus and sapota, suitable for consistent feed.' },

  pak_cotton_name: { gu: 'કોટન પાક', hi: 'कॉटन फसल', en: 'Cotton Pak' },
  pak_cotton_crop: { gu: 'કપાસ', hi: 'कपास', en: 'Cotton' },
  pak_cotton_details: { gu: 'જીવાત વ્યવસ્થાપન અને સારા નિકાલ માટે કન્ફિગર કરેલ કપાસ પાક.', hi: 'कीट प्रबंधन और अच्छे जल निकासी के लिए कॉन्फ़िगर की गई कपास फसल।', en: 'Cotton pak configured for pest management and good drainage.' },

  pak_herb_name: { gu: 'હર્બ અને ફ્લેવર પાક', hi: 'હર્બ અને ફ્લેવર ફસલ', en: 'Herb & Flavor Pak' },
  pak_herb_crop: { gu: 'ઔષધીય વનસ્પતિ', hi: 'जड़ी-बूटियां', en: 'Herbs' },
  pak_herb_details: { gu: 'સિંચાઈ નિયંત્રણ સાથે ફુદીનો, કોથમરી અને તુલસી માટે હર્બ પાક.', hi: 'सिंचाई नियंत्रण के साथ पुदीना, धनिया और तुलसी के लिए हर्ब पैक।', en: 'Herb pak for mint, coriander, and basil with irrigation control.' },

  pak_richveg_name: { gu: 'રિચ વેજ પાક', hi: 'रिच वेज फसल', en: 'Rich Veg Pak' },
  pak_richveg_crop: { gu: 'પાંદડાવાળા શાકભાજી', hi: 'पत्तेदार सब्जियां', en: 'Leafy Vegetables' },
  pak_richveg_details: { gu: 'ભેજ જાળવી રાખતા પોષક તત્વો સાથે ઉચ્ચ ઉત્પાદન શાકભાજી પાક.', hi: 'नमी बनाए रखने वाले पोषक तत्वों के साथ उच्च उत्पादन सब्जी पैक।', en: 'High-production vegetable pak with moisture-retention nutrients.' },

  pak_seedflow_name: { gu: 'સીડફ્લો પાક', hi: 'सीडफ़्लो फसल', en: 'SeedFlow Pak' },
  pak_seedflow_crop: { gu: 'સૂર્યમુખી અને બાજરી', hi: 'सूरजमुखी और बाजरा', en: 'Sunflower & Millet' },
  pak_seedflow_details: { gu: 'વિવિધ ઉપજ માટે સૂર્યમુખી અને બાજરી સાથે મિશ્ર પાક.', hi: 'विविध उपज के लिए सूरजमुखी और बाजरा के साथ मिश्रित फसल।', en: 'Mixed crop pak with sunflowers and millets for diversified yield.' },

  // Timings & Schedules
  time_june_early: { gu: 'જૂન - શરૂઆતમાં', hi: 'जून - शुरुआत', en: 'June - Early' },
  time_june_mid: { gu: 'જૂન - મધ્યમાં', hi: 'जून - मध्य', en: 'June - Mid' },
  time_june_late: { gu: 'જૂન - અંતમાં', hi: 'जून - अंत', en: 'June - Late' },
  time_nov_late: { gu: 'નવેમ્બર - અંતમાં', hi: 'नवंबर - अंत', en: 'November - Late' },
  time_nov_mid: { gu: 'નવેમ્બર - મધ્યમાં', hi: 'नवंबर - मध्य', en: 'November - Mid' },
  time_oct_early: { gu: 'ઓક્ટોબર - શરૂઆતમાં', hi: 'अक्टूबर - शुरुआत', en: 'October - Early' },
  time_oct_mid: { gu: 'ઓક્ટોબર - મધ્યમાં', hi: 'अक्टूबर - मध्य', en: 'October - Mid' },
  time_oct_late: { gu: 'ઓક્ટોબર - અંતમાં', hi: 'अक्टूबर - अंत', en: 'October - Late' },
  time_jan_early: { gu: 'જાન્યુઆરી - શરૂઆતમાં', hi: 'जनवरी - शुरुआत', en: 'January - Early' },
  time_apr_late: { gu: 'એપ્રિલ - અંતમાં', hi: 'अप्रैल - अंत', en: 'April - Late' },
  time_march_late: { gu: 'માર્ચ - અંતમાં', hi: 'मार्च - अंत', en: 'March - Late' },
  time_may_late: { gu: 'મે - અંતમાં', hi: 'मई - अंत', en: 'May - Late' },
  time_dec_early: { gu: 'ડિસેમ્બર - શરૂઆતમાં', hi: 'दिसंबर - शुरुआत', en: 'December - Early' },
  time_sep_late: { gu: 'સપ્ટેમ્બર - અંતમાં', hi: 'सितंबर - अंत', en: 'September - Late' },
  time_feb_late: { gu: 'ફેબ્રુઆરી - અંતમાં', hi: 'फरवरी - अंत', en: 'February - Late' },
  time_feb_mid: { gu: 'ફેબ્રુઆરી - મધ્યમાં', hi: 'फरवरी - मध्य', en: 'February - Mid' },
  time_year_round: { gu: 'આખું વર્ષ', hi: 'वर्ष भर', en: 'Year-round' },

  irrigation_drip: { gu: 'ટપક સિંચાઈ', hi: 'ड्रिप सिंचाई', en: 'Drip Irrigation' },
  irrigation_furrow: { gu: 'ધોરિયા સિંચાઈ', hi: 'नाली सिंचाई', en: 'Furrow Irrigation' },
  irrigation_sprinkler: { gu: 'ફુવારા સિંચાઈ', hi: 'स्प्रिंकलर सिंचाई', en: 'Sprinkler Irrigation' },
  irrigation_flood: { gu: 'ધોરિયા પિયત', hi: 'बाढ़ सिंचाई', en: 'Flood Irrigation' },
  irrigation_rainfed: { gu: 'વરસાદ આધારિત', hi: 'वर्षा आधारित', en: 'Rain-fed' },

  freq_every_2_days: { gu: 'દર ૨ દિવસે', hi: 'हर २ दिन में', en: 'Every 2 days' },
  freq_every_3_days: { gu: 'દર ૩ દિવસે', hi: 'हर ३ दिन में', en: 'Every 3 days' },
  freq_every_4_days: { gu: 'દર ૪ દિવસે', hi: 'हर ४ दिन में', en: 'Every 4 days' },
  freq_every_5_days: { gu: 'દર ૫ દિવસે', hi: 'हर ५ दिन में', en: 'Every 5 days' },
  freq_daily: { gu: 'રોજ', hi: 'रोजाना', en: 'Daily' },

  sched_every_2_weeks: { gu: 'દર ૨ અઠવાડિયે', hi: 'हर २ सप्ताह में', en: 'Every 2 weeks' },
  sched_every_3_weeks: { gu: 'દર ૩ અઠવાડિયે', hi: 'हर ३ सप्ताह में', en: 'Every 3 weeks' },
  sched_every_4_weeks: { gu: 'દર ૪ અઠવાડિયે', hi: 'हर ४ सप्ताह में', en: 'Every 4 weeks' },
  sched_every_6_weeks: { gu: 'દર ૬ અઠવાડિયે', hi: 'हर ६ सप्ताह में', en: 'Every 6 weeks' },
  sched_every_10_days: { gu: 'દર ૧૦ દિવસે', hi: 'हर १० दिन में', en: 'Every 10 days' },

  // Stats Screen Values
  locationWeatherLabel: { gu: 'હવામાન સ્થિતિ', hi: 'मौसम स्थिति', en: 'Weather Status' },
  sunnyWeatherVal: { gu: 'સાફ તડકો, ૩૨°C', hi: 'धूप, ३२°C', en: 'Sunny, 32°C' },
  stableSoilTrendVal: { gu: 'સ્થિર pH, મધ્યમ ભેજ', hi: 'स्थिर pH, मध्यम नमी', en: 'Stable pH, Moderate Moisture' },
  recCropsVal: { gu: 'મગફળી, બાજરી, કપાસ', hi: 'मूंगफली, बाजरा, कपास', en: 'Groundnut, Millet, Cotton' },
  additionalInfo: { gu: 'વધારાની માહિતી', hi: 'अतिरिक्त जानकारी', en: 'Additional Information' },
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
