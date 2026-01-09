import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FeesStackParamList } from '@wd/navigation/types';
import FeesScreen from '@wd/screens/fees/FeesScreen';
import useTabBarDisplay from '@wd/utils/useTabBarDisplay/useTabBarDisplay';
import React, { FC } from 'react';
import { RoutesEnum } from '../enum';

const Stack = createNativeStackNavigator<FeesStackParamList>();

const FeesStack: FC = () => {
  const { checkTabBar } = useTabBarDisplay();
  return (
    <Stack.Navigator
      initialRouteName={RoutesEnum.FEES_SCREEN}
      screenListeners={{
        state: e => checkTabBar(e),
      }}
      screenOptions={{ headerShown: false, animation: 'fade_from_bottom' }}
    >
      <Stack.Screen component={FeesScreen} name={RoutesEnum.FEES_SCREEN} />
    </Stack.Navigator>
  );
};
export default FeesStack;
