import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DashboardStackParamList } from '@wd/navigation/types';
import DashboardScreen from '@wd/screens/dashboard/DashboardScreen';
import NotificationScreen from '@wd/screens/notification/NotificationScreen';
import useTabBarDisplay from '@wd/utils/useTabBarDisplay/useTabBarDisplay';
import React, { FC } from 'react';
import { RoutesEnum } from '../enum';

const DashboardStackNav = createNativeStackNavigator<DashboardStackParamList>();

const DashboardStack: FC = () => {
  const { checkTabBar } = useTabBarDisplay();
  return (
    <DashboardStackNav.Navigator
      initialRouteName={RoutesEnum.DASHBOARD_SCREEN}
      screenListeners={{
        state: e => checkTabBar(e),
      }}
      screenOptions={{ headerShown: false, animation: 'fade_from_bottom' }}
    >
      <DashboardStackNav.Screen
        component={DashboardScreen}
        name={RoutesEnum.DASHBOARD_SCREEN}
      />
      <DashboardStackNav.Screen
        component={NotificationScreen}
        name={RoutesEnum.NOTIFICATION_SCREEN}
      />
    </DashboardStackNav.Navigator>
  );
};
export default DashboardStack;
