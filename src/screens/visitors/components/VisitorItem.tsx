import Avatar from '@wd/components/Avatar/Avatar';
import MenuComponent from '@wd/components/MenuComponent/MenuComponent';
import Tag, { TagVariant } from '@wd/components/Tag/Tag';
import Text from '@wd/components/Text/Text';
import { VisitorAccess } from '@wd/generated';
import useTheme from '@wd/utils/theme/useTheme';
import useCopyToClipboard from '@wd/utils/useCopyToClipboard';
import { CheckIcon, CopyIcon } from 'lucide-react-native';
import moment from 'moment';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

interface Props {
  visitor: VisitorAccess;
  onDelete?: () => void;
  onEdit?: () => void;
}

const VisitorItem = ({ visitor, onDelete, onEdit }: Props) => {
  const { theme } = useTheme();
  const { title, variant } = resolveStatus(visitor);
  const { copyToClipboard, isCopied } = useCopyToClipboard();

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
          <Avatar name={visitor.visitorName} showName size={44} />
          <View style={{ flex: 1 }}>
            <Text intent="md" numberOfLines={1} weight="bold">
              {visitor.visitorName}
            </Text>
            <Text intent="sm" style={{ color: theme.gray[500] }}>
              {visitor.visitorType}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center gap-2">
          <Tag title={title} variant={variant} />
          <MenuComponent
            id={`visitor-item-${visitor.id}`}
            menuList={[
              { label: 'Edit', onPress: onEdit },
              { label: 'Delete', onPress: onDelete },
            ]}
          />
        </View>
      </View>

      <View
        className="mt-4 flex-row items-center justify-between rounded-xl p-3"
        style={{ backgroundColor: theme.white[300] }}
      >
        <Text
          intent="sm"
          numberOfLines={1}
          style={{ flex: 1, color: theme.gray[500] }}
        >
          {visitor.purposeOfVisit || 'Not Specified'}
        </Text>
        <TouchableOpacity
          activeOpacity={0.8}
          className="flex-row items-center gap-2 rounded-lg bg-white px-3 py-1.5"
          onPress={() => copyToClipboard(visitor.accessCode)}
          style={{ borderWidth: 1, borderColor: theme.gray[200] }}
        >
          {isCopied ? (
            <CheckIcon color={theme.green.DEFAULT} size={16} />
          ) : (
            <CopyIcon color={theme.blue.DEFAULT} size={16} />
          )}
          <Text intent="sm" style={{ color: theme.blue.DEFAULT }} weight="bold">
            {isCopied ? 'Copied!' : visitor.accessCode}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const resolveStatus = (
  visitor: VisitorAccess,
): { title: string; variant: TagVariant } => {
  if (visitor.accessCodeUsed) {
    return { title: 'Completed', variant: 'success' };
  }
  if (moment().isAfter(moment(visitor.accessCodeExpiry))) {
    return { title: 'Expired', variant: 'danger' };
  }
  return { title: 'Awaiting Use', variant: 'info' };
};

export default VisitorItem;
