import { useMutation } from '@tanstack/react-query';
import { apiWrapper } from '@wd/api';
import Accordion from '@wd/components/Accordion/Accordion';
import CloseButtonIcon from '@wd/components/Button/CloseButtonIcon';
import ConfirmationModal from '@wd/components/ConfirmationModal/ConfirmationModal';
import DatePicker from '@wd/components/DatePicker/DatePicker';
import EmptyState from '@wd/components/EmptyState/EmptyState';
import Header from '@wd/components/Header';
import InfiniteScrollView from '@wd/components/InfiniteScrollView/InfiniteScrollView';
import Input from '@wd/components/Input/Input';
import Loader from '@wd/components/Loader/Loader';
import usePaystack from '@wd/components/PaystackComponent/hooks/usePaystack';
import { PaystackModal } from '@wd/components/PaystackComponent/Paystack';
import SafeAreaComponent from '@wd/components/SafeAreaComponent/SafeAreaComponent';
import Select from '@wd/components/Select/Select';
import StatCard from '@wd/components/StatCard/StatCard';
import Text from '@wd/components/Text/Text';
import { FeesService, UserFee } from '@wd/generated';
import { RoutesEnum } from '@wd/navigation/enum';
import { FeesStackScreenProps } from '@wd/navigation/types';
import { useAppSelector } from '@wd/redux-store/hooks/useAppSelector';
import { globalStyles } from '@wd/utils/GlobalStyles';
import { formatNairaWithKobo, handleError, Notify } from '@wd/utils/helpers';
import useTheme from '@wd/utils/theme/useTheme';
import useDisclosure from '@wd/utils/useDisclosure/useDisclosure';
import { FilterIcon, ReceiptIcon, SearchIcon } from 'lucide-react-native';
import moment from 'moment';
import React, { FC, useState } from 'react';
import { RefreshControl, TouchableOpacity, View } from 'react-native';
import FeeItem from './components/FeeItem';
import useGetFeeInvoices from './hooks/useGetFeeInvoices';
import useGetFeesStatistics from './hooks/useGetFeesStatistics';
import usePaymentCreate from './hooks/usePaymentCreate';
import ViewUserFeeModal from './modals/ViewUserFeeModal';

const FeesScreen: FC<FeesStackScreenProps<RoutesEnum.FEES_SCREEN>> = ({
  navigation,
}) => {
  const { theme } = useTheme();
  const currentUser = useAppSelector(state => state.user?.currentUser);
  const { stats, isLoadingStats, refetchStats } = useGetFeesStatistics({
    userId: currentUser?.id,
  });
  const {
    status,
    setStatus,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    searchText,
    setSearchText,
    invoices,
    isLoading,
    callback,
    infiniteScrollCallback,
    refetch,
    isRefreshing,
  } = useGetFeeInvoices({
    userId: currentUser?.id,
    ignorePagination: false,
  });

  const [activeFee, setActiveFee] = useState<UserFee | undefined>(undefined);

  const { createPayment, isCreating } = usePaymentCreate();
  const payNowHandler = useDisclosure();
  const viewInvoiceHandler = useDisclosure();

  const onPayNow = (fee: UserFee) => {
    setActiveFee(fee);
    payNowHandler.onOpen();
  };

  const onViewInvoice = (fee: UserFee) => {
    setActiveFee(fee);
    viewInvoiceHandler.onOpen();
  };

  const { mutate: verifyPayment } = useMutation({
    mutationFn: (reference: string) =>
      apiWrapper(() => FeesService.feesControllerVerifyPayment({ reference })),
    onError: error => handleError(error),
    onSuccess: () => {
      callback();
      refetchStats();
      payNowHandler.onClose();
      setActiveFee(undefined);
      Notify({
        title: 'Payment Successful',
        message: 'Your payment has been processed successfully.',
        type: 'success',
      });
    },
  });

  const {
    paystackHandle,
    setPaystackConfig,
    paystackModalProps,
    paystackConfig,
  } = usePaystack({
    amount: (activeFee?.fee?.amount || 0) * 100,
    onSuccess: ref => verifyPayment(ref),
  });

  const filterHandler = useDisclosure();

  return (
    <>
      <SafeAreaComponent
        statusBarProps={{
          backgroundColor: theme.white[400],
        }}
      />
      <Header headerTitle="My Fees" navigation={navigation} />
      <View className="p-4 relative" style={globalStyles.screen}>
        <View className="flex-row gap-2 justify-between">
          <StatCard
            className="flex-1"
            icon={<ReceiptIcon color={theme.blue.DEFAULT} size={40} />}
            isLoading={isLoadingStats}
            title="Outstanding Amount"
            value={formatNairaWithKobo(stats?.totalAmountUnpaid)}
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
              placeholder="Search by fee name"
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
                    { label: 'Only Paid', value: 'paid' },
                    { label: 'Only Unpaid', value: 'unpaid' },
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
              description="You have no fees at the moment."
              icon={<ReceiptIcon color={'white'} size={40} />}
              section
              title="No Fees"
            />
          ) : (
            <View style={{ flex: 1, marginTop: 20 }}>
              {invoices.map((item, index) => (
                <FeeItem
                  key={`${item.id || ''}${index}`}
                  onPayNow={() => onPayNow(item)}
                  onView={() => onViewInvoice(item)}
                  userFee={item}
                />
              ))}
            </View>
          )}
        </InfiniteScrollView>
      </View>

      <ViewUserFeeModal
        invoice={activeFee || ({} as UserFee)}
        isOpen={viewInvoiceHandler.isOpen}
        onClose={() => {
          viewInvoiceHandler.onClose();
          setActiveFee(undefined);
        }}
      />

      <PaystackModal
        isOpen={paystackHandle.isOpen && !!paystackConfig?.reference}
        {...paystackModalProps}
      />

      <ConfirmationModal
        buttonColor="#15bca0"
        buttonText="Yes, Proceed to Pay"
        description={`You are about to pay the fee for ${activeFee?.fee?.title}. Do you want to continue?`}
        isLoading={isCreating}
        isOpen={payNowHandler.isOpen}
        onClose={() => {
          payNowHandler.onClose();
          setActiveFee(undefined);
        }}
        onConfirm={() => {
          createPayment(
            {
              amount: activeFee?.fee?.amount || 0,
              userFeeId: activeFee?.id || '',
              paymentMethod: 'paystack',
              status: 'pending',
            },
            {
              onSuccess: data => {
                setPaystackConfig(prev => ({
                  ...(prev || {}),
                  reference: data.reference,
                }));
                payNowHandler.onClose();
                paystackHandle.onOpen();
              },
            },
          );
        }}
        title="Confirm Payment"
      />
    </>
  );
};

export default FeesScreen;
