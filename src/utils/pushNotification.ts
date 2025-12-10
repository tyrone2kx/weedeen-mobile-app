import messaging from '@react-native-firebase/messaging';
import { useNavigation } from '@react-navigation/native';
import { useMutateRequest } from '@wd/api/useMutation';
import { AuthService } from '@wd/generated';
import { useAppSelector } from '@wd/redux-store/hooks/useAppSelector';
import { updateAppUserState } from '@wd/redux-store/reducers/user-reducer';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { initializeFirebase } from './firebase/firebase';
import { NotificationTypeEnum } from './types';

export const useFCMToken = () => {
  const dispatch = useDispatch();
  const user = useAppSelector(state => state.user?.currentUser);
  const [generatedToken, setGeneratedToken] = useState<string | undefined>(
    user?.fcmToken,
  );
  const token = user?.fcmToken;

  const { trigger } = useMutateRequest({
    service: AuthService.authControllerUpdateProfile,
    tag: 'authControllerUpdateProfile',
    onSuccess: () =>
      dispatch(
        updateAppUserState({
          currentUser: {
            ...(user! || {}),
            fcmToken: generatedToken,
          },
        }),
      ),
  });

  const getToken = useCallback(async () => {
    if (!token) {
      const newToken = await messaging().getToken();
      setGeneratedToken(newToken);
      if (user?.id) {
        trigger({
          id: user?.id || '',
          requestBody: {
            fcmToken: newToken,
          },
        });
      }
    }
  }, [token, trigger, user?.id]);

  useEffect(() => {
    void (async () => {
      const { permissionGranted } = await initializeFirebase();

      if (!token && permissionGranted) {
        void getToken();
      }
    })();
  }, [getToken, token]);
};

const NotificationResolver = ({ notification, navigation }: any) => {
  if (notification?.data?.type === NotificationTypeEnum.FEE_REMINDER) {
    // const room = JSON.parse(notification?.data?.chat)?.chatRoom;
    // navigation.navigate(Stacks.APP_STACK, {
    //   screen: Stacks.CHAT_STACK,
    //   params: {
    //     screen: Routes.ACTIVE_CHAT_SCREEN,
    //     params: { activeChatRoom: room },
    //   },
    // });
  }
};

export const useNotificationListeners = () => {
  const navigation = useNavigation<any>();

  useEffect(() => {
    void (async () => {
      await initializeFirebase();
      // Notification caused app to open from background state
      messaging().onNotificationOpenedApp(remoteMessage => {
        NotificationResolver({ notification: remoteMessage, navigation });
      });

      // Check whether an initial notification is available, Notification caused app to open from quit state
      void messaging()
        .getInitialNotification()
        .then(remoteMessage => {
          if (remoteMessage) {
            NotificationResolver({ notification: remoteMessage, navigation });
          }
        });
    })();
  }, [navigation]);
  return {};
};

export const NotificationListeners = () => {
  // Assume a message-notification contains a "type" property in the data payload of the screen to open

  messaging().onNotificationOpenedApp(remoteMessage => {});

  // Check whether an initial notification is available
  void messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
      }
    });
};

export const BackgroundNotificationListener = () => {
  messaging().setBackgroundMessageHandler(async remoteMessage => {});
};
