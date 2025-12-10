import { Theme } from '@wd/utils/Theme';
import { ReactElement, useEffect, useState } from 'react';
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import Text from '../Text/Text';

interface CheckButtonProps {
  title?: string;
  checked?: boolean;
  onPress?: () => void;
  Image?: ReactElement;
  style?: StyleProp<ViewStyle>;
  icon?: string;
  variant?: 'filled' | 'outline';
  isRandom?: boolean;
  color?: string;
  textStyle?: TextStyle;
  isButton?: boolean;
}

function getRandomNumber() {
  return Math.floor(Math.random() * 4);
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default function CheckTag({
  checked = false,
  onPress,
  title = '',
  style,
  variant = 'filled',
  isRandom,
  color,
  textStyle = {},
  isButton,
}: CheckButtonProps) {
  const obj = {
    primary: '#4E00DA',
    tertiary: '#F14FAD',
    secondary: '#FEB76A',
    blue: '#437EF7',
  };
  const colors = [obj.primary, obj.secondary, obj.tertiary, obj.blue];
  const bgColor = isRandom
    ? colors[getRandomNumber()]
    : color || Theme.colors.green.DEFAULT;

  const [active, setActive] = useState<boolean>(!!checked);
  const isFilled = variant === 'filled';

  useEffect(() => {
    setActive(checked);
  }, [checked]);

  const opacityValue = useDerivedValue(() => {
    return withTiming(active ? 1 : 0.4, { duration: 100 });
  }, [active]);

  const reanimatedStyle = useAnimatedStyle(() => {
    const borderColor = interpolateColor(
      opacityValue.value,
      [0.6, 1],
      [Theme.colors.gray[150], bgColor],
    );
    const backgroundColor = interpolateColor(
      opacityValue.value,
      [0.6, 1],
      [
        isFilled ? Theme.colors.gray[150] : '#FFF',
        isFilled ? bgColor : '#F2F2F2',
      ],
    );
    return {
      borderColor,
      backgroundColor,
    };
  });
  const textColor = isFilled
    ? active
      ? '#FFF'
      : Theme.colors.black[600]
    : Theme.colors.black[600];
  return (
    <AnimatedTouchable
      onPress={() => {
        onPress?.();
        if (!isButton) {
          setActive((prev) => !prev);
        }
      }}
      style={[
        styles.container,
        {
          borderWidth: isFilled ? 0 : 1,
          borderColor: isFilled ? undefined : Theme.colors.gray[150],
        },
        reanimatedStyle,
        style,
      ]}
    >
      <Text style={{ color: textColor, ...textStyle }}>{title}</Text>
    </AnimatedTouchable>
  );
}
const styles = StyleSheet.create({
  container: {
    borderRadius: 18,
    height: 36,
    flexDirection: 'row',
    alignItems: 'center',
    // padding: 10,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  check: {
    borderRadius: 100,
    marginRight: 20,
    borderWidth: 5,
    height: 20,
    width: 20,
    borderColor: Theme.colors.green.DEFAULT,
  },
  checkFilled: {
    borderRadius: 100,
    borderWidth: 0,
    height: 20,
    width: 20,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  unCheck: {
    borderRadius: 100,
    marginRight: 20,
    borderWidth: 1,
    height: 20,
    width: 20,
    borderColor: Theme.colors.gray[150],
  },
});
