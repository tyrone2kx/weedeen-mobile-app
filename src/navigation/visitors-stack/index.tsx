import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { VisitorsStackParamList } from '@wd/navigation/types';
import VisitorsScreen from '@wd/screens/visitors/VisitorsScreen';
import useTabBarDisplay from '@wd/utils/useTabBarDisplay/useTabBarDisplay';
import React, { FC } from 'react';
import { RoutesEnum } from '../enum';

const Stack = createNativeStackNavigator<VisitorsStackParamList>();

const VisitorsStack: FC = () => {
  const { checkTabBar } = useTabBarDisplay();
  return (
    <Stack.Navigator
      initialRouteName={RoutesEnum.VISITORS_SCREEN}
      screenListeners={{
        state: e => checkTabBar(e),
      }}
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
