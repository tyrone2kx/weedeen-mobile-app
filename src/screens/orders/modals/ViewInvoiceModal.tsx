import { useMutation } from '@tanstack/react-query';
import { apiWrapper } from '@wd/api';
import AppBottomSheetModal from '@wd/components/BottomSheet/AppBottomSheetModal';
import Button from '@wd/components/Button/Button';
import EmptyState from '@wd/components/EmptyState/EmptyState';
import Loader from '@wd/components/Loader/Loader';
import usePaystack from '@wd/components/PaystackComponent/hooks/usePaystack';
import { PaystackModal } from '@wd/components/PaystackComponent/Paystack';
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

const InvoiceModal = ({ onClose, invoiceId, onPaySuccess }: Props) => {
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

  const {
    paystackHandle,
    setPaystackConfig,
    paystackModalProps,
    paystackConfig,
  } = usePaystack({
    amount: totalAmount,
    onSuccess: ref => verifyPayment(ref),
  });

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
        <View className="flex flex-col gap-4">
          <Text className="text-lg font-bold text-gray-800">
            Invoice #{invoice?.id}
          </Text>
          <View className="flex gap-4 flex-wrap mb-4">
            <Item
              description={moment(invoice?.createdAt).format('Do MMM, YYYY')}
              title="Order Date"
            />
            <Item description={invoice?.status || ''} title="Status" />
          </View>

          <View className="flex flex-col gap-4 mb-4">
            <Item
              description={delivery?.status || 'N/A'}
              title="Delivery Status"
            />
            <Item
              description={
                rider
                  ? `${rider?.firstName} ${rider?.lastName}`
                  : 'Awaiting Assignment'
              }
              title="Rider"
            />
          </View>

          <View>
            <TableGrid items={items} />
          </View>

          <View className="flex w-full justify-between">
            <Button label={'Close'} onPress={onClose} pale />

            <View className="flex gap-2">
              {/* <Button
              variant={'default'}
              disabled={isLoading}
              onPress={() => {
                if (invoice) onCancelInvoice?.(invoice);
              }}
            >
              Cancel Order
            </Button> */}

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
          icon={<FileIcon color={'white'} size={20} />}
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

interface ItemProps {
  title: string;
  description: string;
}

const Item = ({ title, description }: ItemProps) => {
  return (
    <View className="">
      <Text className="font-semibold capitalize text-xs text-gray-600">
        {title}
      </Text>
      <Text className="text-sm font-bold text-gray-700">{description}</Text>
    </View>
  );
};

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

export default ViewInvoiceModal;
