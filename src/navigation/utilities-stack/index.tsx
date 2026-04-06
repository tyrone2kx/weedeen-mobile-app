import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UtilitiesStackParamList } from '@wd/navigation/types';
import UtilitiesScreen from '@wd/screens/utilities/UtilitiesScreen';
import UtilityProfileScreen from '@wd/screens/utilities/UtilityProfileScreen';
import useTabBarDisplay from '@wd/utils/useTabBarDisplay/useTabBarDisplay';
import React, { FC } from 'react';
import { RoutesEnum } from '../enum';

const Stack = createNativeStackNavigator<UtilitiesStackParamList>();

const UtilitiesStack: FC = () => {
  const { checkTabBar } = useTabBarDisplay();
  return (
    <Stack.Navigator
      initialRouteName={RoutesEnum.UTILITIES_SCREEN}
      screenListeners={{
        state: e => checkTabBar(e),
      }}
      screenOptions={{ headerShown: false, animation: 'fade_from_bottom' }}
    >
      <Stack.Screen
        component={UtilitiesScreen}
        name={RoutesEnum.UTILITIES_SCREEN}
      />
      <Stack.Screen
        component={UtilityProfileScreen}
        name={RoutesEnum.UTILITY_PROFILE_SCREEN}
      />
    </Stack.Navigator>
  );
};
export default UtilitiesStack;
