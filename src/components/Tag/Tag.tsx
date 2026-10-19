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

export type TagVariant =
  | 'neutral'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'brand';

interface IProps {
  title: string;
  color?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: TextStyle;
  onPress?: () => void;
  icon?: React.ReactNode;
  /** Status styling: tinted background + matching text + leading dot. */
  variant?: TagVariant;
  /** Show a leading status dot (defaults on for variants). */
  dot?: boolean;
  uppercase?: boolean;
}

const VARIANTS: Record<TagVariant, { bg: string; fg: string; dot: string }> = {
  neutral: { bg: '#F2F4F7', fg: '#667085', dot: '#98A2B3' },
  success: { bg: '#ECFDF3', fg: '#039855', dot: '#12B76A' },
  danger: { bg: '#FEF3F2', fg: '#D92D20', dot: '#F04438' },
  warning: { bg: '#FFFAEB', fg: '#DC6803', dot: '#F79009' },
  info: { bg: '#EFF4FF', fg: '#2563EB', dot: '#2563EB' },
  brand: { bg: '#EFF4FF', fg: '#2563EB', dot: '#2563EB' },
};

const Tag = ({
  title,
  color,
  style,
  textStyle,
  onPress,
  icon,
  variant,
  dot,
  uppercase,
}: IProps) => {
  const v = variant ? VARIANTS[variant] : null;

  // Back-compat: when a raw `color` is supplied without a variant, keep legacy bg=color.
  const bg = v ? v.bg : color ?? '#F2F4F7';
  const fg = v ? v.fg : Theme.colors.black[600];
  const showDot = dot ?? !!variant;
  const isUpper = uppercase ?? !variant;

  const content = (
    <>
      {showDot ? (
        <View
          style={{
            width: 6,
            height: 6,
            borderRadius: 3,
            backgroundColor: v ? v.dot : fg,
            marginRight: 6,
          }}
        />
      ) : null}
      {icon}
      <Text
        style={{
          ...styles.text,
          color: fg,
          textTransform: isUpper ? 'uppercase' : 'none',
          ...(textStyle ?? {}),
        }}
        weight="semibold"
      >
        {title}
      </Text>
    </>
  );

  return onPress ? (
    <TouchableOpacity
      activeOpacity={0.8}
      className="rounded-full"
      onPress={onPress}
      style={[{ backgroundColor: bg }, styles.tag, style]}
    >
      {content}
    </TouchableOpacity>
  ) : (
    <View
      className="rounded-full"
      style={[{ backgroundColor: bg }, styles.tag, style]}
    >
      {content}
    </View>
  );
};

export default Tag;

const styles = StyleSheet.create({
  text: {
    fontSize: 11,
    letterSpacing: 0.2,
  },
  tag: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    minHeight: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
});
