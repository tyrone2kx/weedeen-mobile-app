import Circle from '@wd/components/Circle/Circle';
import MenuComponent from '@wd/components/MenuComponent/MenuComponent';
import Tag from '@wd/components/Tag/Tag';
import Text from '@wd/components/Text/Text';
import { VisitorAccess } from '@wd/generated';
import useTheme from '@wd/utils/theme/useTheme';
import useCopyToClipboard from '@wd/utils/useCopyToClipboard';
import { CheckIcon, CopyIcon, UserIcon } from 'lucide-react-native';
import moment from 'moment';
import React from 'react';
import { View } from 'react-native';

interface Props {
  visitor: VisitorAccess;
  onDelete?: () => void;
  onEdit?: () => void;
}

const VisitorItem = ({ visitor, onDelete, onEdit }: Props) => {
  const { theme } = useTheme();
  const { color, title, textColor } = resolveStatus(visitor);

  const { copyToClipboard, isCopied } = useCopyToClipboard();

  return (
    <View
      className="rounded-xl bg-white border p-4 mb-4"
      style={{ borderColor: theme.gray[300] }}
    >
      <View className="flex-row justify-between">
        <View className="items-start gap-2 flex-row mb-4">
          <UserIcon color={theme.blue.DEFAULT} size={30} />
          <View>
            <View className="flex-row gap-2">
              <Text>{visitor.visitorName}</Text>
              <View className="flex-row gap-2 items-center">
                <Circle size={5} />
                <Text className="text-sm text-gray-400" weight="light">
                  {visitor.visitorType}
                </Text>
              </View>
            </View>
            <Tag color={color} textStyle={{ color: textColor }} title={title} />
          </View>
        </View>

        <MenuComponent
          id={`visitor-item-${visitor.id}`}
          menuList={[
            { label: 'Edit', onPress: onEdit },
            { label: 'Delete', onPress: onDelete },
          ]}
        />
      </View>
      <View
        className={`p-2 rounded-lg mb-4`}
        style={{ backgroundColor: '#f2f2f2' }}
      >
        <Text style={{ fontSize: 12 }} weight="light">
          {visitor.purposeOfVisit || 'Not Specified'}
        </Text>
      </View>

      <View className="flex-row justify-end">
        <Tag
          color={'#FFFFFF'}
          icon={
            isCopied ? (
              <CheckIcon color="green" />
            ) : (
              <CopyIcon color={theme.blue.DEFAULT} size={20} />
            )
          }
          onPress={() => copyToClipboard(visitor.accessCode)}
          style={{
            borderWidth: 1,
            borderColor: isCopied ? 'green' : theme.blue.DEFAULT,
          }}
          title={`${isCopied ? 'Copied!' : visitor.accessCode}`}
        />
      </View>
    </View>
  );
};

const resolveStatus = (visitor: VisitorAccess) => {
  if (visitor.accessCodeUsed) {
    return {
      title: 'Completed',
      color: '#E8F5E9',
      textColor: '#388E3C',
    };
  }
  if (moment().isAfter(moment(visitor.accessCodeExpiry))) {
    return {
      title: 'Expired',
      color: '#FFEBEE',
      textColor: '#D32F2F',
    };
  }
  return {
    title: 'Awaiting Use',
    color: '#E3F2FD',
    textColor: '#1976D2',
  };
};

export default VisitorItem;
