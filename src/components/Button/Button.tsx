/* eslint-disable react-hooks/immutability */
import { Fonts } from '@wd/utils/Fonts';
import { getObjectValue, getStringValue } from '@wd/utils/getValueTypes';
import useTheme from '@wd/utils/theme/useTheme';
import { remapProps } from 'nativewind';
import React, { FC, ReactElement, useCallback, useEffect } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

interface ButtonProps {
  IconRight?: ReactElement;
  IconLeft?: ReactElement;
  isLoading?: boolean;
  onPress?: () => void;
  label?: string | number;
  style?: ViewStyle;
  fontStyle?: TextStyle;
  disabled?: boolean;
  backgroundColor?: string;
  pale?: boolean;
  light?: boolean;
  textContainerStyle?: ViewStyle | string;
}

const { width } = Dimensions.get('window');

const Button: FC<ButtonProps> = ({
  IconRight,
  IconLeft,
  isLoading,
  onPress,
  label,
  style,
  fontStyle,
  disabled,
  backgroundColor,
  pale,
  light,
  textContainerStyle,
  ...props
}) => {
  const sharedValue = useSharedValue(-width);

  const { theme } = useTheme();

  const background =
    pale || light
      ? 'transparent'
      : backgroundColor || style?.backgroundColor || theme.blue.DEFAULT;

  const paleStyle = pale
    ? {
        borderWidth: 1,
        borderColor: theme.blue.DEFAULT,
      }
    : light
      ? {
          borderWidth: 1,
          borderColor: theme.blue.DEFAULT,
        }
      : {};

  const textColor = pale
    ? theme.blue.DEFAULT
    : light
      ? theme.blue.DEFAULT
      : theme.white.DEFAULT;

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: sharedValue.value }],
    };
  });
  const startLoading = useCallback(() => {
    sharedValue.value = withRepeat(
      withTiming(0.5, { duration: 1000 }),
      -1,
      true,
    );
  }, [sharedValue]);

  const stopLoading = useCallback(() => {
    sharedValue.value = withTiming(-width, { duration: 1000 });
  }, [sharedValue]);

  useEffect(() => {
    if (isLoading) {
      startLoading();
    } else {
      stopLoading();
    }
  }, [isLoading, startLoading, stopLoading]);
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled}
      onPress={() => {
        if (!isLoading) {
          onPress?.();
        }
      }}
      style={[
        styles.buttonContainer,
        paleStyle,
        { backgroundColor: disabled ? theme.gray[150] : background },
        style,
      ]}
      {...props}
    >
      <Animated.View
        className={getStringValue(textContainerStyle)}
        style={[
          styles.animatedView,
          { backgroundColor: 'rgba(0,0,0,0.5)' },
          reanimatedStyle,
          getObjectValue(textContainerStyle),
        ]}
      />
      {isLoading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <>
          {IconLeft && IconLeft}
          {label && (
            <Text
              style={[
                styles.text,
                {
                  color: disabled ? theme.gray.DEFAULT : textColor,
                },
                fontStyle,
              ]}
            >
              {label}
            </Text>
          )}
          {IconRight && IconRight}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    height: 48,
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    overflow: 'hidden',
    paddingHorizontal: 10,
    position: 'relative',
    width: '100%',
  },
  text: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 8,
  },
  animatedView: {
    bottom: 0,
    left: 0,
    opacity: 0.3,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 10,
  },
});

export default remapProps(Button, {
  className: 'style',
});
