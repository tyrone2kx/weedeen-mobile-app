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
import { formatNairaWithKobo, Notify } from '@wd/utils/helpers';
import useTheme from '@wd/utils/theme/useTheme';
import useDisclosure from '@wd/utils/useDisclosure/useDisclosure';
import {
  ReceiptIcon,
  Wallet2Icon,
  WalletIcon,
  WrenchIcon,
} from 'lucide-react-native';
import React, { FC, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
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

  const statsSection = (
    <View className="flex-row gap-2 justify-between">
      <StatCard
        className="flex-1"
        icon={<ReceiptIcon color={theme.blue.DEFAULT} size={22} />}
        isLoading={isLoadingStats}
        title="Total Invoices"
        value={stats?.totalInvoices}
      />
      <StatCard
        className="flex-1"
        filled
        icon={<Wallet2Icon color="#FFFFFF" size={22} />}
        isLoading={isLoadingStats}
        title="Total Amount Unpaid"
        value={formatNairaWithKobo(stats?.totalAmountUnpaid)}
      />
    </View>
  );

  return (
    <View className="relative" style={globalStyles.screen}>
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

      <View className="flex-1 p-4">
        {isLoading ? (
          <Loader section />
        ) : !utility ? (
          <EmptyState
            description="This might be a result of an invalid link or a network error."
            icon={<WrenchIcon className="text-white" size={40} />}
            section
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
              <ScrollView showsVerticalScrollIndicator={false}>
                {statsSection}
                <View className="mt-4">
                  <UtilityDetailsTab utility={utility} />
                </View>
              </ScrollView>
            )}

            {activeTab === TabsEnum.INVOICES && (
              <ResidentInvoicesComponent
                header={statsSection}
                refetchStats={refetchStats}
                utilityId={id}
              />
            )}
          </View>
        )}
      </View>
      <TouchableOpacity
        activeOpacity={0.9}
        className="absolute bottom-6 right-6 flex-row items-center gap-2 rounded-full px-6 py-4"
        onPress={buyNowHandler.onOpen}
        style={{
          backgroundColor: theme.blue.DEFAULT,
          shadowColor: theme.blue.DEFAULT,
          shadowOpacity: 0.3,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 8 },
          elevation: 6,
        }}
      >
        <WalletIcon color={theme.white.DEFAULT} size={20} />
        <Text intent="md" style={{ color: '#fff' }} weight="semibold">
          Pay for {utility?.name}
        </Text>
      </TouchableOpacity>

      <ConfirmationModal
        buttonColor={theme.blue.DEFAULT}
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
        hideIcon
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
    </View>
  );
};

export default UtilityProfileScreen;
