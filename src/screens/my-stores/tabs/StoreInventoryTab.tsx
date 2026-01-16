import Accordion from '@wd/components/Accordion/Accordion';
import CloseButtonIcon from '@wd/components/Button/CloseButtonIcon';
import Circle from '@wd/components/Circle/Circle';
import ConfirmationModal from '@wd/components/ConfirmationModal/ConfirmationModal';
import DatePicker from '@wd/components/DatePicker/DatePicker';
import EmptyState from '@wd/components/EmptyState/EmptyState';
import InfiniteScrollView from '@wd/components/InfiniteScrollView/InfiniteScrollView';
import Input from '@wd/components/Input/Input';
import Loader from '@wd/components/Loader/Loader';
import Select from '@wd/components/Select/Select';
import StatCard from '@wd/components/StatCard/StatCard';
import Text from '@wd/components/Text/Text';
import { Product, Store } from '@wd/generated';
import useGetProducts from '@wd/screens/shop/hooks/useGetProducts';
import ViewProductModal from '@wd/screens/shop/modals/ViewProductModal';
import { formatNairaWithKobo } from '@wd/utils/helpers';
import useTheme from '@wd/utils/theme/useTheme';
import { ProductStatusEnum } from '@wd/utils/types';
import useDisclosure from '@wd/utils/useDisclosure/useDisclosure';
import {
  FilterIcon,
  SearchIcon,
  ShoppingBagIcon,
  ShoppingBasketIcon,
  Wallet2Icon,
} from 'lucide-react-native';
import moment from 'moment';
import React, { useState } from 'react';
import { RefreshControl, TouchableOpacity, View } from 'react-native';
import InventoryItem from '../components/InventoryItem';
import useGetProductStatistics from '../hooks/useGetProductStatistics';
import useProductDelete from '../hooks/useProductDelete';
import AddNewProductModal from '../modals/AddNewProductModal';

interface Props {
  store: Store;
}

const StoreInventoryTab = ({ store }: Props) => {
  const { theme } = useTheme();
  const filterHandler = useDisclosure();
  const deleteHandler = useDisclosure();
  const viewHandler = useDisclosure();
  const addProductHandler = useDisclosure();
  const {
    searchText,
    setSearchText,
    isLoading,
    products,
    totalElements,
    infiniteScrollCallback,
    isRefreshing,
    refetch,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    status,
    setStatus,
  } = useGetProducts({
    ignorePagination: false,
    storeId: store?.id,
  });

  const { isLoading: isLoadingStats, stats } = useGetProductStatistics({
    storeId: store?.id,
    startDate,
    endDate,
  });

  const [activeProduct, setActiveProduct] = useState<Product | undefined>(
    undefined,
  );

  const onView = (product: Product) => {
    setActiveProduct(product);
    viewHandler.onOpen();
  };

  const onEdit = (product: Product) => {
    setActiveProduct(product);
    addProductHandler.onOpen();
  };

  const onDelete = (product: Product) => {
    setActiveProduct(product);
    deleteHandler.onOpen();
  };

  const { deleteProduct, isDeleting } = useProductDelete();

  return (
    <View className="flex-1">
      <View className="flex-row gap-2 justify-between">
        <StatCard
          className="flex-1"
          icon={<ShoppingBasketIcon color={theme.blue.DEFAULT} size={30} />}
          isLoading={isLoadingStats}
          title="Total Products"
          value={stats?.totalProducts}
        />
        <StatCard
          className="flex-1"
          icon={<Wallet2Icon color={theme.blue.DEFAULT} size={30} />}
          isLoading={isLoadingStats}
          title="Total Cost"
          value={formatNairaWithKobo(stats?.totalWorth || 0)}
        />
      </View>

      <View className="mt-4 flex gap-2 flex-wrap justify-between items-center">
        <View className=" gap-2 w-full md:w-auto">
          <Input
            className="w-full md:w-[200px]"
            Icon={
              <TouchableOpacity onPress={filterHandler.toggle}>
                <FilterIcon color={theme.black[600]} size={18} />
              </TouchableOpacity>
            }
            IconLeft={<SearchIcon />}
            onChange={e => setSearchText(e)}
            placeholder="Search by store name"
            value={searchText}
          />
          <Accordion handler={filterHandler} title="Select filters">
            <View className="flex-row justify-between items-center">
              <Text className="mb-4" intent="h4">
                Advanced Filters
              </Text>

              <CloseButtonIcon onPress={filterHandler.onClose} />
            </View>
            <View className="flex flex-col md:flex-row gap-1 md:items-center w-full md:w-auto">
              <Select
                className="min-w-[200px]"
                onChange={setStatus}
                options={[
                  { label: 'In Stock', value: ProductStatusEnum.IN_STOCK },
                  {
                    label: 'Out of Stock',
                    value: ProductStatusEnum.OUT_OF_STOCK,
                  },
                  {
                    label: 'Discontinued',
                    value: ProductStatusEnum.DISCONTINUED,
                  },
                ]}
                placeholder="Filter by status"
                value={status}
              />
              <DatePicker
                onChange={setStartDate}
                placeholder="Filter by start date"
                value={startDate ? moment(startDate) : undefined}
              />
              <DatePicker
                onChange={setEndDate}
                placeholder="Filter by end date"
                value={endDate ? moment(endDate) : undefined}
              />
            </View>
          </Accordion>
        </View>
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
                <InventoryItem
                  key={product.id}
                  onDelete={() => onDelete(product)}
                  onEdit={() => onEdit(product)}
                  onView={() => onView(product)}
                  product={product}
                />
              ))}
            </View>
          </>
        )}
      </InfiniteScrollView>
      <ConfirmationModal
        description={`Are you sure you want to delete the product "${activeProduct?.name}"? This action cannot be undone.`}
        isLoading={isDeleting}
        isOpen={deleteHandler.isOpen}
        onClose={() => {
          deleteHandler.onClose();
          setActiveProduct(undefined);
        }}
        onConfirm={() => deleteProduct(String(activeProduct?.id || ''))}
        title="Delete Product"
      />
      <AddNewProductModal
        isOpen={addProductHandler.isOpen}
        onClose={() => {
          addProductHandler.onClose();
          setActiveProduct(undefined);
        }}
        product={activeProduct}
        storeId={store?.id || ''}
      />
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
      <Circle
        className="absolute right-6 bottom-6 elevation-md"
        color={theme.blue.DEFAULT}
        onPress={addProductHandler.onOpen}
        size={70}
      >
        <ShoppingBasketIcon color={theme.white.DEFAULT} />
      </Circle>
    </View>
  );
};

export default StoreInventoryTab;
