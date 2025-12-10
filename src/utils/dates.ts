import moment from 'moment';

const hoursInADay = 24 * 60 * 60 * 1000;

export const monthsInAYear = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const daysInAWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
export const fullDaysInAWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export const formatDuration = (durationInMs: number) => {
  const days = Math.floor(durationInMs / hoursInADay);

  const utcDate = moment.utc(durationInMs % hoursInADay);

  const formattedHourMinSec = utcDate.format('H[hr] mm[min] ss[s]');

  const formattedHourMin = utcDate.format('H[hr] mm[min]');

  const formattedDay = days > 0 ? `${days}${days === 1 ? 'day' : 'days'} ` : '';

  return {
    duration: `${formattedDay}${formattedHourMinSec}`,
    durationNoSecs: `${formattedDay}${formattedHourMin}`,
    days,
    leftOverDurationFromDays: utcDate,
  };
};

export const getDateDifference = (startDate: Date, endDate: Date) => {
  // create two moment objects for the given dates
  const date1 = moment(startDate);
  const date2 = moment(endDate);

  // get the difference in milliseconds
  const diff = date2.diff(date1);

  const { durationNoSecs } = formatDuration(diff);

  return durationNoSecs;
};

export const getDaysInAMonth = (selectedDay: moment.Moment) => {
  const daysArray: moment.Moment[] = [];
  for (let index = 0; index < selectedDay.daysInMonth(); index++) {
    const day = moment(selectedDay).startOf('month').add(index, 'days');
    daysArray.push(day);
  }
  return daysArray;
};

export const generateDates = (selectedDate: moment.Moment) => {
  const startOfMonth = selectedDate.clone().startOf('month');
  const endOfMonth = selectedDate.clone().endOf('month');

  const startDate = startOfMonth.clone().startOf('week');
  const endDate = endOfMonth.clone().endOf('week');

  const dates: moment.Moment[] = [];

  const current = startDate.clone();

  while (current.isSameOrBefore(endDate)) {
    dates.push(current.clone());
    current.add(1, 'day');
  }

  return dates;
};

export const dateIsWithinRange = (
  date: moment.Moment,
  minDate?: moment.Moment,
  maxDate?: moment.Moment,
) => {
  if (!minDate && !maxDate) {
    return true;
  }

  const minDateBool = minDate ? date.isSameOrAfter(minDate, 'day') : true;

  const maxDateBool = maxDate ? date.isSameOrBefore(maxDate, 'day') : true;

  return minDateBool && maxDateBool;
};

export const groupDataByDate = <T>(
  data?: T[],
  dateKey: string = 'created_at',
  toLocalTime: boolean = false,
): { date: string; fullDate: string; data: T[] }[] => {
  if (!data) return [];

  const groupedData: { [date: string]: T[] } = {};

  data.forEach((dataItem) => {
    const date = toLocalTime
      ? moment.utc(dataItem[dateKey]).local().format('YYYY-MM-DD')
      : moment(dataItem[dateKey]).format('YYYY-MM-DD');
    if (!groupedData[date]) {
      groupedData[date] = [];
    }

    const newDataDate = toLocalTime
      ? moment.utc(dataItem[dateKey]).local().format()
      : moment(dataItem[dateKey]);

    groupedData[date].push({
      ...dataItem,
      [dateKey]: newDataDate,
    });
  });

  // Convert object to array of objects with date and data
  const result = Object.keys(groupedData).map((date) => ({
    date,
    fullDate: groupedData[date][0][dateKey],
    data: groupedData[date],
  }));

  return result;
};

export const getStartAndEndDate = (
  range: 'week' | 'month' | 'year' | 'all',
) => {
  if (range === 'all') {
    return {
      startDate: undefined,
      endDate: undefined,
      formattedStartDate: '',
      formattedEndDate: '',
    };
  }

  const today = moment();

  const startDate = today.clone().startOf(range);
  const endDate = today.clone().endOf(range);

  const formattedStartDate = startDate.format('Do MMM');
  const formattedEndDate = endDate.format('Do MMM');

  return {
    startDate,
    endDate,
    formattedStartDate,
    formattedEndDate,
  };
};

export const datesInMonth = (date?: moment.Moment) => {
  const dateToUse = date ?? moment();

  const daysArray: string[] = [];

  for (let index = 0; index < dateToUse.daysInMonth(); index++) {
    const day = moment(dateToUse)
      .startOf('month')
      .add(index, 'days')
      .format('DD');
    daysArray.push(day);
  }
  return daysArray;
};

export const getDateIndex = (
  date?: string,
  array?: string[],
  formatter?: string,
) => {
  if (!date || !array || !formatter) return undefined;

  const formattedDate = moment(date).format(formatter);

  const foundDateIndex = array.findIndex((item) => item === formattedDate);

  return foundDateIndex === -1 ? undefined : foundDateIndex;
};

// filter data by date range
export const filterDataByDateRange = <T>(
  data?: T[],
  dateKey: string = 'created_at',
  startDate?: moment.Moment,
  endDate?: moment.Moment,
) => {
  if (!data || data?.length <= 0) {
    return [];
  }
  return data.filter((item: T) => {
    const date = moment(item[dateKey]);
    return dateIsWithinRange(date, startDate, endDate);
  });
};

export const getSecondsToHoursMinAndSecs = (seconds: number) => {
  const hour = Math.floor(seconds / 3600);
  const remainingSeconds = seconds % 3600;
  const min = Math.floor(remainingSeconds / 60);
  const sec = remainingSeconds % 60;

  const hourWithZeroPrefix = hour < 10 ? `0${hour}` : hour;
  const minWithZeroPrefix = min < 10 ? `0${min}` : min;
  const secWithZeroPrefix = sec < 10 ? `0${sec}` : sec;

  return {
    hour,
    min,
    sec,
    hourWithZeroPrefix,
    minWithZeroPrefix,
    secWithZeroPrefix,
  };
};
