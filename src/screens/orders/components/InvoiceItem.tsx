import MenuComponent from '@wd/components/MenuComponent/MenuComponent';
import Tag, { TagVariant } from '@wd/components/Tag/Tag';
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

const statusMap: Record<string, { title: string; variant: TagVariant }> = {
  completed: { title: 'Completed', variant: 'success' },
  paid: { title: 'Paid', variant: 'success' },
  pending: { title: 'Pending', variant: 'info' },
  cancelled: { title: 'Canceled', variant: 'danger' },
  failed: { title: 'Canceled', variant: 'danger' },
};

const InvoiceItem = ({ invoice, onCancel, onView }: Props) => {
  const { theme } = useTheme();
  const s = statusMap[invoice.status] || { title: 'Unknown', variant: 'neutral' };
  const stores = invoice.orders.map(order => order.store?.name).join(', ');

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
            <HashIcon color={theme.blue.DEFAULT} size={20} />
          </View>
          <View style={{ flex: 1 }}>
            <Text intent="md" numberOfLines={1} weight="bold">
              {invoice.id}
            </Text>
            <Text intent="xs" style={{ color: theme.gray[500] }}>
              {moment(invoice.createdAt).fromNow()}
            </Text>
          </View>
        </View>
        <View className="flex-row items-center gap-2">
          <Tag title={s.title} variant={s.variant} />
          <MenuComponent
            id={`inv-item-${invoice.id}`}
            menuList={[
              { label: 'View', onPress: onView },
              { label: 'Cancel', onPress: onCancel },
            ]}
          />
        </View>
      </View>

      <View
        className="mt-3 rounded-xl p-3"
        style={{ backgroundColor: theme.white[300] }}
      >
        <Text intent="xs" style={{ color: theme.gray[500] }} weight="semibold">
          Stores
        </Text>
        <Text intent="sm" style={{ marginTop: 2 }}>
          {stores || 'Not Specified'}
        </Text>
      </View>

      <View className="mt-3 flex-row justify-end">
        <Text intent="md" weight="bold">
          {formatNairaWithKobo(invoice.amount)}
        </Text>
      </View>
    </View>
  );
};

export default InvoiceItem;
