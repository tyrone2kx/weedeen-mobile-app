import { remapProps } from 'nativewind';
import { FC } from 'react';
import { View, ViewStyle } from 'react-native';

export type CheckboxCircleProps = {
  active?: boolean;
  size?: number;
  style?: ViewStyle;
  iconStyle?: ViewStyle & string;
  disabled?: boolean;
  intent?: 'primary' | 'secondary';
};

const variants = {
  intent: {
    primary: {
      active: {
        container: 'bg-green border-green',
        icon: 'bg-white',
      },
      inactive: {
        container: 'bg-white border-gray-200',
        icon: 'bg-white',
      },
      disabled: {
        container: 'bg-transparent border-gray-200',
        icon: 'bg-transparent',
      },
    },
    secondary: {
      active: {
        container: 'bg-orange border-orange',
        icon: 'bg-white',
      },
      inactive: {
        container: 'bg-white border-gray-200',
        icon: 'bg-white',
      },
      disabled: {
        container: 'bg-transparent border-gray-200',
        icon: 'bg-transparent',
      },
    },
  },
};

const CheckboxCircle: FC<CheckboxCircleProps> = ({
  active = false,
  size = 24,
  style,
  intent = 'primary',
  iconStyle,
  disabled,
}) => {
  const containerStyle = {
    height: size,
    width: size,
  };

  const defaultIconStyle = {
    height: size / 2.25,
    width: size / 2.25,
  };

  const state = disabled ? 'disabled' : active ? 'active' : 'inactive';

  return (
    <View
      className={`items-center justify-center rounded-full border ${variants.intent[intent][state].container}`}
      style={[containerStyle, style]}
    >
      <View
        className={`rounded-full ${variants.intent[intent][state].icon}`}
        style={[defaultIconStyle, iconStyle]}
      />
    </View>
  );
};

export default remapProps(CheckboxCircle, {
  className: 'style',
  iconStyle: 'iconStyle',
});
