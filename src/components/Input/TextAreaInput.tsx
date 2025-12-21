/* eslint-disable react-hooks/immutability */
import { Theme } from '@wd/utils/Theme';
import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Text from '../Text/Text';

export interface TextAreaProps {
  value: string;
  onChange: (txt: string) => void;
  numberOfLines?: number;
  placeholder?: string;
  label?: string;
  hideBorder?: boolean;
  onBlur?: () => void;
  onFocus?: () => void;
}

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const TextArea = ({
  value,
  onChange,
  numberOfLines = 4,
  placeholder,
  label,
  hideBorder = false,
  onBlur,
  onFocus,
}: TextAreaProps) => {
  const borderWidthValue = useSharedValue(1);

  const reanimtedBorderStyle = useAnimatedStyle(() => {
    const borderColor = interpolateColor(
      borderWidthValue.value,
      [1, 1.5],
      [Theme.colors.gray[150], Theme.colors.blue.DEFAULT],
    );
    return {
      borderWidth: borderWidthValue.value,
      borderColor,
    };
  });

  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <AnimatedTouchableOpacity
        style={[styles.container, hideBorder ? {} : reanimtedBorderStyle]}
      >
        <TextInput
          multiline
          numberOfLines={numberOfLines}
          onBlur={() => {
            borderWidthValue.value = withTiming(1);
            onBlur?.();
          }}
          onChangeText={onChange}
          onFocus={() => {
            borderWidthValue.value = withTiming(1.5);
            onFocus?.();
          }}
          placeholder={placeholder}
          placeholderTextColor={Theme.colors.gray.DEFAULT}
          style={[styles.text_area]}
          textAlignVertical="top"
          value={value}
        />
      </AnimatedTouchableOpacity>
    </View>
  );
};

export default TextArea;

const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Theme.colors.gray[150],
    padding: 5,
  },
  text_area: {
    fontSize: 15,
    minHeight: 100,
    color: Theme.colors.black[600],
  },
  label: {
    fontSize: 12,
    marginBottom: 4,
    fontWeight: '600',
    textTransform: 'capitalize',
    color: Theme.colors.black[600],
  },
});
