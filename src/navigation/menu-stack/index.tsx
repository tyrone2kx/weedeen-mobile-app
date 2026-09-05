import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MenuStackParamList } from '@wd/navigation/types';
import BankAccountScreen from '@wd/screens/bank-accounts/BankAccountScreen';
import BeneficiariesScreen from '@wd/screens/beneficiaries/BeneficiariesScreen';
import DeliveriesScreen from '@wd/screens/deliveries/DeliveriesScreen';
import MenuScreen from '@wd/screens/menu/MenuScreen';
import OrdersScreen from '@wd/screens/orders/OrdersScreen';
import ProfileScreen from '@wd/screens/profile/ProfileScreen';
import useTabBarDisplay from '@wd/utils/useTabBarDisplay/useTabBarDisplay';
import React, { FC } from 'react';
import { RoutesEnum, StacksEnum } from '../enum';
import MyStaffStack from '../my-staff-stack';
import MyStoresStack from '../my-stores-stack';
import SubscriptionsStack from '../subscriptions-stack';
import UtilitiesStack from '../utilities-stack';

const MenuNav = createNativeStackNavigator<MenuStackParamList>();

const MenuStack: FC = () => {
  const { checkTabBar } = useTabBarDisplay();
  return (
    <MenuNav.Navigator
      initialRouteName={RoutesEnum.MENU_SCREEN}
      screenListeners={{
        state: e => checkTabBar(e),
      }}
      screenOptions={{ headerShown: false, animation: 'fade_from_bottom' }}
    >
      <MenuNav.Screen component={MenuScreen} name={RoutesEnum.MENU_SCREEN} />
      <MenuNav.Screen
        component={OrdersScreen}
        name={RoutesEnum.ORDERS_SCREEN}
      />
      <MenuNav.Screen
        component={ProfileScreen}
        name={RoutesEnum.PROFILE_SETTINGS_SCREEN}
      />
      <MenuNav.Screen
        component={DeliveriesScreen}
        name={RoutesEnum.DELIVERIES_SCREEN}
      />
      <MenuNav.Screen
        component={BankAccountScreen}
        name={RoutesEnum.BANK_ACCOUNTS_SCREEN}
      />
      <MenuNav.Screen
        component={BeneficiariesScreen}
        name={RoutesEnum.BENEFICIARIES_SCREEN}
      />
      <MenuNav.Screen
        component={MyStoresStack}
        name={StacksEnum.MY_STORES_STACK}
      />
      <MenuNav.Screen
        component={SubscriptionsStack}
        name={StacksEnum.SUBSCRIPTION_STACK}
      />
      <MenuNav.Screen
        component={MyStaffStack}
        name={StacksEnum.MY_STAFF_STACK}
      />
      <MenuNav.Screen
        component={UtilitiesStack}
        name={StacksEnum.UTILITIES_STACK}
      />
    </MenuNav.Navigator>
  );
};
export default MenuStack;
