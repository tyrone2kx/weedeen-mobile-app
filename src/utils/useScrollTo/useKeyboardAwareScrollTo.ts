import { useRef, useState } from 'react';
import { LayoutChangeEvent } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

type UseScrollToProps = {
  elementHeight: number;
};

const useKeyboardAwareScrollTo = ({ elementHeight = 0 }: UseScrollToProps) => {
  const scrollViewRef = useRef<KeyboardAwareScrollView>(null);
  const [containerHeight, setContainerHeight] = useState(0);

  const onContainerLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setContainerHeight(height);
  };

  const verticalScrollToTopThird = () => {
    const y = (containerHeight - elementHeight) / 3;
    scrollViewRef.current?.scrollToPosition(0, y, true);
  };

  const verticalScrollToMiddle = () => {
    const y = (containerHeight - elementHeight) / 2;
    scrollViewRef.current?.scrollToPosition(0, y, true);
  };

  const verticalScrollToTop = () => {
    const y = containerHeight - elementHeight;

    scrollViewRef.current?.scrollToPosition(0, y, true);
  };

  const verticalScrollToRatio = (ratio: number) => {
    const y = (elementHeight - containerHeight) / ratio;
    scrollViewRef.current?.scrollToPosition(0, y, true);
  };

  const verticalScrollTo = (yPosition: number) => {
    scrollViewRef.current?.scrollToPosition(0, yPosition, true);
  };

  return {
    onContainerLayout,
    verticalScrollToTop,
    verticalScrollToTopThird,
    verticalScrollToMiddle,
    verticalScrollToRatio,
    verticalScrollTo,
    scrollViewRef,
  };
};

export { useKeyboardAwareScrollTo };
