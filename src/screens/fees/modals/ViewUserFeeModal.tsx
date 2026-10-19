import Button from '@wd/components/Button/Button';
import CustomModal from '@wd/components/CustomModal/CustomModal';
import Tag, { TagVariant } from '@wd/components/Tag/Tag';
import Text from '@wd/components/Text/Text';
import { UserFee } from '@wd/generated';
import { formatNairaWithKobo } from '@wd/utils/helpers';
import useTheme from '@wd/utils/theme/useTheme';
import moment from 'moment';
import { Image, View } from 'react-native';

interface Props {
  invoice: UserFee;
  isOpen: boolean;
  onClose: () => void;
  /** Called when the resident taps "Pay Now" on an unpaid invoice. */
  onPayNow?: () => void;
}

const ViewUserFeeModal = ({ invoice, isOpen, onClose, onPayNow }: Props) => {
  const { theme } = useTheme();
  const fee = invoice?.fee;
  const isPaid = !!invoice?.isPaid;
  const status: { title: string; variant: TagVariant } = isPaid
    ? { title: 'Paid', variant: 'success' }
    : { title: 'Unpaid', variant: 'danger' };

  return (
    <CustomModal
      buttons={
        !isPaid && onPayNow ? (
          <Button label="Pay Now" light onPress={onPayNow} />
        ) : undefined
      }
      isOpen={isOpen}
      onClose={onClose}
      title="Invoice"
    >
      <View className="gap-5">
        {/* Issuer */}
        <View className="flex-row items-start justify-between">
          <View className="flex-row items-center gap-3">
            <Image
              source={require('@assets/images/weedeen.png')}
              style={{ height: 44, width: 44, borderRadius: 12 }}
            />
            <View>
              <Text intent="md" weight="bold">
                Weedeen Inc
              </Text>
              <Text intent="xs" style={{ color: theme.gray[500] }}>
                hello@weedeen.com
              </Text>
            </View>
          </View>
          <Tag title={status.title} variant={status.variant} />
        </View>

        {/* Fee */}
        <View
          className="rounded-2xl p-4"
          style={{ backgroundColor: theme.white[300] }}
        >
          <Text intent="xs" style={{ color: theme.gray[500] }} weight="medium">
            Fee
          </Text>
          <Text intent="h4" style={{ marginTop: 2 }} weight="bold">
            {fee?.title}
          </Text>

          <View className="mt-4 flex-row">
            <View style={{ flex: 1 }}>
              <Text intent="xs" style={{ color: theme.gray[500] }}>
                Invoice Date
              </Text>
              <Text intent="sm" style={{ marginTop: 2 }} weight="semibold">
                {moment(invoice?.createdAt).format('Do MMM, YYYY')}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text intent="xs" style={{ color: theme.gray[500] }}>
                Due Date
              </Text>
              <Text intent="sm" style={{ marginTop: 2 }} weight="semibold">
                {moment(invoice?.createdAt).add(1, 'y').format('Do MMM, YYYY')}
              </Text>
            </View>
          </View>
        </View>

        {/* Amount due banner */}
        <View
          className="flex-row items-center justify-between rounded-2xl px-5 py-4"
          style={{ backgroundColor: theme.blue.DEFAULT }}
        >
          <Text
            intent="sm"
            style={{ color: 'rgba(255,255,255,0.85)' }}
            weight="semibold"
          >
            AMOUNT DUE
          </Text>
          <Text intent="h3" style={{ color: '#fff' }} weight="extrabold">
            {formatNairaWithKobo(fee?.amount)}
          </Text>
        </View>

        {/* Description */}
        {fee?.description ? (
          <View>
            <Text
              intent="xs"
              style={{ color: theme.gray[500] }}
              weight="medium"
            >
              Title/Description
            </Text>
            <Text intent="sm" style={{ marginTop: 6, color: theme.black[600] }}>
              {fee?.description}
            </Text>
          </View>
        ) : null}

        <Text intent="sm" style={{ color: theme.gray[500], marginTop: 4 }}>
          Thank you for the business!
        </Text>
      </View>
    </CustomModal>
  );
};

export default ViewUserFeeModal;
