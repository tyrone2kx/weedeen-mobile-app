import BottomSheet from '@gorhom/bottom-sheet';
import { useCallback, useRef } from 'react';

const useAppBottomSheet = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    bottomSheetRef.current?.snapToIndex(index);
  }, []);

  const handleCloseBottomSheet = useCallback((closeCallback?: () => void) => {
    closeCallback?.();
    bottomSheetRef.current?.close();
  }, []);

  return { bottomSheetRef, handleSheetChanges, handleCloseBottomSheet };
};

export default useAppBottomSheet;
