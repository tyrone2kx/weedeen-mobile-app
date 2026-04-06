import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MyStaffStackParamList } from '@wd/navigation/types';
import MyStaffScreen from '@wd/screens/my-staff/MyStaffScreen';
import StaffProfileScreen from '@wd/screens/my-staff/StaffProfileScreen';
import useTabBarDisplay from '@wd/utils/useTabBarDisplay/useTabBarDisplay';
import React, { FC } from 'react';
import { RoutesEnum } from '../enum';

const Stack = createNativeStackNavigator<MyStaffStackParamList>();

const MyStaffStack: FC = () => {
  const { checkTabBar } = useTabBarDisplay();
  return (
    <Stack.Navigator
      initialRouteName={RoutesEnum.MY_STAFF_SCREEN}
      screenListeners={{
        state: e => checkTabBar(e),
      }}
      screenOptions={{ headerShown: false, animation: 'fade_from_bottom' }}
    >
      <Stack.Screen
        component={MyStaffScreen}
        name={RoutesEnum.MY_STAFF_SCREEN}
      />
      <Stack.Screen
        component={StaffProfileScreen}
        name={RoutesEnum.STAFF_PROFILE_SCREEN}
      />
    </Stack.Navigator>
  );
};
export default MyStaffStack;
