import { generateDates } from '@wd/utils/dates';
import moment from 'moment';
import { FC, memo, useCallback, useMemo } from 'react';
import { View } from 'react-native';
import WheelDropdown from '../Dropdown/WheelDropdown';
import DateCell from './DateCell';
import DayHeading from './DateHeading';
import { DropdownOptionsType } from './types';

type CalendarProps = {
  currentDate: moment.Moment;
  maxDate?: moment.Moment;
  minDate?: moment.Moment;
  yearsFromCurrent?: number;
  yearsAfterCurrent?: number;
  onSelectDate?: (date: moment.Moment) => void;
};

// Get months
const monthOptions = moment.months().map((month, index) => ({
  label: month,
  value: index + 1,
}));

const getYears = (yearsFromCurrent: number, yearsAfterCurrent: number) => {
  const yearOptions: DropdownOptionsType[] = [];

  const currentYear = moment().year();

  // Get years -+50 years from current year
  for (
    let year = currentYear - yearsFromCurrent;
    year <= currentYear + yearsAfterCurrent;
    year++
  ) {
    yearOptions.push({ label: `${year}`, value: year });
  }

  return yearOptions;
};

const Calendar: FC<CalendarProps> = ({
  currentDate,
  maxDate,
  minDate,
  yearsFromCurrent = 50,
  yearsAfterCurrent = 50,
  onSelectDate,
}) => {
  // Generate dates to fill the cells
  const dates = useMemo(() => generateDates(currentDate), [currentDate]);

  const yearOptions = useMemo(
    () => getYears(yearsFromCurrent, yearsAfterCurrent),
    [yearsAfterCurrent, yearsFromCurrent],
  );

  const monthValue = useMemo(() => currentDate.month() + 1, [currentDate]);

  const yearValue = useMemo(() => currentDate.year(), [currentDate]);

  const handleSelectMonth = useCallback(
    (month: string | number) => {
      // Use .clone() to create a new object and ensure re-render works
      onSelectDate?.(currentDate.clone().month(Number(month) - 1));
    },
    [onSelectDate, currentDate],
  );

  const handleSelectYear = useCallback(
    (year: string | number) => {
      // Use .clone() to create a new object and ensure re-render works
      onSelectDate?.(currentDate.clone().year(Number(year)));
    },
    [onSelectDate, currentDate],
  );

  return (
    <View>
      <View className="mx-auto mb-5 w-64 flex-row gap-x-4">
        {/* Render dropdowns for year and month */}

        <WheelDropdown
          className="mb-0 flex-1"
          inputContainerStyle="rounded-3xl border-green h-[40px]"
          inputPlaceholder="Month"
          items={monthOptions}
          onSelectValue={handleSelectMonth}
          value={monthValue}
        />

        <WheelDropdown
          className="mb-0 flex-1"
          inputContainerStyle="rounded-3xl border-green h-[40px]"
          inputPlaceholder="Year"
          items={yearOptions}
          onSelectValue={handleSelectYear}
          value={yearValue}
        />
      </View>

      <View>
        {/* Render days of the week (Sun - Sat) */}
        <DayHeading className="mb-2" daysOfWeek={moment.weekdaysMin()} />

        {/* Render date cells with generated dates, highlighting the selected date */}
        <DateCell
          dates={dates}
          maxDate={maxDate}
          minDate={minDate}
          onDatePress={onSelectDate}
          selectedDate={currentDate}
        />
      </View>
    </View>
  );
};

export default memo(Calendar);
