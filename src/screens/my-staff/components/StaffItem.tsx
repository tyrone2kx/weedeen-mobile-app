import Avatar from '@wd/components/Avatar/Avatar';
import Circle from '@wd/components/Circle/Circle';
import MenuComponent from '@wd/components/MenuComponent/MenuComponent';
import Tag from '@wd/components/Tag/Tag';
import Text from '@wd/components/Text/Text';
import { Staff } from '@wd/generated';
import { useAppSelector } from '@wd/redux-store/hooks/useAppSelector';
import { Theme } from '@wd/utils/Theme';
import useTheme from '@wd/utils/theme/useTheme';
import useCopyToClipboard from '@wd/utils/useCopyToClipboard';
import { CheckIcon, CopyIcon } from 'lucide-react-native';
import moment from 'moment';
import React from 'react';
import { View } from 'react-native';

interface Props {
  staff: Staff;
  onDelete?: () => void;
  onEdit?: () => void;
  onView?: () => void;
  onDeactivate?: () => void;
}

const StaffItem = ({
  staff,
  onDelete,
  onEdit,
  onView,
  onDeactivate,
}: Props) => {
  const { theme } = useTheme();
  const org = useAppSelector(state => state.user?.currentUser?.organization);
  const { color, title, textColor } = resolveStatus(staff);
  const expiry = staff.visitorAccess?.accessCodeExpiry;
  const accessCode = staff.visitorAccess?.accessCode;
  const isExpired = expiry ? moment(expiry).isBefore(moment()) : false;

  const { copyToClipboard, isCopied } = useCopyToClipboard();

  return (
    <View
      className="rounded-xl bg-white border p-4 mb-4"
      style={{ borderColor: theme.gray[300] }}
    >
      <View className="flex-row justify-between">
        <View className="items-start gap-2 flex-row mb-4">
          <Avatar
            color={theme.blue.DEFAULT}
            image={staff.profilePicture}
            size={30}
          />
          <View>
            <View className="flex-row gap-2">
              <Text>
                {staff.firstName} {staff.lastName}
              </Text>
              <View className="flex-row gap-2 items-center">
                <Circle size={5} />
                <Text className="text-sm text-gray-400" weight="light">
                  {staff.role}
                </Text>
              </View>
            </View>
            <Tag color={color} textStyle={{ color: textColor }} title={title} />
          </View>
        </View>

        <MenuComponent
          id={`staff-item-${staff.id}`}
          menuList={[
            { label: 'View', onPress: onView },
            { label: 'Edit', onPress: onEdit },
            { label: 'Deactivate', onPress: onDeactivate },
            { label: 'Delete', onPress: onDelete },
          ]}
        />
      </View>

      <View className="flex-row justify-end">
        {isExpired ? (
          <Tag color={Theme.red} title="Expired" />
        ) : (
          <View>
            <Tag
              color={'#FFFFFF'}
              icon={
                isCopied ? (
                  <CheckIcon color="green" />
                ) : (
                  <CopyIcon color={theme.blue.DEFAULT} size={20} />
                )
              }
              onPress={() => {
                const textToCopy = `Your access code to ${org?.name} is: ${accessCode}.`;
                copyToClipboard(textToCopy);
              }}
              style={{
                borderWidth: 1,
                borderColor: isCopied ? 'green' : theme.blue.DEFAULT,
              }}
              title={`${isCopied ? 'Copied!' : staff.visitorAccess?.accessCode}`}
            />

            <Text className="text-xs text-gray-400 mt-1" weight="light">
              Expires in {moment(expiry).fromNow()}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const resolveStatus = (staff: Staff) => {
  if (staff.isActive) {
    return {
      title: 'Active',
      color: '#E8F5E9',
      textColor: '#388E3C',
    };
  } else {
    return {
      title: 'Expired',
      color: '#FFEBEE',
      textColor: '#D32F2F',
    };
  }
};

const resolveCodeStatus = (staff: Staff) => {
  const accessCode = staff.visitorAccess?.accessCode;
  const expiry = staff.visitorAccess?.accessCodeExpiry;
  const isExpired = expiry ? moment(expiry).isBefore(moment()) : false;

  if (expiry) {
    if (isExpired) {
      return {
        title: 'Expired',
        color: '#FFEBEE',
        textColor: '#D32F2F',
      };
    } else {
      return {
        title: `Expires in ${moment(expiry).fromNow()}`,
        color: '#E3F2FD',
        textColor: '#1976D2',
      };
    }
  }
  return {
    title: accessCode,
    color: '#E3F2FD',
    textColor: '#1976D2',
  };
};

export default StaffItem;
