/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/await-thenable */
import firebase from '@react-native-firebase/app';
import crashlytics from '@react-native-firebase/crashlytics';
import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';

// pluck values from your `GoogleService-Info.plist` you created on the firebase console
const iosConfig = {
  clientId: '',
  androidClientId: '',
  appId: '1:41730240720:ios:e2a1034c3a29e6be046ed5',
  apiKey: 'AIzaSyB3l3y5wsWcwMzSUOiQj-UXqeIoua_8zc0',
  projectId: 'weedeen-21277',
  messagingSenderId: '',
  storageBucket: 'weedeen-21277.firebasestorage.app',
  databaseURL: 'https://weedeen-21277.firebaseio.com',
  // gaTrackingId: 'UA-XX',
};

// pluck values from your `google-services.json` file you created on the firebase console
const androidConfig = {
  clientId: '',
  appId: '1:41730240720:android:d40e1ca0264e2494046ed5',
  apiKey: 'AIzaSyDtGQsdlxjI4pn1geeUSxNkbjMwGhYBMFA',
  projectId: 'weedeen-21277',
  messagingSenderId: '',
  storageBucket: 'weedeen-21277.firebasestorage.app',
  databaseURL: 'https://weedeen-21277.firebaseio.com',
  // gaTrackingId: 'UA-XX',
};

export const firebaseConfig = Platform.OS === 'ios' ? iosConfig : androidConfig;

export async function requestUserPermission(callback?: () => void) {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    callback?.();
    return true;
  }

  return false;
}

export const initializeFirebase = async () => {
  if (!firebase.apps.length) {
    await firebase.initializeApp(firebaseConfig);
  }

  const granted = await requestUserPermission();

  return {
    permissionGranted: granted,
  };
};

export const crashliticsHandler = () => {
  // Capture uncaught JavaScript errors
  const defaultHandler = ErrorUtils.getGlobalHandler();

  ErrorUtils.setGlobalHandler(async (error: any, isFatal) => {
    // Log the error to Crashlytics
    await crashlytics().recordError(error, 'UNCAUGHT_APP_ERROR');

    // Pass the error to the default handler
    if (defaultHandler) {
      defaultHandler(error, isFatal);
    }
  });
};
