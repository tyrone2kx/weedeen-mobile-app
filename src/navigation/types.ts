import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RoutesEnum, StacksEnum } from './enum';

export type RootStackParamList = {
  [StacksEnum.AUTH_STACK]: NavigatorScreenParams<AuthStackParamList>;
  [StacksEnum.APP_STACK]: NavigatorScreenParams<AppBottomTabParamList>;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type AuthStackParamList = {
  [RoutesEnum.GET_STARTED_SCREEN]: undefined;
  [RoutesEnum.ONBOARDING_SCREEN]: undefined;
  [RoutesEnum.LOGIN_SCREEN]: undefined;
  [RoutesEnum.PASSWORD_RESET_SCREEN]: undefined;
  [RoutesEnum.FORGOT_PASSWORD_SCREEN]: undefined;
  [RoutesEnum.REGISTER_SCREEN]: undefined;
  [RoutesEnum.VERIFY_ACCOUNT_SCREEN]: { type: 'reset' | 'activation' };
};

export type AuthStackScreenProps<T extends keyof AuthStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<AuthStackParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

export type AppBottomTabParamList = {
  [StacksEnum.DASHBOARD_STACK]: NavigatorScreenParams<DashboardStackParamList>;
  [StacksEnum.MENU_STACK]: NavigatorScreenParams<MenuStackParamList>;
};

export type AppBottomTabScreenProps<T extends keyof AppBottomTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<AppBottomTabParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

export type DashboardStackParamList = {
  [RoutesEnum.DASHBOARD_SCREEN]: undefined;
  [RoutesEnum.NOTIFICATION_SCREEN]: undefined;
};

export type DashboardStackScreenProps<T extends keyof DashboardStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<DashboardStackParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

export type MenuStackParamList = {
  [RoutesEnum.MENU_SCREEN]: undefined;
  [RoutesEnum.SETTINGS]: undefined;
  [RoutesEnum.PROFILE_SETTINGS_SCREEN]: undefined;
};

export type MenuStackScreenProps<T extends keyof MenuStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<MenuStackParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;
