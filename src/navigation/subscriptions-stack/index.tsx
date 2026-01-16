import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SubscriptionStackParamList } from '@wd/navigation/types';
import SubscriptionsScreen from '@wd/screens/subscriptions/SubscriptionsScreen';
import useTabBarDisplay from '@wd/utils/useTabBarDisplay/useTabBarDisplay';
import React, { FC } from 'react';
import { RoutesEnum } from '../enum';

const SubscriptionsNav =
  createNativeStackNavigator<SubscriptionStackParamList>();

const SubscriptionsStack: FC = () => {
  const { checkTabBar } = useTabBarDisplay();
  return (
    <SubscriptionsNav.Navigator
      initialRouteName={RoutesEnum.SUBSCRIPTION_SCREEN}
      screenListeners={{
        state: e => checkTabBar(e),
      }}
      screenOptions={{ headerShown: false, animation: 'fade_from_bottom' }}
    >
      <SubscriptionsNav.Screen
        component={SubscriptionsScreen}
        name={RoutesEnum.SUBSCRIPTION_SCREEN}
      />
    </SubscriptionsNav.Navigator>
  );
};
export default SubscriptionsStack;
