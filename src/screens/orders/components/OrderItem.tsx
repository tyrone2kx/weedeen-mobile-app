import Circle from '@wd/components/Circle/Circle';
import MenuComponent from '@wd/components/MenuComponent/MenuComponent';
import Text from '@wd/components/Text/Text';
import { Invoice } from '@wd/generated';
import { formatNairaWithKobo } from '@wd/utils/helpers';
import useTheme from '@wd/utils/theme/useTheme';
import { HashIcon } from 'lucide-react-native';
import moment from 'moment';
import React from 'react';
import { View } from 'react-native';

interface Props {
  invoice: Invoice;
  onCancel?: () => void;
  onView?: () => void;
}

const OrderItem = ({ invoice, onCancel, onView }: Props) => {
  const { theme } = useTheme();
  const { color, title, textColor } = resolveStatus(invoice);
  const stores = invoice.orders.map(order => order.store?.name).join(', ');

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
              <Text>{invoice.id}</Text>
              <View className="flex-row gap-2 items-center">
                <Circle size={5} />
                <Text className="text-sm text-gray-400" weight="light">
                  {moment(invoice.createdAt).fromNow()}
                </Text>
              </View>
            </View>
            <Text className="text-sm" style={{ color: textColor }}>
              {title}
            </Text>
          </View>
        </View>

        <MenuComponent
          id={`order-item-${invoice.id}`}
          menuList={[
            { label: 'View', onPress: onView },
            { label: 'Cancel', onPress: onCancel },
          ]}
        />
      </View>
      <View
        className={`p-2 rounded-lg mb-4`}
        style={{ backgroundColor: '#f2f2f2' }}
      >
        <Text className="text-sm font-semibold">Stores</Text>
        <Text className="mt-2">{stores || 'Not Specified'}</Text>
      </View>

      <View className="flex-row justify-end">
        <Text className="font-bold">{formatNairaWithKobo(invoice.amount)}</Text>
      </View>
    </View>
  );
};

const resolveStatus = (order: Invoice) => {
  switch (order.status) {
    case 'completed':
      return {
        title: 'Completed',
        color: '#E8F5E9',
        textColor: '#388E3C',
      };
    case 'cancelled':
      return {
        title: 'Canceled',
        color: '#FFEBEE',
        textColor: '#D32F2F',
      };
    case 'pending':
      return {
        title: 'Pending',
        color: '#E3F2FD',
        textColor: '#1976D2',
      };
    case 'paid':
      return {
        title: 'Paid',
        color: '#E8F5E9',
        textColor: '#388E3C',
      };
    case 'failed':
      return {
        title: 'Canceled',
        color: '#FFEBEE',
        textColor: '#D32F2F',
      };
    default:
      return {
        title: 'Unknown',
        color: '#EEEEEE',
        textColor: '#888888',
      };
  }
};

export default OrderItem;
