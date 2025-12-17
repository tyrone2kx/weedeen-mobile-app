import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Billing, User } from '@wd/generated';
import { UserTypeEnum } from '@wd/utils/types';
import { ViewStyle } from 'react-native';
import { persistReducer } from 'redux-persist';

export type IAppUserState = {
  error?: string;
  isLoggedIn?: boolean;
  currentUser?: User;
  activeSubscription?: Billing;
  activeUserSubscriptions?: Billing[];
  adminMenuView?: 'home' | 'settings';
  activeUserType?: UserTypeEnum;
  tabBarStyle?: ViewStyle;
  accessToken?: string;
  refreshToken?: string;
};

export const INITIAL_USER_STATE: IAppUserState = {
  error: '',
  isLoggedIn: false,
  currentUser: undefined,
  tabBarStyle: { display: 'flex' } as const,
  adminMenuView: 'home',
  activeUserType: UserTypeEnum.RESIDENT,
};

const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_USER_STATE,
  reducers: {
    updateAppUserState(state, action: PayloadAction<Partial<IAppUserState>>) {
      Object.keys(action.payload).forEach(
        key => (state[key] = action.payload[key]),
      );
    },
    logoutUser(state) {
      state.isLoggedIn = false;
      state.currentUser = undefined;
      state.accessToken = undefined;
      state.refreshToken = undefined;
      state.error = '';
    },
  },
});

const persistConfig = {
  key: 'user',
  storage: AsyncStorage,
  blacklist: ['error', 'isLoading', 'loading'],
};

export const { updateAppUserState, logoutUser } = userSlice.actions;
export default persistReducer(persistConfig, userSlice.reducer);
