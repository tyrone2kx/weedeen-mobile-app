import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ShopNowStackParamList } from '@wd/navigation/types';
import ShopScreen from '@wd/screens/shop/ShopScreen';
import React, { FC } from 'react';
import { RoutesEnum } from '../enum';

const Stack = createNativeStackNavigator<ShopNowStackParamList>();

const ShopNowStack: FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={RoutesEnum.SHOP_NOW_SCREEN}
      screenOptions={{ headerShown: false, animation: 'fade_from_bottom' }}
    >
      <Stack.Screen component={ShopScreen} name={RoutesEnum.SHOP_NOW_SCREEN} />
    </Stack.Navigator>
  );
};
export default ShopNowStack;
