import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
// import AddScreenPreview from '../screens/AddScreenPreview';
// import AddScreenQRCode from '../screens/AddScreenQRCode';
import OpenQrCode from '../screens/OpenQrCode';
import HomeScreen from '../screens/QRCode/HomeScreen';
import InputScreen from '../screens/QRCode/InputScreen';
import StyleScreen from '../screens/QRCode/StyleScreen';
import PreviewScreen from '../screens/QRCode/PreviewScreen';

import SettingsScreen from '../screens/Settings/SettingsScreen';
import FAQScreen from '../screens/Settings/FAQScreen';
import PrivacyPolicyScreen from '../screens/Settings/PrivacyPolicyScreen';
import LicensesScreen from '../screens/Settings/LicensesScreen';
import { BottomTabParamList, QrCodesParamList, SettingsParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator(props) {
  const colorScheme = useColorScheme();
  return (
    <BottomTab.Navigator
      initialRouteName="QrCodes"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        component={QrCodesNavigator}
        name="QRCode"
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-qr-code" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-settings" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const QrCodesStack = createStackNavigator<QrCodesParamList>();

function QrCodesNavigator() {
  return (
    <QrCodesStack.Navigator initialRouteName="HomeScreen">
      <QrCodesStack.Screen
        name="HomeScreen"
        options={{ headerTitle: 'QRCode' }}
        component={HomeScreen}
      />
      <QrCodesStack.Screen
        name="InputScreen"
        options={{ headerTitle: 'Add Your Info' }}
        component={InputScreen}
      />
      <QrCodesStack.Screen
        name="StyleScreen"
        options={{ headerTitle: 'Style Your QR' }}
        component={StyleScreen}
      />
      {/* <QrCodesStack.Screen
        name="AddScreenQRCode"
        options={{ headerTitle: 'Set Your Colors' }}
        component={AddScreenQRCode}
      />*/}
      <QrCodesStack.Screen
        name="PreviewScreen"
        options={{ headerTitle: 'Preview QR' }}
        component={PreviewScreen}
      /> 
      <QrCodesStack.Screen
        name="OpenQrCode"
        options={{ headerTitle: 'View QR' }}
        component={OpenQrCode}
      />
    </QrCodesStack.Navigator>
  );
}

const SettingsStack = createStackNavigator<SettingsParamList>();

function SettingsNavigator() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{ headerTitle: 'Settings' }}
      />

      <SettingsStack.Screen
        name="FAQScreen"
        component={FAQScreen}
        options={{ headerTitle: 'FAQScreen' }}
      />
      <SettingsStack.Screen
        name="PrivacyPolicyScreen"
        component={PrivacyPolicyScreen}
        options={{ headerTitle: 'PrivacyPolicyScreen' }}
      />
      <SettingsStack.Screen
        name="LicensesScreen"
        component={LicensesScreen}
        options={{ headerTitle: 'LicensesScreen' }}
      />
    </SettingsStack.Navigator>
  );
}
