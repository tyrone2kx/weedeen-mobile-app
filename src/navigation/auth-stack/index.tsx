import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@wd/navigation/types';
import AccountVerificationScreen from '@wd/screens/authentication/AccountVerificationScreen';
import ForgotPasswordScreen from '@wd/screens/authentication/ForgotPasswordScreen';
import LoginScreen from '@wd/screens/authentication/LoginScreen';
import ResetPasswordScreen from '@wd/screens/authentication/ResetPasswordScreen';
import GetStartedScreen from '@wd/screens/onboarding/GetStartedScreen';
import OnboardingScreen from '@wd/screens/onboarding/OnboardingScreen';
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
        component={GetStartedScreen}
        name={RoutesEnum.GET_STARTED_SCREEN}
      />
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
      <AppStack.Screen
        component={AccountVerificationScreen}
        name={RoutesEnum.VERIFY_ACCOUNT_SCREEN}
      />
    </AppStack.Navigator>
  );
};
export default AuthStack;
