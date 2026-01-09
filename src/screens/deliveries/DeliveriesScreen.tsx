import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiWrapper } from '@wd/api';
import Accordion from '@wd/components/Accordion/Accordion';
import Circle from '@wd/components/Circle/Circle';
import ConfirmationModal from '@wd/components/ConfirmationModal/ConfirmationModal';
import DatePicker from '@wd/components/DatePicker/DatePicker';
import EmptyState from '@wd/components/EmptyState/EmptyState';
import Header from '@wd/components/Header';
import InfiniteScrollView from '@wd/components/InfiniteScrollView/InfiniteScrollView';
import Loader from '@wd/components/Loader/Loader';
import SafeAreaComponent from '@wd/components/SafeAreaComponent/SafeAreaComponent';
import Select from '@wd/components/Select/Select';
import StatCard from '@wd/components/StatCard/StatCard';
import { Delivery, DeliveryService } from '@wd/generated';
import { RoutesEnum } from '@wd/navigation/enum';
import { MenuStackScreenProps } from '@wd/navigation/types';
import { globalStyles } from '@wd/utils/GlobalStyles';
import { handleError, Notify } from '@wd/utils/helpers';
import useTheme from '@wd/utils/theme/useTheme';
import { DeliveryStatusEnum } from '@wd/utils/types';
import useDisclosure from '@wd/utils/useDisclosure/useDisclosure';
import { BikeIcon } from 'lucide-react-native';
import moment from 'moment';
import React, { FC, useState } from 'react';
import { RefreshControl, StyleSheet, View } from 'react-native';
import DeliveryItem from './components/DeliveryItem';
import useGetDeliveries from './hooks/useGetDeliveries';
import useGetDeliveriesStatistics from './hooks/useGetDeliveriesStatistics';
import RequestRiderModal from './modals/RequestRiderModal';

const DeliveriesScreen: FC<
  MenuStackScreenProps<RoutesEnum.DELIVERIES_SCREEN>
> = ({ navigation }) => {
  const { theme } = useTheme();
  const queryClient = useQueryClient();
  const cancelHandler = useDisclosure();
  const requestRiderHandler = useDisclosure();
  const viewHandler = useDisclosure();
  const [activeDelivery, setActiveDelivery] = useState<Delivery | undefined>(
    undefined,
  );

  const onView = (delivery: Delivery) => {
    setActiveDelivery(delivery);
    viewHandler.onOpen();
  };

  const onDelete = (delivery: Delivery) => {
    setActiveDelivery(delivery);
    cancelHandler.onOpen();
  };

  const { isPending, mutate: cancelDelivery } = useMutation({
    mutationFn: () =>
      apiWrapper(() =>
        DeliveryService.deliveryControllerUpdate({
          id: activeDelivery?.id?.toString() || '',
          requestBody: {
            status: DeliveryStatusEnum.CANCELLED,
          },
        }),
      ),
    onSuccess: () => {
      cancelHandler.onClose();
      setActiveDelivery(undefined);
      Notify({
        title: 'Delivery Cancelled',
        message: 'The delivery has been cancelled successfully.',
        type: 'success',
      });
      void queryClient.invalidateQueries({ queryKey: ['deliveries'] });
      void queryClient.invalidateQueries({
        queryKey: ['deliveries-statistics'],
      });
    },
    onError: error => {
      handleError(error);
    },
  });

  const {
    isLoading,
    status,
    setStatus,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    deliveries,
    refetch,
    isRefreshing,
    infiniteScrollCallback,
  } = useGetDeliveries({ forUser: true });

  const { isLoading: statisticsLoading, statistics } =
    useGetDeliveriesStatistics({
      forUser: true,
      startDate,
      endDate,
    });

  return (
    <>
      <SafeAreaComponent
        statusBarProps={{
          backgroundColor: theme.white[400],
        }}
      />
      <Header
        canGoBack
        headerTitle="My Deliveries"
        navigation={navigation}
        transparent={false}
      />
      <View className="p-4 relative" style={globalStyles.screen}>
        <View className="flex-row gap-2 justify-between">
          <StatCard
            className="flex-1"
            icon={<BikeIcon color={theme.blue.DEFAULT} size={30} />}
            isLoading={statisticsLoading}
            title="Pending Deliveries"
            value={statistics?.totalPendingDeliveries}
          />
        </View>

        <View className="mt-8 flex gap-2 flex-wrap justify-between items-center">
          <View className=" gap-2 w-full md:w-auto">
            <Accordion title="Select filters">
              <View className="flex flex-col md:flex-row gap-1 md:items-center w-full md:w-auto">
                <Select
                  className="min-w-[200px]"
                  onChange={setStatus}
                  options={[
                    { label: 'Pending', value: DeliveryStatusEnum.PENDING },
                    { label: 'Cancelled', value: DeliveryStatusEnum.CANCELLED },
                    { label: 'Completed', value: DeliveryStatusEnum.COMPLETED },
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
          ) : !deliveries.length ? (
            <EmptyState
              description="You have no deliveries at the moment."
              icon={<BikeIcon color={'white'} size={40} />}
              section
              title="No Deliveries"
            />
          ) : (
            <View style={{ flex: 1, marginTop: 20 }}>
              {deliveries.map((item, index) => (
                <DeliveryItem
                  delivery={item}
                  key={`${item.id || ''}${index}`}
                  onCancel={() => onDelete(item)}
                  onView={() => onView(item)}
                />
              ))}
            </View>
          )}
        </InfiniteScrollView>
        <Circle
          className="absolute right-6 bottom-6 elevation-md"
          color={theme.blue.DEFAULT}
          onPress={requestRiderHandler.onOpen}
          size={70}
        >
          <BikeIcon color={theme.white.DEFAULT} />
        </Circle>
      </View>
      <ConfirmationModal
        description="Are you sure you want to cancel this delivery? This action cannot be undone."
        isLoading={isPending}
        isOpen={cancelHandler.isOpen}
        onClose={() => {
          setActiveDelivery(undefined);
          cancelHandler.onClose();
        }}
        onConfirm={cancelDelivery}
        title="Cancel Delivery"
      />
      <RequestRiderModal
        isOpen={requestRiderHandler.isOpen}
        onClose={requestRiderHandler.onClose}
      />
    </>
  );
};

export default DeliveriesScreen;

const styles = StyleSheet.create({});
