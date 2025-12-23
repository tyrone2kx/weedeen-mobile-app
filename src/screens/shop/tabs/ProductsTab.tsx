import EmptyState from '@wd/components/EmptyState/EmptyState';
import InfiniteScrollView from '@wd/components/InfiniteScrollView/InfiniteScrollView';
import Input from '@wd/components/Input/Input';
import Loader from '@wd/components/Loader/Loader';
import Text from '@wd/components/Text/Text';
import useTheme from '@wd/utils/theme/useTheme';
import { SearchIcon, ShoppingBagIcon } from 'lucide-react-native';
import React from 'react';
import { RefreshControl, StyleSheet, View } from 'react-native';
import ProductItem from '../components/ProductItem';
import useGetProducts from '../hooks/useGetProducts';

const ProductsTab = () => {
  const { theme } = useTheme();
  const {
    searchText,
    setSearchText,
    isLoading,
    products,
    totalElements,
    infiniteScrollCallback,
    isRefreshing,
    refetch,
  } = useGetProducts({
    ignorePagination: false,
    onlySubscribed: true,
  });
  return (
    <View className="flex-1">
      <Text intent="h3">Products</Text>

      <View>
        <Input
          className="w-full md:w-[200px]"
          IconLeft={<SearchIcon />}
          onChange={e => setSearchText(e)}
          placeholder={`Search for product`}
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
            icon={<ShoppingBagIcon color={'#FFFFFF'} size={40} />}
            section
            title="There are no matching products"
          />
        ) : (
          <>
            <View className="mt-8 flex-row justify-center flex-wrap gap-6">
              {products.map(product => (
                <ProductItem key={product.id} product={product} />
              ))}
            </View>
          </>
        )}
      </InfiniteScrollView>
    </View>
  );
};

export default ProductsTab;

const styles = StyleSheet.create({});
