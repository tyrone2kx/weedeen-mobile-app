import { View } from 'react-native';
import Text from '../Text/Text';

interface ItemProps {
  title: string;
  description?: string;
  descriptionComponent?: React.ReactNode;
}

const DetailItem = ({
  title,
  description,
  descriptionComponent,
}: ItemProps) => {
  return (
    <View className="p-4">
      <Text className="font-semibold capitalize text-xs text-gray-600">
        {title}
      </Text>
      {descriptionComponent || (
        <Text className="text-sm font-bold text-gray-700">
          {description || '--/--'}
        </Text>
      )}
    </View>
  );
};

export default DetailItem;
