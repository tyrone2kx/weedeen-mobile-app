/* eslint-disable react-hooks/set-state-in-effect */
import { useNavigation } from '@react-navigation/native';
import Button from '@wd/components/Button/Button';
import CustomNumberPad from '@wd/components/CustomNumberPad';
import { OtpPinInput } from '@wd/components/OtpPinInput';
import SafeAreaComponent from '@wd/components/SafeAreaComponent/SafeAreaComponent';
import Text from '@wd/components/Text/Text';
import { VerifyAccountResponseDto } from '@wd/generated';
import { RoutesEnum, StacksEnum } from '@wd/navigation/enum';
import { AuthStackScreenProps } from '@wd/navigation/types';
import { globalStyles } from '@wd/utils/GlobalStyles';
import useTheme from '@wd/utils/theme/useTheme';
import React, { FC, useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch } from 'react-redux';
import { authStyles } from './auth.styles';
import { onSuccessfullLogin } from './definitions/constants';
import useResendVerificationCode from './hooks/useResendVerificationCode';
import useVerifyOtp from './hooks/useVerifyOtp';

const AccountVerificationScreen: FC<
  AuthStackScreenProps<RoutesEnum.VERIFY_ACCOUNT_SCREEN>
> = ({ route }) => {
  const { type, token = '' } = route.params;
  const dispatch = useDispatch();
  const [showNumberPad, setShowNumberPad] = useState(false);
  const navigation =
    useNavigation<
      AuthStackScreenProps<RoutesEnum.VERIFY_ACCOUNT_SCREEN>['navigation']
    >();
  const [code, setCode] = useState('');
  const [pinReady, setPinReady] = useState(false);

  const { theme } = useTheme();

  const MAX_CODE_LENGTH = 6;

  const { isLoading, verifyOtp } = useVerifyOtp();

  useEffect(() => {
    if (pinReady) {
      setShowNumberPad(false);
    }
  }, [pinReady]);

  const handleNumberPress = (number: number) => {
    setCode(prevValue => prevValue + number.toString());
  };

  const { isResending, resendLink } = useResendVerificationCode();

  return (
    <>
      <SafeAreaComponent
        statusBarProps={{
          backgroundColor: theme.white[400],
        }}
      />
      <View style={globalStyles.screen}>
        <KeyboardAwareScrollView
          contentContainerStyle={globalStyles.scroll_view_content_container}
          showsVerticalScrollIndicator={false}
          style={[authStyles.keyboard_avoiding_view]}
        >
          <View className="mt-[75px]" style={globalStyles.screen_gutter}>
            <View className="mb-8 mt-4">
              <Text className="mb-3" intent="h1">
                Verification
              </Text>
              <Text intent="md">Please input the code sent to your email</Text>
            </View>
            <View className="flex-auto">
              <OtpPinInput
                code={code}
                maxLength={MAX_CODE_LENGTH}
                onPress={() => setShowNumberPad(true)}
                setCode={setCode}
                setPinReady={setPinReady}
              />
              <View className="mt-3 flex-col items-center justify-center">
                <Text intent="md">
                  Didn&apos;t receive the verification code?
                </Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    resendLink({
                      requestBody: { source: 'app', token: token || '' },
                    });
                  }}
                  style={authStyles.pad_touchable}
                >
                  <Text
                    className="text-blue-500 underline"
                    intent="md"
                    weight="medium"
                  >
                    Resend Code
                  </Text>
                </TouchableOpacity>
              </View>
              {showNumberPad ? (
                <View className="mt-8">
                  <CustomNumberPad
                    onBackPress={() =>
                      setCode(prevValue => prevValue.slice(0, -1))
                    }
                    onFingerprintPress={() => {}}
                    onNumberPress={handleNumberPress}
                  />
                </View>
              ) : null}
              {pinReady && (
                <View className="mt-8">
                  <Button
                    isLoading={isLoading}
                    label={
                      type === 'activation' ? 'Verify account' : 'Submit code'
                    }
                    onPress={() => {
                      void verifyOtp(
                        {
                          requestBody: {
                            isPasswordReset: type === 'reset',
                            code,
                            source: 'app',
                            token: token || '',
                          },
                        },
                        {
                          onSuccess: (data: VerifyAccountResponseDto) => {
                            const {
                              accessToken,
                              refreshToken,
                              user: loggedInUser,
                              activeSubscription,
                              activeUserSubscriptions,
                            } = data;
                            void onSuccessfullLogin({
                              user: loggedInUser,
                              accessToken,
                              refreshToken,
                              activeSubscription,
                              activeUserSubscriptions,
                              dispatch,
                            });
                            if (type === 'activation') {
                              navigation.navigate(StacksEnum.APP_STACK, {
                                screen: StacksEnum.DASHBOARD_STACK,
                                params: { screen: RoutesEnum.DASHBOARD_SCREEN },
                              });
                            }
                            if (type === 'reset') {
                              navigation.navigate(
                                RoutesEnum.PASSWORD_RESET_SCREEN,
                                {
                                  token,
                                },
                              );
                            }
                          },
                        },
                      );
                    }}
                  />
                </View>
              )}
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </>
  );
};

export default AccountVerificationScreen;
