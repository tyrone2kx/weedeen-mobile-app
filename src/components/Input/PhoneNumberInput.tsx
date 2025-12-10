import { Fonts } from '@wd/utils/Fonts';
import { remapProps } from 'nativewind';
import React, { FC, useRef, useState } from 'react';
import {
  StyleSheet,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import PhoneInput, { PhoneInputState } from 'react-native-phone-number-input';

import { getFormattedPhoneNumber } from '@wd/utils/formValidations';
import { TColors } from '@wd/utils/theme/colors';
import useTheme from '@wd/utils/theme/useTheme';
import Text from '../Text/Text';

interface IProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  shouldValidate?: boolean;
  labelComponent?: React.ReactNode;
  intent?: 'solid' | 'outline';
  textInputStyle?: TextStyle;
  textContainerStyle?: ViewStyle;
  codeTextStyle?: TextStyle;
  containerStyle?: ViewStyle;
  countryPickerButtonStyle?: ViewStyle;
  style?: ViewStyle;
  required?: boolean;
  labelContainerStyle?: ViewStyle;
  error?: string;
  onBlur?: TextInputProps['onBlur'];
  onChangeCountry?: (countryCode: PhoneInputState['countryCode']) => void;
  onChangeCountryCode?: (callingCode: string) => void;
  onChangeFormattedText?: (text: string) => void;
  defaultCode?: PhoneInputState['countryCode'];
}

const styles = (theme: TColors) =>
  StyleSheet.create({
    container: {
      width: '100%',
    },

    codeText: {
      color: theme.black[600],
      fontFamily: Fonts.default,
      fontSize: 14,
      height: 18,
      marginBottom: 2,
    },

    textContainer: {
      backgroundColor: 'transparent',
      height: 48,
      paddingRight: 0,
    },

    textInput: {
      color: theme.black[600],
      fontFamily: Fonts.medium,
      fontSize: 14,
      height: 48,
      flex: 1,
    },
  });

const variants = (theme: TColors) => ({
  intent: {
    solid: {
      animatedBorder: {
        start: theme.gray[150],
        stop: theme.green.DEFAULT,
      },
      container: {
        borderWidth: 1,
        borderRadius: 12,
        borderColor: theme.gray[150],
        backgroundColor: theme.white[400],
        marginTop: 3,
      },
      countryPickerButton: {
        borderRightWidth: 1,
        borderRightColor: theme.gray[150],
      },
      textContainer: {},
      labelContainer: 'mb-1',
    },
    outline: {
      animatedBorder: {
        start: theme.gray[150],
        stop: theme.green.DEFAULT,
      },
      container: {
        borderBottomWidth: 1,
        borderColor: theme.gray[150],
        backgroundColor: 'transparent',
      },
      countryPickerButton: {
        paddingLeft: 0,
        width: 65,
        paddingRight: 5,
      },
      textContainer: {
        paddingLeft: 0,
      },
      labelContainer: '',
    },
  },
});

const PhoneNumberInput: FC<IProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  shouldValidate = true,
  labelComponent,
  intent = 'solid',
  codeTextStyle,
  containerStyle,
  textContainerStyle,
  textInputStyle,
  countryPickerButtonStyle,
  style,
  required,
  labelContainerStyle,
  error,
  onBlur,
  onChangeCountryCode,
  onChangeCountry,
  onChangeFormattedText,
  defaultCode = 'NG',
}) => {
  const [isValidNumber, setIsValidNumber] = useState(true);

  const phoneInputRef = useRef<PhoneInput>(null);

  const callingCodeRef = useRef('234'); // Default country is NG

  const { theme, colorScheme } = useTheme();

  const internalError =
    !isValidNumber && shouldValidate ? 'Phone number is invalid' : error;

  const hasLabel = label || labelComponent;

  return (
    <View className="mb-5" style={style}>
      {hasLabel && (
        <View
          className={`flex-row ${variants(theme).intent[intent].labelContainer}`}
          style={labelContainerStyle}
        >
          {label && <Text intent="label">{label}</Text>}
          {labelComponent && labelComponent}
          {required && (
            <Text className="ml-0.5 text-red" intent="label">
              *
            </Text>
          )}
        </View>
      )}
      <PhoneInput
        codeTextStyle={[styles(theme).codeText, codeTextStyle]}
        containerStyle={[
          styles(theme).container,
          variants(theme).intent[intent].container,
          containerStyle,
        ]}
        countryPickerButtonStyle={[
          variants(theme).intent[intent].countryPickerButton,
          countryPickerButtonStyle,
        ]}
        defaultCode={defaultCode}
        layout="first"
        onChangeCountry={(country) => {
          onChangeCountry?.(country.cca2);

          const callingCode = country.callingCode[0];

          callingCodeRef.current = callingCode;

          onChangeCountryCode?.(callingCode);
        }}
        onChangeFormattedText={(text) => {
          setIsValidNumber(phoneInputRef.current?.isValidNumber(text) ?? false);

          onChangeFormattedText?.(text);
        }}
        onChangeText={(text) => {
          const formattedNumber = getFormattedPhoneNumber(
            text,
            callingCodeRef.current,
          );

          onChangeText(formattedNumber);
        }}
        placeholder={placeholder || '0000000000'}
        ref={phoneInputRef}
        textContainerStyle={[
          styles(theme).textContainer,
          variants(theme).intent[intent].textContainer,
          textContainerStyle,
        ]}
        textInputProps={{
          style: [styles(theme).textInput, textInputStyle],
          placeholderTextColor: theme.gray.DEFAULT,
          onBlur,
        }}
        value={value}
        withDarkTheme={colorScheme === 'dark'}
      />
      {internalError ? (
        <Text className="mt-1 text-red" intent="sm">
          {internalError}
        </Text>
      ) : null}
    </View>
  );
};

export default remapProps(PhoneNumberInput, {
  className: 'style',
  containerStyle: 'containerStyle',
  codeTextStyle: 'codeTextStyle',
  textContainerStyle: 'textContainerStyle',
  textInputStyle: 'textInputStyle',
  countryPickerButtonStyle: 'countryPickerButtonStyle',
  labelContainerStyle: 'labelContainerStyle',
});
