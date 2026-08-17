import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path, Rect, Circle } from 'react-native-svg';
import { useTranslation } from '../i18n';

export type TabType = 'home' | 'farms' | 'stats' | 'profile';

export interface BottomNavigationProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab,
  onSelectTab,
}) => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.navWrapper, { paddingBottom: Math.max(insets.bottom, 6) }]}>
      <View style={styles.navBar}>
        {/* Home Tab */}
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => onSelectTab('home')}
          activeOpacity={0.8}
        >
          <View style={styles.iconContainer}>
            <Svg width={24} height={24} viewBox="0 0 24 24">
              <Path
                d="M 12 3 L 2 12 L 5 12 L 5 20 C 5 20.6 5.4 21 6 21 L 18 21 C 18.6 21 19 20.6 19 20 L 19 12 L 22 12 Z"
                fill={activeTab === 'home' ? '#074D28' : 'none'}
                stroke={activeTab === 'home' ? '#074D28' : '#7C8C85'}
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </Svg>
          </View>
          <Text style={[styles.tabLabel, activeTab === 'home' && styles.activeTabLabel]}>
            {t('home')}
          </Text>
        </TouchableOpacity>

        {/* All Farms Tab */}
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => onSelectTab('farms')}
          activeOpacity={0.8}
        >
          <View style={styles.iconContainer}>
            <Svg width={24} height={24} viewBox="0 0 24 24">
              <Circle
                cx="12"
                cy="8"
                r="3.5"
                stroke={activeTab === 'farms' ? '#074D28' : '#7C8C85'}
                strokeWidth="1.8"
                fill="none"
              />
              <Path
                d="M 5 20 C 5 16 8 14 12 14 C 16 14 19 16 19 20"
                stroke={activeTab === 'farms' ? '#074D28' : '#7C8C85'}
                strokeWidth="1.8"
                fill="none"
              />
            </Svg>
          </View>
          <Text style={[styles.tabLabel, activeTab === 'farms' && styles.activeTabLabel]}>
            {t('allFarms')}
          </Text>
        </TouchableOpacity>

        {/* Statistic Tab */}
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => onSelectTab('stats')}
          activeOpacity={0.8}
        >
          <View style={styles.iconContainer}>
            <Svg width={24} height={24} viewBox="0 0 24 24">
              <Rect
                x="4"
                y="11"
                width="3.5"
                height="9"
                rx="1.5"
                stroke={activeTab === 'stats' ? '#074D28' : '#7C8C85'}
                strokeWidth="1.8"
                fill={activeTab === 'stats' ? '#074D28' : 'none'}
              />
              <Rect
                x="10.25"
                y="6"
                width="3.5"
                height="14"
                rx="1.5"
                stroke={activeTab === 'stats' ? '#074D28' : '#7C8C85'}
                strokeWidth="1.8"
                fill={activeTab === 'stats' ? '#074D28' : 'none'}
              />
              <Rect
                x="16.5"
                y="14"
                width="3.5"
                height="6"
                rx="1.5"
                stroke={activeTab === 'stats' ? '#074D28' : '#7C8C85'}
                strokeWidth="1.8"
                fill={activeTab === 'stats' ? '#074D28' : 'none'}
              />
            </Svg>
          </View>
          <Text style={[styles.tabLabel, activeTab === 'stats' && styles.activeTabLabel]}>
            {t('statistic')}
          </Text>
        </TouchableOpacity>

        {/* My Profile Tab */}
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => onSelectTab('profile')}
          activeOpacity={0.8}
        >
          <View style={styles.iconContainer}>
            <Svg width={24} height={24} viewBox="0 0 24 24">
              <Circle
                cx="12"
                cy="7.5"
                r="4"
                stroke={activeTab === 'profile' ? '#074D28' : '#7C8C85'}
                strokeWidth="1.8"
                fill={activeTab === 'profile' ? '#074D28' : 'none'}
              />
              <Path
                d="M 4 20 C 4 15.5 7.5 13.5 12 13.5 C 16.5 13.5 20 15.5 20 20"
                stroke={activeTab === 'profile' ? '#074D28' : '#7C8C85'}
                strokeWidth="1.8"
                fill="none"
              />
            </Svg>
          </View>
          <Text style={[styles.tabLabel, activeTab === 'profile' && styles.activeTabLabel]}>
            {t('myProfile')}
          </Text>
        </TouchableOpacity>
      </View>

      {/* iOS Style Home Indicator Bar */}
      {Platform.OS !== 'web' && insets.bottom === 0 && (
        <View style={styles.bottomBarIndicatorWrapper}>
          <View style={styles.bottomBarIndicator} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  navWrapper: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 8,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 6,
    paddingHorizontal: 10,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 11,
    color: '#7C8C85',
    marginTop: 3,
    fontWeight: '500',
  },
  activeTabLabel: {
    color: '#074D28',
    fontWeight: '700',
  },
  bottomBarIndicatorWrapper: {
    alignItems: 'center',
    paddingBottom: 6,
  },
  bottomBarIndicator: {
    width: 134,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#1C1C1E',
  },
});
