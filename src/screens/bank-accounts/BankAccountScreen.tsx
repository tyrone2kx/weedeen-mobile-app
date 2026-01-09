import Button from '@wd/components/Button/Button';
import ConfirmationModal from '@wd/components/ConfirmationModal/ConfirmationModal';
import EmptyState from '@wd/components/EmptyState/EmptyState';
import Header from '@wd/components/Header';
import Loader from '@wd/components/Loader/Loader';
import SafeAreaComponent from '@wd/components/SafeAreaComponent/SafeAreaComponent';
import { BankAccount } from '@wd/generated';
import { RoutesEnum } from '@wd/navigation/enum';
import { MenuStackScreenProps } from '@wd/navigation/types';
import { useAppSelector } from '@wd/redux-store/hooks/useAppSelector';
import { globalStyles } from '@wd/utils/GlobalStyles';
import useTheme from '@wd/utils/theme/useTheme';
import useDisclosure from '@wd/utils/useDisclosure/useDisclosure';
import { BriefcaseIcon } from 'lucide-react-native';
import React, { FC, useState } from 'react';
import { ScrollView, View } from 'react-native';
import BankAccountItem from './components/BankAccountItem';
import useBankAccountsGet from './hooks/useBankAccountsGet';
import useDeleteBankAccount from './hooks/useDeleteBankAccount';
import AddBankAccountModal from './modals/AddBankAccountModal';

const BankAccountScreen: FC<
  MenuStackScreenProps<RoutesEnum.BANK_ACCOUNTS_SCREEN>
> = ({ navigation }) => {
  const { theme } = useTheme();
  const addAccountHandler = useDisclosure();
  const deleteHandler = useDisclosure();
  const [activeBankAccount, setActiveBankAccount] = useState<
    BankAccount | undefined
  >(undefined);
  const user = useAppSelector(state => state.user?.currentUser);
  const { bankAccounts, isLoading } = useBankAccountsGet({
    userId: user?.id,
  });
  const { deleteBankAccount, isDeleting } = useDeleteBankAccount();
  const onDelete = (bankAccount: BankAccount) => {
    setActiveBankAccount(bankAccount);
    deleteHandler.onOpen();
  };
  return (
    <>
      <SafeAreaComponent
        statusBarProps={{
          backgroundColor: theme.white[400],
        }}
      />
      <Header
        canGoBack
        headerTitle="Bank Accounts"
        navigation={navigation}
        transparent={false}
      />
      <View className="p-4 relative" style={globalStyles.screen}>
        <ScrollView contentContainerClassName="flex-1">
          {isLoading ? (
            <Loader section />
          ) : bankAccounts.length === 0 ? (
            <EmptyState
              Action={
                <Button
                  label="Add Bank Account"
                  onPress={addAccountHandler.onOpen}
                />
              }
              description="Click the button below to add a bank account and link to your stores."
              icon={<BriefcaseIcon className="text-white" size={40} />}
              title="You haven't added any bank account yet"
            />
          ) : (
            bankAccounts.map(account => (
              <BankAccountItem
                bankAccount={account}
                key={account.id}
                onDelete={() => onDelete(account)}
              />
            ))
          )}
        </ScrollView>
      </View>
      <AddBankAccountModal
        isOpen={addAccountHandler.isOpen}
        onClose={addAccountHandler.onClose}
      />
      <ConfirmationModal
        description={`Are you sure you want to delete the bank account ${activeBankAccount?.bankName}? This action cannot be undone.`}
        enforceMinHeight={false}
        isLoading={isDeleting}
        isOpen={deleteHandler.isOpen}
        onClose={() => {
          deleteHandler.onClose();
          setActiveBankAccount(undefined);
        }}
        onConfirm={() => {
          deleteBankAccount(activeBankAccount?.id || '', {
            onSuccess: deleteHandler.onClose,
          });
        }}
        title="Delete Bank Account"
      />
    </>
  );
};

export default BankAccountScreen;
