/* eslint-disable react-hooks/immutability */
import Text from '@wd/components/Text/Text';
import useTheme from '@wd/utils/theme/useTheme';
import { FC, ReactNode, useCallback, useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

type TabButtonProps = {
  routeName: string;
  tabBarAccessibilityLabel?: string;
  onLongPress?: () => void;
  onPress?: () => void;
  isFocused?: boolean;
  label?: string;
  renderTabIcon?: ReactNode;
  textColor?: string;
};

const TabButton: FC<TabButtonProps> = ({
  routeName,
  tabBarAccessibilityLabel,
  onPress,
  isFocused,
  renderTabIcon,
  label,
  textColor,
  onLongPress,
}) => {
  const { theme } = useTheme();
  const animatedTranslateY = useSharedValue(0);

  const animatedIconStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: animatedTranslateY.value }],
    };
  });

  useEffect(() => {
    animatedTranslateY.value = withSpring(isFocused ? -2 : 0);
  }, [animatedTranslateY, isFocused]);

  return (
    <TouchableOpacity
      accessibilityLabel={tabBarAccessibilityLabel}
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      activeOpacity={0.8}
      className="h-full flex-1 items-center justify-center"
      key={routeName}
      onLongPress={onLongPress}
      onPress={onPress}
    >
      <Animated.View
        style={[
          animatedIconStyles,
          {
            paddingHorizontal: 18,
            paddingVertical: 6,
            borderRadius: 999,
            backgroundColor: isFocused ? theme.blue[300] : 'transparent',
          },
        ]}
      >
        {renderTabIcon}
      </Animated.View>
      {label ? (
        <Text
          className="mt-1 capitalize"
          intent="xs"
          numberOfLines={1}
          style={{ color: textColor }}
          weight={isFocused ? 'semibold' : 'medium'}
        >
          {label}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
};

export default TabButton;
