import moment from 'moment';
import { remapProps } from 'nativewind';
import { FC } from 'react';
import { View, ViewStyle } from 'react-native';

import Cell, { CellProps } from './Cell';

type DateCellProps = Omit<CellProps, 'date'> & {
  dates: moment.Moment[];
  style?: ViewStyle;
};

const DateCell: FC<DateCellProps> = ({ style, dates, ...props }) => {
  return (
    // Render date cells with dates and highlighting the selected date
    <View className="flex-row flex-wrap" style={style}>
      {dates.map((date) => (
        <Cell date={date} key={date.format('YYYY-MM-DD')} {...props} />
      ))}
    </View>
  );
};

export default remapProps(DateCell, {
  className: 'style',
  containerStyle: 'containerStyle',
  buttonStyle: 'containerStyle',
  textStyle: 'containerStyle',
});
