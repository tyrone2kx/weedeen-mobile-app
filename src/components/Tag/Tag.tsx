import { Theme } from '@wd/utils/Theme';
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Text from '../Text/Text';

interface IProps {
  title: string;
  color?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: TextStyle;
  onPress?: () => void;
  icon?: React.ReactNode;
}

const Tag = ({
  title,
  color = '#999',
  style,
  textStyle,
  onPress,
  icon,
}: IProps) => {
  return onPress ? (
    <TouchableOpacity
      activeOpacity={0.8}
      className="rounded-full"
      onPress={onPress}
      style={[{ backgroundColor: color, ...styles.tag }, style]}
    >
      {icon}
      <Text
        style={{
          ...styles.text,
          color: Theme.colors.black[600],
          ...(textStyle ?? {}),
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  ) : (
    <View
      className="rounded-full"
      style={[{ backgroundColor: color, ...styles.tag }, style]}
    >
      <Text
        style={{
          ...styles.text,
          color: Theme.colors.black[600],
          ...(textStyle ?? {}),
        }}
      >
        {title}
      </Text>
    </View>
  );
};

export default Tag;

const styles = StyleSheet.create({
  text: {
    textTransform: 'uppercase',
    // fontWeight: '600',
    fontSize: 10,
  },
  tag: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
});
