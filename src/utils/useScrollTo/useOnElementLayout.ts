import { useState } from 'react';
import { LayoutChangeEvent, LayoutRectangle } from 'react-native';

const useOnElementLayout = () => {
  const [elementRect, setElementRect] = useState<LayoutRectangle>({
    height: 0,
    width: 0,
    x: 0,
    y: 0,
  });

  const onElementLayout = (event: LayoutChangeEvent) => {
    setElementRect(event.nativeEvent.layout);
  };

  return {
    elementRect,
    onElementLayout,
  };
};

export { useOnElementLayout };
