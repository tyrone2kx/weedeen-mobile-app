import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MyStoresStackParamList } from '@wd/navigation/types';
import MyStoresScreen from '@wd/screens/my-stores/MyStoresScreen';
import StoreProfileScreen from '@wd/screens/my-stores/StoreProfileScreen';
import useTabBarDisplay from '@wd/utils/useTabBarDisplay/useTabBarDisplay';
import React, { FC } from 'react';
import { RoutesEnum } from '../enum';

const Stack = createNativeStackNavigator<MyStoresStackParamList>();

const MyStoresStack: FC = () => {
  const { checkTabBar } = useTabBarDisplay();
  return (
    <Stack.Navigator
      initialRouteName={RoutesEnum.MY_STORES_SCREEN}
      screenListeners={{
        state: e => checkTabBar(e),
      }}
      screenOptions={{ headerShown: false, animation: 'fade_from_bottom' }}
    >
      <Stack.Screen
        component={MyStoresScreen}
        name={RoutesEnum.MY_STORES_SCREEN}
      />
      <Stack.Screen
        component={StoreProfileScreen}
        name={RoutesEnum.STORE_PROFILE_SCREEN}
      />
    </Stack.Navigator>
  );
};
export default MyStoresStack;
