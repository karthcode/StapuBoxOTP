import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import SendOtpScreen from '../screens/SendOtpScreen';
import VerifyOtpScreen from '../screens/VerifyOtpScreen';

export type RootStackParamList = {
  SendOtp: undefined;
  VerifyOtp: { mobile: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SendOtp"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="SendOtp" component={SendOtpScreen} />
        <Stack.Screen name="VerifyOtp" component={VerifyOtpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
