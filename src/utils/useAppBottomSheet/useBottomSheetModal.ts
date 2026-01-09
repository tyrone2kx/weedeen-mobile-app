import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useCallback, useRef } from 'react';

const useAppBottomSheetModal = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const handleSheetChanges = useCallback((index: number) => {
    bottomSheetRef.current?.snapToIndex(index);
  }, []);

  const handleCloseBottomSheet = useCallback((closeCallback?: () => void) => {
    closeCallback?.();
    bottomSheetRef.current?.dismiss();
  }, []);

  const handlePresentBottomSheet = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  return {
    bottomSheetRef,
    handleSheetChanges,
    handleCloseBottomSheet,
    handlePresentBottomSheet,
  };
};

export default useAppBottomSheetModal;
