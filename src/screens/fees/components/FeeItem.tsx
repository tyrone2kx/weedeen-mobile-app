import Circle from '@wd/components/Circle/Circle';
import MenuComponent from '@wd/components/MenuComponent/MenuComponent';
import Text from '@wd/components/Text/Text';
import { UserFee } from '@wd/generated';
import { formatNairaWithKobo } from '@wd/utils/helpers';
import useTheme from '@wd/utils/theme/useTheme';
import { HashIcon } from 'lucide-react-native';
import moment from 'moment';
import React from 'react';
import { View } from 'react-native';

interface Props {
  userFee: UserFee;
  onPayNow?: () => void;
  onView?: () => void;
}

const FeeItem = ({ userFee, onPayNow, onView }: Props) => {
  const { theme } = useTheme();
  const { color, title, textColor } = resolveStatus(userFee);

  return (
    <View
      className="rounded-xl bg-white border p-4 mb-4"
      style={{
        borderColor: theme.gray[300],
        borderLeftWidth: 3,
        borderLeftColor: color,
      }}
    >
      <View className="flex-row justify-between">
        <View className="items-start gap-2 flex-row mb-4">
          <HashIcon color={theme.blue.DEFAULT} size={30} />
          <View>
            <View className="flex-row gap-2">
              <Text>{userFee?.fee?.title}</Text>
              <View className="flex-row gap-2 items-center">
                <Circle size={5} />
                <Text className="text-sm text-gray-400" weight="light">
                  {moment(userFee.createdAt).fromNow()}
                </Text>
              </View>
            </View>
            <Text className="text-sm" style={{ color: textColor }}>
              {title}
            </Text>
          </View>
        </View>

        <MenuComponent
          id={`inv-item-${userFee.id}`}
          menuList={[
            { label: 'View', onPress: onView },
            { label: 'Pay Now', onPress: onPayNow, disabled: userFee.isPaid },
          ]}
        />
      </View>

      <View className="flex-row justify-end">
        <Text className="font-bold">
          {formatNairaWithKobo(userFee.fee.amount)}
        </Text>
      </View>
    </View>
  );
};

const resolveStatus = (userFee: UserFee) => {
  if (userFee.isPaid) {
    return {
      title: 'Paid',
      color: '#E8F5E9',
      textColor: '#388E3C',
    };
  } else {
    return {
      title: 'Unpaid',
      color: '#FFEBEE',
      textColor: '#D32F2F',
    };
  }
};

export default FeeItem;
