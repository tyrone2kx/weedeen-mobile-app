import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery } from '@tanstack/react-query';
import { apiWrapper } from '@wd/api';
import Avatar from '@wd/components/Avatar/Avatar';
import SafeAreaComponent from '@wd/components/SafeAreaComponent/SafeAreaComponent';
import Text from '@wd/components/Text/Text';
import { PlotService } from '@wd/generated';
import { RoutesEnum, StacksEnum } from '@wd/navigation/enum';
import { MenuStackScreenProps } from '@wd/navigation/types';
import { useAppSelector } from '@wd/redux-store/hooks/useAppSelector';
import { logoutUser } from '@wd/redux-store/reducers/user-reducer';
import { globalStyles } from '@wd/utils/GlobalStyles';
import useTheme from '@wd/utils/theme/useTheme';
import {
  AlertTriangleIcon,
  BikeIcon,
  BriefcaseIcon,
  BuildingIcon,
  ChevronRightIcon,
  Contact2Icon,
  DollarSignIcon,
  LogOutIcon,
  MoonIcon,
  ShoppingBagIcon,
  SunIcon,
  UserCircleIcon,
  WrenchIcon,
} from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import React, { FC } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

type MenuItem = {
  title: string;
  icon: React.ReactNode;
  onPress: () => void;
  requiresPrimary?: boolean;
};

const ICON = '#2563eb';

const menuList = (navigate: any): MenuItem[] => [
  { title: 'Profile', icon: <UserCircleIcon color={ICON} size={20} />, onPress: () => navigate(RoutesEnum.PROFILE_SETTINGS_SCREEN) },
  { title: 'Utilities', icon: <WrenchIcon color={ICON} size={20} />, onPress: () => navigate(StacksEnum.UTILITIES_STACK) },
  { title: 'My Orders', icon: <ShoppingBagIcon color={ICON} size={20} />, onPress: () => navigate(RoutesEnum.ORDERS_SCREEN) },
  { title: 'Deliveries', icon: <BikeIcon color={ICON} size={20} />, onPress: () => navigate(RoutesEnum.DELIVERIES_SCREEN) },
  { title: 'Emergencies', icon: <AlertTriangleIcon color={ICON} size={20} />, onPress: () => navigate(RoutesEnum.EMERGENCIES_SCREEN) },
  { title: 'My Stores', icon: <BuildingIcon color={ICON} size={20} />, onPress: () => navigate(StacksEnum.MY_STORES_STACK) },
  { title: 'My Staff', icon: <Contact2Icon color={ICON} size={20} />, onPress: () => navigate(StacksEnum.MY_STAFF_STACK) },
  { title: 'Beneficiaries', icon: <UserCircleIcon color={ICON} size={20} />, onPress: () => navigate(RoutesEnum.BENEFICIARIES_SCREEN), requiresPrimary: true },
  { title: 'Bank Accounts', icon: <BriefcaseIcon color={ICON} size={20} />, onPress: () => navigate(RoutesEnum.BANK_ACCOUNTS_SCREEN) },
  { title: 'Subscriptions & Billings', icon: <DollarSignIcon color={ICON} size={20} />, onPress: () => navigate(StacksEnum.SUBSCRIPTION_STACK) },
];

type AppearanceMode = 'light' | 'dark';

