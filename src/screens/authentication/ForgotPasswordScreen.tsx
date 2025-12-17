import { useMutation } from '@tanstack/react-query';
import Button from '@wd/components/Button/Button';
import Header from '@wd/components/Header';
import Input from '@wd/components/Input/Input';
import PhoneNumberInput from '@wd/components/Input/PhoneNumberInput';
import SafeAreaComponent from '@wd/components/SafeAreaComponent/SafeAreaComponent';
import Text from '@wd/components/Text/Text';
import { AuthService } from '@wd/generated';
import { RoutesEnum } from '@wd/navigation/enum';
import { AuthStackScreenProps } from '@wd/navigation/types';
import { globalStyles } from '@wd/utils/GlobalStyles';
import { handleError, Notify } from '@wd/utils/helpers';
import useTheme from '@wd/utils/theme/useTheme';
import React, { FC, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { authStyles } from './auth.styles';

const ForgotPasswordScreen: FC<
  AuthStackScreenProps<RoutesEnum.FORGOT_PASSWORD_SCREEN>
> = ({ navigation }) => {
  const [email, setEmail] = useState<string>('');

  const { theme } = useTheme();

  const [loginType, setLoginType] = useState<'email' | 'phone'>('email');

  const { isPending, mutate } = useMutation({
    mutationFn: AuthService.authControllerForgotPassword,
    onSuccess: () => {
      Notify({
        type: 'success',
        title: 'Verification code sent',
        message: 'Please check your inbox for the verification code.',
      });
      navigation.navigate(RoutesEnum.VERIFY_ACCOUNT_SCREEN, { type: 'reset' });
    },
    onError: error => {
      handleError(error);
    },
  });
  return (
    <>
      <SafeAreaComponent
        statusBarProps={{
          backgroundColor: theme.white[400],
        }}
      />
      <View style={globalStyles.screen}>
        <Header canGoBack navigation={navigation} transparent />
        <KeyboardAwareScrollView
          contentContainerStyle={globalStyles.scroll_view_content_container}
          showsVerticalScrollIndicator={false}
          style={[authStyles.keyboard_avoiding_view]}
        >
          <View style={globalStyles.screen_gutter}>
            <View className="mb-8 mt-4">
              <Text className="mb-3" intent="h1">
                Forgot Password
              </Text>
              <Text intent="md">
                Enter your email or phone number and we will send you a
                verification code
              </Text>
            </View>
            <View className="flex-auto">
              {loginType === 'email' ? (
                <Input
                  autoCapitalize="none"
                  className="mb-8"
                  labelComponent={
                    <View className="mb-1 w-full flex-row items-center justify-between">
                      <Text intent="label">Email Address</Text>
                      {/* <TouchableOpacity
                        onPress={() => {
                          setLoginType('phone');
                          setEmail('');
                        }}
                      >
                        <Text className="text-blue" intent="label">
                          Use Phone
                        </Text>
                      </TouchableOpacity> */}
                    </View>
                  }
                  onChange={setEmail}
                  placeholder="Email Address"
                  type="email-address"
                  value={email}
                />
              ) : (
                <PhoneNumberInput
                  className="mb-8"
                  intent="outline"
                  labelComponent={
                    <View className="mb-1 w-full flex-row items-center justify-between">
                      <Text intent="label">Phone Number</Text>
                      <TouchableOpacity
                        onPress={() => {
                          setLoginType('email');
                          setEmail('');
                        }}
                      >
                        <Text className="text-blue" intent="label">
                          Use Email
                        </Text>
                      </TouchableOpacity>
                    </View>
                  }
                  onChangeText={text => setEmail(text)}
                  value={email}
                />
              )}
            </View>
          </View>
          <View className="mt-8 w-full">
            <View className="mb-10 mt-20 px-6">
              <Button
                isLoading={isPending}
                label="Send code"
                onPress={() => {
                  if (!email) {
                    return Notify({
                      type: 'error',
                      title: 'Enter a valid email or phone number',
                      message: '',
                    });
                  }

                  mutate(
                    {
                      requestBody: { email, source: 'app' },
                    },
                    {
                      onSuccess: data => {
                        navigation.navigate(RoutesEnum.VERIFY_ACCOUNT_SCREEN, {
                          type: 'reset',
                          token: data.token,
                        });
                      },
                    },
                  );
                }}
              />
              <View className="mt-8 flex-row items-center justify-center gap-x-1">
                <Text>Already have an account?</Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate(RoutesEnum.LOGIN_SCREEN)}
                >
                  <Text className="text-green underline" weight="medium">
                    Login
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </>
  );
};

export default ForgotPasswordScreen;
