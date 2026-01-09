import Button from '@wd/components/Button/Button';
import Circle from '@wd/components/Circle/Circle';
import ConfirmationModal from '@wd/components/ConfirmationModal/ConfirmationModal';
import EmptyState from '@wd/components/EmptyState/EmptyState';
import Header from '@wd/components/Header';
import Input from '@wd/components/Input/Input';
import Loader from '@wd/components/Loader/Loader';
import SafeAreaComponent from '@wd/components/SafeAreaComponent/SafeAreaComponent';
import Select from '@wd/components/Select/Select';
import StatCard from '@wd/components/StatCard/StatCard';
import { Store } from '@wd/generated';
import { RoutesEnum } from '@wd/navigation/enum';
import { MyStoresStackScreenProps } from '@wd/navigation/types';
import { globalStyles } from '@wd/utils/GlobalStyles';
import useTheme from '@wd/utils/theme/useTheme';
import { StoreStatusEnum } from '@wd/utils/types';
import useDisclosure from '@wd/utils/useDisclosure/useDisclosure';
import { BuildingIcon, SearchIcon, Wallet2Icon } from 'lucide-react-native';
import React, { FC, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import ShopItem from '../shop/components/ShopItem';
import useGetStores from '../shop/hooks/useGetStores';
import useDeleteStore from './hooks/useDeleteStore';
import useGetStoresStatistics from './hooks/useGetStoresStatistics';
import CreateStoreModal from './modals/CreateStoreModal';

const MyStoresScreen: FC<
  MyStoresStackScreenProps<RoutesEnum.MY_STORES_SCREEN>
> = ({ navigation }) => {
  const { theme } = useTheme();
  const deleteHandler = useDisclosure();
  const addStoreHandler = useDisclosure();

  const onView = (store: Store) => {
    navigation.navigate(RoutesEnum.STORE_PROFILE_SCREEN, { id: store.id });
  };

  const [activeStore, setActiveStore] = useState<Store | undefined>(undefined);
  const onDelete = (store: Store) => {
    setActiveStore(store);
    deleteHandler.onOpen();
  };

  const {
    isLoading,
    status,
    setStatus,
    stores,
    searchText,
    setSearchText,
    refetch,
    isRefreshing,
  } = useGetStores({ forUser: true, ignorePagination: true });

  const { isLoading: statisticsLoading, statistics } = useGetStoresStatistics({
    forUser: true,
  });

  const { deleteStore, isDeleting } = useDeleteStore();
  return (
    <>
      <SafeAreaComponent
        statusBarProps={{
          backgroundColor: theme.white[400],
        }}
      />
      <Header
        canGoBack
        headerTitle="My Stores"
        navigation={navigation}
        transparent={false}
      />
      <View className="p-4 relative" style={globalStyles.screen}>
        <View className="flex-row gap-2 justify-between">
          <StatCard
            className="flex-1"
            icon={<BuildingIcon color={theme.blue.DEFAULT} size={40} />}
            isLoading={statisticsLoading}
            title="Active Stores"
            value={statistics?.totalApprovedStores}
          />
          <StatCard
            className="flex-1"
            icon={<Wallet2Icon color={theme.blue.DEFAULT} size={40} />}
            isLoading={statisticsLoading}
            title="Total Revenue"
            value={statistics?.totalRevenue}
          />
        </View>

        <View className="mt-8 ">
          <View className=" gap-1 w-full md:w-auto">
            <Input
              className="w-full md:w-[200px] !mb-1"
              IconLeft={<SearchIcon />}
              onChange={e => setSearchText(e)}
              placeholder="Search by store name"
              value={searchText}
            />

            <Select
              className="min-w-[200px]"
              onChange={setStatus}
              options={[
                { label: 'Active', value: StoreStatusEnum.ACTIVE },
                {
                  label: 'Pending Approval',
                  value: StoreStatusEnum.PENDING_APPROVAL,
                },
                { label: 'Rejected', value: StoreStatusEnum.REJECTED },
              ]}
              placeholder="Filter by status"
              value={status}
            />
          </View>
        </View>

        <ScrollView
          refreshControl={
            <RefreshControl
              colors={[theme.blue.DEFAULT]}
              onRefresh={refetch}
              progressBackgroundColor={theme.gray[150]}
              refreshing={isRefreshing}
            />
          }
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
        >
          {isLoading ? (
            <Loader style={{ marginVertical: '50%' }} />
          ) : !stores.length ? (
            <EmptyState
              Action={
                <Button
                  label="Create New Store"
                  onPress={addStoreHandler.onOpen}
                />
              }
              description="Click the button below to create your first store."
              icon={<BuildingIcon size={40} />}
              section
              title="You haven't created any store yet."
            />
          ) : (
            <View style={{ flex: 1, marginTop: 20 }}>
              {stores.map(store => (
                <ShopItem
                  key={store.id}
                  onPress={() => onView(store)}
                  store={store}
                />
              ))}
            </View>
          )}
        </ScrollView>
        <Circle
          className="absolute right-6 bottom-6 elevation-md"
          color={theme.blue.DEFAULT}
          onPress={addStoreHandler.onOpen}
          size={70}
        >
          <BuildingIcon color={theme.white.DEFAULT} />
        </Circle>
      </View>

      <CreateStoreModal
        isOpen={addStoreHandler.isOpen}
        onClose={addStoreHandler.onClose}
      />

      <ConfirmationModal
        description="Are you sure you want to delete this store? This action cannot be undone."
        isLoading={isDeleting}
        isOpen={deleteHandler.isOpen}
        onClose={() => {
          setActiveStore(undefined);
          deleteHandler.onClose();
        }}
        onConfirm={() =>
          deleteStore(activeStore?.id || '', {
            onSuccess: () => {
              deleteHandler.onClose();
              setActiveStore(undefined);
            },
          })
        }
        title={`Delete Store: ${activeStore?.name}`}
      />
    </>
  );
};

export default MyStoresScreen;

const styles = StyleSheet.create({});
