import EmptyState from '@wd/components/EmptyState/EmptyState';
import InfiniteScrollView from '@wd/components/InfiniteScrollView/InfiniteScrollView';
import Input from '@wd/components/Input/Input';
import Loader from '@wd/components/Loader/Loader';
import Text from '@wd/components/Text/Text';
import { useAppSelector } from '@wd/redux-store/hooks/useAppSelector';
import useTheme from '@wd/utils/theme/useTheme';
import { BuildingIcon, SearchIcon } from 'lucide-react-native';
import React from 'react';
import { RefreshControl, StyleSheet, View } from 'react-native';
import ShopItem from '../components/ShopItem';
import useGetStores from '../hooks/useGetStores';

const StoreTab = () => {
  const user = useAppSelector(state => state.user?.currentUser);
  const { theme } = useTheme();
  const {
    stores,
    isLoading,
    totalElements,
    searchText,
    setSearchText,
    infiniteScrollCallback,
    refetch,
    isRefreshing,
  } = useGetStores({
    tenant: user?.tenant,
    onlySubscribed: true,
  });
  return (
    <View className="flex-1">
      <Text intent="h3">Stores</Text>

      <View>
        <Input
          className="w-full md:w-[200px]"
          IconLeft={<SearchIcon />}
          onChange={e => setSearchText(e)}
          placeholder={`Search for store`}
          value={searchText}
        />
      </View>

      <InfiniteScrollView
        callback={infiniteScrollCallback}
        fetching={isLoading}
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
          <Loader section />
        ) : totalElements === 0 ? (
          <EmptyState
            description="You can change the search text or come back later."
            icon={<BuildingIcon color={'#FFFFFF'} size={40} />}
            section
            title="There are no matching stores"
          />
        ) : (
          <>
            <View className="mt-8 flex flex-wrap gap-6">
              {stores.map(store => (
                <ShopItem key={store.id} store={store} />
              ))}
            </View>
          </>
        )}
      </InfiniteScrollView>
    </View>
  );
};

export default StoreTab;

const styles = StyleSheet.create({});
