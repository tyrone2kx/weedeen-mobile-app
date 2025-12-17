import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { BackHandler, ToastAndroid } from 'react-native';

type TUsePreventExit = {
  isDisabled?: boolean;
};

const exitTimeout = 1000;

const showToast = () => {
  ToastAndroid.show('Click back again to exit', ToastAndroid.SHORT);
};

const usePreventExit = ({ isDisabled = false }: TUsePreventExit = {}) => {
  const handleAttachListener = useCallback(() => {
    let canExit = false;

    let timeoutId: NodeJS.Timeout | null = null;

    const onBackPress = () => {
      if (isDisabled) {
        return false;
      }

      if (canExit) {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }

        BackHandler.exitApp();
      } else {
        canExit = true;
        showToast();

        timeoutId = setTimeout(() => {
          canExit = false;
        }, exitTimeout);
      }

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress,
    );

    if (isDisabled) {
      backHandler.remove();
    }

    return () => {
      backHandler.remove();
    };
  }, [isDisabled]);

  // Listen for route changes
  useFocusEffect(handleAttachListener);
};

export default usePreventExit;
