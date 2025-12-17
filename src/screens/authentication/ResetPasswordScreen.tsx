import Button from '@wd/components/Button/Button';
import Header from '@wd/components/Header';
import Input from '@wd/components/Input/Input';
import SafeAreaComponent from '@wd/components/SafeAreaComponent/SafeAreaComponent';
import Text from '@wd/components/Text/Text';
import { RoutesEnum } from '@wd/navigation/enum';
import { AuthStackScreenProps } from '@wd/navigation/types';
import { updateAppUserState } from '@wd/redux-store/reducers/user-reducer';
import { globalStyles } from '@wd/utils/GlobalStyles';
import { Notify } from '@wd/utils/helpers';
import useTheme from '@wd/utils/theme/useTheme';
import React, { FC, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch } from 'react-redux';
import { authStyles } from './auth.styles';
import usePasswordReset from './hooks/usePasswordReset';

const ResetPasswordScreen: FC<
  AuthStackScreenProps<RoutesEnum.PASSWORD_RESET_SCREEN>
> = ({ navigation, route }) => {
  const { isResettingPassword, resetPassword } = usePasswordReset();
  const [password, setPassword] = useState<string>('');
  const [repassword, setRePassword] = useState<string>('');

  const { theme } = useTheme();

  const dispatch = useDispatch();

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
                Reset Password
              </Text>
              <Text intent="md">Create a new password for your account</Text>
            </View>
            <View className="flex-auto">
              <Input
                autoCapitalize="none"
                className="mb-8"
                label="Password"
                onChange={setPassword}
                placeholder="Password"
                secureEntry
                value={password}
              />
              <Input
                autoCapitalize="none"
                className="mb-8"
                label="Re-type password"
                onChange={setRePassword}
                placeholder="Re-type password"
                secureEntry
                value={repassword}
              />
            </View>
          </View>
          <View className="mt-8 w-full">
            <View className="mb-10 mt-20 px-6">
              <Button
                isLoading={isResettingPassword}
                label="Submit"
                onPress={() => {
                  if (!password) {
                    return Notify({
                      type: 'error',
                      title: 'Password is required',
                      message: '',
                    });
                  }

                  if (password.length < 8) {
                    return Notify({
                      type: 'error',
                      title: 'Password must be a minimum of 8 characters',
                      message: '',
                    });
                  }

                  if (repassword === password) {
                    void resetPassword(
                      {
                        requestBody: {
                          password,
                          token: route.params.token,
                        },
                      },
                      {
                        onSuccess: () => {
                          dispatch(
                            updateAppUserState({ currentUser: undefined }),
                          );

                          navigation.navigate(RoutesEnum.LOGIN_SCREEN);
                        },
                      },
                    );
                  } else {
                    Notify({
                      type: 'error',
                      title: 'Passwords do not match',
                      message: '',
                    });
                  }
                }}
              />
              <View className="mt-8 flex-row items-center justify-center gap-x-1">
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate(RoutesEnum.LOGIN_SCREEN)}
                >
                  <Text className="text-green underline" weight="medium">
                    Back to login
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

export default ResetPasswordScreen;
