import React, { FC, useEffect, useRef, useState } from 'react';
import {
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';
import Text from '../Text/Text';
import CheckBoxAlt, { CheckboxAltProps } from './CheckBoxAlt';

type OptionType = {
  label: string;
  value: string;
  score?: number;
};

type IProps = Omit<TouchableOpacityProps, 'onPress' | 'disabled' | 'style'> & {
  options: OptionType[];
  valueKey?: string;
  handleChange?: (value: string[]) => void;
  initialSelectedOptions?: Array<string>;
  intent?: CheckboxAltProps['intent'];
  disabled?: CheckboxAltProps['disabled'];
  style?: ViewStyle;
  buttonStyle?: TouchableOpacityProps['style'];
  textStyle?: TextStyle;
  checkboxProps?: CheckboxAltProps;
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

const CheckboxSelect: FC<IProps> = ({
  options,
  valueKey = 'value',
  handleChange,
  initialSelectedOptions,
  intent = 'primary',
  disabled,
  style,
  textStyle,
  buttonStyle,
  checkboxProps,
  ...props
}) => {
  const [selectedOptions, setSelectedOptions] = useState(
    initialSelectedOptions || [],
  );

  const isMounted = useRef(false);

  const handleChangeOption = (value: OptionType['value']) => {
    const valueExists = selectedOptions.find((option) => option === value);

    if (valueExists) {
      setSelectedOptions((previous) => {
        const updatedOptions = previous.filter((option) => option !== value);

        return updatedOptions;
      });
    } else {
      setSelectedOptions((previous) => {
        const updatedOptions = [...previous, value];

        return updatedOptions;
      });
    }
  };

  useEffect(() => {
    // We don't want to call the handleChange function unnecessarily
    // When the component mounts
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      handleChange?.(selectedOptions);
    }

    // We don't want whatever function passed to cause a loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOptions]);

  return (
    <View className="flex-auto gap-y-3" style={style}>
      {options.map((item) => {
        const isMultiSelected = selectedOptions?.includes(item[valueKey]);

        const state = disabled
          ? 'disabled'
          : isMultiSelected
            ? 'active'
            : 'inactive';

        return (
          <TouchableOpacity
            activeOpacity={0.8}
            className={`flex-row items-center gap-x-2 rounded-lg border p-2 ${variants.intent[intent][state].container}`}
            disabled={disabled}
            key={item?.label}
            onPress={() => handleChangeOption(item[valueKey])}
            style={buttonStyle}
            {...props}
          >
            <CheckBoxAlt
              active={isMultiSelected}
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
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CheckboxSelect;
