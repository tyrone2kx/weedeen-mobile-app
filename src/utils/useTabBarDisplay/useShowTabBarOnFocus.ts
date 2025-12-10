import { useFocusEffect } from '@react-navigation/native';
import { useAppSelector } from '@wd/redux-store/hooks/useAppSelector';
import { updateAppUserState } from '@wd/redux-store/reducers/user-reducer';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

const useShowTabBarOnFocus = () => {
  const tabBarStyle = useAppSelector(state => state.user.tabBarStyle?.display);
  const dispatch = useDispatch();

  const showTabBar = useCallback(() => {
    if (tabBarStyle !== 'flex') {
      dispatch(
        updateAppUserState({
          tabBarStyle: {
            display: 'flex',
          },
        }),
      );
    }
  }, [dispatch, tabBarStyle]);

  useFocusEffect(showTabBar);
};

export default useShowTabBarOnFocus;
