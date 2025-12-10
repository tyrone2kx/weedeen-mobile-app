import analytics, {
  FirebaseAnalyticsTypes,
} from '@react-native-firebase/analytics';
import { envMode } from '@wd/api';
import { useAppSelector } from '@wd/redux-store/hooks/useAppSelector';
import { useCallback } from 'react';
import { Platform } from 'react-native';
import { FirebaseEventEnum, FirebaseParamMap } from '../types';

const useFirebaseAnalytics = () => {
  const user = useAppSelector(state => state.user?.currentUser);
  const LogEvent = useCallback(
    <T extends FirebaseEventEnum>(
      event: T,
      // Complains because T is an enum, maybe const would have been better?
      // @ts-expect-error
      params?: FirebaseParamMap[T],
      options?: FirebaseAnalyticsTypes.AnalyticsCallOptions,
    ) => {
      if (envMode !== 'production') return;

      const payload = {
        ...(params || {}),
        platform: `${Platform.OS}_mobile_app`,
        userId: user?.id,
        name: `${user?.firstName || ''} ${user?.lastName || ''}`,
        gender: user?.gender ?? '',
      };

      void analytics().logEvent(event, payload, options);
    },
    [user?.id, user?.firstName, user?.lastName, user?.gender],
  );

  return {
    LogEvent,
  };
};

export default useFirebaseAnalytics;
