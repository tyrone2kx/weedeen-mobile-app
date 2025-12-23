import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Icon from '@wd/components/Icon/Icon';
import { StacksEnum } from '@wd/navigation/enum';
import { useAppSelector } from '@wd/redux-store/hooks/useAppSelector';
import useTheme from '@wd/utils/theme/useTheme';
import {
  HomeIcon,
  ShoppingCartIcon,
  UserCircleIcon,
  WalletIcon,
} from 'lucide-react-native';
import React, { FC } from 'react';
import { View } from 'react-native';
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';
import TabButton from './TabButton';

type CustomTabBarProps = BottomTabBarProps;

const CustomTabBar: FC<CustomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const tabBarStyle = useAppSelector(
    appState => appState.user.tabBarStyle?.display,
  );

  const { theme } = useTheme();

  return tabBarStyle === 'flex' ? (
    <Animated.View entering={FadeInUp} exiting={FadeOutDown}>
      <View className="h-[90px] flex-row items-center justify-between bg-white border-t border-gray-200 px-3">
        {state.routes.map((route, index) => {
          const routeName = route.name as StacksEnum;
          const { options } = descriptors[route.key];
          const label =
            typeof options.tabBarLabel === 'string'
              ? options.tabBarLabel
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          const renderTabIcon =
            routeName === StacksEnum.DASHBOARD_STACK ? (
              <HomeIcon
                color={isFocused ? theme.blue.DEFAULT : theme.black[600]}
              />
            ) : routeName === StacksEnum.MENU_STACK ? (
              <Icon
                color={isFocused ? theme.blue.DEFAULT : theme.black[600]}
                name="dashboard"
                size={24}
              />
            ) : routeName === StacksEnum.VISITORS_STACK ? (
              <UserCircleIcon
                color={isFocused ? theme.blue.DEFAULT : theme.black[600]}
              />
            ) : routeName === StacksEnum.SHOP_NOW_STACK ? (
              <ShoppingCartIcon
                color={isFocused ? theme.blue.DEFAULT : theme.black[600]}
              />
            ) : routeName === StacksEnum.FEES_STACK ? (
              <WalletIcon
                color={isFocused ? theme.blue.DEFAULT : theme.black[600]}
              />
            ) : (
              <HomeIcon
                color={isFocused ? theme.blue.DEFAULT : theme.black[600]}
              />
            );

          const textColor = isFocused ? theme.blue.DEFAULT : theme.black[600];

          return (
            <TabButton
              isFocused={isFocused}
              key={route.key}
              label={label}
              onLongPress={onLongPress}
              onPress={onPress}
              renderTabIcon={renderTabIcon}
              routeName={routeName}
              tabBarAccessibilityLabel={options.tabBarAccessibilityLabel}
              textColor={textColor}
            />
          );
        })}
      </View>
    </Animated.View>
  ) : null;
};

export default React.memo(CustomTabBar);
