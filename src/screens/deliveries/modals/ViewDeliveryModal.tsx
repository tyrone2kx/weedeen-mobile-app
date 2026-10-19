import Avatar from '@wd/components/Avatar/Avatar';
import AppBottomSheetModal from '@wd/components/BottomSheet/AppBottomSheetModal';
import Button from '@wd/components/Button/Button';
import DetailItem from '@wd/components/DetailItem/DetailItem';
import Tag, { TagVariant } from '@wd/components/Tag/Tag';
import Text from '@wd/components/Text/Text';
import { Delivery } from '@wd/generated';
import ViewInvoiceModal from '@wd/screens/orders/modals/ViewInvoiceModal';
import { formatNaira } from '@wd/utils/helpers';
import useTheme from '@wd/utils/theme/useTheme';
import { InvoiceTypeEnum } from '@wd/utils/types';
import useAppBottomSheetModal from '@wd/utils/useAppBottomSheet/useBottomSheetModal';
import useDisclosure from '@wd/utils/useDisclosure/useDisclosure';
import { ArrowDownIcon } from 'lucide-react-native';
import moment from 'moment';
import { useEffect } from 'react';
import { View } from 'react-native';

interface Props {
  isOpen?: boolean;
  isLoading?: boolean;
  onClose: () => void;
  onCancelDelivery?: () => void;
  delivery?: Delivery;
  onPaySuccess?: () => void;
}

const statusVariant = (status?: string): TagVariant => {
  const s = (status || '').toLowerCase();
  if (s.includes('paid') || s.includes('complete') || s.includes('deliver') || s.includes('progress')) return 'success';
  if (s.includes('pending')) return 'info';
  if (s.includes('cancel') || s.includes('fail')) return 'danger';
  return 'neutral';
};

const LocationCard = ({
  heading,
  name,
  phone,
  address,
}: {
  heading: string;
  name?: string;
  phone?: string;
  address?: string;
}) => {
  const { theme } = useTheme();
  return (
    <View className="rounded-2xl px-4" style={{ borderWidth: 1, borderColor: theme.gray[200] }}>
      <View style={{ paddingTop: 14 }}>
        <Text intent="sm" weight="bold">
          {heading}
        </Text>
      </View>
      <DetailItem description={name || 'N/A'} title="Contact Person" />
      <DetailItem description={phone || 'N/A'} title="Phone" />
      <DetailItem description={address || 'N/A'} last title="Location" />
    </View>
  );
};

const ViewDeliveryComponent = ({
  onClose,
  isLoading,
  onCancelDelivery,
  delivery,
  onPaySuccess,
}: Props) => {
  const { theme } = useTheme();
  const invoice = delivery?.invoice;
  const rider = delivery?.rider;
  const isProductPurchase = invoice?.invoiceType === InvoiceTypeEnum.PRODUCT_PURCHASE;
  const invoiceHandler = useDisclosure();

  return (
    <View>
      <View className="gap-4">
        {/* Summary */}
        <View className="rounded-2xl px-4" style={{ borderWidth: 1, borderColor: theme.gray[200] }}>
          <DetailItem
            description={moment(invoice?.createdAt).format('Do MMM, YYYY')}
            title="Delivery Date"
          />
          <DetailItem
            description={isProductPurchase ? 'Product Purchase' : 'Rider Request'}
            title="Delivery Type"
          />
          <View className="flex-row items-center justify-between py-3.5" style={{ borderTopWidth: 1, borderTopColor: theme.gray[200] }}>
            <View>
              <Text intent="xs" style={{ color: theme.gray[500] }} weight="medium">Delivery Status</Text>
              <View className="mt-1 flex-row">
                <Tag title={delivery?.status || 'N/A'} variant={statusVariant(delivery?.status)} />
              </View>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text intent="xs" style={{ color: theme.gray[500] }} weight="medium">Delivery Fee</Text>
              <Text intent="sm" style={{ marginTop: 4 }} weight="bold">
                {delivery?.deliveryFee ? formatNaira(delivery?.invoice?.amount) : 'N/A'}
              </Text>
            </View>
          </View>
        </View>

        {/* Rider */}
        <View className="flex-row items-center gap-3 rounded-2xl p-4" style={{ borderWidth: 1, borderColor: theme.gray[200] }}>
          <Avatar name={rider ? `${rider.firstName} ${rider?.lastName}` : 'NA'} showName size={44} />
          <View style={{ flex: 1 }}>
            <Text intent="xs" style={{ color: theme.gray[500] }} weight="medium">Rider</Text>
            <Text intent="md" weight="bold">
              {rider ? `${rider.firstName} ${rider?.lastName}` : 'Awaiting Assignment'}
            </Text>
          </View>
        </View>

        <LocationCard
          address={delivery?.pickUpAddress}
          heading="Pick Up Details"
          name={delivery?.pickUpName}
          phone={delivery?.pickUpPhoneNo}
        />

        <View className="items-center">
          <ArrowDownIcon color={theme.gray[400]} size={20} />
        </View>

        <LocationCard
          address={delivery?.deliveryAddress}
          heading="Drop Off Details"
          name={delivery?.receiverName}
          phone={delivery?.deliveryPhoneNo}
        />

        <View className="mt-2 gap-3">
          {invoice && invoice.status === 'pending' ? (
            <Button label="Pay Now" onPress={invoiceHandler.onOpen} />
          ) : null}
          <Button
            backgroundColor={theme.red.DEFAULT}
            disabled={isLoading}
            label="Cancel Delivery"
            onPress={() => {
              if (delivery) onCancelDelivery?.();
            }}
          />
          <Button label="Close" light onPress={onClose} />
        </View>
      </View>

      <ViewInvoiceModal
        invoiceId={invoice?.id || 0}
        isOpen={invoiceHandler.isOpen}
        onClose={() => {
          invoiceHandler.onClose();
        }}
        onPaySuccess={onPaySuccess}
      />
    </View>
  );
};

const ViewDeliveryModal = (props: Props) => {
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
        <ViewDeliveryComponent
          {...props}
          onClose={() => {
            handleCloseBottomSheet();
            props.onClose();
          }}
        />
      }
      headerTitle="View Delivery"
      onChange={handleSheetChanges}
      onDismiss={props.onClose}
    />
  );
};

export default ViewDeliveryModal;
