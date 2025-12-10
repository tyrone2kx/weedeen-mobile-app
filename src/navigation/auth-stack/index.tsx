import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@wd/navigation/types';
import ForgotPasswordScreen from '@wd/screens/authentication/ForgotPasswordScreen';
import LoginScreen from '@wd/screens/authentication/LoginScreen';
import OnboardingScreen from '@wd/screens/authentication/OnboardingScreen';
import ResetPasswordScreen from '@wd/screens/authentication/ResetPasswordScreen';
import React, { FC } from 'react';
import { RoutesEnum } from '../enum';

const AppStack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack: FC = () => {
  return (
    <AppStack.Navigator
      initialRouteName={RoutesEnum.ONBOARDING_SCREEN}
      screenOptions={{ headerShown: false, animation: 'fade_from_bottom' }}
    >
      <AppStack.Screen
        component={OnboardingScreen}
        name={RoutesEnum.ONBOARDING_SCREEN}
      />
      <AppStack.Screen component={LoginScreen} name={RoutesEnum.LOGIN_SCREEN} />
      <AppStack.Screen
        component={ResetPasswordScreen}
        name={RoutesEnum.PASSWORD_RESET_SCREEN}
      />
      <AppStack.Screen
        component={ForgotPasswordScreen}
        name={RoutesEnum.FORGOT_PASSWORD_SCREEN}
      />
    </AppStack.Navigator>
  );
};
export default AuthStack;
