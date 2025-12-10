import { combineReducers } from 'redux';
import cartReducer from './reducers/cart-reducer';
import privilegesReducer from './reducers/privilege-reducer';
import userReducer from './reducers/user-reducer';

const rootReducer = combineReducers({
  user: userReducer,
  privileges: privilegesReducer,
  cart: cartReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
