import { remapProps } from 'nativewind';
import React, { FC, ReactNode } from 'react';
import {
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';
import CheckboxCircle, {
  CheckboxCircleProps,
} from '../Checkbox/CheckboxCircle';

import { isNullish } from '@wd/utils/helpers';
import Text from '../Text/Text';

type OptionType = {
  label: string;
  value: string;
  score?: number;
};

type IProps = Omit<TouchableOpacityProps, 'onPress' | 'disabled' | 'style'> & {
  selected?: string;
  options: OptionType[];
  valueKey?: string;
  handleChange?: (value: string) => void;
  intent?: CheckboxCircleProps['intent'];
  disabled?: CheckboxCircleProps['disabled'];
  style?: ViewStyle;
  buttonStyle?: TouchableOpacityProps['style'];
  textStyle?: TextStyle;
  checkboxProps?: CheckboxCircleProps;
  rightComponent?: ReactNode;
};

const variants = {
  intent: {
    primary: {
      active: {
        container: 'border-green',
        text: 'text-black',
      },
      inactive: {
        container: 'border-gray-200',
        text: 'text-black',
      },
      disabled: {
        container: 'border-gray-200',
        text: 'text-gray',
      },
    },
    secondary: {
      active: {
        container: 'border-orange',
        text: 'text-black',
      },
      inactive: {
        container: 'border-gray-200',
        text: 'text-black',
      },
      disabled: {
        container: 'border-gray-200',
        text: 'text-gray',
      },
    },
  },
};

const RadioSelect: FC<IProps> = ({
  options,
  selected,
  valueKey = 'value',
  handleChange,
  intent = 'primary',
  disabled,
  style,
  textStyle,
  buttonStyle,
  checkboxProps,
  rightComponent,
  ...props
}) => {
  return (
    <View className="flex-auto gap-y-3" style={style}>
      {options.map(item => {
        const isSingleSelected = selected === item[valueKey];

        const state = disabled
          ? 'disabled'
          : isSingleSelected
          ? 'active'
          : 'inactive';

        return (
          <TouchableOpacity
            activeOpacity={0.8}
            className={`flex-row items-center justify-between gap-x-2 rounded-lg border p-2 ${variants.intent[intent][state].container}`}
            disabled={disabled}
            key={item?.label}
            onPress={() => handleChange?.(item[valueKey])}
            style={buttonStyle}
            {...props}
          >
            <View className="flex-1 flex-row items-center gap-x-2">
              <CheckboxCircle
                active={isSingleSelected}
                disabled={disabled}
                intent={intent}
                size={16}
                {...checkboxProps}
              />

              <Text
                className={`flex-1 ${variants.intent[intent][state].text}`}
                style={textStyle}
              >
                {item.label}
              </Text>
            </View>
            {!isNullish(item.score) && (
              <Text intent="h4" weight="bold">
                {`${item.score > 0 ? '+' : ''}${item.score}`}
              </Text>
            )}
            {rightComponent}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default remapProps(RadioSelect, {
  className: 'style',
  buttonStyle: 'buttonStyle',
  textStyle: 'textStyle',
});
