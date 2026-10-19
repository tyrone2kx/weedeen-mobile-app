import MenuComponent from '@wd/components/MenuComponent/MenuComponent';
import Text from '@wd/components/Text/Text';
import { BankAccount } from '@wd/generated';
import useTheme from '@wd/utils/theme/useTheme';
import { LandmarkIcon } from 'lucide-react-native';
import moment from 'moment';
import React from 'react';
import { View } from 'react-native';

interface Props {
  bankAccount: BankAccount;
  onDelete?: () => void;
}

const BankAccountItem = ({ bankAccount, onDelete }: Props) => {
  const { theme } = useTheme();
  const stores = bankAccount.storeBankAccounts
    ?.map(store => store.store?.name)
    .join(', ');

  return (
    <View
      className="mb-4 rounded-2xl bg-white p-4"
      style={{
        borderWidth: 1,
        backgroundColor: theme.white.DEFAULT, borderColor: theme.gray[200],
        shadowColor: '#101828',
        shadowOpacity: 0.05,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },
        elevation: 2,
      }}
    >
      <View className="flex-row items-start justify-between">
        <View className="flex-1 flex-row items-center gap-3">
          <View
            className="items-center justify-center rounded-xl"
            style={{ width: 44, height: 44, backgroundColor: theme.blue[300] }}
          >
            <LandmarkIcon color={theme.blue.DEFAULT} size={20} />
          </View>
          <View style={{ flex: 1 }}>
            <Text intent="md" numberOfLines={1} weight="bold">
              {bankAccount.bankName}
            </Text>
            <Text intent="xs" style={{ color: theme.gray[500] }}>
              {moment(bankAccount.createdAt).fromNow()}
            </Text>
          </View>
        </View>
        <MenuComponent
          id={`bank-account-item-${bankAccount.id}`}
          menuList={[{ label: 'Delete', onPress: onDelete }]}
        />
      </View>

      <View
        className="mt-4 rounded-xl p-3"
        style={{ backgroundColor: theme.white[300] }}
      >
        <Text intent="sm" weight="semibold">
          {bankAccount.accountName}
        </Text>
        <Text
          intent="md"
          style={{ color: theme.blue.DEFAULT, letterSpacing: 1, marginTop: 2 }}
          weight="bold"
        >
          {bankAccount.accountNumber}
        </Text>
        {stores ? (
          <Text intent="xs" style={{ color: theme.gray[500], marginTop: 6 }}>
            Stores: {stores}
          </Text>
        ) : null}
      </View>
    </View>
  );
};

export default BankAccountItem;
