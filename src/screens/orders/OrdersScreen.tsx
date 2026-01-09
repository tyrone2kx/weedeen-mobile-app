import Accordion from '@wd/components/Accordion/Accordion';
import CloseButtonIcon from '@wd/components/Button/CloseButtonIcon';
import ConfirmationModal from '@wd/components/ConfirmationModal/ConfirmationModal';
import DatePicker from '@wd/components/DatePicker/DatePicker';
import EmptyState from '@wd/components/EmptyState/EmptyState';
import Header from '@wd/components/Header';
import InfiniteScrollView from '@wd/components/InfiniteScrollView/InfiniteScrollView';
import Input from '@wd/components/Input/Input';
import Loader from '@wd/components/Loader/Loader';
import SafeAreaComponent from '@wd/components/SafeAreaComponent/SafeAreaComponent';
import Select from '@wd/components/Select/Select';
import StatCard from '@wd/components/StatCard/StatCard';
import Text from '@wd/components/Text/Text';
import { Invoice } from '@wd/generated';
import { RoutesEnum } from '@wd/navigation/enum';
import { MenuStackScreenProps } from '@wd/navigation/types';
import { globalStyles } from '@wd/utils/GlobalStyles';
import { formatNairaWithKobo } from '@wd/utils/helpers';
import useTheme from '@wd/utils/theme/useTheme';
import { OrderStatusEnum } from '@wd/utils/types';
import useDisclosure from '@wd/utils/useDisclosure/useDisclosure';
import {
  FilterIcon,
  ReceiptTextIcon,
  SearchIcon,
  ShoppingBagIcon,
} from 'lucide-react-native';
import moment from 'moment';
import React, { FC, useState } from 'react';
import { RefreshControl, TouchableOpacity, View } from 'react-native';
import OrderItem from './components/OrderItem';
import useGetOrdersStatistics from './hooks/useGetOrdersStatistics';
import useGetResidentInvoices from './hooks/useGetResidentInvoices';
import ViewInvoiceModal from './modals/ViewInvoiceModal';

const OrdersScreen: FC<MenuStackScreenProps<RoutesEnum.ORDERS_SCREEN>> = ({
  navigation,
}) => {
  const { theme } = useTheme();
  const cancelHandler = useDisclosure();
  const viewHandler = useDisclosure();
  const filterHandler = useDisclosure();
  const {
    searchText,
    setSearchText,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    invoices,
    status,
    setStatus,
    isLoading,
    infiniteScrollCallback,
    isRefreshing,
    refetch,
  } = useGetResidentInvoices({ forUser: true });
  const [activeInvoice, setActiveInvoice] = useState<Invoice | undefined>(
    undefined,
  );

  const onViewInvoice = (order: Invoice) => {
    setActiveInvoice(order);
    viewHandler.onOpen();
  };

  const onCancelInvoice = (order: Invoice) => {
    setActiveInvoice(order);
    cancelHandler.onOpen();
  };

  const { isLoadingStats, stats } = useGetOrdersStatistics();

  return (
    <>
      <SafeAreaComponent
        statusBarProps={{
          backgroundColor: theme.white[400],
        }}
      />
      <Header
        canGoBack
        headerTitle="My Orders"
        navigation={navigation}
        transparent={false}
      />
      <View className="p-4 relative" style={globalStyles.screen}>
        <View className="flex-row gap-2 justify-between">
          <StatCard
            className="flex-1"
            icon={<ShoppingBagIcon color={theme.blue.DEFAULT} size={30} />}
            isLoading={isLoadingStats}
            title="Pending Orders"
            value={stats?.pendingOrders}
          />
          <StatCard
            className="flex-1"
            icon={<ReceiptTextIcon color={theme.blue.DEFAULT} size={30} />}
            isLoading={isLoadingStats}
            title="Total Amount Spent"
            value={formatNairaWithKobo(stats?.totalAmount)}
          />
        </View>

        <View className="mt-8 flex gap-2 flex-wrap justify-between items-center">
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
            <Loader style={{ marginVertical: '50%' }} />
          ) : !invoices.length ? (
            <EmptyState
              description="You haven't placed any orders yet."
              icon={<ShoppingBagIcon color={'white'} size={40} />}
              section
              title="No Orders"
            />
          ) : (
            <View style={{ flex: 1, marginTop: 20 }}>
              {invoices.map((item, index) => (
                <OrderItem
                  invoice={item}
                  key={`${item.id || ''}${index}`}
                  onCancel={() => onCancelInvoice(item)}
                  onView={() => onViewInvoice(item)}
                />
              ))}
            </View>
          )}
        </InfiniteScrollView>
      </View>

      <ConfirmationModal
        description="Are you sure you want to cancel this order?"
        isOpen={cancelHandler.isOpen}
        onClose={cancelHandler.onClose}
        onConfirm={cancelHandler.onClose}
        title="Cancel Order"
      />

      <ViewInvoiceModal
        invoiceId={activeInvoice?.id}
        isOpen={viewHandler.isOpen}
        onCancelInvoice={onCancelInvoice}
        onClose={viewHandler.onClose}
      />
    </>
  );
};

export default OrdersScreen;
