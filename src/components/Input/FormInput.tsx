import { useField } from 'formik';
import React, { FC } from 'react';
import Input, { InputProps } from './Input'; // Adjust the import path as needed

export interface FormInputProps extends Omit<
  InputProps,
  'onChange' | 'value' | 'error'
> {
  name: string;
  onValueChange?: (value: string) => void;
}

const FormInput: FC<FormInputProps> = ({
  name,
  onValueChange,
  onBlur: propOnBlur,
  onFocus: propOnFocus,
  textInputStyle,
  ...rest
}) => {
  const [field, meta, helpers] = useField(name);

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

  return (
    <Input
      {...rest}
      error={meta.touched && meta.error ? meta.error : undefined}
      onBlur={handleBlur}
      onChange={handleChange}
      onFocus={handleFocus}
      textInputStyle={textInputStyle}
      value={field.value}
    />
  );
};

export default FormInput;
