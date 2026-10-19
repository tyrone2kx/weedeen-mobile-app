import Avatar from '@wd/components/Avatar/Avatar';
import MenuComponent from '@wd/components/MenuComponent/MenuComponent';
import Tag, { TagVariant } from '@wd/components/Tag/Tag';
import Text from '@wd/components/Text/Text';
import { Staff } from '@wd/generated';
import { useAppSelector } from '@wd/redux-store/hooks/useAppSelector';
import useTheme from '@wd/utils/theme/useTheme';
import useCopyToClipboard from '@wd/utils/useCopyToClipboard';
import { CheckIcon, CopyIcon } from 'lucide-react-native';
import moment from 'moment';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

interface Props {
  staff: Staff;
  onDelete?: () => void;
  onEdit?: () => void;
  onView?: () => void;
  onDeactivate?: () => void;
}

const StaffItem = ({ staff, onDelete, onEdit, onView, onDeactivate }: Props) => {
  const { theme } = useTheme();
  const org = useAppSelector(state => state.user?.currentUser?.organization);
  const expiry = staff.visitorAccess?.accessCodeExpiry;
  const accessCode = staff.visitorAccess?.accessCode;
  const isExpired = expiry ? moment(expiry).isBefore(moment()) : false;
  const { copyToClipboard, isCopied } = useCopyToClipboard();

  const status: { title: string; variant: TagVariant } = staff.isActive
    ? { title: 'Active', variant: 'success' }
    : { title: 'Inactive', variant: 'danger' };

  return (
    <View
      className="mb-4 rounded-2xl bg-white p-4"
      style={{
        borderWidth: 1,
        backgroundColor: theme.white.DEFAULT, borderColor: theme.gray[200],
        shadowColor: '#101828',
        shadowOpacity: 0.05,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },
        elevation: 2,
      }}
    >
      <View className="flex-row items-start justify-between">
        <View className="flex-1 flex-row items-center gap-3">
          <Avatar
            image={staff.profilePicture}
            name={`${staff.firstName} ${staff.lastName}`}
            showName
            size={44}
          />
          <View style={{ flex: 1 }}>
            <Text intent="md" numberOfLines={1} weight="bold">
              {staff.firstName} {staff.lastName}
            </Text>
            <Text intent="sm" style={{ color: theme.gray[500] }}>
              {staff.role}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center gap-2">
          <Tag title={status.title} variant={status.variant} />
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
      </View>

      {accessCode ? (
        <View
          className="mt-4 flex-row items-center justify-between rounded-xl p-3"
          style={{ backgroundColor: theme.white[300] }}
        >
          {isExpired ? (
            <Tag title="Expired" variant="danger" />
          ) : (
            <Text intent="xs" style={{ color: theme.gray[500] }}>
              Expires {moment(expiry).fromNow()}
            </Text>
          )}
          <TouchableOpacity
            activeOpacity={0.8}
            className="flex-row items-center gap-2 rounded-lg bg-white px-3 py-1.5"
            onPress={() =>
              copyToClipboard(
                `Your access code to ${org?.name} is: ${accessCode}.`,
              )
            }
            style={{ borderWidth: 1, backgroundColor: theme.white.DEFAULT, borderColor: theme.gray[200] }}
          >
            {isCopied ? (
              <CheckIcon color={theme.green.DEFAULT} size={16} />
            ) : (
              <CopyIcon color={theme.blue.DEFAULT} size={16} />
            )}
            <Text intent="sm" style={{ color: theme.blue.DEFAULT }} weight="bold">
              {isCopied ? 'Copied!' : accessCode}
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

export default StaffItem;
