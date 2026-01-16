import Circle from '@wd/components/Circle/Circle';
import MenuComponent from '@wd/components/MenuComponent/MenuComponent';
import Text from '@wd/components/Text/Text';
import { Order } from '@wd/generated';
import { formatNairaWithKobo } from '@wd/utils/helpers';
import useTheme from '@wd/utils/theme/useTheme';
import { HashIcon } from 'lucide-react-native';
import moment from 'moment';
import React from 'react';
import { View } from 'react-native';

interface Props {
  order: Order;
  onCancel?: () => void;
  onView?: () => void;
}

const OrderItem = ({ order, onCancel, onView }: Props) => {
  const { theme } = useTheme();
  const { color, title, textColor } = resolveStatus(order);
  const items = order.items || [];
  const totalAmount = Number(
    items
      .reduce((acc, item) => acc + item.unitPrice * item.quantity, 0)
      .toFixed(2),
  );

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
              <Text>{order.invoice?.id}</Text>
              <View className="flex-row gap-2 items-center">
                <Circle size={5} />
                <Text className="text-sm text-gray-400" weight="light">
                  {moment(order.createdAt).fromNow()}
                </Text>
              </View>
            </View>
            <Text className="text-sm" style={{ color: textColor }}>
              {title}
            </Text>
          </View>
        </View>

        <MenuComponent
          id={`order-item-${order.id}`}
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
        <Text className="text-sm font-semibold">Items</Text>

        <View className="mt-2">
          {items.slice(0, 2).map((item, index) => (
            <View className="flex-row justify-between mb-2" key={index}>
              <Text>
                {item.product?.name} x{item.quantity}
              </Text>
              <Text className="text-blue-600 text-sm">
                {formatNairaWithKobo(item.unitPrice * item.quantity)}
              </Text>
            </View>
          ))}
        </View>
        {items.length > 2 && (
          <Text className="text-xs text-gray-500">
            and {items.length - 2} more items...
          </Text>
        )}
      </View>

      <View className="flex-row justify-end">
        <Text className="font-bold">{formatNairaWithKobo(totalAmount)}</Text>
      </View>
    </View>
  );
};

const resolveStatus = (order: Order) => {
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
