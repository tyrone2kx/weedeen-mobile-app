/* eslint-disable @typescript-eslint/no-require-imports */
import { useNavigation } from '@react-navigation/native';
import SafeAreaComponent from '@wd/components/SafeAreaComponent/SafeAreaComponent';
import { RoutesEnum } from '@wd/navigation/enum';
import { AuthStackScreenProps } from '@wd/navigation/types';
import { globalStyles } from '@wd/utils/GlobalStyles';
import React, { FC, useEffect } from 'react';
import { Image, ImageBackground, View } from 'react-native';
import { authStyles } from '../authentication/auth.styles';
import { onboardingStyles } from './onboarding.styles';

const GetStartedScreen: FC<
  AuthStackScreenProps<RoutesEnum.GET_STARTED_SCREEN>
> = () => {
  const navigation =
    useNavigation<
      AuthStackScreenProps<RoutesEnum.GET_STARTED_SCREEN>['navigation']
    >();

  useEffect(() => {
    const timeout = setTimeout(
      () => navigation.navigate(RoutesEnum.ONBOARDING_SCREEN),
      2000,
    );
    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <>
      <SafeAreaComponent />
      <View style={globalStyles.screen}>
        <ImageBackground
          source={require('@assets/images/onboarding_background.png')}
          style={onboardingStyles.slide_item_container}
        >
          <View style={globalStyles.screen_gutter}>
            <View style={authStyles.keyboard_avoiding_view}>
              <View style={onboardingStyles.getting_started_content}>
                <Image
                  source={require('@assets/images/app-logo.png')}
                  style={authStyles.app_logo_lg}
                />
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    </>
  );
};

export default GetStartedScreen;
