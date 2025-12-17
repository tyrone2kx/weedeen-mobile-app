import { useMutation } from '@tanstack/react-query';
import Button from '@wd/components/Button/Button';
import Header from '@wd/components/Header';
import Input from '@wd/components/Input/Input';
import SafeAreaComponent from '@wd/components/SafeAreaComponent/SafeAreaComponent';
import Text from '@wd/components/Text/Text';
import { AuthService } from '@wd/generated';
import { RoutesEnum } from '@wd/navigation/enum';
import { AuthStackScreenProps } from '@wd/navigation/types';
import { globalStyles } from '@wd/utils/GlobalStyles';
import useFirebaseAnalytics from '@wd/utils/firebase/hooks/useFirebaseAnalytics';
import { FirebaseEventEnum } from '@wd/utils/firebase/types';
import { isValidNGNPhoneNumber } from '@wd/utils/formValidations';
import { handleError, Notify } from '@wd/utils/helpers';
import useTheme from '@wd/utils/theme/useTheme';
import { useFormik } from 'formik';
import React, { FC, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { authStyles } from './auth.styles';
import { onSuccessfullLogin } from './definitions/constants';

const LoginScreen: FC<AuthStackScreenProps<RoutesEnum.LOGIN_SCREEN>> = ({
  navigation,
}) => {
  const dispatch = useDispatch();
  const { LogEvent } = useFirebaseAnalytics();

  const [loginType, setLoginType] = useState<'email' | 'phone'>('email');

  const { theme } = useTheme();

  const { isPending: loading, mutate: startLogin } = useMutation({
    mutationFn: AuthService.authControllerLogin,
    onSuccess: async data => {
      if (data.isVerified) {
        const {
          user,
          accessToken,
          refreshToken,
          activeSubscription,
          activeUserSubscriptions,
        } = data.data!;
        await onSuccessfullLogin({
          user,
          accessToken,
          refreshToken,
          activeSubscription,
          activeUserSubscriptions,
          dispatch,
        });
      }
    },
    onError: error => handleError(error),
  });
  const {
    values,
    errors,
    handleChange,
    isValid,
    handleSubmit,
    touched,
    setFieldTouched,
    setValues,
    setTouched,
  } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().test(
        'email-or-phone',
        'Please enter a valid email',
        (value, context) => {
          if (loginType === 'email') {
            // Check for valid email
            return Yup.string()
              .email('Please enter a valid email address')
              .required('Email is required')
              .isValidSync(value);
          } else if (loginType === 'phone') {
            // Check for valid phone number (NGN currently)
            if (!value) {
              return context.createError({
                message: 'Phone number is required',
              });
            } else if (!isValidNGNPhoneNumber(value)) {
              return context.createError({
                message: 'Please enter a valid phone number',
              });
            }
            return true;
          }
          return false;
        },
      ),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: submitValues => {
      if (isValid) {
        LogEvent(FirebaseEventEnum.USER_LOGIN, {
          [loginType]: submitValues.email,
        });
        startLogin(
          {
            requestBody: {
              email: submitValues.email,
              password: submitValues.password,
            },
          },
          {
            onSuccess: data => {
              if (!data.data) {
                navigation.navigate(RoutesEnum.VERIFY_ACCOUNT_SCREEN, {
                  type: 'activation',
                  email: submitValues.email,
                });
              }
            },
          },
        );
      } else {
        Notify({
          type: 'error',
          title: `${loginType} and password is required`,
        });
      }
    },
  });

  const onChangeLoginType = (newLoginType: 'email' | 'phone') => {
    setLoginType(newLoginType);

    void setValues({
      email: '',
      password: '',
    });

    void setTouched({
      email: false,
      password: false,
    });
  };

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
                Log In
              </Text>
              <Text intent="md">
                Enter your email and password to log into your account
              </Text>
            </View>
            <View className="flex-auto">
              <Input
                autoCapitalize="none"
                className="mb-8"
                error={touched.email ? errors.email : ''}
                intent="solid"
                labelComponent={
                  <View className="w-full flex-row items-center justify-between">
                    <Text intent="label">Email Address</Text>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => {
                        onChangeLoginType('phone');
                      }}
                    >
                      <Text className="text-blue" intent="label">
                        Use Phone
                      </Text>
                    </TouchableOpacity>
                  </View>
                }
                onBlur={() => void setFieldTouched('email')}
                onChange={handleChange('email')}
                placeholder="Email Address"
                type="email-address"
                value={values.email}
              />
              <Input
                autoCapitalize="none"
                error={touched.password ? errors.password : ''}
                intent="solid"
                label="Password"
                onBlur={() => void setFieldTouched('password')}
                onChange={handleChange('password')}
                placeholder="Password"
                secureEntry
                value={values.password}
              />
            </View>
          </View>
          <View className="mt-8 w-full">
            <View className="mb-10 mt-20 px-6">
              <Button
                isLoading={loading}
                label="Login"
                onPress={() => {
                  handleSubmit();
                }}
              />
              <View className="mt-6 flex-row items-center justify-center">
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() =>
                    navigation.navigate(RoutesEnum.FORGOT_PASSWORD_SCREEN)
                  }
                >
                  <Text className="underline" weight="medium">
                    Forgot Password
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

export default LoginScreen;
