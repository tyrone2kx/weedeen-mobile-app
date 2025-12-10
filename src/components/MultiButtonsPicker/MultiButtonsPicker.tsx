import { Theme } from '@wd/utils/Theme';
import {
  MultiSelectOptionsType,
  useMultiSelectPicker,
} from '@wd/utils/useMultiSelectPicker/useMultiSelectPicker';
import { remapProps } from 'nativewind';
import { FC, ReactNode } from 'react';
import { Image, TextStyle, View, ViewStyle } from 'react-native';
import Button from '../Button/Button';

import Text from '../Text/Text';

type MultiButtonsPickerProps = {
  options: MultiSelectOptionsType[];
  initialSelectedOption?: MultiSelectOptionsType;
  onSelectOption: (option: MultiSelectOptionsType) => void;
  disabled?: boolean;
  label?: string;
  labelComponent?: ReactNode;
  required?: boolean;
  style?: ViewStyle;
  buttonsWrapperStyle?: ViewStyle;
  buttonWrapperStyle?: ViewStyle;
  labelContainerStyle?: ViewStyle;
  buttonContainerStyle?: ViewStyle;
  textContainerStyle?: ViewStyle & string;
  textStyle?: TextStyle & string;
  error?: string;
};

const variants = {
  active: {
    button: '',
    text: '',
    iconColor: Theme.colors.white.DEFAULT,
  },
  inActive: {
    button: 'bg-transparent border border-gray-200',
    text: 'text-gray',
    iconColor: Theme.colors.gray.DEFAULT,
  },
};

const GenderButtonPicker: FC<MultiButtonsPickerProps> = ({
  options,
  onSelectOption,
  initialSelectedOption,
  disabled,
  style,
  required,
  label,
  labelComponent,
  buttonsWrapperStyle,
  buttonWrapperStyle,
  labelContainerStyle,
  buttonContainerStyle,
  textContainerStyle,
  textStyle,
  error,
}) => {
  const { onSelectOption: onSelectGenderOption, getIsSelected } =
    useMultiSelectPicker({
      onUpdateOptionCallback: onSelectOption,
      initialSelectedOption,
    });

  const hasLabel = label || labelComponent;

  return (
    <View className="mb-6 w-full flex-col" style={style}>
      {hasLabel && (
        <View className="mb-2 flex-row" style={labelContainerStyle}>
          {label && <Text intent="label">{label}</Text>}
          {labelComponent && labelComponent}
          {required && (
            <Text className="ml-0.5 text-red" intent="label">
              *
            </Text>
          )}
        </View>
      )}
      <View className="w-full flex-row flex-wrap" style={buttonsWrapperStyle}>
        {options.map((option) => (
          <View className="w-[50%]" key={option.id} style={buttonWrapperStyle}>
            <View className="p-2">
              <Button
                className={`rounded-2xl ${
                  getIsSelected(option)
                    ? variants.active.button
                    : variants.inActive.button
                }`}
                disabled={disabled}
                fontStyle={`mx-0 ${
                  getIsSelected(option)
                    ? variants.active.text
                    : variants.inActive.text
                } ${textStyle}`}
                IconLeft={
                  option.icon ? (
                    <Image
                      className="mr-1 h-[16px] w-[16px]"
                      resizeMode="contain"
                      source={option.icon}
                      tintColor={
                        getIsSelected(option)
                          ? variants.active.iconColor
                          : variants.inActive.iconColor
                      }
                    />
                  ) : undefined
                }
                label={option.label}
                onPress={() => {
                  onSelectGenderOption(option);
                }}
                style={buttonContainerStyle}
                textContainerStyle={textContainerStyle}
              />
            </View>
          </View>
        ))}
      </View>
      <View className="flex-row">
        {error && (
          <Text className="text-red" intent="sm">
            {error}
          </Text>
        )}
      </View>
    </View>
  );
};

export default remapProps(GenderButtonPicker, {
  className: 'style',
  buttonsWrapperStyle: 'buttonsWrapperStyle',
  buttonWrapperStyle: 'buttonWrapperStyle',
  buttonContainerStyle: 'buttonContainerStyle',
  textContainerStyle: 'textContainerStyle',
  textStyle: 'textStyle',
});
