import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { useAppSelector } from '@wd/redux-store/hooks/useAppSelector';
import React, { FC } from 'react';
import DashboardStack from '../dashboard-stack';
import { StacksEnum } from '../enum';
import FeesStack from '../fees-stack';
import MenuStack from '../menu-stack';
import ShopNowStack from '../shop-now-stack';
import { AppBottomTabParamList } from '../types';
import VisitorsStack from '../visitors-stack';
import CustomTabBar from './components/CustomTabBar';

const Tab = createBottomTabNavigator<AppBottomTabParamList>();

const renderTabBar = (props: BottomTabBarProps) => <CustomTabBar {...props} />;

const BottomTabNavigation: FC = () => {
  // useFCMToken();

  const tabBarStyle = useAppSelector(state => state.user.tabBarStyle);

  return (
    <BottomSheetModalProvider>
      <Tab.Navigator
        initialRouteName={StacksEnum.DASHBOARD_STACK}
        screenOptions={{
          headerShown: false,
          tabBarStyle,
          animation: 'shift',
        }}
        tabBar={renderTabBar}
      >
        <Tab.Screen
          component={MenuStack}
          name={StacksEnum.MENU_STACK}
          options={{
            tabBarLabel: 'Menu',
          }}
        />
        <Tab.Screen
          component={VisitorsStack}
          name={StacksEnum.VISITORS_STACK}
          options={{
            tabBarLabel: 'Visitors',
          }}
        />
        <Tab.Screen
          component={DashboardStack}
          name={StacksEnum.DASHBOARD_STACK}
          options={{
            tabBarLabel: 'Home',
          }}
        />
        <Tab.Screen
          component={ShopNowStack}
          name={StacksEnum.SHOP_NOW_STACK}
          options={{
            tabBarLabel: 'Shop Now',
          }}
        />
        <Tab.Screen
          component={FeesStack}
          name={StacksEnum.FEES_STACK}
          options={{
            tabBarLabel: 'Fees',
          }}
        />
      </Tab.Navigator>
    </BottomSheetModalProvider>
  );
};

export default BottomTabNavigation;
