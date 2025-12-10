import Geolocation from '@react-native-community/geolocation';
import { useAppSelector } from '@wd/redux-store/hooks/useAppSelector';
import { updateAppUserState } from '@wd/redux-store/reducers/user-reducer';
import { useCallback, useEffect } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import { useDispatch } from 'react-redux';

async function requestLocationPermission(
  callback: (position: Geolocation.GeoPosition) => void,
) {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message:
            'Weedeen needs access to your location to show you nearby health facilities',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          position => callback(position),
          error => console.error('Error getting location:', error),
          {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 10000,
          },
        );
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
    }
  } else {
    // iOS (permission is handled in Info.plist)
    Geolocation.getCurrentPosition(
      position => callback(position),
      error => console.error('Error getting location:', error),
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  }
}

export const useLocation = () => {
  const dispatch = useDispatch();
  const currentUser = useAppSelector(state => state.user?.currentUser);

  const callback = useCallback(
    (data: Geolocation.GeoPosition) => {
      const { longitude, latitude } = data.coords;

      dispatch(
        updateAppUserState({
          currentUser: {
            ...currentUser!,
            longitude,
            latitude,
          },
        }),
      );
    },
    [dispatch, currentUser],
  );

  const updateUserLocation = () => {
    void requestLocationPermission(callback);
  };

  useEffect(() => {
    if (!currentUser?.latitude || !currentUser?.longitude) {
      void requestLocationPermission(callback);
    }
  }, [callback, currentUser]);

  return {
    userLocation: {
      latitude: currentUser?.latitude,
      longitude: currentUser?.longitude,
    },
    updateUserLocation,
  };
};
