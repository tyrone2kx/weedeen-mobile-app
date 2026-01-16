import Avatar from '@wd/components/Avatar/Avatar';
import AppBottomSheetModal from '@wd/components/BottomSheet/AppBottomSheetModal';
import Button from '@wd/components/Button/Button';
import DetailItem from '@wd/components/DetailItem/DetailItem';
import EmptyState from '@wd/components/EmptyState/EmptyState';
import Loader from '@wd/components/Loader/Loader';
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

const OrderModal = ({ onClose, orderId }: Props) => {
  const { order, isLoading } = useGetSingleOrder({ orderId });
  const invoice = order?.invoice;
  const delivery = invoice?.delivery;
  const rider = delivery?.rider;
  const items = order?.items || [];
  const totalAmount = items.reduce(
    (acc, item) => acc + item.unitPrice * item.quantity,
    0,
  );
  const resident = order?.user;

  return (
    <View>
      {isLoading ? (
        <Loader section />
      ) : invoice ? (
        <View className="flex flex-col gap-4">
          <View className="flex gap-4 flex-wrap mb-4">
            <DetailItem
              description={moment(invoice?.createdAt).format('Do MMM, YYYY')}
              title="Order Date"
            />
            <DetailItem description={invoice?.status || ''} title="Status" />
          </View>

          <View className="flex-row items-start gap-2 flex-wrap mb-4">
            <Avatar
              image={resident?.profilePic}
              name={`${resident?.firstName} ${resident?.lastName}`}
            />
            <DetailItem
              description=""
              title={`${resident?.firstName} ${resident?.lastName}`}
            />
          </View>

          {delivery && (
            <View className="flex flex-col gap-4 mb-4">
              <DetailItem
                description={delivery?.status || 'N/A'}
                title="Delivery Status"
              />
              <DetailItem
                description={
                  rider
                    ? `${rider?.firstName} ${rider?.lastName}`
                    : 'Awaiting Assignment'
                }
                title="Rider"
              />
            </View>
          )}

          <View>
            <TableGrid items={items} />
            <View className="mt-6 flex-row justify-end">
              <DetailItem
                description={formatNairaWithKobo(totalAmount)}
                title="Total Amount"
              />
            </View>
          </View>

          <View className="flex w-full justify-between">
            <Button label={'Close'} onPress={onClose} pale />
          </View>
        </View>
      ) : (
        <EmptyState
          description="The selected order does not exist."
          icon={<FileIcon color={'white'} size={20} />}
          title="Order not found"
        />
      )}
    </View>
  );
};

interface ItemProps {
  title: string;
  description: string;
}

interface TableGridProps {
  items: OrderItem[];
}

const TableGrid: React.FC<TableGridProps> = ({ items }) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      {/* Table Header */}
      <View style={styles.headerRow}>
        <View style={[styles.headerCell, styles.snCell]}>
          <Text style={styles.headerText}>SN</Text>
        </View>
        <View style={[styles.headerCell, styles.itemCell]}>
          <Text style={styles.headerText}>Item</Text>
        </View>
        <View style={[styles.headerCell, styles.qtyCell]}>
          <Text style={styles.headerText}>Qty</Text>
        </View>
        <View style={[styles.headerCell, styles.totalCell]}>
          <Text style={styles.headerText}>Total</Text>
        </View>
      </View>

      {/* Table Body */}
      <ScrollView>
        {items?.map((item, index) => (
          <View key={index} style={styles.dataRow}>
            <View style={[styles.dataCell, styles.snCell]}>
              <Text style={{ ...styles.dataText, ...styles.snText }}>
                #{index + 1}
              </Text>
            </View>
            <View style={[styles.dataCell, styles.itemCell]}>
              <Text style={styles.dataText}>{item?.product.name}</Text>
              <Text
                style={{
                  ...styles.dataText,
                  fontSize: 12,
                  color: theme.blue.DEFAULT,
                }}
              >
                {formatNaira(item?.unitPrice)}
              </Text>
            </View>
            <View style={[styles.dataCell, styles.qtyCell]}>
              <Text style={styles.dataText}>{item.quantity}</Text>
            </View>
            <View style={[styles.dataCell, styles.totalCell]}>
              <Text style={styles.dataText}>
                {formatNaira(item.unitPrice * item.quantity)}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const ViewOrderModal = (props: Props) => {
  const {
    bottomSheetRef,
    handlePresentBottomSheet,
    handleSheetChanges,
    handleCloseBottomSheet,
  } = useAppBottomSheetModal();

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
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#F7FAFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingVertical: 12,
  },
  dataRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingVertical: 12,
    minHeight: 44,
  },
  headerCell: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    borderRightWidth: 1,
    borderRightColor: '#E5E7EB',
  },
  dataCell: {
    justifyContent: 'center',
    paddingHorizontal: 8,
    borderRightWidth: 1,
    borderRightColor: '#E5E7EB',
  },
  headerText: {
    fontWeight: '600',
    fontSize: 14,
    color: '#000',
  },
  dataText: {
    fontSize: 14,
    color: '#6C6A6A',
  },
  snText: {
    fontWeight: '600',
  },
  // Column widths (similar to the original w-[50px] and flex distribution)
  snCell: {
    width: 60,
    flex: 0, // Fixed width
  },
  itemCell: {
    flex: 2,
  },
  unitPriceCell: {
    flex: 1.5,
  },
  qtyCell: {
    flex: 1,
  },
  totalCell: {
    flex: 1.5,
    borderRightWidth: 0, // Remove border for last cell
  },
});

export default ViewOrderModal;
