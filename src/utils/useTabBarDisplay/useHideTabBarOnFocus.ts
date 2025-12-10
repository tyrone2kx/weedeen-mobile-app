import { useFocusEffect } from '@react-navigation/native';
import { useAppSelector } from '@wd/redux-store/hooks/useAppSelector';
import { updateAppUserState } from '@wd/redux-store/reducers/user-reducer';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

const useHideTabBarOnFocus = () => {
  const tabBarStyle = useAppSelector(state => state.user.tabBarStyle?.display);
  const dispatch = useDispatch();

  const hideTabBar = useCallback(() => {
    if (tabBarStyle !== 'none') {
      dispatch(
        updateAppUserState({
          tabBarStyle: {
            display: 'none',
          },
        }),
      );
    }
  }, [dispatch, tabBarStyle]);

  useFocusEffect(hideTabBar);
};

export default useHideTabBarOnFocus;
