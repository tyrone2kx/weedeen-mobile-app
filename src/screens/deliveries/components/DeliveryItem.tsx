import Circle from '@wd/components/Circle/Circle';
import MenuComponent from '@wd/components/MenuComponent/MenuComponent';
import Text from '@wd/components/Text/Text';
import { Delivery } from '@wd/generated';
import useTheme from '@wd/utils/theme/useTheme';
import { BikeIcon } from 'lucide-react-native';
import moment from 'moment';
import React from 'react';
import { View } from 'react-native';

interface Props {
  delivery: Delivery;
  onCancel?: () => void;
  onView?: () => void;
}

const DeliveryItem = ({ delivery, onCancel, onView }: Props) => {
  const { theme } = useTheme();
  const { color, title, textColor } = resolveStatus(delivery);

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
          <BikeIcon color={theme.blue.DEFAULT} size={30} />
          <View>
            <View className="flex-row gap-2">
              <View className="flex-row gap-2 items-center">
                <Circle size={5} />
                <Text className="text-sm text-gray-400" weight="light">
                  {moment(delivery.createdAt).fromNow()}
                </Text>
              </View>
            </View>
            <Text className="text-sm" style={{ color: textColor }}>
              {title}
            </Text>
          </View>
        </View>

        <MenuComponent
          id={`delivery-item-${delivery.id}`}
          menuList={[
            { label: 'View', onPress: onView },
            { label: 'Cancel', onPress: onCancel },
          ]}
        />
      </View>
      <View>
        <Text>Receiver Details</Text>
        <View
          className={`p-2 rounded-lg mb-4`}
          style={{ backgroundColor: '#f2f2f2' }}
        >
          <View className="mb-4">
            <Text className="text-xs font-semibold">Receiver</Text>
            <Text className="mt-1">
              {delivery.receiverName} - {delivery?.deliveryPhoneNo}
            </Text>
          </View>
          <View className="mb-4">
            <Text className="text-xs font-semibold">Delivery Address</Text>
            <Text className="mt-1">{delivery.deliveryAddress}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const resolveStatus = (delivery: Delivery) => {
  switch (delivery.status) {
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
    case 'in_progress':
      return {
        title: 'In Progress',
        color: '#E8F5E9',
        textColor: '#388E3C',
      };
    case 'ready_for_pickup':
      return {
        title: 'In Progress',
        color: '#E8F5E9',
        textColor: '#388E3C',
      };
    case 'delivered':
      return {
        title: 'Completed',
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

export default DeliveryItem;
