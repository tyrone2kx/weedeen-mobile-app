import { useMutation } from '@tanstack/react-query';
import { apiWrapper } from '@wd/api';
import AppBottomSheetModal from '@wd/components/BottomSheet/AppBottomSheetModal';
import Button from '@wd/components/Button/Button';
import DetailItem from '@wd/components/DetailItem/DetailItem';
import EmptyState from '@wd/components/EmptyState/EmptyState';
import Loader from '@wd/components/Loader/Loader';
import usePaystack from '@wd/components/PaystackComponent/hooks/usePaystack';
import { PaystackModal } from '@wd/components/PaystackComponent/Paystack';
import Tag, { TagVariant } from '@wd/components/Tag/Tag';
import Text from '@wd/components/Text/Text';
import { BillingService, Invoice, OrderItem } from '@wd/generated';
import useVerifyPayment from '@wd/screens/fees/hooks/useVerifyPayment';
import { formatNaira, handleError, Notify } from '@wd/utils/helpers';
import useTheme from '@wd/utils/theme/useTheme';
import useAppBottomSheetModal from '@wd/utils/useAppBottomSheet/useBottomSheetModal';
import { FileIcon } from 'lucide-react-native';
import moment from 'moment';
import { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import useGetSingleInvoice from '../hooks/useGetSingleInvoice';

interface Props {
  isOpen?: boolean;
  onClose: () => void;
  invoiceId?: number;
  onCancelInvoice?: (invoice: Invoice) => void;
  onPaySuccess?: () => void;
}

const statusVariant = (status?: string): TagVariant => {
  const s = (status || '').toLowerCase();
  if (s.includes('paid') || s.includes('complete') || s.includes('deliver')) return 'success';
  if (s.includes('pending') || s.includes('progress')) return 'info';
  if (s.includes('cancel') || s.includes('fail')) return 'danger';
  return 'neutral';
};

const InvoiceModal = ({ onClose, invoiceId, onPaySuccess }: Props) => {
  const { theme } = useTheme();
  const { invoice, isLoading, refetch } = useGetSingleInvoice({ invoiceId });
  const delivery = invoice?.delivery;
  const rider = delivery?.rider;
  const orders = invoice?.orders || [];
  const items = orders.flatMap(order => order.items || []);
  const totalAmount = invoice?.amount || 0;

  const { mutate: verifyPayment } = useVerifyPayment({
    onSuccess: () => {
      Notify({
        type: 'success',
        message: 'Payment successful! Your order will be processed shortly.',
      });
      onPaySuccess?.();
      void refetch();
    },
  });

  const { paystackHandle, setPaystackConfig, paystackModalProps, paystackConfig } =
    usePaystack({ amount: totalAmount, onSuccess: ref => verifyPayment(ref) });

  const { mutate: initializeTransaction, isPending } = useMutation({
    mutationFn: (id: string) =>
      apiWrapper(() =>
        BillingService.billingControllerInitiatePayment({ invoiceId: id }),
      ),
    onError: error => {
      void handleError(error);
    },
  });

  return (
    <View>
      {isLoading ? (
        <Loader section />
      ) : invoice ? (
        <View className="gap-4">
          <View className="flex-row items-center justify-between">
            <Text intent="h3" weight="bold">
              Invoice #{invoice?.id}
            </Text>
            <Tag title={invoice?.status || ''} variant={statusVariant(invoice?.status)} />
          </View>

          <View
            className="rounded-2xl px-4"
            style={{ borderWidth: 1, borderColor: theme.gray[200] }}
          >
            <DetailItem
              description={moment(invoice?.createdAt).format('Do MMM, YYYY')}
              title="Order Date"
            />
            <DetailItem
              description={delivery?.status || 'N/A'}
              title="Delivery Status"
            />
            <DetailItem
              description={
                rider ? `${rider?.firstName} ${rider?.lastName}` : 'Awaiting Assignment'
              }
              last
              title="Rider"
            />
          </View>

          <TableGrid items={items} />

          <View
            className="flex-row items-center justify-between rounded-2xl px-5 py-4"
            style={{ backgroundColor: theme.blue.DEFAULT }}
          >
            <Text intent="sm" style={{ color: 'rgba(255,255,255,0.85)' }} weight="semibold">
              AMOUNT DUE
            </Text>
            <Text intent="h3" style={{ color: '#fff' }} weight="extrabold">
              {formatNaira(totalAmount)}
            </Text>
          </View>

          <View className="mt-2 flex-row gap-3">
            <View style={{ flex: 1 }}>
              <Button label="Close" light onPress={onClose} />
            </View>
            <View style={{ flex: 1 }}>
              <Button
                disabled={isLoading || invoice?.status !== 'pending'}
                isLoading={isPending}
                label={invoice?.status === 'pending' ? 'Pay Now' : 'Paid'}
                onPress={() => {
                  if (invoice?.id)
                    initializeTransaction(invoice.id?.toString(), {
                      onSuccess: data => {
                        setPaystackConfig(prev => ({
                          ...(prev || {}),
                          reference: data.transactionRef,
                        }));
                        paystackHandle.onOpen();
                      },
                    });
                }}
              />
            </View>
          </View>
        </View>
      ) : (
        <EmptyState
          description="The selected order does not exist."
          icon={<FileIcon size={28} />}
          title="Order not found"
        />
      )}
      <PaystackModal
        isOpen={paystackHandle.isOpen && !!paystackConfig?.reference}
        {...paystackModalProps}
      />
    </View>
  );
};

interface TableGridProps {
  items: OrderItem[];
}

const TableGrid: React.FC<TableGridProps> = ({ items }) => {
  const { theme } = useTheme();
  if (!items?.length) return null;

  return (
    <View
      className="overflow-hidden rounded-2xl"
      style={{ borderWidth: 1, borderColor: theme.gray[200] }}
    >
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
            style={[
              styles.dataRow,
              { borderBottomColor: theme.gray[200], borderBottomWidth: index === items.length - 1 ? 0 : 1 },
            ]}
          >
            <View style={styles.snCell}>
              <Text intent="sm" style={{ color: theme.gray[500] }}>#{index + 1}</Text>
            </View>
            <View style={styles.itemCell}>
              <Text intent="sm" numberOfLines={1}>{item?.product.name}</Text>
              <Text intent="xs" style={{ color: theme.blue.DEFAULT }} weight="semibold">
                {formatNaira(item?.unitPrice)}
              </Text>
            </View>
            <View style={styles.qtyCell}>
              <Text intent="sm" style={{ color: theme.gray[500] }}>{item.quantity}</Text>
            </View>
            <View style={styles.totalCell}>
              <Text intent="sm" weight="semibold">{formatNaira(item.unitPrice * item.quantity)}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const ViewInvoiceModal = (props: Props) => {
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
        <InvoiceModal
          {...props}
          onClose={() => {
            handleCloseBottomSheet();
            props.onClose();
          }}
        />
      }
      headerTitle="View Invoice"
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

export default ViewInvoiceModal;
