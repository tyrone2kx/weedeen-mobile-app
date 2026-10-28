import Text from '@wd/components/Text/Text';
import Tag from '@wd/components/Tag/Tag';
import { SOSAlert } from '@wd/generated';
import { SOSStatusEnum } from '@wd/utils/types';
import moment from 'moment';
import { AlertTriangleIcon, ChevronRightIcon } from 'lucide-react-native';
import { TouchableOpacity, View } from 'react-native';

export const STATUS_COLORS: Record<string, string> = {
  pending: '#DC6803',
  acknowledged: '#2563eb',
  in_progress: '#2563eb',
  resolved: '#039855',
  cancelled: '#667085',
};

interface Props {
  item: SOSAlert;
  onView: (alert: SOSAlert) => void;
  onResolve: (alert: SOSAlert) => void;
}

const EmergencyItem = ({ item, onView, onResolve }: Props) => {
  const canResolve = ![SOSStatusEnum.RESOLVED, SOSStatusEnum.CANCELLED].includes(
    item.status as SOSStatusEnum,
  );

  return (
    <View className="mb-3 rounded-xl border border-l-8 border-gray-200 border-l-blue-500 p-4">
      <TouchableOpacity
        className="flex-row items-center justify-between"
        onPress={() => onView(item)}
      >
        <View className="flex-row items-center gap-2 flex-1">
          <AlertTriangleIcon color={STATUS_COLORS[item.status] || '#2563eb'} size={22} />
          <View className="flex-1">
            <Text className="text-base font-semibold capitalize text-gray-800">
              {(item.emergencyType || 'other').replaceAll('_', ' ')}
            </Text>
            <Text className="text-xs text-gray-500" numberOfLines={1}>
              {item.subject || 'SOS Alert'}
            </Text>
          </View>
        </View>
        <ChevronRightIcon color="#98A2B3" size={18} />
      </TouchableOpacity>

      <Text className="mt-2 text-sm text-gray-600" numberOfLines={2}>
        {item.description || 'No description provided'}
      </Text>

      <View className="mt-3 flex-row items-center justify-between">
        <Tag
          color={STATUS_COLORS[item.status] || '#2563eb'}
          title={(item.status || '').replaceAll('_', ' ')}
        />
        <Text className="text-xs text-gray-400">
          {moment(item.createdAt).format('Do MMM, YYYY h:mm a')}
        </Text>
      </View>

      {canResolve && (
        <TouchableOpacity
          className="mt-3 self-start rounded-lg border border-red-500 px-3 py-1.5"
          onPress={() => onResolve(item)}
        >
          <Text className="text-xs font-semibold text-red-500">
            Mark as False Alarm
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default EmergencyItem;
