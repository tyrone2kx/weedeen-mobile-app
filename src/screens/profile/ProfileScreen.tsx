import Header from '@wd/components/Header';
import SafeAreaComponent from '@wd/components/SafeAreaComponent/SafeAreaComponent';
import TopTab from '@wd/components/TopTab';
import { RoutesEnum } from '@wd/navigation/enum';
import { MenuStackScreenProps } from '@wd/navigation/types';
import { globalStyles } from '@wd/utils/GlobalStyles';
import useTheme from '@wd/utils/theme/useTheme';
import React, { FC, useState } from 'react';
import { View } from 'react-native';
import ChangePasswordTab from './tabs/ChangePasswordTab';
import ProfileTab from './tabs/ProfileTab';

const ProfileScreen: FC<
  MenuStackScreenProps<RoutesEnum.PROFILE_SETTINGS_SCREEN>
> = ({ navigation }) => {
  const { theme } = useTheme();

  enum TabsEnum {
    PROFILE = 'Profile',
    CHANGE_PASSWORD = 'Change Password',
  }
  const [activeTab, setActiveTab] = useState<TabsEnum>(TabsEnum.PROFILE);
  const tabItems = [
    {
      label: TabsEnum.PROFILE,
      onPress: () => setActiveTab(TabsEnum.PROFILE),
    },
    {
      label: TabsEnum.CHANGE_PASSWORD,
      onPress: () => setActiveTab(TabsEnum.CHANGE_PASSWORD),
    },
  ];

  return (
    <>
      <SafeAreaComponent
        statusBarProps={{
          backgroundColor: theme.white.DEFAULT,
        }}
      />
      <Header
        canGoBack
        headerTitle="Profile Settings"
        navigation={navigation}
        showRightContent={false}
        transparent={false}
      />
      <View className="p-4 bg-white" style={globalStyles.screen}>
        <TopTab
          activeTab={activeTab}
          buttonStyle="border-0"
          style={{ marginBottom: 30 }}
          tabs={tabItems}
        />

        {activeTab === TabsEnum.PROFILE && (
          <ProfileTab navigation={navigation} />
        )}

        {activeTab === TabsEnum.CHANGE_PASSWORD && <ChangePasswordTab />}
      </View>
    </>
  );
};

export default ProfileScreen;
