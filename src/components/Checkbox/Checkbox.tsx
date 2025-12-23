import { Theme } from '@wd/utils/Theme';
import { remapProps } from 'nativewind';
import { FC, useEffect, useState } from 'react';
import { TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';

import useTheme from '@wd/utils/theme/useTheme';
import Text from '../Text/Text';
import { CheckMarkIcon } from '../icons';

interface IProps {
  label?: string;
  style?: ViewStyle;
  value?: boolean;
  onValueChange?: (val?: boolean) => void;
  color?: string;
  disabled?: boolean;
  checkboxContainerStyle?: ViewStyle;
  labelStyle?: TextStyle;
}

const Checkbox: FC<IProps> = props => {
  const {
    label,
    style = {},
    value,
    onValueChange,
    color = Theme.colors.green.DEFAULT,
    disabled,
    checkboxContainerStyle,
    labelStyle,
  } = props;
  const [isChecked, setIsChecked] = useState(value);

  const { theme } = useTheme();

  useEffect(() => {
    setIsChecked(value);
  }, [value]);

  const handlePress = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    onValueChange?.(newChecked);
  };

  const checkmarkStyle = isChecked
    ? {
        backgroundColor: color,
      }
    : {
        backgroundColor: theme.white.DEFAULT,
        borderWidth: 1,
        borderColor: theme.gray.DEFAULT,
      };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled}
      onPress={handlePress}
    >
      <View className="flex-row items-center gap-x-2" style={style}>
        <View
          className="h-[24px] w-[24px] flex-row items-center justify-center rounded-md"
          style={[checkmarkStyle, checkboxContainerStyle]}
        >
          {isChecked && (
            <CheckMarkIcon color={theme.white.DEFAULT} height={12} width={12} />
          )}
        </View>
        {label ? (
          <Text
            className={`${disabled ? 'text-gray' : 'text-black'}`}
            style={labelStyle}
          >
            {label}
          </Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default remapProps(Checkbox, {
  className: 'style',
  checkboxContainerStyle: 'checkboxContainerStyle',
  labelStyle: 'labelStyle',
});
