import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  underwriting_approval_manager: false,
  underwriting_approval_officer: false,
  insurance_treaty_create: false,
};

export type PrivilegeValueType = keyof typeof initialState;
export type PrivilegeType = typeof initialState;

type PayloadType = Partial<Record<PrivilegeValueType, boolean>>;

export const privilegeSlice = createSlice({
  name: 'privileges',
  initialState,
  reducers: {
    updateUserPrivileges: (state, action: PayloadAction<PayloadType>) => {
      Object.keys(action.payload).forEach((key) => (state[key] = action.payload[key]));
    },
    resetPrivileges: (state) => {
      Object.keys(state).forEach((key) => (state[key] = initialState[key]));
    },
  },
});

export const { updateUserPrivileges, resetPrivileges } = privilegeSlice.actions;

const persistConfig = {
  key: 'privileges',
  storage: AsyncStorage,
};
export default persistReducer(persistConfig, privilegeSlice.reducer);
