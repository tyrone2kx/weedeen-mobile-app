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
  [RoutesEnum.SINGLE_SHOP_SCREEN]: { id: string };
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

// ================= EMERGENCIES STACK =========================

export type EmergenciesStackParamList = {
  [RoutesEnum.EMERGENCIES_SCREEN]: undefined;
};

export type EmergenciesStackScreenProps<
  T extends keyof EmergenciesStackParamList,
> = CompositeScreenProps<
  NativeStackScreenProps<EmergenciesStackParamList, T>,
  RootStackScreenProps<keyof RootStackParamList>
>;

// ================= MY STORES STACK =========================

export type MyStoresStackParamList = {
  [RoutesEnum.MY_STORES_SCREEN]: undefined;
  [RoutesEnum.STORE_PROFILE_SCREEN]: { id: string };
};
export type MyStoresStackScreenProps<T extends keyof MyStoresStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<MyStoresStackParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

// ================= SUBSCRIPTION STACK =========================

export type SubscriptionStackParamList = {
  [RoutesEnum.SUBSCRIPTION_SCREEN]: undefined;
};

export type SubscriptionStackScreenProps<
  T extends keyof SubscriptionStackParamList,
> = CompositeScreenProps<
  NativeStackScreenProps<SubscriptionStackParamList, T>,
  RootStackScreenProps<keyof RootStackParamList>
>;

// ================= MENU STACK =========================

export type MenuStackParamList = {
  [RoutesEnum.MENU_SCREEN]: undefined;
  [RoutesEnum.SETTINGS]: undefined;
  [RoutesEnum.PROFILE_SETTINGS_SCREEN]: undefined;
  [StacksEnum.SUBSCRIPTION_STACK]: NavigatorScreenParams<SubscriptionStackParamList>;
  [StacksEnum.EMERGENCIES_STACK]: NavigatorScreenParams<EmergenciesStackParamList>;
  [StacksEnum.MY_STORES_STACK]: NavigatorScreenParams<MyStoresStackParamList>;
  [RoutesEnum.ORDERS_SCREEN]: undefined;
  [RoutesEnum.DELIVERIES_SCREEN]: undefined;
  [RoutesEnum.BANK_ACCOUNTS_SCREEN]: undefined;
};

export type MenuStackScreenProps<T extends keyof MenuStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<MenuStackParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;
