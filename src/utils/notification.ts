import notifee, { AndroidVisibility, EventType } from '@notifee/react-native';
// import messaging from '@react-native-firebase/messaging';

const setupNotif = () => {
  notifee.onForegroundEvent(({ type, detail }) => {
    switch (type) {
      case EventType.DISMISSED:
        break;
      case EventType.PRESS:
        if (detail?.notification?.body) {
          try {
            //   AsyncStorage.setItem('reminderkeyy', detail?.notification?.body)
            //   getNotification()
          } catch (error) {
            console.error('Error handling notification press:', error);
          }
        }
        break;
      case EventType.DELIVERED:
        if (detail?.notification?.body) {
          try {
            //   AsyncStorage.setItem('reminderkeyy', detail?.notification?.body)
            //   getNotification()
          } catch (error) {
            console.error('Error handling notification delivery:', error);
          }
        }
        break;
    }
  });

  notifee.onBackgroundEvent(async ({ type, detail }) => {
    const { notification, pressAction } = detail;

    // Check if the user pressed the "Mark as read" action
    if (type === EventType.PRESS) {
      if (notification?.body) {
        try {
          // AsyncStorage.setItem('reminderkeyy', notification?.body)
          // getNotification()
        } catch (error) {
          console.error('Error handling background notification press:', error);
        }
      }

      // Remove the notification
      await notifee.cancelNotification(notification?.id || '');
    }
  });
};

export const CreateNotifeeChannel = async () => {
  const channelId = await notifee.createChannel({
    id: 'weedeenChannel',
    name: 'My channel',
    visibility: AndroidVisibility.PUBLIC,
    bypassDnd: true,
    description: 'A channel to categorise your notifications',
  });
  setupNotif();
};

// export async function pushNotificationPermissions() {
//   const authStatus = await messaging().requestPermission();
//   const enabled =
//     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//   if (enabled) {
//     // console.log(' push notification Authorization status:', authStatus);
//   }
// }
