import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FeesStackParamList } from '@wd/navigation/types';
import FeesScreen from '@wd/screens/fees/FeesScreen';
import React, { FC } from 'react';
import { RoutesEnum } from '../enum';

const Stack = createNativeStackNavigator<FeesStackParamList>();

const FeesStack: FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={RoutesEnum.FEES_SCREEN}
      screenOptions={{ headerShown: false, animation: 'fade_from_bottom' }}
    >
      <Stack.Screen component={FeesScreen} name={RoutesEnum.FEES_SCREEN} />
    </Stack.Navigator>
  );
};
export default FeesStack;
