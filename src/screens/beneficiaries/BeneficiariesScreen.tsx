import Button from '@wd/components/Button/Button';
import ConfirmationModal from '@wd/components/ConfirmationModal/ConfirmationModal';
import EmptyState from '@wd/components/EmptyState/EmptyState';
import Header from '@wd/components/Header';
import Loader from '@wd/components/Loader/Loader';
import SafeAreaComponent from '@wd/components/SafeAreaComponent/SafeAreaComponent';
import StatCard from '@wd/components/StatCard/StatCard';
import Text from '@wd/components/Text/Text';
import { UserUnit } from '@wd/generated';
import { RoutesEnum } from '@wd/navigation/enum';
import { MenuStackScreenProps } from '@wd/navigation/types';
import { globalStyles } from '@wd/utils/GlobalStyles';
import { Theme } from '@wd/utils/Theme';
import useTheme from '@wd/utils/theme/useTheme';
import useDisclosure from '@wd/utils/useDisclosure/useDisclosure';
import { UsersIcon } from 'lucide-react-native';
import React, { FC, useState } from 'react';
import { RefreshControl, ScrollView, TouchableOpacity, View } from 'react-native';
import useBeneficiaries from './hooks/useBeneficiaries';
import AddBeneficiaryModal from './modals/AddBeneficiaryModal';

const BeneficiariesScreen: FC<
  MenuStackScreenProps<RoutesEnum.BENEFICIARIES_SCREEN>
> = ({ navigation }) => {
  const {
    beneficiaries,
    isLoading,
    isRefetching,
    refetch,
    removeBeneficiary,
  } = useBeneficiaries();
  const addHandler = useDisclosure();
  const deleteHandler = useDisclosure();
  const [active, setActive] = useState<UserUnit | null>(null);
  const { theme } = useTheme();

  const onRemove = (item: UserUnit) => {
    setActive(item);
    deleteHandler.onOpen();
  };
  const onClose = () => {
    setActive(null);
    addHandler.onClose();
    deleteHandler.onClose();
  };

  return (
    <>
      <SafeAreaComponent statusBarProps={{ backgroundColor: theme.white[400] }} />
      <Header headerTitle="Beneficiaries" navigation={navigation} />
      <View className="p-4 relative" style={globalStyles.screen}>
        <View className="flex-row gap-2 justify-between">
          <StatCard
            className="flex-1"
            icon={<UsersIcon color={theme.blue.DEFAULT} size={40} />}
            isLoading={isLoading}
            title="Total Beneficiaries"
            value={beneficiaries.length}
          />
        </View>

        <ScrollView
          refreshControl={
            <RefreshControl
              colors={[theme.blue.DEFAULT]}
              onRefresh={refetch}
              progressBackgroundColor={theme.gray[150]}
              refreshing={isRefetching}
            />
          }
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
        >
          {isLoading ? (
            <Loader style={{ marginVertical: '50%' }} />
          ) : !beneficiaries.length ? (
            <EmptyState
              Action={
                <Button label="Add Beneficiary" onPress={addHandler.onOpen} />
              }
              description="Add beneficiaries to your unit. They will receive an invite to join Weedeen."
              icon={<UsersIcon size={40} />}
              section
              title="No beneficiaries yet."
            />
          ) : (
            <View style={{ flex: 1, marginTop: 20 }}>
              <View className="mb-4 items-end">
                <Button
                  label="Add Beneficiary"
                  onPress={addHandler.onOpen}
                  style={{ width: 'auto', paddingHorizontal: 16 }}
                />
              </View>
              {beneficiaries.map((item, index) => (
                <View
                  key={`${item.id || ''}${index}`}
                  className="mb-3 flex-row items-center justify-between rounded-lg border border-gray-200 p-4"
                >
                  <View>
                    <Text className="font-semibold">
                      {item.user?.firstName} {item.user?.lastName}
                    </Text>
                    <Text className="text-xs text-gray-500">
                      {item.user?.email}
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => onRemove(item)}>
                    <Text className="text-sm font-semibold text-red-500">
                      Remove
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </View>

      <AddBeneficiaryModal isOpen={addHandler.isOpen} onClose={onClose} />

      <ConfirmationModal
        buttonColor={Theme.red}
        description={`Are you sure you want to remove ${active?.user?.firstName} ${active?.user?.lastName} from your unit?`}
        isLoading={removeBeneficiary.isPending}
        isOpen={deleteHandler.isOpen}
        onClose={onClose}
        onConfirm={() =>
          removeBeneficiary.mutate(active?.id || '', { onSuccess: onClose })
        }
        title="Remove Beneficiary"
      />
    </>
  );
};

export default BeneficiariesScreen;
