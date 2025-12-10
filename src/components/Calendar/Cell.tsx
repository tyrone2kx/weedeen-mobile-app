import { dateIsWithinRange } from '@wd/utils/dates';
import moment from 'moment';
import { FC } from 'react';
import { TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import Text from '../Text/Text';

export type CellProps = {
  buttonStyle?: ViewStyle;
  containerStyle?: ViewStyle;
  maxDate?: moment.Moment;
  minDate?: moment.Moment;
  onDatePress?: (date: moment.Moment) => void;
  selectedDate: moment.Moment;
  textStyle?: TextStyle;
  date: moment.Moment;
};

const Cell: FC<CellProps> = ({
  selectedDate,
  buttonStyle,
  containerStyle,
  maxDate,
  minDate,
  onDatePress,
  textStyle,
  date,
}) => {
  return (
    <View
      className="h-[40px] w-[14.23571%] p-[3px]"
      key={date.format('YYYY-MM-DD')}
      style={containerStyle}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        className={`h-full w-full items-center justify-center rounded-md border ${
          date.isSame(selectedDate, 'day')
            ? 'border-green bg-green-300'
            : 'border-transparent bg-white'
        }`}
        disabled={!dateIsWithinRange(date, minDate, maxDate)}
        onPress={() => onDatePress?.(date)}
        style={buttonStyle}
      >
        <Text
          className={` ${
            !dateIsWithinRange(date, minDate, maxDate)
              ? 'text-gray'
              : 'text-black'
          } ${date.isSame(selectedDate, 'day') ? 'text-green' : ''}`}
          style={textStyle}
        >
          {date.format('D')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Cell;
