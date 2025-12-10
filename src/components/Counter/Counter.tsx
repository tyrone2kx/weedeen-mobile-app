import { remapProps } from 'nativewind';
import { FC } from 'react';
import { TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';

import Text from '../Text/Text';

export type CounterProps = {
  value?: number;
  maximumValue?: number;
  minimumValue?: number;
  onValueChange?: (value: number) => void;
  className?: string;
  incrementButtonStyle?: ViewStyle;
  incrementTextStyle?: TextStyle;
  decrementButtonStyle?: ViewStyle;
  decrementTextStyle?: TextStyle;
  style?: ViewStyle;
  valueTextStyle?: TextStyle;
};

const Counter: FC<CounterProps> = ({
  value,
  maximumValue,
  minimumValue,
  onValueChange,
  decrementButtonStyle,
  decrementTextStyle,
  incrementButtonStyle,
  incrementTextStyle,
  style,
  valueTextStyle,
  className,
}) => {
  const onDecrement = () => {
    if (value === undefined) return;

    if (minimumValue) {
      if (value > minimumValue) {
        onValueChange?.(value - 1);
      }
    } else {
      onValueChange?.(value - 1);
    }
  };

  const onIncrement = () => {
    if (value === undefined) return;

    if (maximumValue) {
      if (value < maximumValue) {
        onValueChange?.(value + 1);
      }
    } else {
      onValueChange?.(value + 1);
    }
  };

  return (
    <View
      className={`flex-row items-center justify-between ${className}`}
      style={style}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        className="h-12 w-10 items-center justify-center rounded-full border border-green"
        onPress={onDecrement}
        style={decrementButtonStyle}
      >
        <Text className="text-3xl text-green" style={decrementTextStyle}>
          -
        </Text>
      </TouchableOpacity>
      <Text className="text-3xl text-black" style={valueTextStyle}>
        {value}
      </Text>
      <TouchableOpacity
        activeOpacity={0.8}
        className="h-12 w-10 items-center justify-center rounded-full border border-green"
        onPress={onIncrement}
        style={incrementButtonStyle}
      >
        <Text className="text-3xl text-green" style={incrementTextStyle}>
          +
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default remapProps(Counter, {
  className: 'style',
  // incrementButtonStyle: 'incrementButtonStyle',
  // incrementTextStyle: 'incrementTextStyle',
  // decrementButtonStyle: 'decrementButtonStyle',
  // decrementTextStyle: 'decrementTextStyle',
  // valueTextStyle: 'valueTextStyle',
});
