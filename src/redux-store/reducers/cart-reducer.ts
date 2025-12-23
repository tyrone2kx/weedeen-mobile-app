import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@wd/generated';
import { persistReducer } from 'redux-persist';

export type IAppCartState = {
  error?: string;
  cartItems?: { product: Product; quantity: number }[];
};

export const INITIAL_CART_STATE: IAppCartState = {
  error: '',
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: INITIAL_CART_STATE,
  reducers: {
    updateAppCartState(state, action: PayloadAction<Partial<IAppCartState>>) {
      Object.keys(action.payload).forEach(
        key => (state[key] = action.payload[key]),
      );
    },
    clearCart(state) {
      state.cartItems = [];
      state.error = '';
    },
    addToCart(
      state,
      action: PayloadAction<{ product: Product; quantity: number }>,
    ) {
      const existingItem = state.cartItems?.find(
        item => item.product.id === action.payload.product.id,
      );
      if (!existingItem) {
        state.cartItems = [...(state.cartItems || []), action.payload];
      }
    },
    removeFromCart(state, action: PayloadAction<string | number>) {
      state.cartItems = state.cartItems?.filter(
        item => item.product.id !== action.payload,
      );
    },
  },
});

const persistConfig = {
  key: 'cart',
  storage: AsyncStorage,
  blacklist: ['error'],
};

export const { updateAppCartState, clearCart, addToCart, removeFromCart } =
  cartSlice.actions;
export default persistReducer(persistConfig, cartSlice.reducer);
