import AsyncStorage from '@react-native-async-storage/async-storage';
import Avatar from '@wd/components/Avatar/Avatar';
import SafeAreaComponent from '@wd/components/SafeAreaComponent/SafeAreaComponent';
import Text from '@wd/components/Text/Text';
import { RoutesEnum } from '@wd/navigation/enum';
import { MenuStackScreenProps } from '@wd/navigation/types';
import { useAppSelector } from '@wd/redux-store/hooks/useAppSelector';
import { logoutUser } from '@wd/redux-store/reducers/user-reducer';
import { globalStyles } from '@wd/utils/GlobalStyles';
import { transparentizeColor } from '@wd/utils/helpers';
import useTheme from '@wd/utils/theme/useTheme';
import {
  AlertTriangleIcon,
  BikeIcon,
  BriefcaseIcon,
  BuildingIcon,
  DollarSignIcon,
  LogOutIcon,
  ShoppingBagIcon,
  UserCircleIcon,
} from 'lucide-react-native';
import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

const menuList = navigate => [
  {
    title: 'Profile',
    icon: <UserCircleIcon color="#2563eb" size={20} />,
    onPress: () => navigate(RoutesEnum.PROFILE_SCREEN),
  },
  {
    title: 'My Orders',
    icon: <ShoppingBagIcon color="#2563eb" size={20} />,
    onPress: () => navigate(RoutesEnum.ORDERS_SCREEN),
  },
  {
    title: 'Deliveries',
    icon: <BikeIcon color="#2563eb" size={20} />,
    onPress: () => navigate(RoutesEnum.DELIVERIES_SCREEN),
  },
  {
    title: 'Emergencies',
    icon: <AlertTriangleIcon color="#2563eb" size={20} />,
    onPress: () => navigate(RoutesEnum.EMERGENCIES_SCREEN),
  },
  {
    title: 'My Stores',
    icon: <BuildingIcon color="#2563eb" size={20} />,
    onPress: () => navigate(RoutesEnum.MY_STORES_SCREEN),
  },
  {
    title: 'Bank Accounts',
    icon: <BriefcaseIcon color="#2563eb" size={20} />,
    onPress: () => navigate(RoutesEnum.BANK_ACCOUNTS_SCREEN),
  },
  {
    title: 'Subscriptions & Billings',
    icon: <DollarSignIcon color="#2563eb" size={20} />,
    onPress: () => navigate(RoutesEnum.SUBSCRIPTION_SCREEN),
  },
];

const MenuScreen: FC<MenuStackScreenProps<RoutesEnum.MENU_SCREEN>> = ({
  navigation,
}) => {
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const user = useAppSelector(state => state.user.currentUser);
  const fullName = `${user?.firstName || ''} ${user?.lastName || ''}`.trim();

  const onLogout = async () => {
    dispatch(logoutUser());
    await AsyncStorage.clear();
  };

  return (
    <>
      <SafeAreaComponent
        statusBarProps={{
          backgroundColor: '#1e3a8a',
          barStyle: 'light-content',
        }}
      />
      <View
        className="justify-between"
        style={{
          ...globalStyles.screen,
          backgroundColor: theme.white.DEFAULT,
        }}
      >
        <View
          className="flex-row gap-2 items-center mb-6 p-4"
          style={{ backgroundColor: '#1e3a8a' }}
        >
          <Avatar
            borderColor="#2d5ec0"
            image={user?.profilePic}
            name={fullName}
          />
          <View>
            <Text className="text-white" intent="h3" weight="semibold">
              {fullName}
            </Text>
            <Text className="text-white" weight="light">
              {user?.email}
            </Text>
          </View>
        </View>

        <View className="mb-4 p-4">
          {menuList(navigation.navigate).map(item => (
            <TouchableOpacity
              className="flex-row gap-2 items-center mb-4"
              key={`menu-${item.title}`}
              onPress={item.onPress}
              style={{
                borderWidth: 1,
                borderLeftWidth: 3,
                borderLeftColor: theme.blue.DEFAULT,
                borderTopColor: theme.gray[200],
                borderRightColor: theme.gray[200],
                borderBottomColor: theme.gray[200],
                backgroundColor: transparentizeColor(theme.blue.DEFAULT, 3),
                padding: 12,
                paddingVertical: 16,
              }}
            >
              {item.icon}
              <Text className="">{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View className="flex-row justify-center mb-6">
          <TouchableOpacity
            className="flex-row gap-2"
            onPress={() => void onLogout()}
          >
            <LogOutIcon color={theme.red.DEFAULT} />
            <Text intent="h4" style={{ color: theme.red.DEFAULT }}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({});
