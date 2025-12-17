import useTheme from '@wd/utils/theme/useTheme';
import { FormikErrors } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import Text from '../Text/Text';
import { PinStyles } from './pinInput.styles';

interface IProps {
  code: string;
  setPinReady: React.Dispatch<React.SetStateAction<boolean>>;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  maxLength: number;
  name?: string;
  onChange?: (
    field: string,
    value: any,
    shouldValidate?: boolean,
  ) =>
    | Promise<void>
    | Promise<
        FormikErrors<{
          otp: string;
        }>
      >;
  onPress?: () => void;
}
export const OtpPinInput = ({
  code,
  setPinReady,
  setCode,
  maxLength,
  onPress,
  name,
  onChange,
}: IProps) => {
  const codeDigitsArray = new Array(maxLength).fill(0);
  const inputRef = useRef<TextInput>(null);

  const [inputContainerIsFocused, setInputContainerIsFocused] = useState(false);

  const { theme } = useTheme();

  const handlePress = () => {
    setInputContainerIsFocused(true);
    onPress?.();
    // inputRef?.current?.focus();
  };
  const handleBlur = () => {
    setInputContainerIsFocused(false);
  };

  const toCodeDigitInput = (_val: number | string, index: number) => {
    const emptyInputChar = ' ';
    const digit = code[index] || emptyInputChar;

    const isCurrentDigit = index === code.length;
    const isLastDigit = index === maxLength - 1;
    const isCodeFull = code.length === maxLength;

    const isDigitFocused = isCurrentDigit || (isLastDigit && isCodeFull);

    const digitFocusedStyle =
      inputContainerIsFocused && isDigitFocused
        ? PinStyles.otp_input_focused
        : { borderColor: theme.gray[400] };

    const digitFilledStyle =
      digit === emptyInputChar
        ? {}
        : {
            backgroundColor: theme.white[200],
          };

    return (
      <View
        key={index}
        style={[PinStyles.otp_input, digitFocusedStyle, digitFilledStyle]}
      >
        <Text className="text-black" intent="xl">
          {digit}
        </Text>
      </View>
    );
  };

  useEffect(() => {
    setPinReady(code.length === maxLength);
    return () => setPinReady(false);
  }, [code, maxLength, setPinReady]);

  return (
    <View style={PinStyles.OTPInputSection}>
      <Pressable onPress={handlePress} style={PinStyles.otp_input_container}>
        {codeDigitsArray.map(toCodeDigitInput)}
      </Pressable>
      <TextInput
        autoComplete="sms-otp"
        keyboardType="number-pad"
        maxLength={maxLength}
        onBlur={handleBlur}
        onChangeText={setCode}
        ref={inputRef}
        returnKeyType="done"
        style={PinStyles.hiddenTextInput}
        textContentType="oneTimeCode"
        value={code}
      />
    </View>
  );
};
