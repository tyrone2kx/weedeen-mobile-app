/* eslint-disable @typescript-eslint/no-floating-promises */
import { Theme } from '@wd/utils/Theme';
import { useField } from 'formik';
import React, { FC, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Text from '../Text/Text';
import Select, { ISelectOptionType, ISelectProps } from './Select';

export interface FormSelectProps extends Omit<
  ISelectProps,
  'value' | 'onChange' | 'inputValue' | 'setInputValue'
> {
  name: string;
  onValueChange?: (option: ISelectOptionType) => void;
  showError?: boolean;
  errorContainerStyle?: any;
}

const FormSelect: FC<FormSelectProps> = ({
  name,
  onValueChange,
  showError = true,
  errorContainerStyle,
  ...rest
}) => {
  const [field, meta, helpers] = useField<ISelectOptionType | null>(name);
  const [searchText, setSearchText] = useState('');
  const [selectedOption, setSelectedOption] =
    useState<ISelectOptionType | null>(null);

  const handleChange = async (option: ISelectOptionType) => {
    await helpers.setValue(option.value);
    await helpers.setTouched(true);
    setSelectedOption(option);
    onValueChange?.(option);
    setSearchText(option.label);
  };

  const handleInputChange = (text: string) => {
    setSearchText(text);
    if (text === '') {
      helpers.setValue(null);
    }
  };

  const hasError = meta.touched && meta.error;

  return (
    <View style={styles.container}>
      <Select
        {...rest}
        inputValue={searchText}
        onChange={val => void handleChange(val)}
        onTouch={() => void helpers.setTouched(true)}
        setInputValue={handleInputChange}
        value={selectedOption}
      />

      {showError && hasError && (
        <View style={[styles.errorContainer, errorContainerStyle]}>
          <Text style={styles.errorText}>{meta.error}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 0,
  },
  errorContainer: {
    marginTop: 0,
  },
  errorText: {
    color: Theme.colors.red.DEFAULT,
    fontSize: 12,
  },
});

export default FormSelect;
