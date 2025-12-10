import { useState } from 'react';
import { ImageSourcePropType } from 'react-native';

export type MultiSelectOptionsType = {
  id: string | number;
  label: string | number;
  value: string | number;
  icon?: ImageSourcePropType;
};

type UseMultiSelectPickerProps = {
  onUpdateOptionCallback?: (option: MultiSelectOptionsType) => void;
  initialSelectedOption?: MultiSelectOptionsType;
};

const useMultiSelectPicker = ({
  onUpdateOptionCallback,
  initialSelectedOption,
}: UseMultiSelectPickerProps) => {
  const [selectedOption, setSelectedOption] = useState<
    MultiSelectOptionsType | undefined
  >(initialSelectedOption);

  const onSelectOption = (option: MultiSelectOptionsType) => {
    setSelectedOption(option);
    onUpdateOptionCallback?.(option);
  };

  const getIsSelected = (option: MultiSelectOptionsType) => {
    return option.id === selectedOption?.id;
  };

  const value = selectedOption?.value;

  return {
    selectedOption,
    onSelectOption,
    value,
    getIsSelected,
  };
};

export { useMultiSelectPicker };
