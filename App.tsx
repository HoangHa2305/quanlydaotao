/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Login from './src/pages/Login';
import ForgotPassword from './src/pages/ForgotPassword';
import NewPassword from './src/pages/NewPassword';
import OtpScreen from './src/pages/OtpScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './src/pages/Index';
import { SCREENS } from './src/constants/Screen';
import Navigation from './src/navigation/Navigation';

// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
      <Navigation/>
  );
}
export default App;
