import Tag, { TagVariant } from '@wd/components/Tag/Tag';
import Text from '@wd/components/Text/Text';
import { UserFee } from '@wd/generated';
import { formatNairaWithKobo } from '@wd/utils/helpers';
import useTheme from '@wd/utils/theme/useTheme';
import { HashIcon } from 'lucide-react-native';
import moment from 'moment';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

interface Props {
  userFee: UserFee;
  onPayNow?: () => void;
  onView?: () => void;
}

const FeeItem = ({ userFee, onView }: Props) => {
  const { theme } = useTheme();
  const { title, variant } = resolveStatus(userFee);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className="mb-4 flex-row items-center gap-3 rounded-2xl bg-white p-4"
      onPress={onView}
      style={{
        borderWidth: 1,
        backgroundColor: theme.white.DEFAULT,
        borderColor: theme.gray[200],
        shadowColor: '#101828',
        shadowOpacity: 0.05,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },
        elevation: 2,
      }}
    >
      <View
        className="items-center justify-center rounded-xl"
        style={{ width: 44, height: 44, backgroundColor: theme.blue[300] }}
      >
        <HashIcon color={theme.blue.DEFAULT} size={22} />
      </View>

      <View style={{ flex: 1 }}>
        <Text intent="md" numberOfLines={1} weight="bold">
          {userFee?.fee?.title}
        </Text>
        <View className="mt-1 flex-row items-center gap-2">
          <Tag title={title} variant={variant} />
          <Text intent="xs" style={{ color: theme.gray[500] }}>
            {moment(userFee.createdAt).fromNow()}
          </Text>
        </View>
      </View>

      <Text intent="md" style={{ color: theme.black[700] }} weight="bold">
        {formatNairaWithKobo(userFee.fee?.amount)}
      </Text>
    </TouchableOpacity>
  );
};

const resolveStatus = (
  userFee: UserFee,
): { title: string; variant: TagVariant } =>
  userFee.isPaid
    ? { title: 'Paid', variant: 'success' }
    : { title: 'Unpaid', variant: 'danger' };

export default FeeItem;
