/* eslint-disable react-hooks/immutability */
import { Fonts } from '@wd/utils/Fonts';
import { globalStyles } from '@wd/utils/GlobalStyles';
import useTheme from '@wd/utils/theme/useTheme';
import { remapProps } from 'nativewind';
import React, { FC, ReactElement, useMemo, useState } from 'react';
import {
  KeyboardType,
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputEndEditingEventData,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import RNIcon from '../Icon/Icon';

import Text from '../Text/Text';

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);
export interface InputProps {
  onChange?: (e: string) => void;
  label?: string;
  labelComponent?: React.ReactNode;
  style?: ViewStyle;
  textInputStyle?: TextStyle;
  inputContainerStyle?: ViewStyle;
  type?: KeyboardType;
  secureEntry?: boolean;
  Icon?: ReactElement;
  IconLeft?: ReactElement;
  required?: boolean;
  placeholder?: string;
  value?: string | number;
  onBlur?: () => void;
  onFocus?: () => void;
  onEndEditing?: (
    e?: NativeSyntheticEvent<TextInputEndEditingEventData>,
  ) => void;
  hideBorder?: boolean;
  autoCapitalize?: TextInputProps['autoCapitalize'];
  error?: string | string[];
  numberOfLines?: number;
  isTextArea?: boolean;
  editable?: boolean;
  intent?: 'solid' | 'outline';
  labelContainerStyle?: ViewStyle;
  multiline?: TextInputProps['multiline'];
  className?: string;
}

const Input: FC<InputProps> = ({
  onChange,
  label,
  labelComponent,
  style,
  type,
  Icon,
  placeholder,
  required = false,
  secureEntry = false,
  onBlur,
  onFocus,
  value,
  IconLeft,
  inputContainerStyle,
  hideBorder = false,
  autoCapitalize,
  onEndEditing,
  error,
  numberOfLines,
  isTextArea,
  editable = true,
  textInputStyle,
  intent = 'solid',
  labelContainerStyle,
  multiline,
  className,
}) => {
  const { theme } = useTheme();

  const [showPassword, setShowPassword] = useState<boolean>(!secureEntry);
  const borderWidthValue = useSharedValue(1);

  const variants = useMemo(
    () => ({
      intent: {
        solid: {
          inputContainer: {
            backgroundColor: theme.white[200],
            borderRadius: 12,
            paddingHorizontal: 18,
            paddingVertical: 10,
            marginTop: 3,
          },
          animatedBorder: {
            start: theme.gray[300],
            stop: theme.blue.DEFAULT,
          },
          labelContainer: 'mb-1',
        },
        outline: {
          inputContainer: {},
          animatedBorder: {
            start: theme.gray[300],
            stop: theme.blue.DEFAULT,
          },
          labelContainer: '',
        },
      },
    }),
    [theme],
  );

  const reanimtedBorderStyle = useAnimatedStyle(() => {
    const borderColor = interpolateColor(
      borderWidthValue.value,
      [1, 1.5],
      [
        variants.intent[intent].animatedBorder.start,
        variants.intent[intent].animatedBorder.stop,
      ],
    );

    if (intent === 'solid') {
      return {
        borderWidth: borderWidthValue.value,
        borderColor,
      };
    }

    if (intent === 'outline') {
      return {
        borderWidth: borderWidthValue.value,
        borderBottomColor: borderColor,
        borderTopColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
      };
    }

    return {};
  });

  const isTextAreaEditor = multiline || isTextArea;

  const hasLabel = label || labelComponent;

  const errorText = Array.isArray(error) ? error.join(', ') : error;

  return (
    <View className={`mb-5 w-full flex-col ${className}`} style={style}>
      {hasLabel && (
        <View
          className={`flex-row ${variants.intent[intent].labelContainer}`}
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
      <AnimatedTouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.inputContainer,
          variants.intent[intent].inputContainer,
          hideBorder ? {} : reanimtedBorderStyle,
          isTextAreaEditor
            ? {
                alignItems: 'flex-start',
              }
            : {
                height: 48,
                alignItems: 'center',
              },
          {
            opacity: editable ? 1 : 0.5,
          },
          inputContainerStyle,
        ]}
      >
        {IconLeft && IconLeft}
        <TextInput
          allowFontScaling={false}
          autoCapitalize={autoCapitalize}
          className="text-black-600"
          editable={editable}
          keyboardType={type}
          multiline={isTextAreaEditor}
          numberOfLines={numberOfLines || (isTextAreaEditor ? 8 : undefined)}
          onBlur={() => {
            borderWidthValue.value = withTiming(1);
            onBlur?.();
          }}
          onChangeText={(text: string) => {
            onChange?.(text);
          }}
          onEndEditing={onEndEditing}
          onFocus={() => {
            borderWidthValue.value = withTiming(1.5);
            onFocus?.();
          }}
          placeholder={placeholder}
          placeholderTextColor={theme.gray.DEFAULT}
          secureTextEntry={!showPassword}
          style={[
            styles.textInput,
            isTextAreaEditor ? { height: 96 } : { height: 48 },
            textInputStyle,
          ]}
          textAlignVertical={isTextAreaEditor ? 'top' : undefined}
          value={`${value || ''}`}
        />
        {secureEntry ? (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setShowPassword(prev => !prev)}
            style={globalStyles.pad_touchable_icon}
          >
            <RNIcon
              color={showPassword ? theme.black[600] : theme.gray.DEFAULT}
              name={showPassword ? 'eye-open' : 'eye-closed'}
              size={20}
            />
          </TouchableOpacity>
        ) : null}
        {Icon || null}
      </AnimatedTouchableOpacity>
      <View className="flex-row">
        {error ? (
          <Text className="text-red-500" intent="sm">
            {errorText}
          </Text>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    width: '100%',
  },

  textInput: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    flex: 1,
  },
});

export default remapProps(Input, {
  className: 'style',
  // textInputStyle: 'textInputStyle',
  // inputContainerStyle: 'inputContainerStyle',
  // labelContainerStyle: 'labelContainerStyle',
});
