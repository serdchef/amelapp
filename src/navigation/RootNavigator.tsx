import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, Platform, View, ActivityIndicator } from 'react-native';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors, fonts } from '../constants/theme';
import HomeScreen from '../screens/HomeScreen';
import AmelsScreen from '../screens/AmelsScreen';
import MektebunScreen from '../screens/MektebunScreen';
import SettingsScreen from '../screens/SettingsScreen';
import LibraryScreen from '../screens/LibraryScreen';
import OnboardingScreen, { ONBOARDED_KEY } from '../screens/OnboardingScreen';

const Tab = createBottomTabNavigator();

function TabIcon({ emoji, focused }: { emoji: string; focused: boolean }) {
  return (
    <Text style={{ fontSize: focused ? 22 : 18, opacity: focused ? 1 : 0.5 }}>
      {emoji}
    </Text>
  );
}

function MainTabs() {
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.cream,
          borderTopColor: colors.cream3,
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? 88 : 64,
          paddingBottom: Platform.OS === 'ios' ? 28 : 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor:   colors.forest,
        tabBarInactiveTintColor: colors.ink4,
        tabBarLabelStyle: {
          fontFamily: fonts.dmSansMedium,
          fontSize: 10.5,
          marginTop: 2,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: t('tabs.home'),
          tabBarIcon: ({ focused }) => <TabIcon emoji="🕌" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Amels"
        component={AmelsScreen}
        options={{
          title: t('tabs.all_deeds'),
          tabBarIcon: ({ focused }) => <TabIcon emoji="📖" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Library"
        component={LibraryScreen}
        options={{
          title: t('tabs.library'),
          tabBarIcon: ({ focused }) => <TabIcon emoji="📚" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: t('tabs.settings'),
          tabBarIcon: ({ focused }) => <TabIcon emoji="⚙️" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  const [checkingOnboarding, setCheckingOnboarding] = useState(true);
  const [onboarded, setOnboarded] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    async function checkOnboarding() {
      const val = await AsyncStorage.getItem(ONBOARDED_KEY);
      setOnboarded(val === 'true');
      setCheckingOnboarding(false);
    }
    checkOnboarding();
  }, []);

  if (checkingOnboarding) {
    // Splash gecişi sırasında beyaz flash önlemek için cream rengi
    return (
      <View style={{ flex: 1, backgroundColor: colors.cream, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color={colors.forest} />
      </View>
    );
  }

  if (!onboarded) {
    return (
      <OnboardingScreen onDone={() => setOnboarded(true)} />
    );
  }

  return (
    <NavigationContainer>
      <MainTabs />
    </NavigationContainer>
  );
}
