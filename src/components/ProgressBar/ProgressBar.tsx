import { Theme } from '@wd/utils/Theme';
import React from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

interface IProps {
  color?: string;
  backgroundColor?: string;
  value: number; // Must be between 1 - 100
  height?: number;
}

const ProgressBar = ({ color, backgroundColor, value, height = 5 }: IProps) => {
  const animatedStyle = useAnimatedStyle(() => ({
    width: withTiming(`${value > 100 ? 100 : value}%`, { duration: 500 }),
  }));

  return (
    <View
      style={{
        height,
        backgroundColor: backgroundColor || Theme.colors.gray[150],
        borderRadius: 2.5,
        width: '100%',
      }}
    >
      <Animated.View
        style={[
          animatedStyle,
          {
            height: '100%',
            backgroundColor: color || Theme.colors.green.DEFAULT,
            borderRadius: 2.5,
          },
        ]}
      />
    </View>
  );
};

export default ProgressBar;
