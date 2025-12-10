import { Theme } from '@wd/utils/Theme';
import { ReactElement } from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import CheckBoxAlt from '../Checkbox/CheckBoxAlt';
import Text from '../Text/Text';

interface CheckButtonProps {
  title?: string;
  active?: boolean;
  onPress?: () => void;
  Image?: ReactElement;
  style?: ViewStyle;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default function CheckButton({
  active = false,
  onPress,
  title = '',
  Image,
  style,
}: CheckButtonProps) {
  const opacityValue = useDerivedValue(() => {
    return withTiming(active ? 1 : 0.4, { duration: 100 });
  }, [active]);

  const reanimatedStyle = useAnimatedStyle(() => {
    const borderColor = interpolateColor(
      opacityValue.value,
      [0.4, 1],
      [Theme.colors.gray[150], Theme.colors.green.DEFAULT],
    );
    return {
      // opacity: opacityValue.value,
      borderColor,
    };
  });
  return (
    <AnimatedTouchable
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.container, reanimatedStyle, style]}
    >
      <CheckBoxAlt active={active} size={28} />
      <View className="ml-2">
        {Image && Image}
        <Text>{title}</Text>
      </View>
    </AnimatedTouchable>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1.5,
    flexDirection: 'row',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingHorizontal: 18,
    paddingVertical: 12,
    width: '100%',
  },
});
