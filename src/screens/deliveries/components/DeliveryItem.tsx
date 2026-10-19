import DetailItem from '@wd/components/DetailItem/DetailItem';
import MenuComponent from '@wd/components/MenuComponent/MenuComponent';
import Tag, { TagVariant } from '@wd/components/Tag/Tag';
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

const statusMap: Record<string, { title: string; variant: TagVariant }> = {
  completed: { title: 'Completed', variant: 'success' },
  delivered: { title: 'Completed', variant: 'success' },
  in_progress: { title: 'In Progress', variant: 'success' },
  ready_for_pickup: { title: 'In Progress', variant: 'success' },
  pending: { title: 'Pending', variant: 'info' },
  cancelled: { title: 'Canceled', variant: 'danger' },
  failed: { title: 'Canceled', variant: 'danger' },
};

const DeliveryItem = ({ delivery, onCancel, onView }: Props) => {
  const { theme } = useTheme();
  const s =
    statusMap[delivery.status] || { title: 'Unknown', variant: 'neutral' };

  return (
    <View
      className="mb-4 rounded-2xl bg-white p-4"
      style={{
        borderWidth: 1,
        borderColor: theme.gray[200],
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
            <BikeIcon color={theme.blue.DEFAULT} size={20} />
          </View>
          <View style={{ flex: 1 }}>
            <Text intent="md" weight="bold">
              Delivery
            </Text>
            <Text intent="xs" style={{ color: theme.gray[500] }}>
              {moment(delivery.createdAt).fromNow()}
            </Text>
          </View>
        </View>
        <View className="flex-row items-center gap-2">
          <Tag title={s.title} variant={s.variant} />
          <MenuComponent
            id={`delivery-item-${delivery.id}`}
            menuList={[
              { label: 'View', onPress: onView },
              { label: 'Cancel', onPress: onCancel },
            ]}
          />
        </View>
      </View>

      <View
        className="mt-3 rounded-xl px-3"
        style={{ backgroundColor: theme.white[300] }}
      >
        <DetailItem
          description={`${delivery.receiverName} · ${delivery?.deliveryPhoneNo}`}
          title="Receiver"
        />
        <DetailItem description={delivery.deliveryAddress} last title="Delivery Address" />
      </View>
    </View>
  );
};

export default DeliveryItem;
