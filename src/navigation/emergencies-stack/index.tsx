import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EmergenciesStackParamList } from '@wd/navigation/types';
import EmergenciesScreen from '@wd/screens/emergencies/EmergenciesScreen';
import useTabBarDisplay from '@wd/utils/useTabBarDisplay/useTabBarDisplay';
import React, { FC } from 'react';
import { RoutesEnum } from '../enum';

const Stack = createNativeStackNavigator<EmergenciesStackParamList>();

const EmergenciesStack: FC = () => {
  const { checkTabBar } = useTabBarDisplay();
  return (
    <Stack.Navigator
      initialRouteName={RoutesEnum.EMERGENCIES_SCREEN}
      screenListeners={{
        state: e => checkTabBar(e),
      }}
      screenOptions={{ headerShown: false, animation: 'fade_from_bottom' }}
    >
      <Stack.Screen
        component={EmergenciesScreen}
        name={RoutesEnum.EMERGENCIES_SCREEN}
      />
    </Stack.Navigator>
  );
};
export default EmergenciesStack;
