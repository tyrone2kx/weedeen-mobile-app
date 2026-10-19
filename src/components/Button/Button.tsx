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
  className?: string;
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

  const isOutline = pale || light;

  const background = isOutline
    ? 'transparent'
    : backgroundColor || style?.backgroundColor || theme.blue.DEFAULT;

  const outlineStyle = isOutline
    ? {
        borderWidth: 1.5,
        borderColor: theme.blue.DEFAULT,
      }
    : {};

  const textColor = isOutline ? theme.blue.DEFAULT : theme.white.DEFAULT;

  // Disabled: solid buttons get a light-brand tint (matches mockup); outlines dim.
  const disabledBackground = isOutline ? 'transparent' : 'rgba(37,99,235,0.45)';

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
      activeOpacity={0.85}
      disabled={disabled}
      onPress={() => {
        if (!isLoading) {
          onPress?.();
        }
      }}
      style={[
        styles.buttonContainer,
        outlineStyle,
        { backgroundColor: disabled ? disabledBackground : background },
        style,
      ]}
      {...props}
    >
      <Animated.View
        className={getStringValue(textContainerStyle)}
        style={[
          styles.animatedView,
          { backgroundColor: 'rgba(255,255,255,0.25)' },
          reanimatedStyle,
          getObjectValue(textContainerStyle),
        ]}
      />
      {isLoading ? (
        <ActivityIndicator color={isOutline ? theme.blue.DEFAULT : '#fff'} />
      ) : (
        <>
          {IconLeft && IconLeft}
          {label !== undefined && label !== '' && (
            <Text
              style={[
                styles.text,
                {
                  color: textColor,
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
    borderRadius: 14,
    flexDirection: 'row',
    height: 52,
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    overflow: 'hidden',
    paddingHorizontal: 16,
    position: 'relative',
    width: '100%',
    gap: 8,
  },
  text: {
    fontFamily: Fonts.semibold,
    fontSize: 15,
    textAlign: 'center',
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
