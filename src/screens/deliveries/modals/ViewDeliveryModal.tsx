import Avatar from '@wd/components/Avatar/Avatar';
import AppBottomSheetModal from '@wd/components/BottomSheet/AppBottomSheetModal';
import Button from '@wd/components/Button/Button';
import Text from '@wd/components/Text/Text';
import { Delivery } from '@wd/generated';
import ViewInvoiceModal from '@wd/screens/orders/modals/ViewInvoiceModal';
import { formatNaira } from '@wd/utils/helpers';
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

const ViewDeliveryComponent = ({
  onClose,
  isLoading,
  onCancelDelivery,
  delivery,
  onPaySuccess,
}: Props) => {
  const invoice = delivery?.invoice;
  const rider = delivery?.rider;
  const isProductPurchase =
    invoice?.invoiceType === InvoiceTypeEnum.PRODUCT_PURCHASE;

  const invoiceHandler = useDisclosure();

  return (
    <View>
      <View className="flex flex-col gap-4">
        <View className="flex gap-4 flex-wrap mb-4">
          <Item
            description={moment(invoice?.createdAt).format('Do MMM, YYYY')}
            title="Delivery Date"
          />
          <Item
            description={
              isProductPurchase ? 'Product Purchase' : 'Rider Request'
            }
            title="Delivery Type"
          />
        </View>

        <View className="flex flex-col gap-4 mb-4">
          <View className="flex flex-wrap gap-4">
            <Item
              description={delivery?.status || 'N/A'}
              title="Delivery Status"
            />
            <Item
              description={
                delivery?.deliveryFee
                  ? formatNaira(delivery?.invoice?.amount)
                  : 'N/A'
              }
              title="Delivery Fee"
            />
            <Item
              description={invoice?.status || 'N/A'}
              title="Payment Status"
            />
          </View>
          <Item
            description={
              rider
                ? `${rider?.firstName} ${rider?.lastName}`
                : 'Awaiting Assignment'
            }
            descriptionComponent={
              rider ? (
                <ProfileCard
                  name={
                    rider ? `${rider.firstName} ${rider?.lastName}` : undefined
                  }
                  size={50}
                />
              ) : undefined
            }
            title="Rider"
          />
        </View>

        <View className="border p-2 bg-gray-50">
          <Text className="text-sm font-semibold mb-4">Pick Up Details</Text>
          <View className="flex gap-4 flex-wrap">
            <Item
              description={delivery?.pickUpName || 'N/A'}
              title="Contact Person"
            />
            <Item
              description={delivery?.pickUpPhoneNo || 'N/A'}
              descriptionComponent={
                delivery?.pickUpPhoneNo ? (
                  <a
                    className="text-blue-500 hover:underline"
                    href={`tel:${delivery?.pickUpPhoneNo}`}
                  >
                    {delivery?.pickUpPhoneNo}
                  </a>
                ) : undefined
              }
              title="Pick Up Phone"
            />
            <View className="w-full">
              <Item
                description={delivery?.pickUpAddress || 'N/A'}
                title="Pick Up Location"
              />
            </View>
          </View>
        </View>

        <View className="flex justify-center my-4">
          <ArrowDownIcon className="text-gray-400" />
        </View>
        <View className="border p-2 bg-gray-50">
          <Text className="text-sm font-semibold mb-4">Drop Off Details</Text>
          <View className="flex gap-4 flex-wrap">
            <Item
              description={delivery?.receiverName || 'N/A'}
              title="Contact Person"
            />
            <Item
              description={delivery?.deliveryPhoneNo || 'N/A'}
              descriptionComponent={
                delivery?.deliveryPhoneNo ? (
                  <Text className="text-blue-500 hover:underline">
                    {delivery?.deliveryPhoneNo}
                  </Text>
                ) : null
              }
              title="Phone No"
            />
            <View className="w-full">
              <Item
                description={delivery?.deliveryAddress || 'N/A'}
                title="Pick Up Location"
              />
            </View>
          </View>
        </View>

        <View className="flex w-full justify-between">
          <Button label="Close" onPress={onClose} pale />

          <View className="flex gap-2">
            {invoice && invoice.status === 'pending' && (
              <Button
                className="bg-green-500"
                label={'Pay Now'}
                onPress={invoiceHandler.onOpen}
              />
            )}
            <Button
              className="bg-red-500"
              disabled={isLoading}
              label={'Cancel Delivery'}
              onPress={() => {
                if (delivery) onCancelDelivery?.();
              }}
              pale
            />
          </View>
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
interface ItemProps {
  title: string;
  description?: string;
  descriptionComponent?: React.ReactNode;
}

const Item = ({ title, description, descriptionComponent }: ItemProps) => {
  return (
    <View className="">
      <Text className="font-semibold capitalize text-xs text-gray-600">
        {title}
      </Text>
      {descriptionComponent || (
        <Text className="text-sm font-bold text-gray-700">{description}</Text>
      )}
    </View>
  );
};
interface ProfileCardProps {
  size?: number;
  name?: string;
  role?: string;
}

const ProfileCard = ({ size, name, role }: ProfileCardProps) => {
  return (
    <View className="bg-white border p-2 rounded-lg flex items-center gap-2">
      <Avatar size={size || 80} />
      <View>
        <Text className="font-semibold text-sm text-gray-700">{name}</Text>
        <Text className="text-xs text-gray-500">{role || 'Store Manager'}</Text>
      </View>
    </View>
  );
};

const ViewDeliveryModal = (props: Props) => {
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
