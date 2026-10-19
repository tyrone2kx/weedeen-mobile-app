import Avatar from '@wd/components/Avatar/Avatar';
import AppBottomSheetModal from '@wd/components/BottomSheet/AppBottomSheetModal';
import Button from '@wd/components/Button/Button';
import DetailItem from '@wd/components/DetailItem/DetailItem';
import EmptyState from '@wd/components/EmptyState/EmptyState';
import Loader from '@wd/components/Loader/Loader';
import Tag, { TagVariant } from '@wd/components/Tag/Tag';
import Text from '@wd/components/Text/Text';
import { Order, OrderItem } from '@wd/generated';
import useGetSingleOrder from '@wd/screens/orders/hooks/useGetSingleOrder';
import { formatNaira, formatNairaWithKobo } from '@wd/utils/helpers';
import useTheme from '@wd/utils/theme/useTheme';
import useAppBottomSheetModal from '@wd/utils/useAppBottomSheet/useBottomSheetModal';
import { FileIcon } from 'lucide-react-native';
import moment from 'moment';
import { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

interface Props {
  isOpen?: boolean;
  onClose: () => void;
  orderId?: number;
  onCancelOrder?: (order: Order) => void;
}

const statusVariant = (status?: string): TagVariant => {
  const s = (status || '').toLowerCase();
  if (s.includes('paid') || s.includes('complete') || s.includes('deliver')) return 'success';
  if (s.includes('pending') || s.includes('progress')) return 'info';
  if (s.includes('cancel') || s.includes('fail')) return 'danger';
  return 'neutral';
};

const OrderModal = ({ onClose, orderId }: Props) => {
  const { theme } = useTheme();
  const { order, isLoading } = useGetSingleOrder({ orderId });
  const invoice = order?.invoice;
  const delivery = invoice?.delivery;
  const rider = delivery?.rider;
  const items = order?.items || [];
  const totalAmount = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const resident = order?.user;

  return (
    <View>
      {isLoading ? (
        <Loader section />
      ) : invoice ? (
        <View className="gap-4">
          <View className="flex-row items-center gap-3">
            <Avatar
              image={resident?.profilePic}
              name={`${resident?.firstName} ${resident?.lastName}`}
              showName
              size={44}
            />
            <View style={{ flex: 1 }}>
              <Text intent="md" numberOfLines={1} weight="bold">
                {resident?.firstName} {resident?.lastName}
              </Text>
              <Text intent="xs" style={{ color: theme.gray[500] }}>
                {moment(invoice?.createdAt).format('Do MMM, YYYY')}
              </Text>
            </View>
            <Tag title={invoice?.status || ''} variant={statusVariant(invoice?.status)} />
          </View>

          {delivery ? (
            <View className="rounded-2xl px-4" style={{ borderWidth: 1, borderColor: theme.gray[200] }}>
              <DetailItem description={delivery?.status || 'N/A'} title="Delivery Status" />
              <DetailItem
                description={rider ? `${rider?.firstName} ${rider?.lastName}` : 'Awaiting Assignment'}
                last
                title="Rider"
              />
            </View>
          ) : null}

          <TableGrid items={items} />

          <View
            className="flex-row items-center justify-between rounded-2xl px-5 py-4"
            style={{ backgroundColor: theme.blue.DEFAULT }}
          >
            <Text intent="sm" style={{ color: 'rgba(255,255,255,0.85)' }} weight="semibold">
              TOTAL AMOUNT
            </Text>
            <Text intent="h3" style={{ color: '#fff' }} weight="extrabold">
              {formatNairaWithKobo(totalAmount)}
            </Text>
          </View>

          <Button label="Close" light onPress={onClose} />
        </View>
      ) : (
        <EmptyState
          description="The selected order does not exist."
          icon={<FileIcon size={28} />}
          title="Order not found"
        />
      )}
    </View>
  );
};

const TableGrid: React.FC<{ items: OrderItem[] }> = ({ items }) => {
  const { theme } = useTheme();
  if (!items?.length) return null;
  return (
    <View className="overflow-hidden rounded-2xl" style={{ borderWidth: 1, borderColor: theme.gray[200] }}>
      <View style={[styles.headerRow, { backgroundColor: theme.white[300], borderBottomColor: theme.gray[200] }]}>
        <View style={styles.snCell}><Text intent="xs" weight="semibold">SN</Text></View>
        <View style={styles.itemCell}><Text intent="xs" weight="semibold">Item</Text></View>
        <View style={styles.qtyCell}><Text intent="xs" weight="semibold">Qty</Text></View>
        <View style={styles.totalCell}><Text intent="xs" weight="semibold">Total</Text></View>
      </View>
      <ScrollView>
        {items.map((item, index) => (
          <View
            key={index}
            style={[styles.dataRow, { borderBottomColor: theme.gray[200], borderBottomWidth: index === items.length - 1 ? 0 : 1 }]}
          >
            <View style={styles.snCell}><Text intent="sm" style={{ color: theme.gray[500] }}>#{index + 1}</Text></View>
            <View style={styles.itemCell}>
              <Text intent="sm" numberOfLines={1}>{item?.product.name}</Text>
              <Text intent="xs" style={{ color: theme.blue.DEFAULT }} weight="semibold">{formatNaira(item?.unitPrice)}</Text>
            </View>
            <View style={styles.qtyCell}><Text intent="sm" style={{ color: theme.gray[500] }}>{item.quantity}</Text></View>
            <View style={styles.totalCell}><Text intent="sm" weight="semibold">{formatNaira(item.unitPrice * item.quantity)}</Text></View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const ViewOrderModal = (props: Props) => {
  const { bottomSheetRef, handlePresentBottomSheet, handleSheetChanges, handleCloseBottomSheet } =
    useAppBottomSheetModal();

  useEffect(() => {
    if (props.isOpen) {
      handlePresentBottomSheet();
    }
  }, [props.isOpen]);

  return (
    <AppBottomSheetModal
      bottomSheetRef={bottomSheetRef}
      breakpoints={['100%']}
      content={
        <OrderModal
          {...props}
          onClose={() => {
            handleCloseBottomSheet();
            props.onClose();
          }}
        />
      }
      headerTitle="View Order"
      onChange={handleSheetChanges}
      onDismiss={props.onClose}
    />
  );
};

const styles = StyleSheet.create({
  headerRow: { flexDirection: 'row', borderBottomWidth: 1, paddingVertical: 12, paddingHorizontal: 12 },
  dataRow: { flexDirection: 'row', paddingVertical: 12, paddingHorizontal: 12, minHeight: 44 },
  snCell: { width: 44 },
  itemCell: { flex: 2 },
  qtyCell: { flex: 1, alignItems: 'center' },
  totalCell: { flex: 1.5, alignItems: 'flex-end' },
});

export default ViewOrderModal;
