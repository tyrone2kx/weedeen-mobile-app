import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { VisitorsStackParamList } from '@wd/navigation/types';
import VisitorsScreen from '@wd/screens/visitors/VisitorsScreen';
import React, { FC } from 'react';
import { RoutesEnum } from '../enum';

const Stack = createNativeStackNavigator<VisitorsStackParamList>();

const VisitorsStack: FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={RoutesEnum.VISITORS_SCREEN}
      screenOptions={{ headerShown: false, animation: 'fade_from_bottom' }}
    >
      <Stack.Screen
        component={VisitorsScreen}
        name={RoutesEnum.VISITORS_SCREEN}
      />
    </Stack.Navigator>
  );
};
export default VisitorsStack;
