import Avatar from '@wd/components/Avatar/Avatar';
import Circle from '@wd/components/Circle/Circle';
import ConfirmationModal from '@wd/components/ConfirmationModal/ConfirmationModal';
import EmptyState from '@wd/components/EmptyState/EmptyState';
import Loader from '@wd/components/Loader/Loader';
import SafeAreaComponent from '@wd/components/SafeAreaComponent/SafeAreaComponent';
import Tag, { TagVariant } from '@wd/components/Tag/Tag';
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
  InfoIcon,
  TrashIcon,
} from 'lucide-react-native';
import React, { FC, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import useGetSingleStore from '../shop/hooks/useGetSingleStore';
import useDeleteStore from './hooks/useDeleteStore';
import CreateStoreModal from './modals/CreateStoreModal';
import StoreDetailsTab from './tabs/StoreDetailsTab';
import StoreInventoryTab from './tabs/StoreInventoryTab';
import StoreOrdersTab from './tabs/StoreOrdersTab';

enum TabsEnum {
  DETAILS = 'Details',
  ORDERS = 'Orders',
  INVENTORY = 'Inventory',
}

const statusVariant = (status?: string): TagVariant => {
  const s = (status || '').toLowerCase();
  if (s.includes('active') || s.includes('approved')) return 'success';
  if (s.includes('pending')) return 'warning';
  if (s.includes('reject')) return 'danger';
  return 'neutral';
};

const StoreProfileScreen: FC<
  MyStoresStackScreenProps<RoutesEnum.STORE_PROFILE_SCREEN>
> = ({ navigation, route }) => {
  const { id } = route.params;
  const { isLoading, store } = useGetSingleStore({ storeId: id });
  const { theme } = useTheme();

  const inverted = invertObject(StoreStatusEnum);
  const statusLabel = inverted[store?.status || '']?.replaceAll('_', ' ');
  const deleteHandler = useDisclosure();
  const editStoreHandler = useDisclosure();
  const { deleteStore, isDeleting } = useDeleteStore();
  const userSubs = useAppSelector(state => state.user.activeUserSubscriptions);
  const currentStoreSub = userSubs?.find(sub => sub.storeId === store?.id);
  const isSubscribed = !!currentStoreSub && currentStoreSub.status === 'active';

  const [activeTab, setActiveTab] = useState<TabsEnum>(TabsEnum.DETAILS);
  const tabItems = [
    { label: TabsEnum.DETAILS, onPress: () => setActiveTab(TabsEnum.DETAILS) },
    { label: TabsEnum.ORDERS, onPress: () => setActiveTab(TabsEnum.ORDERS) },
    { label: TabsEnum.INVENTORY, onPress: () => setActiveTab(TabsEnum.INVENTORY) },
  ];

  return (
    <>
      <SafeAreaComponent
        statusBarProps={{ backgroundColor: theme.white[400] }}
      />
      {/* Header */}
      <View className="flex-row items-center justify-between bg-white px-4 py-3">
        <View className="flex-1 flex-row items-center gap-3">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}
            style={circleBtn(theme)}
          >
            <ChevronLeftIcon color={theme.black[600]} size={22} />
          </TouchableOpacity>
          <Avatar image={store?.logo} name={store?.name} showName size={44} />
          <View style={{ flex: 1 }}>
            <Text intent="h4" numberOfLines={1} weight="bold">
              {store?.name || 'Store'}
            </Text>
            {statusLabel ? (
              <View className="mt-1 flex-row">
                <Tag title={statusLabel} variant={statusVariant(store?.status)} />
              </View>
            ) : null}
          </View>
        </View>
        <View className="flex-row gap-2">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={editStoreHandler.onOpen}
            style={circleBtn(theme)}
          >
            <EditIcon color={theme.gray[600]} size={18} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={deleteHandler.onOpen}
            style={circleBtn(theme)}
          >
            <TrashIcon color={theme.red.DEFAULT} size={18} />
          </TouchableOpacity>
        </View>
      </View>

      <View className="p-4 relative" style={globalStyles.screen}>
        {!isSubscribed ? (
          <View
            className="mb-4 rounded-2xl p-4"
            style={{ backgroundColor: theme.blue[300] }}
          >
            <View className="flex-row gap-2">
              <InfoIcon color={theme.blue.DEFAULT} size={18} />
              <Text intent="sm" style={{ flex: 1, color: theme.blue[600] }} weight="medium">
                Users cannot purchase items from your store without an active
                subscription.
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.85}
              className="mt-3 self-start rounded-lg px-4 py-2"
              style={{ backgroundColor: theme.blue.DEFAULT }}
            >
              <Text intent="sm" style={{ color: '#fff' }} weight="semibold">
                Subscribe
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}

        {isLoading ? (
          <Loader section />
        ) : !store ? (
          <EmptyState
            description="This might be a result of an invalid link or a network error."
            icon={<BuildingIcon size={34} />}
            title="Store Not Found"
          />
        ) : (
          <View className="flex-1">
            <TopTab
              activeTab={activeTab}
              style={{ marginBottom: 16 }}
              tabs={tabItems}
            />

            {activeTab === TabsEnum.DETAILS && <StoreDetailsTab store={store} />}
            {activeTab === TabsEnum.ORDERS && <StoreOrdersTab store={store} />}
            {activeTab === TabsEnum.INVENTORY && (
              <StoreInventoryTab store={store} />
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

const circleBtn = (theme: any) => ({
  width: 42,
  height: 42,
  borderRadius: 21,
  alignItems: 'center' as const,
  justifyContent: 'center' as const,
  backgroundColor: '#FFFFFF',
  borderWidth: 1,
  borderColor: theme.gray[200],
  shadowColor: '#101828',
  shadowOpacity: 0.06,
  shadowRadius: 8,
  shadowOffset: { width: 0, height: 3 },
  elevation: 2,
});

export default StoreProfileScreen;
