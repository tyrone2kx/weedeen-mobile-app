import Accordion from '@wd/components/Accordion/Accordion';
import CloseButtonIcon from '@wd/components/Button/CloseButtonIcon';
import DatePicker from '@wd/components/DatePicker/DatePicker';
import EmptyState from '@wd/components/EmptyState/EmptyState';
import InfiniteScrollView from '@wd/components/InfiniteScrollView/InfiniteScrollView';
import Input from '@wd/components/Input/Input';
import Loader from '@wd/components/Loader/Loader';
import Select from '@wd/components/Select/Select';
import StatCard from '@wd/components/StatCard/StatCard';
import Text from '@wd/components/Text/Text';
import { Order, Store } from '@wd/generated';
import { formatNairaWithKobo } from '@wd/utils/helpers';
import useTheme from '@wd/utils/theme/useTheme';
import { OrderStatusEnum } from '@wd/utils/types';
import useDisclosure from '@wd/utils/useDisclosure/useDisclosure';
import {
  FilterIcon,
  SearchIcon,
  ShoppingBagIcon,
  WalletIcon,
} from 'lucide-react-native';
import moment from 'moment';
import React, { useState } from 'react';
import { RefreshControl, TouchableOpacity, View } from 'react-native';
import OrderItem from '../components/OrderItem';
import useGetStoreOrders from '../hooks/useGetStoreOrders';
import useGetStoreOrderStatistics from '../hooks/useGetStoreOrderStatistics';
import ViewOrderModal from '../modals/ViewOrderModal';

interface Props {
  store: Store;
}

const StoreOrdersTab = ({ store }: Props) => {
  const { theme } = useTheme();

  const cancelHandler = useDisclosure();
  const viewHandler = useDisclosure();
  const filterHandler = useDisclosure();
  const [activeOrder, setActiveOrder] = useState<Order | undefined>(undefined);
  const onViewOrder = (order: Order) => {
    setActiveOrder(order);
    viewHandler.onOpen();
  };
  const onCancelOrder = (order: Order) => {
    setActiveOrder(order);
    cancelHandler.onOpen();
  };
  const {
    status,
    setStatus,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    searchText,
    setSearchText,
    isLoading,
    orders,
    infiniteScrollCallback,
    refetch,
    isRefreshing,
  } = useGetStoreOrders({
    storeId: store.id,
    ignorePagination: false,
  });
  const { isLoading: isLoadingStats, statistics } = useGetStoreOrderStatistics({
    storeId: store.id,
    startDate,
    endDate,
  });

  return (
    <>
      <View className="flex-1">
        <View className="flex-row gap-2 justify-between">
          <StatCard
            className="flex-1"
            icon={<ShoppingBagIcon color={theme.blue.DEFAULT} size={30} />}
            isLoading={isLoadingStats}
            title="Pending Orders"
            value={statistics?.pendingOrders}
          />
          <StatCard
            className="flex-1"
            icon={<WalletIcon color={theme.blue.DEFAULT} size={30} />}
            isLoading={isLoadingStats}
            title="Total Revenue"
            value={formatNairaWithKobo(statistics?.totalAmount)}
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
                    { label: 'Pending', value: OrderStatusEnum.PENDING },
                    { label: 'Completed', value: OrderStatusEnum.COMPLETED },
                    { label: 'Cancelled', value: OrderStatusEnum.CANCELLED },
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
            <Loader />
          ) : !orders.length ? (
            <EmptyState
              description="You haven't placed any orders yet."
              icon={<ShoppingBagIcon color={'white'} size={40} />}
              title="No Orders"
            />
          ) : (
            <View style={{ flex: 1, marginTop: 20 }}>
              {orders.map((item, index) => (
                <OrderItem
                  key={`${item.id || ''}${index}`}
                  onCancel={() => onCancelOrder(item)}
                  onView={() => onViewOrder(item)}
                  order={item}
                />
              ))}
            </View>
          )}
        </InfiniteScrollView>
      </View>
      <ViewOrderModal
        isOpen={viewHandler.isOpen}
        onClose={() => {
          viewHandler.onClose();
          setActiveOrder(undefined);
        }}
        orderId={activeOrder?.id}
      />
    </>
  );
};

export default StoreOrdersTab;
