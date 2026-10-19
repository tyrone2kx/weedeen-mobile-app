import { View } from 'react-native';
import useTheme from '@wd/utils/theme/useTheme';
import Text from '../Text/Text';

interface ItemProps {
  title: string;
  description?: string;
  descriptionComponent?: React.ReactNode;
  last?: boolean;
}

const DetailItem = ({
  title,
  description,
  descriptionComponent,
  last,
}: ItemProps) => {
  const { theme } = useTheme();
  return (
    <View
      style={{
        paddingVertical: 14,
        borderBottomWidth: last ? 0 : 1,
        borderBottomColor: theme.gray[200],
      }}
    >
      <Text intent="xs" style={{ color: theme.gray[500] }} weight="medium">
        {title}
      </Text>
      {descriptionComponent || (
        <Text
          intent="base"
          style={{ color: theme.black[700], marginTop: 4 }}
          weight="semibold"
        >
          {description || '--/--'}
        </Text>
      )}
    </View>
  );
};

export default DetailItem;
