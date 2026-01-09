import Avatar from '@wd/components/Avatar/Avatar';
import EmptyState from '@wd/components/EmptyState/EmptyState';
import InfiniteScrollView from '@wd/components/InfiniteScrollView/InfiniteScrollView';
import Loader from '@wd/components/Loader/Loader';
import SafeAreaComponent from '@wd/components/SafeAreaComponent/SafeAreaComponent';
import Text from '@wd/components/Text/Text';
import { Product } from '@wd/generated';
import { RoutesEnum } from '@wd/navigation/enum';
import { ShopNowStackScreenProps } from '@wd/navigation/types';
import { globalStyles } from '@wd/utils/GlobalStyles';
import useTheme from '@wd/utils/theme/useTheme';
import useDisclosure from '@wd/utils/useDisclosure/useDisclosure';
import { BuildingIcon, ShoppingBagIcon } from 'lucide-react-native';
import React, { FC, useState } from 'react';
import { RefreshControl, StyleSheet, View } from 'react-native';
import ProductItem from './components/ProductItem';
import useGetProducts from './hooks/useGetProducts';
import useGetSingleStore from './hooks/useGetSingleStore';
import ViewProductModal from './modals/ViewProductModal';

const SingleShopScreen: FC<
  ShopNowStackScreenProps<RoutesEnum.SINGLE_SHOP_SCREEN>
> = ({ route }) => {
  const { id } = route.params;
  const { theme } = useTheme();
  const { isLoading, store } = useGetSingleStore({ storeId: id });
  const viewHandler = useDisclosure();
  const {
    isLoading: productsLoading,
    products,
    totalElements,
    infiniteScrollCallback,
    isRefreshing,
    refetch,
  } = useGetProducts({
    storeId: store?.id,
    ignorePagination: false,
  });

  const [activeProduct, setActiveProduct] = useState<Product | undefined>(
    undefined,
  );

  const onView = (product: Product) => {
    setActiveProduct(product);
    viewHandler.onOpen();
  };

  return (
    <>
      <SafeAreaComponent
        statusBarProps={{
          backgroundColor: theme.white[400],
        }}
      />
      <View className="p-4" style={globalStyles.screen}>
        {isLoading ? (
          <Loader />
        ) : !store ? (
          <EmptyState
            description="There was an issue fetching the store details."
            icon={<BuildingIcon color={'#FFFFFF'} size={40} />}
            section
            title="Store not found"
          />
        ) : (
          <>
            <View className="mb-4 flex-row items-center gap-2">
              <Avatar image={store.logo} size={80} />
              <View>
                <Text intent="h2">{store.name}</Text>
                <Text className="mt-2" weight="light">
                  {store.description}
                </Text>
              </View>
            </View>

            <View>
              <InfiniteScrollView
                callback={infiniteScrollCallback}
                fetching={isRefreshing}
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
                {productsLoading ? (
                  <Loader />
                ) : totalElements === 0 ? (
                  <EmptyState
                    description="This store has no products available."
                    icon={<ShoppingBagIcon color={'#FFFFFF'} size={40} />}
                    section
                    title="No Products"
                  />
                ) : (
                  <>
                    <View className="mt-8 flex-row justify-center flex-wrap gap-6">
                      {products.map(product => (
                        <ProductItem
                          key={product.id}
                          onView={() => onView(product)}
                          product={product}
                        />
                      ))}
                    </View>
                  </>
                )}
              </InfiniteScrollView>
            </View>
          </>
        )}
      </View>

      {activeProduct && (
        <ViewProductModal
          isOpen={viewHandler.isOpen}
          onClose={() => {
            viewHandler.onClose();
            setActiveProduct(undefined);
          }}
          product={activeProduct}
        />
      )}
    </>
  );
};

export default SingleShopScreen;

const styles = StyleSheet.create({});
