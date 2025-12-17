import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import useFirebaseAnalytics from '@wd/utils/firebase/hooks/useFirebaseAnalytics';
import { FirebaseEventEnum } from '@wd/utils/firebase/types';
import RNavigationTheme from '@wd/utils/theme/RNavigationTheme';
import { useColorScheme } from 'nativewind';
import React, { useRef } from 'react';
import BootSplash from 'react-native-bootsplash';
import AppStackScreens from './AppStackScreen';
import { RoutesEnum } from './enum';

const hideSplashScreen = async () => {
  await BootSplash.hide({ fade: true });
};

const AppNavigationContainer = () => {
  const navigationRef = useNavigationContainerRef();
  const currentScreenRef = useRef<string>('');
  const { LogEvent } = useFirebaseAnalytics();

  const interactionStartDate = useRef(new Date());

  const { colorScheme = 'light' } = useColorScheme();

  return (
    <NavigationContainer
      onReady={() => {
        currentScreenRef.current = navigationRef?.getCurrentRoute()?.name || '';

        LogEvent(FirebaseEventEnum.SCREEN_VIEW, {
          screen_name: currentScreenRef.current,
        });
        void hideSplashScreen();
        interactionStartDate.current = new Date();
      }}
      onStateChange={() => {
        const previousRouteName = currentScreenRef.current as RoutesEnum;

        const currentRouteName = (navigationRef?.getCurrentRoute()?.name ||
          '') as RoutesEnum;

        if (previousRouteName !== currentRouteName) {
          currentScreenRef.current = currentRouteName;

          LogEvent(FirebaseEventEnum.SCREEN_VIEW, {
            screen_name: currentRouteName,
          });

          interactionStartDate.current = new Date();
        }
      }}
      ref={navigationRef}
      theme={RNavigationTheme[colorScheme]}
    >
      <AppStackScreens />
    </NavigationContainer>
  );
};

export default AppNavigationContainer;
