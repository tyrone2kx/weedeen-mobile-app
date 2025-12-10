import { remapProps } from 'nativewind';
import { FC } from 'react';
import { Pressable, PressableProps, Text, TextProps } from 'react-native';

type VariantProps = {
  intent?: 'base' | 'primary' | 'secondary' | 'outlined' | 'ghost';
  size?: 'xs' | 'sm' | 'base' | 'md' | 'lg';
  state?: 'base' | 'disabled' | 'loading' | 'active';
};

type PressableButtonProps = VariantProps & PressableProps;

const PressableButton: FC<PressableButtonProps> = (props) => {
  const {
    intent = 'base',
    size = 'base',
    state = 'base',
    style,
    ...rest
  } = props;

  const variants = {
    intent: {
      base: '',
      primary: '',
      secondary: '',
      outlined: '',
      ghost: '',
    },
    size: {
      xs: '',
      sm: '',
      base: '',
      md: '',
      lg: '',
    },
    state: {
      base: '',
      disabled: '',
      loading: '',
      active: '',
    },
  };

  const className = `${variants.intent[intent]} ${variants.size[size]} ${variants.state[state]}`;

  return <Pressable className={className} style={style} {...rest} />;
};

type ButtonTextProps = Omit<VariantProps, 'state'> & TextProps;

const ButtonText: FC<ButtonTextProps> = (props) => {
  const { intent = 'base', size = 'base', style, ...rest } = props;

  const variants = {
    intent: {
      base: '',
      primary: '',
      secondary: '',
      outlined: '',
      ghost: '',
    },
    size: {
      xs: '',
      sm: '',
      base: '',
      md: '',
      lg: '',
    },
  };

  const className = `${variants.intent[intent]} ${variants.size[size]}`;

  return <Text className={className} style={style} {...rest} />;
};

type BaseButtonProps = PressableButtonProps & {
  textStyle?: TextProps['style'];
  children?: TextProps['children'];
};

const BaseButton: FC<BaseButtonProps> = (props) => {
  const {
    intent = 'base',
    size = 'base',
    state = 'base',
    textStyle,
    children,
    ...rest
  } = props;

  return (
    <PressableButton intent={intent} size={size} state={state} {...rest}>
      <ButtonText intent={intent} size={size} style={textStyle}>
        {children}
      </ButtonText>
    </PressableButton>
  );
};

export default remapProps(BaseButton, {
  className: 'style',
  textStyle: 'textStyle',
});
