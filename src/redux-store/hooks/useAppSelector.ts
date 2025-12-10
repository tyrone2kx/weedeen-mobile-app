import { AppState } from '@wd/redux-store/root-reducer';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
