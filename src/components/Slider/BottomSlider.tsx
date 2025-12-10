import useTheme from '@wd/utils/theme/useTheme';
import { FC, ReactNode, useEffect, useState } from 'react';
import {
  Dimensions,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Icon from '../Icon/Icon';
import SafeAreaComponent from '../SafeAreaComponent/SafeAreaComponent';

interface IProps {
  height?: number;
  isOpen?: boolean;
  onClose: () => void;
  children: ReactNode;
  closeOnOutsideClick?: boolean;
  hideCloseButton?: boolean;
  inverse?: boolean;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const BottomSlider: FC<IProps> = ({
  isOpen = false,
  height,
  onClose,
  children,
  closeOnOutsideClick,
  hideCloseButton,
  inverse,
}) => {
  const [visible, setVisible] = useState<boolean>(isOpen);

  const { height: screenHeight } = useWindowDimensions();

  const { theme } = useTheme();

  const heightValue = height || screenHeight / 1.4;

  const contentHeight = useSharedValue(0);

  const animatedContentStyle = useAnimatedStyle(() => {
    return {
      height: contentHeight.value,
    };
  });

  const animatedContainerStyle = useAnimatedStyle(() => {
    const containerBackgroundColor = interpolateColor(
      contentHeight.value,
      [0, heightValue],
      ['transparent', 'rgba(0,0,0,0.5)'],
    );

    return {
      backgroundColor: containerBackgroundColor,
    };
  });

  useEffect(() => {
    if (isOpen) {
      setVisible(true);

      contentHeight.value = withTiming(heightValue, { duration: 300 });
    } else {
      setTimeout(() => setVisible(false), 200);

      contentHeight.value = withTiming(0, { duration: 300 });
    }
  }, [contentHeight, heightValue, isOpen]);

  return (
    <AnimatedPressable
      onPress={() => {
        if (closeOnOutsideClick) {
          onClose();
        }
      }}
      style={[
        styles.container,
        animatedContainerStyle,
        {
          display: visible ? 'flex' : 'none',
          justifyContent: inverse ? 'flex-start' : 'flex-end',
          top: inverse ? 0 : undefined,
          bottom: inverse ? undefined : 0,
        },
      ]}
    >
      <Animated.View style={[styles.slideContainer, animatedContentStyle]}>
        {!hideCloseButton && !inverse && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginBottom: 20,
              paddingRight: 20,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onClose}
              style={{
                backgroundColor: theme.gray[150],
                padding: 10,
                borderRadius: 25,
              }}
            >
              <Icon color={theme.black[600]} name="close-square" size={24} />
            </TouchableOpacity>
          </View>
        )}

        <View
          style={[
            styles.childrenContainer,
            {
              borderColor: theme.gray[150],
              backgroundColor: theme.white.DEFAULT,
            },
          ]}
        >
          {children}
        </View>
        {!inverse && <SafeAreaComponent />}
      </Animated.View>
      {!hideCloseButton && inverse && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginTop: 20,
            paddingRight: 20,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onClose}
            style={{
              backgroundColor: '#FFF',
              padding: 10,
              borderRadius: 25,
            }}
          >
            <Icon name="close-square" size={24} />
          </TouchableOpacity>
        </View>
      )}
    </AnimatedPressable>
  );
};

export default BottomSlider;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    zIndex: 99,
  },
  slideContainer: {
    height: 600,
    width: '100%',
    overflow: 'hidden',
    padding: 0,
  },
  childrenContainer: {
    width: '100%',
    height: '100%',
    borderTopWidth: 1,
    flex: 1,
  },
});
