/* eslint-disable react-hooks/immutability */
import Text from '@wd/components/Text/Text';
import { FC, ReactNode, useCallback, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
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
  const animatedScale = useSharedValue(1);
  const animatedTranslateY = useSharedValue(0);

  const animatedIconStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: animatedScale.value },
        { translateY: animatedTranslateY.value },
      ],
    };
  });

  const handleFocusButton = useCallback(() => {
    animatedScale.value = withRepeat(withSpring(0.9), 2, true);
    animatedTranslateY.value = withSpring(-3);
  }, [animatedScale, animatedTranslateY]);

  const handleUnFocusButton = useCallback(() => {
    animatedTranslateY.value = withSpring(0);
  }, [animatedTranslateY]);

  useEffect(() => {
    if (isFocused) {
      handleFocusButton();
    } else {
      handleUnFocusButton();
    }
  }, [handleFocusButton, handleUnFocusButton, isFocused]);

  return (
    <TouchableOpacity
      accessibilityLabel={tabBarAccessibilityLabel}
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      activeOpacity={0.8}
      className="h-full items-center justify-center px-4"
      key={routeName}
      onLongPress={onLongPress}
      onPress={onPress}
    >
      <Animated.View style={[animatedIconStyles]}>
        {renderTabIcon}
      </Animated.View>
      {label ? (
        <Text
          className="mt-1 capitalize"
          intent="sm"
          numberOfLines={1}
          style={{
            color: textColor,
          }}
        >
          {label}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
};

export default TabButton;
