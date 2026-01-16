import Avatar from '@wd/components/Avatar/Avatar';
import Header from '@wd/components/Header';
import SafeAreaComponent from '@wd/components/SafeAreaComponent/SafeAreaComponent';
import Select from '@wd/components/Select/Select';
import Tag from '@wd/components/Tag/Tag';
import Text from '@wd/components/Text/Text';
import TopTab from '@wd/components/TopTab';
import { Store } from '@wd/generated';
import { RoutesEnum } from '@wd/navigation/enum';
import { SubscriptionStackScreenProps } from '@wd/navigation/types';
import { useAppSelector } from '@wd/redux-store/hooks/useAppSelector';
import { globalStyles } from '@wd/utils/GlobalStyles';
import useTheme from '@wd/utils/theme/useTheme';
import { SelectOptionType, UserTypeEnum } from '@wd/utils/types';
import moment from 'moment';
import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import useGetStores from '../shop/hooks/useGetStores';
import PlansTab from './tabs/PlansTab';

enum TabsEnum {
  PLANS = 'Plans',
  INVOICES = 'Invoices',
}

const SubscriptionsScreen: FC<
  SubscriptionStackScreenProps<RoutesEnum.SUBSCRIPTION_SCREEN>
> = ({ navigation }) => {
  const { theme } = useTheme();
  const [selectedStore, setSelectedStore] = useState<SelectOptionType>(null);
  const activeUserType = useAppSelector(state => state.user.activeUserType);
  const isResident = activeUserType === UserTypeEnum.RESIDENT;
  const { stores } = useGetStores({
    forUser: true,
    includeDeleted: false,
    ignorePagination: true,
  });

  const activeStore = selectedStore?.value as Store | undefined;
  const cannotSubscribe = isResident && activeStore?.status !== 'active';

  useEffect(() => {
    if (stores.length > 0 && !selectedStore && isResident) {
      setSelectedStore({ label: stores[0].name, value: stores[0] });
    }
  }, [stores, isResident, selectedStore]);

  const [activeTab, setActiveTab] = useState<TabsEnum>(TabsEnum.PLANS);
  const tabItems = [
    {
      label: TabsEnum.PLANS,
      onPress: () => setActiveTab(TabsEnum.PLANS),
    },
    {
      label: TabsEnum.INVOICES,
      onPress: () => setActiveTab(TabsEnum.INVOICES),
    },
  ];

  return (
    <>
      <SafeAreaComponent
        statusBarProps={{
          backgroundColor: theme.white[400],
        }}
      />
      <Header
        canGoBack
        headerTitle="Subscriptions"
        navigation={navigation}
        transparent={false}
      />
      <View className="p-4 relative bg-white" style={globalStyles.screen}>
        <View>
          <View className="flex-row items-center gap-4 mb-4">
            <View className="rounded-full p-2 border-blue-500 border">
              <Avatar image={activeStore?.logo || undefined} size={100} />
            </View>
            <View>
              <Text className="font-bold text-xl text-gray-800">
                {activeStore?.name}
              </Text>
              <Text className="text-sm">
                Created {moment(activeStore?.createdAt).fromNow()}
              </Text>
              <Tag title={activeStore?.status || ''} />
            </View>
          </View>
          <Select
            onChange={setSelectedStore}
            options={stores.map(store => ({ label: store.name, value: store }))}
            placeholder="Select Store"
            value={selectedStore}
          />
        </View>
        <View className="flex-1 mt-4">
          <TopTab
            activeTab={activeTab}
            buttonStyle="border-0"
            style={{ marginBottom: 10 }}
            tabs={tabItems}
          />
          {activeTab === TabsEnum.PLANS && (
            <PlansTab
              cannotSubscribe={cannotSubscribe}
              isResident={isResident}
              storeId={activeStore?.id}
            />
          )}
        </View>
      </View>
    </>
  );
};

export default SubscriptionsScreen;

const styles = StyleSheet.create({});
