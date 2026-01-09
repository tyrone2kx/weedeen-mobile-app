import Circle from '@wd/components/Circle/Circle';
import MenuComponent from '@wd/components/MenuComponent/MenuComponent';
import Text from '@wd/components/Text/Text';
import { BankAccount } from '@wd/generated';
import useTheme from '@wd/utils/theme/useTheme';
import { BriefcaseIcon } from 'lucide-react-native';
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
      className="rounded-xl bg-white border p-4 mb-4"
      style={{
        borderColor: theme.gray[300],
      }}
    >
      <View className="flex-row justify-between">
        <View className="items-start gap-2 flex-row mb-4">
          <BriefcaseIcon color={theme.blue.DEFAULT} size={30} />
          <View>
            <View className="flex-row gap-2">
              <Text>{bankAccount.bankName}</Text>
              <View className="flex-row gap-2 items-center">
                <Circle size={5} />
                <Text className="text-sm text-gray-400" weight="light">
                  {moment(bankAccount.createdAt).fromNow()}
                </Text>
              </View>
            </View>
            <Text className="text-sm">{bankAccount.accountName}</Text>
            <Text className="text-sm">{bankAccount.accountNumber}</Text>
          </View>
        </View>

        <MenuComponent
          id={`bank-account-item-${bankAccount.id}`}
          menuList={[{ label: 'Delete', onPress: onDelete }]}
        />
      </View>
      <View
        className={`p-2 rounded-lg mb-4`}
        style={{ backgroundColor: '#f2f2f2' }}
      >
        <Text className="text-sm font-semibold">Stores</Text>
        <Text className="mt-2">{stores || 'Not Specified'}</Text>
      </View>
    </View>
  );
};

export default BankAccountItem;
