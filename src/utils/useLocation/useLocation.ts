import Geolocation from '@react-native-community/geolocation';
import { useCallback, useEffect, useState } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';

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

// NOTE: user location is no longer stored on the user profile. This hook now
// resolves the device's live coordinates into local state (used for SOS /
// delivery), rather than reading removed user.latitude/longitude fields.
export const useLocation = () => {
  const [userLocation, setUserLocation] = useState<{
    latitude?: number;
    longitude?: number;
  }>({});

  const callback = useCallback((data: Geolocation.GeoPosition) => {
    const { longitude, latitude } = data.coords;
    setUserLocation({ latitude, longitude });
  }, []);

  const updateUserLocation = () => {
    void requestLocationPermission(callback);
  };

  useEffect(() => {
    if (!userLocation.latitude || !userLocation.longitude) {
      void requestLocationPermission(callback);
    }
  }, [callback, userLocation.latitude, userLocation.longitude]);

  return {
    userLocation,
    updateUserLocation,
  };
};
