import { Notification } from '@wd/generated';
import useTheme from '@wd/utils/theme/useTheme';
import { MessageSquareIcon } from 'lucide-react-native';
import { ScrollView, View } from 'react-native';
import EmptyState from '../EmptyState/EmptyState';
import Loader from '../Loader/Loader';
import SideSheet from '../Slider/SideSheet';
import Text from '../Text/Text';

interface Props {
  isOpen?: boolean;
  onClose: () => void;
  notifications: Notification[];
  isLoading?: boolean;
  totalElements: number;
}

const NotificationModal = ({
  isOpen = false,
  onClose,
  totalElements,
  notifications,
  isLoading,
}: Props) => {
  const { theme } = useTheme();
  return (
    <SideSheet isVisible={isOpen} onClose={onClose} side="right" width={350}>
      <View>
        <Text className="mb-4" intent="h3">
          Notifications
        </Text>
        {isLoading ? (
          <Loader section />
        ) : totalElements === 0 ? (
          <EmptyState
            description="You don't have any notifications"
            icon={<MessageSquareIcon color={'#ffffff'} size={40} />}
            title="No Notifications"
          />
        ) : (
          <ScrollView>
            {notifications.map(item => (
              <View
                className="mb-4"
                key={item.id}
                style={{
                  borderWidth: 1,
                  borderLeftWidth: 8,
                  padding: 10,
                  borderColor: theme.gray.DEFAULT,
                }}
              >
                <View>
                  <Text className="font-semibold mb-2">{item.subject}</Text>
                  <Text className="text-sm text-gray-600">{item.message}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </SideSheet>
  );
};

export default NotificationModal;
