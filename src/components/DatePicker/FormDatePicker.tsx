/* eslint-disable @typescript-eslint/no-floating-promises */
import { Theme } from '@wd/utils/Theme';
import { useField } from 'formik';
import moment from 'moment';
import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import Text from '../Text/Text';
import DatePicker, { DatePickerProps } from './DatePicker';

export interface FormDatePickerProps extends Omit<
  DatePickerProps,
  'value' | 'endDay' | 'onChange'
> {
  name: string;
  isRange?: boolean;
  endDateName?: string;
  onValueChange?: (date: any) => void;
  showError?: boolean;
  errorContainerStyle?: any;
}

const FormDatePicker: FC<FormDatePickerProps> = ({
  name,
  isRange = false,
  endDateName,
  onValueChange,
  showError = true,
  errorContainerStyle,
  ...rest
}) => {
  const [startField, startMeta, startHelpers] = useField<
    moment.Moment | undefined
  >(name);
  const [endField, endMeta, endHelpers] = useField<moment.Moment | undefined>(
    endDateName || `${name}End`,
  );

  const handleChange = (date: any) => {
    if (isRange && Array.isArray(date)) {
      const [startDate, endDate] = date;
      startHelpers.setValue(startDate);
      if (endDateName) {
        endHelpers.setValue(endDate);
      }
      onValueChange?.([startDate, endDate]);
    } else {
      startHelpers.setValue(date);
      startHelpers.setTouched(true);
      onValueChange?.(date);
    }
  };

  const getDateValue = () => {
    if (isRange && endDateName) {
      return {
        value: startField.value,
        endDay: endField.value,
      };
    }
    return {
      value: startField.value,
      endDay: isRange ? endField.value : undefined,
    };
  };

  const dateValues = getDateValue();

  const getErrorMessage = () => {
    const startError = startMeta.touched && startMeta.error;
    const endError = endDateName && endMeta.touched && endMeta.error;

    if (startError && endError) {
      return `Start Date: ${startError}, End Date: ${endError}`;
    }
    if (startError) return startError;
    if (endError) return endError;
    return undefined;
  };

  const hasError = getErrorMessage();

  return (
    <View style={styles.container}>
      <DatePicker
        {...rest}
        endDay={dateValues.endDay}
        isRange={isRange}
        onChange={handleChange}
        value={dateValues.value}
      />

      {showError && hasError && (
        <View style={[styles.errorContainer, errorContainerStyle]}>
          <Text style={styles.errorText}>{getErrorMessage()}</Text>
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
    color: Theme.colors.red.DEFAULT,
    fontSize: 12,
  },
});

export default FormDatePicker;
