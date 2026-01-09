import {
  EventArg,
  ParamListBase,
  StackNavigationState,
} from '@react-navigation/native';
import { RoutesEnum } from '@wd/navigation/enum';
import { useAppSelector } from '@wd/redux-store/hooks/useAppSelector';
import { updateAppUserState } from '@wd/redux-store/reducers/user-reducer';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

type TEvent = EventArg<
  'state',
  boolean | undefined,
  {
    state: StackNavigationState<ParamListBase>;
  }
>;

const showBottomTabRoutes = [
  RoutesEnum.DASHBOARD_SCREEN,
  RoutesEnum.MENU_SCREEN,
  RoutesEnum.SHOP_NOW_SCREEN,
  RoutesEnum.FEES_SCREEN,
  RoutesEnum.VISITORS_SCREEN,
];

const useTabBarDisplay = () => {
  const tabBarStyle = useAppSelector(state => state.user.tabBarStyle?.display);

  const dispatch = useDispatch();

  const checkTabBar = useCallback(
    (e: TEvent) => {
      const length = e?.data?.state?.routes?.length;
      const route = e?.data?.state?.routes?.[length - 1];

      if (route) {
        const shouldHide = !showBottomTabRoutes.includes(
          route.name as RoutesEnum,
        );

        if (shouldHide && tabBarStyle !== 'none') {
          return dispatch(
            updateAppUserState({
              tabBarStyle: {
                display: 'none',
              },
            }),
          );
        }

        if (!shouldHide && tabBarStyle !== 'flex') {
          dispatch(
            updateAppUserState({
              tabBarStyle: {
                display: 'flex',
              },
            }),
          );
        }
      }
    },
    [dispatch, tabBarStyle],
  );

  return {
    checkTabBar,
  };
};

export default useTabBarDisplay;