const AppearanceToggle = () => {
  const { theme } = useTheme();
  const { colorScheme = 'light', setColorScheme } = useColorScheme();
  const active: AppearanceMode = colorScheme === 'dark' ? 'dark' : 'light';

  const applyMode = (mode: AppearanceMode) => {
    setColorScheme(mode);
    void AsyncStorage.setItem('theme', mode);
  };

  const options: { mode: AppearanceMode; label: string; icon: React.ReactNode }[] = [
    { mode: 'light', label: 'Light', icon: <SunIcon color={active === 'light' ? '#fff' : theme.gray[500]} size={18} /> },
    { mode: 'dark', label: 'Dark', icon: <MoonIcon color={active === 'dark' ? '#fff' : theme.gray[500]} size={18} /> },
  ];

  return (
    <View
      className="mt-6 flex-row items-center justify-between rounded-2xl bg-white p-4"
      style={{ borderWidth: 1, borderColor: theme.gray[200] }}
    >
      <View style={{ flex: 1 }}>
        <Text intent="md" style={{ color: theme.black[700] }} weight="semibold">
          Appearance
        </Text>
        <Text intent="xs" style={{ color: theme.gray[500], marginTop: 2 }}>
          Switch between light and dark mode
        </Text>
      </View>

      <View
        className="flex-row rounded-full p-1"
        style={{ backgroundColor: theme.white[300] }}
      >
        {options.map(option => {
          const isActive = active === option.mode;
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              className="flex-row items-center gap-1.5 rounded-full px-3 py-2"
              key={option.mode}
              onPress={() => applyMode(option.mode)}
              style={isActive ? { backgroundColor: theme.blue.DEFAULT } : undefined}
            >
              {option.icon}
              <Text
                intent="xs"
                style={{ color: isActive ? '#fff' : theme.gray[500] }}
                weight="semibold"
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const MenuScreen: FC<MenuStackScreenProps<RoutesEnum.MENU_SCREEN>> = ({
  navigation,
}) => {
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const user = useAppSelector(state => state.user.currentUser);
  const fullName = `${user?.firstName || ''} ${user?.lastName || ''}`.trim();

  const { data: myUnits } = useQuery({
    queryKey: ['my-units'],
    queryFn: () => apiWrapper(() => PlotService.plotControllerGetMyUnits()),
  });
  const isPrimaryResident =
    Array.isArray(myUnits) && myUnits.some(u => u?.isPrimary && u?.isAssigned);

  const onLogout = async () => {
    dispatch(logoutUser());
    await AsyncStorage.clear();
  };

  const items = menuList(navigation.navigate).filter(
    item => !item.requiresPrimary || isPrimaryResident,
  );

  return (
    <>
      <SafeAreaComponent
        statusBarProps={{ backgroundColor: theme.white[400] }}
      />
      <View style={{ ...globalStyles.screen, backgroundColor: theme.white[400] }}>
        <ScrollView
          contentContainerStyle={{ padding: 18, paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Profile card */}
          <View
            className="flex-row items-center gap-4 rounded-3xl p-5"
            style={{
              backgroundColor: theme.blue.DEFAULT,
              shadowColor: theme.blue.DEFAULT,
              shadowOpacity: 0.3,
              shadowRadius: 18,
              shadowOffset: { width: 0, height: 10 },
              elevation: 6,
            }}
          >
            <Avatar
              color="#FFFFFF"
              image={user?.profilePic}
              name={fullName}
              showName
              size={56}
              textStyles={{ color: theme.blue.DEFAULT }}
            />
            <View style={{ flex: 1 }}>
              <Text intent="h3" style={{ color: '#fff' }} weight="bold">
                {fullName}
              </Text>
              <Text intent="sm" style={{ color: 'rgba(255,255,255,0.85)' }}>
                {user?.email}
              </Text>
            </View>
          </View>

          {/* Appearance */}
          <AppearanceToggle />

          {/* Menu list */}
          <View
            className="mt-6 overflow-hidden rounded-2xl bg-white"
            style={{ borderWidth: 1, borderColor: theme.gray[200] }}
          >
            {items.map((item, index) => (
              <TouchableOpacity
                activeOpacity={0.7}
                className="flex-row items-center gap-3 px-4 py-4"
                key={`menu-${item.title}`}
                onPress={item.onPress}
                style={
                  index < items.length - 1
                    ? { borderBottomWidth: 1, borderBottomColor: theme.gray[200] }
                    : undefined
                }
              >
                <View
                  className="items-center justify-center rounded-xl"
                  style={{ width: 40, height: 40, backgroundColor: theme.blue[300] }}
                >
                  {item.icon}
                </View>
                <Text intent="md" style={{ flex: 1, color: theme.black[700] }} weight="medium">
                  {item.title}
                </Text>
                <ChevronRightIcon color={theme.gray[400]} size={20} />
              </TouchableOpacity>
            ))}
          </View>

          {/* Logout */}
          <TouchableOpacity
            activeOpacity={0.8}
            className="mt-8 flex-row items-center justify-center gap-2"
            onPress={() => void onLogout()}
          >
            <LogOutIcon color={theme.red.DEFAULT} size={20} />
            <Text intent="h4" style={{ color: theme.red.DEFAULT }} weight="semibold">
              Logout
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </>
  );
};

export default MenuScreen;
