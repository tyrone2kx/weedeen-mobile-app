import React, { useEffect, useRef } from 'react';
import {
  Modal,
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

interface SideSheetProps {
  isVisible: boolean;
  onClose: () => void;
  side?: 'left' | 'right';
  width?: number;
  backdropColor?: string;
  backdropOpacity?: number;
  animationDuration?: number;
  swipeThreshold?: number;
  disableSwipe?: boolean;
  showBackdrop?: boolean;
  backdropDismissible?: boolean;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

const SideSheet: React.FC<SideSheetProps> = ({
  isVisible,
  onClose,
  side = 'left',
  width = 300,
  backdropColor = 'rgba(0, 0, 0, 0.5)',
  backdropOpacity = 0.5,
  animationDuration = 300,
  swipeThreshold = 50,
  disableSwipe = false,
  showBackdrop = true,
  backdropDismissible = true,
  children,
  style,
  containerStyle,
}) => {
  const isRightSide = side === 'right';
  const translateX = useSharedValue(isRightSide ? width : -width);
  const backdropOpacityValue = useSharedValue(0);
  const isOpen = useRef(false);

  const openSheet = () => {
    'worklet';
    translateX.value = withTiming(0, { duration: animationDuration });
    backdropOpacityValue.value = withTiming(backdropOpacity, {
      duration: animationDuration,
    });
    isOpen.current = true;
  };

  const closeSheet = () => {
    'worklet';
    translateX.value = withTiming(isRightSide ? width : -width, {
      duration: animationDuration,
    });
    backdropOpacityValue.value = withTiming(0, { duration: animationDuration });
    isOpen.current = false;
    runOnJS(onClose)();
  };

  useEffect(() => {
    if (isVisible) {
      translateX.value = isRightSide ? width : -width;
      backdropOpacityValue.value = 0;
      setTimeout(() => {
        openSheet();
      }, 10);
    }
  }, [isVisible, isRightSide, width]);

  const handleBackdropPress = () => {
    if (backdropDismissible && isOpen.current) {
      closeSheet();
    }
  };

  const panGesture = Gesture.Pan()
    .enabled(!disableSwipe)
    .onUpdate(event => {
      if (disableSwipe) return;

      if (!isRightSide) {
        // For right side, dragging right (negative translation) closes
        const newTranslateX = Math.min(event.translationX, 0);
        translateX.value = newTranslateX;
        const progress = Math.abs(newTranslateX) / width;
        backdropOpacityValue.value = backdropOpacity * (1 - progress);
      } else {
        // For left side, dragging left (positive translation) closes
        const newTranslateX = Math.max(event.translationX, 0);
        translateX.value = newTranslateX;
        const progress = Math.abs(newTranslateX) / width;
        backdropOpacityValue.value = backdropOpacity * (1 - progress);
      }
    })
    .onEnd(event => {
      if (disableSwipe) return;

      const shouldClose = !isRightSide
        ? event.translationX < -swipeThreshold || event.velocityX < -500
        : event.translationX > swipeThreshold || event.velocityX > 500;

      if (shouldClose) {
        closeSheet();
      } else {
        openSheet();
      }
    });

  const sheetAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const backdropAnimatedStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacityValue.value,
  }));

  if (!isVisible) return null;

  return (
    <Modal
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
      transparent
      visible={isVisible}
    >
      <GestureHandlerRootView style={[styles.modalContainer, containerStyle]}>
        {showBackdrop && (
          <TouchableWithoutFeedback onPress={handleBackdropPress}>
            <Animated.View
              style={[
                styles.backdrop,
                {
                  backgroundColor: backdropColor,
                },
                backdropAnimatedStyle,
              ]}
            />
          </TouchableWithoutFeedback>
        )}

        <GestureDetector gesture={panGesture}>
          <Animated.View
            style={[
              styles.sheet,
              { width, [side]: 0 },
              sheetAnimatedStyle,
              style,
            ]}
          >
            <SafeAreaView style={styles.content}>
              <View className="p-4 flex-1">{children}</View>
            </SafeAreaView>
          </Animated.View>
        </GestureDetector>
      </GestureHandlerRootView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  sheet: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    flex: 1,
  },
  dragHandleContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  dragHandle: {
    width: 40,
    height: 5,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
  },
  dragHandleRight: {
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
});

export default SideSheet;
