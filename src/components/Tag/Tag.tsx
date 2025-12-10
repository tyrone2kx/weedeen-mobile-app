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
}

const Tag = ({
  title,
  color = '#0066F5',
  style,
  textStyle,
  onPress,
}: IProps) => {
  return onPress ? (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
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
    </TouchableOpacity>
  ) : (
    <View style={[{ backgroundColor: color, ...styles.tag }, style]}>
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
    fontWeight: '600',
  },
  tag: {
    padding: 2,
    paddingHorizontal: 4,
    height: 20,
    borderRadius: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
