import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MenuStackParamList } from '@wd/navigation/types';
import MenuScreen from '@wd/screens/menu/MenuScreen';
import React, { FC } from 'react';
import { RoutesEnum } from '../enum';

const MenuNav = createNativeStackNavigator<MenuStackParamList>();

const MenuStack: FC = () => {
  return (
    <MenuNav.Navigator
      initialRouteName={RoutesEnum.MENU_SCREEN}
      // screenOptions={{ headerShown: false, animation: 'fade_from_bottom' }}
    >
      <MenuNav.Screen component={MenuScreen} name={RoutesEnum.MENU_SCREEN} />
    </MenuNav.Navigator>
  );
};
export default MenuStack;
