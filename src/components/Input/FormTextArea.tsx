import { Theme } from '@wd/utils/Theme';
import { useField } from 'formik';
import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import Text from '../Text/Text';
import TextArea, { TextAreaProps } from './TextAreaInput'; // Adjust the import path

export interface FormTextAreaProps extends Omit<
  TextAreaProps,
  'value' | 'onChange'
> {
  name: string;
  onValueChange?: (value: string) => void;
  showError?: boolean;
  errorContainerStyle?: any;
}

const FormTextArea: FC<FormTextAreaProps> = ({
  name,
  onValueChange,
  onBlur: propOnBlur,
  onFocus: propOnFocus,
  showError = true,
  errorContainerStyle,
  ...rest
}) => {
  const [field, meta, helpers] = useField<string>(name);

  const handleChange = (text: string) => {
    void helpers.setValue(text);
    onValueChange?.(text);
  };

  const handleBlur = () => {
    void helpers.setTouched(true);
    propOnBlur?.();
  };

  const handleFocus = () => {
    propOnFocus?.();
  };

  const hasError = meta.touched && !!meta.error;

  return (
    <View style={styles.container}>
      <TextArea
        {...rest}
        hideBorder={hasError} // Optional: Hide default border when there's an error
        onBlur={handleBlur}
        onChange={handleChange}
        onFocus={handleFocus}
        value={field.value}
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
    marginBottom: 8,
  },
  errorContainer: {
    marginTop: 4,
  },
  errorText: {
    color: Theme.colors.red.DEFAULT, // Or use your theme's error color
    fontSize: 12,
  },
});

export default FormTextArea;
