import { Fonts } from '@wd/utils/Fonts';
import { remapProps } from 'nativewind';
import { FC } from 'react';
import {
  Text as AppText,
  TextProps as AppTextProps,
  TextStyle,
} from 'react-native';

export type TItalicStyle = 'italic | normal | undefined';

export type TextProps = AppTextProps & {
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  style?: TextStyle;
  intent?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'xl'
    | 'lg'
    | 'md'
    | 'base'
    | 'sm'
    | 'xs'
    | 'label';
  weight?: 'bold' | 'semibold' | 'medium' | 'normal' | 'light' | 'none';
  italicStyle?: 'normal' | 'medium' | 'semibold' | 'none';
  className?: string;
};

export const variants = {
  intent: {
    h1: {
      fontFamily: Fonts.bold,
      fontSize: 24,
      lineHeight: 28,
    },
    h2: {
      fontFamily: Fonts.bold,
      fontSize: 20,
      lineHeight: 24,
    },
    h3: {
      fontFamily: Fonts.semibold,
      fontSize: 18,
      lineHeight: 22,
    },
    h4: {
      fontFamily: Fonts.semibold,
      fontSize: 16,
      lineHeight: 20,
    },
    h5: {
      fontFamily: Fonts.semibold,
      fontSize: 14,
      lineHeight: 18,
    },
    h6: {
      fontFamily: Fonts.medium,
      fontSize: 12,
      lineHeight: 16,
    },
    xl: {
      fontSize: 24,
      lineHeight: 32,
      fontFamily: Fonts.medium,
    },
    lg: {
      fontSize: 18,
      lineHeight: 26,
      fontFamily: Fonts.medium,
    },
    md: {
      fontSize: 16,
      lineHeight: 24,
      fontFamily: Fonts.medium,
    },
    base: {
      fontSize: 14,
      lineHeight: 22,
      fontFamily: Fonts.medium,
    },
    sm: {
      fontSize: 12,
      lineHeight: 20,
      fontFamily: Fonts.medium,
    },
    xs: {
      fontSize: 11,
      lineHeight: 18,
      fontFamily: Fonts.medium,
    },
    label: {
      fontSize: 12,
      lineHeight: 16,
      fontFamily: Fonts.semibold,
    },
  },
  weight: {
    none: {},
    bold: {
      fontFamily: Fonts.bold,
    },
    semibold: {
      fontFamily: Fonts.semibold,
    },
    medium: {
      fontFamily: Fonts.medium,
    },
    normal: {
      fontFamily: Fonts.default,
    },
    light: {
      fontFamily: Fonts.light,
    },
  },
  italic: {
    none: {},
    normal: {
      fontFamily: Fonts['default-italic'],
    },
    medium: {
      fontFamily: Fonts['medium-italic'],
    },
    semibold: {
      fontFamily: Fonts['semibold-italic'],
    },
  },
} as const;

const Text: FC<TextProps> = ({
  children,
  h1,
  h2,
  h3,
  style,
  intent = 'base',
  weight = 'none',
  italicStyle = 'none',
  className,
  ...props
}) => {
  const intentToUse = h1 ? 'h1' : h2 ? 'h2' : h3 ? 'h3' : intent;

  const colorClassName = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'label'].includes(
    intent,
  )
    ? 'text-black-700'
    : 'text-black-600';

  return (
    <AppText
      allowFontScaling={false}
      className={`${colorClassName} ${className}`}
      style={[
        variants.intent[intentToUse],
        variants.weight[weight],
        variants.italic[italicStyle],
        style,
      ]}
      {...props}
    >
      {children}
    </AppText>
  );
};

export default remapProps(Text, {
  className: 'style',
});
