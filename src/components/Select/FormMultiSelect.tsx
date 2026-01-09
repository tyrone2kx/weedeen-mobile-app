import { Theme } from '@wd/utils/Theme';
import { useField } from 'formik';
import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import Text from '../Text/Text';
import MultiSelect, { IMultiSelectOptionType } from './MultiSelect';

interface FormMultiSelectProps {
  name: string;
  label?: string;
  placeholder?: string;
  options: IMultiSelectOptionType[];
  required?: boolean;
  isSearchable?: boolean;
  onValueChange?: (value: IMultiSelectOptionType[]) => void;
  showError?: boolean;
  minSelections?: number;
  maxSelections?: number;
  className?: string;
}

const FormMultiSelect: FC<FormMultiSelectProps> = ({
  name,
  onValueChange,
  showError = true,
  minSelections,
  maxSelections,
  ...rest
}) => {
  const [field, meta, helpers] = useField<IMultiSelectOptionType[]>(name);

  const handleChange = (value: IMultiSelectOptionType[]) => {
    // Apply min/max constraints if provided
    let newValue = value;

    if (maxSelections && value.length > maxSelections) {
      newValue = value.slice(0, maxSelections);
    }

    helpers.setValue(newValue);
    helpers.setTouched(true);
    onValueChange?.(newValue);
  };

  const getErrorMessage = () => {
    if (!meta.touched || !meta.error) return null;

    if (meta.error) {
      return meta.error;
    }

    // Additional validation messages
    if (minSelections && field.value.length < minSelections) {
      return `Select at least ${minSelections} option${minSelections > 1 ? 's' : ''}`;
    }

    if (maxSelections && field.value.length > maxSelections) {
      return `Select at most ${maxSelections} option${maxSelections > 1 ? 's' : ''}`;
    }

    return null;
  };

  const errorMessage = getErrorMessage();
  const hasError = meta.touched && errorMessage;

  return (
    <View style={styles.container}>
      <MultiSelect {...rest} onChange={handleChange} value={field.value} />

      {showError && hasError && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      )}

      {/* Selection counter */}
      {maxSelections && (
        <View style={styles.counterContainer}>
          <Text
            style={{
              ...styles.counterText,
              ...(field.value.length > maxSelections
                ? styles.counterError
                : {}),
            }}
          >
            {field.value.length} / {maxSelections}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    position: 'relative',
  },
  errorContainer: {
    marginTop: 4,
  },
  errorText: {
    color: Theme.colors.red.DEFAULT,
    fontSize: 12,
  },
  counterContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  counterText: {
    fontSize: 10,
    color: Theme.colors.gray[600],
  },
  counterError: {
    color: Theme.colors.red.DEFAULT,
    fontWeight: '600',
  },
});

export default FormMultiSelect;
