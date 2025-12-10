import { TColors } from '@wd/utils/theme/colors';
import useTheme from '@wd/utils/theme/useTheme';
import { FC } from 'react';
import { View, ViewStyle } from 'react-native';
import { CheckMarkIcon } from '../icons';

export type CheckboxAltProps = {
  active?: boolean;
  size?: number;
  style?: ViewStyle;
  intent?: 'primary' | 'secondary';
  disabled?: boolean;
};

const variants = (theme: TColors) => ({
  intent: {
    primary: {
      active: {
        container: 'bg-green',
        icon: {
          color: theme.white.DEFAULT,
        },
      },
      inactive: {
        container: 'bg-gray',
        icon: {
          color: theme.white[400],
        },
      },
      disabled: {
        container: 'bg-gray-200',
        icon: {
          color: theme.white[400],
        },
      },
    },
    secondary: {
      active: {
        container: 'bg-orange',
        icon: {
          color: theme.white.DEFAULT,
        },
      },
      inactive: {
        container: 'bg-gray',
        icon: {
          color: theme.white[400],
        },
      },
      disabled: {
        container: 'bg-gray-200',
        icon: {
          color: theme.white[400],
        },
      },
    },
  },
});

const CheckboxAlt: FC<CheckboxAltProps> = ({
  active = false,
  size = 36,
  style,
  intent = 'primary',
  disabled,
}) => {
  const { theme } = useTheme();

  const containerStyle = {
    height: size,
    width: size,
  };

  const iconSize = size / 2.25;

  const state = disabled ? 'disabled' : active ? 'active' : 'inactive';

  return (
    <View
      className={`items-center justify-center rounded-full ${variants(theme).intent[intent][state].container}`}
      style={[containerStyle, style]}
    >
      <CheckMarkIcon
        color={variants(theme).intent[intent][state].icon.color}
        height={iconSize}
        width={iconSize}
      />
    </View>
  );
};

export default CheckboxAlt;
