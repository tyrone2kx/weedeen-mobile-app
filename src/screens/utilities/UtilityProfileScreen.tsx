import Circle from '@wd/components/Circle/Circle';
import ConfirmationModal from '@wd/components/ConfirmationModal/ConfirmationModal';
import EmptyState from '@wd/components/EmptyState/EmptyState';
import Header from '@wd/components/Header';
import Input from '@wd/components/Input/Input';
import Loader from '@wd/components/Loader/Loader';
import { PaystackModal } from '@wd/components/PaystackComponent/Paystack';
import usePaystack from '@wd/components/PaystackComponent/hooks/usePaystack';
import SafeAreaComponent from '@wd/components/SafeAreaComponent/SafeAreaComponent';
import StatCard from '@wd/components/StatCard/StatCard';
import Text from '@wd/components/Text/Text';
import TopTab from '@wd/components/TopTab';
import { RoutesEnum } from '@wd/navigation/enum';
import { UtilitiesStackScreenProps } from '@wd/navigation/types';
import { useAppSelector } from '@wd/redux-store/hooks/useAppSelector';
import { globalStyles } from '@wd/utils/GlobalStyles';
import { Notify } from '@wd/utils/helpers';
import useTheme from '@wd/utils/theme/useTheme';
import useDisclosure from '@wd/utils/useDisclosure/useDisclosure';
import {
  ReceiptIcon,
  Wallet2Icon,
  WalletIcon,
  WrenchIcon,
} from 'lucide-react-native';
import React, { FC, useState } from 'react';
import { View } from 'react-native';
import ResidentInvoicesComponent from '../fees/components/ResidentInvoicesComponent';
import useGetFeesStatistics from '../fees/hooks/useGetFeesStatistics';
import useVerifyPayment from '../fees/hooks/useVerifyPayment';
import useCreateUtilityFee from './hooks/useCreateUtilityFee';
import useGetUtility from './hooks/useGetUtility';
import UtilityDetailsTab from './tabs/UtilityDetailsTab';

enum TabsEnum {
  DETAILS = 'Details',
  INVOICES = 'Invoices',
}

const UtilityProfileScreen: FC<
  UtilitiesStackScreenProps<RoutesEnum.UTILITY_PROFILE_SCREEN>
> = ({ route, navigation }) => {
  const user = useAppSelector(state => state.user?.currentUser);
  const { id } = route.params;
  const { utility, isLoading, refetch } = useGetUtility({ id });
  const { stats, isLoadingStats, refetchStats } = useGetFeesStatistics({
    utilityId: id,
    userId: user?.id,
  });

  const buyNowHandler = useDisclosure();
  const [amount, setAmount] = useState<number>(0);

  const { mutate: verifyPayment } = useVerifyPayment({
    onSuccess: () => {
      Notify({
        type: 'success',
        message: 'Payment successful!',
      });
      refetch();
      refetchStats();
      setAmount(0);
    },
  });

  const {
    paystackHandle,
    setPaystackConfig,
    paystackModalProps,
    paystackConfig,
  } = usePaystack({
    amount,
    onSuccess: ref => verifyPayment(ref),
  });

  const controller = useCreateUtilityFee({
    amount,
    utilityId: id || '',
    initializePayment: ref => {
      setPaystackConfig(prev => ({ ...prev, reference: ref }));
      buyNowHandler.onClose();
      paystackHandle.onOpen();
    },
  });

  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<TabsEnum>(TabsEnum.DETAILS);
  const tabItems = [
    {
      label: TabsEnum.DETAILS,
      onPress: () => setActiveTab(TabsEnum.DETAILS),
    },
    {
      label: TabsEnum.INVOICES,
      onPress: () => setActiveTab(TabsEnum.INVOICES),
    },
  ];

  return (
    <>
      <SafeAreaComponent
        statusBarProps={{
          backgroundColor: theme.white[400],
        }}
      />
      <Header
        canGoBack
        headerTitle={utility?.name || 'Utility'}
        navigation={navigation}
        transparent={false}
      />

      <View className="p-4 relative" style={globalStyles.screen}>
        <View className="flex-row gap-2 justify-between">
          <StatCard
            className="flex-1"
            icon={<ReceiptIcon color={theme.blue.DEFAULT} size={40} />}
            isLoading={isLoadingStats}
            title="Total Invoices"
            value={stats?.totalInvoices}
          />
          <StatCard
            className="flex-1"
            icon={<Wallet2Icon color={theme.blue.DEFAULT} size={40} />}
            isLoading={isLoadingStats}
            title="Total Amount Unpaid"
            value={stats?.totalAmountUnpaid}
          />
        </View>

        <View>
          {isLoading ? (
            <Loader section />
          ) : !utility ? (
            <EmptyState
              description="This might be a result of an invalid link or a network error."
              icon={<WrenchIcon className="text-white" size={40} />}
              title="Utility Not Found"
            />
          ) : (
            <View className="flex-1">
              <TopTab
                activeTab={activeTab}
                buttonStyle="border-0"
                style={{ marginBottom: 10 }}
                tabs={tabItems}
              />

              {activeTab === TabsEnum.DETAILS && (
                <UtilityDetailsTab utility={utility} />
              )}

              {activeTab === TabsEnum.INVOICES && (
                <ResidentInvoicesComponent
                  refetchStats={refetchStats}
                  utilityId={id}
                />
              )}
            </View>
          )}
        </View>
        <Circle
          className="absolute right-6 bottom-6 elevation-md"
          color={theme.blue.DEFAULT}
          onPress={buyNowHandler.onOpen}
          size={70}
        >
          <WalletIcon color={theme.white.DEFAULT} />
        </Circle>
      </View>

      <ConfirmationModal
        buttonColor="#15bca0"
        buttonText="Submit"
        descriptionComponent={
          <View>
            <Text className="mb-2">How much do you want to pay?</Text>
            <Input
              onChange={e => setAmount(Number(e))}
              placeholder="Enter amount"
              type="number-pad"
              value={amount}
            />
          </View>
        }
        isLoading={controller.isPending}
        isOpen={buyNowHandler.isOpen}
        onClose={() => {
          setAmount(0);
          buyNowHandler.onClose();
        }}
        onConfirm={controller.mutate}
        title={`Pay for ${utility?.name}`}
      />
      <PaystackModal
        isOpen={paystackHandle.isOpen && !!paystackConfig?.reference}
        {...paystackModalProps}
      />
    </>
  );
};

export default UtilityProfileScreen;
