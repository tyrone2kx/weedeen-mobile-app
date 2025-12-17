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

// ================= AUTH STACK =========================
export type AuthStackParamList = {
  [RoutesEnum.GET_STARTED_SCREEN]: undefined;
  [RoutesEnum.ONBOARDING_SCREEN]: undefined;
  [RoutesEnum.LOGIN_SCREEN]: undefined;
  [RoutesEnum.PASSWORD_RESET_SCREEN]: {
    token: string;
  };
  [RoutesEnum.FORGOT_PASSWORD_SCREEN]: undefined;
  [RoutesEnum.REGISTER_SCREEN]: undefined;
  [RoutesEnum.VERIFY_ACCOUNT_SCREEN]: {
    type: 'reset' | 'activation';
    email?: string;
    token?: string;
  };
};

export type AuthStackScreenProps<T extends keyof AuthStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<AuthStackParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

// ================= APP BOTTOM TAB STACK =====================

export type AppBottomTabParamList = {
  [StacksEnum.DASHBOARD_STACK]: NavigatorScreenParams<DashboardStackParamList>;
  [StacksEnum.MENU_STACK]: NavigatorScreenParams<MenuStackParamList>;
  [StacksEnum.VISITORS_STACK]: NavigatorScreenParams<VisitorsStackParamList>;
  [StacksEnum.SHOP_NOW_STACK]: NavigatorScreenParams<ShopNowStackParamList>;
  [StacksEnum.FEES_STACK]: NavigatorScreenParams<FeesStackParamList>;
};

export type AppBottomTabScreenProps<T extends keyof AppBottomTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<AppBottomTabParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

// ================ SHOP NOW STACK =========================

export type ShopNowStackParamList = {
  [RoutesEnum.SHOP_NOW_SCREEN]: undefined;
};
export type ShopNowStackScreenProps<T extends keyof ShopNowStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<ShopNowStackParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

// ================= FEES STACK =========================

export type FeesStackParamList = {
  [RoutesEnum.FEES_SCREEN]: undefined;
};
export type FeesStackScreenProps<T extends keyof FeesStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<FeesStackParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

// ================= VISITORS STACK STACK =========================

export type VisitorsStackParamList = {
  [RoutesEnum.VISITORS_SCREEN]: undefined;
};

export type VisitorsStackScreenProps<T extends keyof VisitorsStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<VisitorsStackParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

// ================= DASHBOARD STACK =========================

export type DashboardStackParamList = {
  [RoutesEnum.DASHBOARD_SCREEN]: undefined;
  [RoutesEnum.NOTIFICATION_SCREEN]: undefined;
};

export type DashboardStackScreenProps<T extends keyof DashboardStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<DashboardStackParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

// ================= MENU STACK =========================

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
