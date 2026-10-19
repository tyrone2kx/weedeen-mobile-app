import Header from '@wd/components/Header';
import SafeAreaComponent from '@wd/components/SafeAreaComponent/SafeAreaComponent';
import StatCard from '@wd/components/StatCard/StatCard';
import { RoutesEnum } from '@wd/navigation/enum';
import { FeesStackScreenProps } from '@wd/navigation/types';
import { useAppSelector } from '@wd/redux-store/hooks/useAppSelector';
import { globalStyles } from '@wd/utils/GlobalStyles';
import { formatNairaWithKobo } from '@wd/utils/helpers';
import useTheme from '@wd/utils/theme/useTheme';
import { ReceiptIcon } from 'lucide-react-native';
import React, { FC } from 'react';
import { View } from 'react-native';
import ResidentInvoicesComponent from './components/ResidentInvoicesComponent';
import useGetFeesStatistics from './hooks/useGetFeesStatistics';

const FeesScreen: FC<FeesStackScreenProps<RoutesEnum.FEES_SCREEN>> = ({
  navigation,
}) => {
  const { theme } = useTheme();
  const currentUser = useAppSelector(state => state.user?.currentUser);
  const { stats, isLoadingStats, refetchStats } = useGetFeesStatistics({
    userId: currentUser?.id,
  });

  return (
    <>
      <SafeAreaComponent
        statusBarProps={{
          backgroundColor: theme.white[400],
        }}
      />
      <Header headerTitle="My Fees" navigation={navigation} />
      <View className="p-4 relative" style={globalStyles.screen}>
        <StatCard
          filled
          icon={<ReceiptIcon color="#FFFFFF" size={22} />}
          isLoading={isLoadingStats}
          title="Outstanding Amount"
          value={formatNairaWithKobo(stats?.totalAmountUnpaid)}
        />

        <ResidentInvoicesComponent refetchStats={refetchStats} />
      </View>
    </>
  );
};

export default FeesScreen;
