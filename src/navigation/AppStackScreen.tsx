import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAppSelector } from '@wd/redux-store/hooks/useAppSelector';
import { useNotificationListeners } from '@wd/utils/pushNotification';
import { useColorScheme } from 'nativewind';
import React, { FC } from 'react';
import AuthStack from './auth-stack';
import BottomTabNavigation from './bottom-tab-navigation';
import { StacksEnum } from './enum';
import { RootStackParamList } from './types';

const AppStack = createNativeStackNavigator<RootStackParamList>();

const AppStackScreens: FC = () => {
  useNotificationListeners();
  const accessToken = useAppSelector(state => state.user.accessToken);

  const { colorScheme = 'light' } = useColorScheme();

  return (
    <AppStack.Navigator
      screenOptions={{
        headerShown: false,
        navigationBarColor: colorScheme === 'light' ? 'white' : 'black',
      }}
    >
      {!accessToken ? (
        <AppStack.Screen component={AuthStack} name={StacksEnum.AUTH_STACK} />
      ) : (
        <AppStack.Screen
          component={BottomTabNavigation}
          name={StacksEnum.APP_STACK}
        />
      )}
    </AppStack.Navigator>
  );
};
export default AppStackScreens;
