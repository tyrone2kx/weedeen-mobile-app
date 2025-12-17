/* eslint-disable @typescript-eslint/prefer-promise-reject-errors */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { APP_ENV } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logoutUser } from '@wd/redux-store/reducers/user-reducer';
import { store } from '@wd/redux-store/store';
import { TEnvModes } from '@wd/utils/types';
import axios from 'axios';

// Change environment modes here
export const appEnv: TEnvModes =
  (process.env.NODE_ENV as TEnvModes) || 'production';

export const envMode = appEnv || APP_ENV || process.env.NODE_ENV;

export const envModePrefix = envMode === 'production' ? '' : envMode;

const config = {
  development: {
    API_URL: 'https://weeden-backend-dev-743175012151.us-central1.run.app',
    PAY_STACK_KEY: 'pk_test_fee9174baadd5830420d759c361350e3756e2198',
    PAY_STACK_DEFAULT_EMAIL: 'info@weedeen.com',
  },
  staging: {
    API_URL: 'https://weeden-backend-dev-743175012151.us-central1.run.app',
    PAY_STACK_KEY: 'pk_test_fee9174baadd5830420d759c361350e3756e2198',
    PAY_STACK_DEFAULT_EMAIL: 'info@weedeen.com',
  },
  production: {
    API_URL: 'https://weeden-backend-dev-743175012151.us-central1.run.app',
    PAY_STACK_KEY: 'pk_live_fa40e05c29621919e23c75941719e01948d06248',
    PAY_STACK_DEFAULT_EMAIL: 'payment@weedeen.com',
  },
};

export const { API_URL, PAY_STACK_KEY, PAY_STACK_DEFAULT_EMAIL } =
  config[envMode];

export const httpClient = axios.create({
  baseURL: API_URL,
});

const refreshExpiredToken = async refresh_token => {
  const tenant = await AsyncStorage.getItem('tenant');
  try {
    const { data } = await axios.get(`${API_URL}/auth/refresh-token`, {
      headers: {
        Authorization: `Bearer ${refresh_token}`,
        'X-Tenant-ID': tenant as string,
      },
    });
    return data;
  } catch (error) {
    await AsyncStorage.clear();
    console.error('Error refreshing token', error);
    throw new Error('Session expired, please login again');
  }
};

const signOut = async () => {
  await AsyncStorage.setItem('isRefreshingToken', 'false');
  await AsyncStorage.clear();
  localStorage.clear();
  store.dispatch(logoutUser());
};

export async function httpRequest<T>(request: () => Promise<T>): Promise<T> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await request();
      resolve(response);
    } catch (error: any) {
      if (error?.response?.status === 401 || error?.status === 401) {
        // refresh token here
        const originalRequest = error.response?.config || error.body?.config;
        const isRefreshingToken =
          (await AsyncStorage.getItem('isRefreshingToken')) === 'true';

        console.log('isRefreshingToken: ', isRefreshingToken);

        if (!isRefreshingToken) {
          await AsyncStorage.setItem('isRefreshingToken', 'true');
          const refreshToken = await AsyncStorage.getItem('refreshToken');
          delete httpClient.defaults.headers.common.Authorization;
          try {
            const res = await refreshExpiredToken(refreshToken);
            if (res) {
              const { accessToken: token } = res;
              await AsyncStorage.setItem('accessToken', token);
              await AsyncStorage.setItem('isRefreshingToken', 'false');
              httpClient.defaults.headers.common.Authorization = `Bearer ${token}`;
              originalRequest.headers.Authorization = `Bearer ${token}`;
              const response = await axios(originalRequest);
              resolve(response?.data || response);
            }
          } catch (error2) {
            console.log('Error 2 caught here', error2);
            await signOut();
            reject(error);
          }
        } else {
          setTimeout(async () => {
            try {
              const new_token = await AsyncStorage.getItem('accessToken');
              originalRequest.headers.Authorization = `Bearer ${new_token}`;
              const response = await axios(originalRequest);
              resolve(response?.data || response);
            } catch (error3) {
              console.log('Error 3 caught here', error3);
              await AsyncStorage.setItem('isRefreshingToken', 'false');
              await signOut();
              reject(error);
            }
          }, 2000);
        }
      } else {
        await AsyncStorage.setItem('isRefreshingToken', 'false');
        reject(error);
      }
    }
  });
}

function timeoutPromise<T>(ms: number, promise: Promise<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      const error: any = new Error(
        'We experienced a timeout, please try again.',
      );
      error.name = 'TimeoutError';
      error.response = {
        data: {
          message: 'We experienced a timeout, please try again.',
        },
        status: 409,
      };
      reject(error);
    }, ms);
    promise.then(
      res => {
        clearTimeout(timeoutId);
        resolve(res);
      },
      err => {
        clearTimeout(timeoutId);
        reject(err);
      },
    );
  });
}

export async function apiWrapper<T>(request: () => Promise<T>) {
  const response = await timeoutPromise(60000, httpRequest(request));
  return response;
}

export const handleAccessToken = async () => {
  const token = await AsyncStorage.getItem('accessToken');
  httpClient.defaults.headers.common.Authorization = token
    ? `Bearer ${token}`
    : null;
};
