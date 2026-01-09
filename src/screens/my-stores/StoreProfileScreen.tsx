import Avatar from '@wd/components/Avatar/Avatar';
import BaseButton from '@wd/components/Button/BaseButton';
import Circle from '@wd/components/Circle/Circle';
import ConfirmationModal from '@wd/components/ConfirmationModal/ConfirmationModal';
import EmptyState from '@wd/components/EmptyState/EmptyState';
import Loader from '@wd/components/Loader/Loader';
import SafeAreaComponent from '@wd/components/SafeAreaComponent/SafeAreaComponent';
import Text from '@wd/components/Text/Text';
import TopTab from '@wd/components/TopTab';
import { RoutesEnum } from '@wd/navigation/enum';
import { MyStoresStackScreenProps } from '@wd/navigation/types';
import { useAppSelector } from '@wd/redux-store/hooks/useAppSelector';
import { globalStyles } from '@wd/utils/GlobalStyles';
import { invertObject } from '@wd/utils/helpers';
import useTheme from '@wd/utils/theme/useTheme';
import { StoreStatusEnum } from '@wd/utils/types';
import useDisclosure from '@wd/utils/useDisclosure/useDisclosure';
import {
  BuildingIcon,
  ChevronLeftIcon,
  EditIcon,
  TrashIcon,
} from 'lucide-react-native';
import React, { FC, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import useGetSingleStore from '../shop/hooks/useGetSingleStore';
import useDeleteStore from './hooks/useDeleteStore';
import CreateStoreModal from './modals/CreateStoreModal';
import StoreDetailsTab from './tabs/StoreDetailsTab';

enum TabsEnum {
  DETAILS = 'Details',
  ORDERS = 'Orders',
  INVENTORY = 'Inventory',
}

const StoreProfileScreen: FC<
  MyStoresStackScreenProps<RoutesEnum.STORE_PROFILE_SCREEN>
> = ({ navigation, route }) => {
  const { id } = route.params;
  const { isLoading, store } = useGetSingleStore({ storeId: id });
  const { theme } = useTheme();

  const inverted = invertObject(StoreStatusEnum);
  const deleteHandler = useDisclosure();
  const editStoreHandler = useDisclosure();
  const { deleteStore, isDeleting } = useDeleteStore();
  const userSubs = useAppSelector(state => state.user.activeUserSubscriptions);
  const currentStoreSub = userSubs?.find(sub => sub.storeId === store?.id);
  const isSubscribed = !!currentStoreSub && currentStoreSub.status === 'active';

  const [activeTab, setActiveTab] = useState<TabsEnum>(TabsEnum.DETAILS);
  const tabItems = [
    {
      label: TabsEnum.DETAILS,
      onPress: () => setActiveTab(TabsEnum.DETAILS),
    },
    {
      label: TabsEnum.ORDERS,
      onPress: () => setActiveTab(TabsEnum.ORDERS),
    },
    {
      label: TabsEnum.INVENTORY,
      onPress: () => setActiveTab(TabsEnum.INVENTORY),
    },
  ];
  return (
    <>
      <SafeAreaComponent
        statusBarProps={{
          backgroundColor: theme.white[400],
        }}
      />
      <View className="bg-white p-4 flex-row items-center justify-between elevation-md border-b border-gray-200 flex-wrap">
        <View className="flex-row items-center gap-2">
          <ChevronLeftIcon />
          <Avatar />
          <View>
            <Text className="" intent="h4">
              {store?.name || 'Store'}
            </Text>
            <Text className="text-sm text-gray-600">
              {inverted[store?.status || '']?.replaceAll('_', ' ')}
            </Text>
          </View>
        </View>
        <View className="flex-row gap-4">
          <Circle
            className="border border-gray-400"
            color="white"
            onPress={editStoreHandler.onOpen}
            size={40}
          >
            <EditIcon color={theme.gray[600]} size={20} />
          </Circle>
          <Circle
            className="border border-gray-400"
            color="white"
            onPress={deleteHandler.onOpen}
            size={40}
          >
            <TrashIcon color={theme.gray[600]} size={20} />
          </Circle>
        </View>
      </View>
      {!isSubscribed ? (
        <View className="w-full p-4 bg-blue-50 border-l-4 border-blue-400 mb-4">
          <Text className="text-blue-600">
            Users cannot purchase items from your store without an active
            subscription.
          </Text>
          <View className="flex-row justify-start mt-2">
            <BaseButton
              style={{
                width: 'auto',
                paddingVertical: 4,
                backgroundColor: theme.white.DEFAULT,
                borderWidth: 1,
                borderColor: theme.blue.DEFAULT,
                borderRadius: 10,
              }}
              textStyle={{ color: theme.blue.DEFAULT }}
            >
              Subscribe
            </BaseButton>
          </View>
        </View>
      ) : null}

      <View className="p-4 relative" style={globalStyles.screen}>
        {isLoading ? (
          <Loader section />
        ) : !store ? (
          <EmptyState
            description="This might be a result of an invalid link or a network error."
            icon={<BuildingIcon className="text-white" size={40} />}
            title="Store Not Found"
          />
        ) : (
          <View className="flex-1">
            <TopTab
              activeTab={activeTab}
              buttonStyle="border-0"
              style={{ marginBottom: 10 }}
              tabs={tabItems}
            />

            {activeTab === TabsEnum.DETAILS && (
              <StoreDetailsTab store={store} />
            )}
          </View>
        )}
      </View>
      <CreateStoreModal
        isOpen={editStoreHandler.isOpen}
        onClose={editStoreHandler.onClose}
        store={store}
      />

      <ConfirmationModal
        description="Are you sure you want to delete this store? This action cannot be undone."
        isLoading={isDeleting}
        isOpen={deleteHandler.isOpen}
        onClose={() => {
          deleteHandler.onClose();
        }}
        onConfirm={() =>
          deleteStore(store?.id || '', {
            onSuccess: () => navigation.navigate(RoutesEnum.MY_STORES_SCREEN),
          })
        }
        title={`Delete Store: ${store?.name}`}
      />
    </>
  );
};

export default StoreProfileScreen;

const styles = StyleSheet.create({});
