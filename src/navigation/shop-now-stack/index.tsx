import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ShopNowStackParamList } from '@wd/navigation/types';
import ShopScreen from '@wd/screens/shop/ShopScreen';
import SingleShopScreen from '@wd/screens/shop/SingleShopScreen';
import useTabBarDisplay from '@wd/utils/useTabBarDisplay/useTabBarDisplay';
import React, { FC } from 'react';
import { RoutesEnum } from '../enum';

const Stack = createNativeStackNavigator<ShopNowStackParamList>();

const ShopNowStack: FC = () => {
  const { checkTabBar } = useTabBarDisplay();
  return (
    <Stack.Navigator
      initialRouteName={RoutesEnum.SHOP_NOW_SCREEN}
      screenListeners={{
        state: e => checkTabBar(e),
      }}
      screenOptions={{ headerShown: false, animation: 'fade_from_bottom' }}
    >
      <Stack.Screen component={ShopScreen} name={RoutesEnum.SHOP_NOW_SCREEN} />
      <Stack.Screen
        component={SingleShopScreen}
        name={RoutesEnum.SINGLE_SHOP_SCREEN}
      />
    </Stack.Navigator>
  );
};
export default ShopNowStack;
