import useTheme from '@wd/utils/theme/useTheme';
import moment from 'moment';
import { remapProps } from 'nativewind';
import React, { FC, JSX, useEffect, useMemo, useRef, useState } from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Icon from '../Icon/Icon';

import Text from '../Text/Text';

interface IDayCellProps {
  day: string | number;
  isSelected?: boolean;
  onClick?: () => void;
  outOfRange?: boolean;
  isDisabled?: boolean;
  isToday?: boolean;
}

const DayCell: FC<IDayCellProps> = ({
  day,
  isSelected,
  onClick,
  outOfRange,
  isDisabled,
}) => {
  const { theme } = useTheme();
  return (
    <TouchableOpacity
      disabled={isDisabled || outOfRange}
      onPress={onClick}
      style={{
        ...styles.dayCell,
        backgroundColor: isSelected ? theme.green.DEFAULT : 'transparent',
      }}
    >
      <Text
        style={{
          textAlign: 'center',
          color: isSelected
            ? theme.white.DEFAULT
            : outOfRange && isDisabled
            ? theme.gray[150]
            : outOfRange
            ? '#900001'
            : isDisabled
            ? theme.gray[150]
            : theme.black[600],
        }}
      >
        {day}
      </Text>
    </TouchableOpacity>
  );
};

interface IProps {
  isRange?: boolean;
  label?: string;
  value?: moment.Moment;
  endDay?: moment.Moment;
  onChange?: (date: any) => void;
  style?: StyleProp<ViewStyle>;
  required?: boolean;
  width?: any;
  rightIcon?: any;
  leftIcon?: any;
  placeholder?: string;
  keepCalendarOpen?: boolean;
  hideInput?: boolean;
  maxDate?: Date | moment.Moment;
  minDate?: Date | moment.Moment;
  labelComponent?: React.ReactNode;
  intent?: 'solid' | 'outline';
  inputContainerStyle?: ViewStyle;
  popUpInputContainerStyle?: ViewStyle;
  labelContainerStyle?: ViewStyle;
  onClickInputContainer?: () => void;
}
type CountType = 0 | 1 | 2;

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const DatePicker: FC<IProps> = props => {
  const {
    isRange,
    value,
    endDay,
    onChange,
    label,
    style,
    required,
    width,
    rightIcon,
    leftIcon,
    placeholder,
    keepCalendarOpen,
    hideInput,
    maxDate,
    minDate,
    labelComponent,
    intent = 'solid',
    inputContainerStyle,
    popUpInputContainerStyle,
    labelContainerStyle,
    onClickInputContainer,
  } = props;
  const [showCalendar, setShowCalendar] = useState<boolean>(
    keepCalendarOpen || false,
  );
  const [selectedMonth, setSelectedMonth] = useState(moment());
  const [selectedDay, setSelectedDay] = useState(value);
  const [count, setCount] = useState<CountType>(0);
  const [selectedEndDay, setSelectedEndDay] = useState<
    moment.Moment | undefined
  >(endDay || moment().add(15, 'days'));

  const ref = useRef<any>(null);

  const { theme } = useTheme();

  const variants = useMemo(
    () => ({
      intent: {
        solid: {
          inputContainer: {
            backgroundColor: '#FCFCFC',
            borderRadius: 12,
            paddingHorizontal: 18,
            paddingVertical: 10,
            marginTop: 3,
          },
          animatedBorder: {
            start: theme.gray[300],
            stop: theme.green.DEFAULT,
          },
          labelContainer: 'mb-1',
        },
        outline: {
          inputContainer: {},
          animatedBorder: {
            start: theme.gray[300],
            stop: theme.green.DEFAULT,
          },
          labelContainer: '',
        },
      },
    }),
    [theme],
  );

  const handleOnChangeProps = val => {
    onChange?.(val);
  };

  useEffect(() => {
    if (value) {
      setSelectedDay(value);
    }
  }, [value]);

  useEffect(() => {
    if (keepCalendarOpen) {
      setShowCalendar(keepCalendarOpen);
    }
  }, [keepCalendarOpen]);

  const handleDateSelection = (date: moment.Moment) => {
    if (isRange) {
      if (count === 0 || count === 2) {
        setSelectedEndDay(undefined);
        setSelectedDay(date);
        setCount(1);
      } else if (count === 1) {
        setSelectedEndDay(date);
        handleOnChangeProps?.([selectedDay, date]);
        setCount(2);
        if (!keepCalendarOpen) {
          setShowCalendar(false);
        }
      }
    } else {
      date.hour(12);
      setSelectedDay(date);
      handleOnChangeProps?.(date);
      if (!keepCalendarOpen) {
        setShowCalendar(false);
      }
    }
    borderWidthValue.value = withTiming(1);
  };

  const previousMonthDays = () => {
    const previousDays: JSX.Element[] = [];
    const firstOfMonth = selectedMonth.startOf('month');

    // Check if Month starts with a Sunday
    if (firstOfMonth.day() !== 0) {
      const previousSunday = moment(selectedMonth)
        .subtract(1, 'months')
        .endOf('month')
        .day('Sunday');
      const dayDifference = firstOfMonth.diff(previousSunday, 'day') + 1;

      for (let i = 0; i < dayDifference; i++) {
        const date = moment(firstOfMonth);
        date.subtract(dayDifference - i, 'day');
        previousDays.push(
          <DayCell
            day={date.format('D')}
            isDisabled={
              minDate
                ? moment(date).isBefore(minDate, 'day')
                : maxDate
                ? moment(date).isAfter(maxDate, 'day')
                : false
            }
            isSelected={
              isRange
                ? (selectedEndDay
                    ? date.isBetween(
                        moment(selectedDay).subtract(1, 'day'),
                        moment(selectedEndDay).add(1, 'day'),
                      )
                    : false) || date.isSame(selectedDay, 'day')
                : date.isSame(selectedDay, 'day')
            }
            key={i + 31}
            onClick={() => handleDateSelection(date)}
            outOfRange={
              minDate
                ? moment(date).isBefore(minDate, 'day')
                : maxDate
                ? moment(date).isAfter(maxDate, 'day')
                : false
            }
          />,
        );
      }
    }
    return previousDays;
  };

  const nextMonthDays = () => {
    const nextDays: JSX.Element[] = [];
    const nextDates: moment.Moment[] = [];
    const lastOfMonth = selectedMonth.endOf('month');

    // Check if Month ends with a Saturday
    if (lastOfMonth.day() !== 6) {
      const date = moment(lastOfMonth).add(1, 'day');
      nextDates.push(date);
      nextDays.push(
        <DayCell
          day={date.format('D')}
          isDisabled={
            minDate
              ? moment(date).isBefore(minDate, 'day')
              : maxDate
              ? moment(date).isAfter(maxDate, 'day')
              : false
          }
          isSelected={
            isRange
              ? (selectedEndDay
                  ? date.isBetween(
                      moment(selectedDay).subtract(1, 'day'),
                      moment(selectedEndDay).add(1, 'day'),
                    )
                  : false) || date.isSame(selectedDay, 'day')
              : date.isSame(selectedDay, 'day')
          }
          key={date.format('DD/MM/YYYY')}
          onClick={() => {
            handleDateSelection(date);
          }}
          outOfRange={false}
        />,
      );
      while (nextDates[nextDates.length - 1].day() !== 6) {
        const newDate = nextDates[nextDates.length - 1].add(1, 'day');
        nextDates.push(newDate);
        nextDays.push(
          <DayCell
            day={newDate.format('D')}
            isDisabled={
              minDate
                ? moment(date).isBefore(minDate, 'day')
                : maxDate
                ? moment(date).isAfter(moment(maxDate), 'day')
                : false
            }
            isSelected={
              isRange
                ? (selectedEndDay
                    ? newDate.isBetween(
                        moment(selectedDay).subtract(1, 'day'),
                        moment(selectedEndDay).add(1, 'day'),
                      )
                    : false) || newDate.isSame(selectedDay, 'day')
                : newDate.isSame(selectedDay, 'day')
            }
            key={newDate.format('DD/MM/YYYY')}
            onClick={() => handleDateSelection(newDate)}
            outOfRange={
              minDate
                ? moment(date).isBefore(minDate, 'day')
                : maxDate
                ? moment(date).isAfter(moment(maxDate), 'day')
                : false
            }
          />,
        );
      }
    }
    return nextDays;
  };

  const getDaysOfMonth = () => {
    const daysOfMonth: JSX.Element[] = [];
    for (let i = 1; i <= selectedMonth.daysInMonth(); i++) {
      const date = moment(selectedMonth);
      date.set('date', i);
      date.hour(12);
      daysOfMonth.push(
        <DayCell
          day={i}
          isDisabled={
            minDate
              ? moment(date).isBefore(minDate, 'day')
              : maxDate
              ? moment(date).isAfter(maxDate, 'day')
              : false
          }
          isSelected={
            isRange
              ? (selectedEndDay
                  ? date.isBetween(
                      moment(selectedDay).subtract(1, 'day'),
                      moment(selectedEndDay).add(1, 'day'),
                    )
                  : false) || date.isSame(selectedDay, 'day')
              : date.isSame(selectedDay, 'day')
          }
          isToday={date.isSame(moment(), 'day')}
          key={i}
          onClick={() => handleDateSelection(date)}
          outOfRange={false}
        />,
      );
    }
    return daysOfMonth;
  };

  const getRows = () => {
    const slots: JSX.Element[] = [
      ...previousMonthDays(),
      ...getDaysOfMonth(),
      ...nextMonthDays(),
    ];

    let cells: JSX.Element[] = [];
    return slots.reduce(
      (prev: JSX.Element[][], curr, index) => {
        if (index % 7 === 0) {
          prev.push(cells);
          cells = [];
        }
        cells.push(curr);
        if (index === slots.length - 1) {
          prev.push(cells);
        }
        return prev;
      },
      [[]],
    );
  };

  enum ASEnum {
    add = 'add',
    subtract = 'subtract',
  }

  const onChangeMonth = (val: ASEnum) => {
    const newSelectedMonth = moment(selectedMonth);
    if (val === ASEnum.add) {
      newSelectedMonth.add(1, 'month');
    } else {
      newSelectedMonth.subtract(1, 'month');
    }
    setSelectedMonth(newSelectedMonth);
  };

  const onChangeYear = (val: ASEnum) => {
    const year = moment(selectedMonth).startOf('year');
    const month = moment(selectedMonth).month();
    if (val === ASEnum.add) {
      year.add(1, 'year');
    } else {
      year.subtract(1, 'year');
    }
    const newSelectedMonth = moment(year).month(month);
    setSelectedMonth(newSelectedMonth);
    setYearText(newSelectedMonth.format('YYYY'));
  };

  const [yearText, setYearText] = useState(selectedMonth.format('YYYY'));

  const handleYearInput = val => {
    setYearText(val);
    if (val.length === 4) {
      const month = moment(selectedMonth).month();
      const date = moment()
        .month(month)
        .year(parseInt(val, 10))
        .startOf('month');
      setSelectedMonth(date);
    }
  };

  const borderWidthValue = useSharedValue(1);
  const reanimtedBorderStyle = useAnimatedStyle(() => {
    const borderColor = interpolateColor(
      borderWidthValue.value,
      [1, 1.5],
      [
        variants.intent[intent].animatedBorder.start,
        variants.intent[intent].animatedBorder.stop,
      ],
    );

    if (intent === 'solid') {
      return {
        borderWidth: borderWidthValue.value,
        borderColor,
      };
    }

    if (intent === 'outline') {
      return {
        borderWidth: borderWidthValue.value,
        borderBottomColor: borderColor,
        borderTopColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
      };
    }

    return {};
  });

  const hasLabel = label || labelComponent;

  return (
    <View className="mb-5 flex-col" style={[{ width: width ?? '100%' }, style]}>
      {!hideInput && (
        <>
          {hasLabel && (
            <View
              className={`flex-row ${variants.intent[intent].labelContainer}`}
              style={labelContainerStyle}
            >
              {label && <Text intent="label">{label}</Text>}
              {labelComponent && labelComponent}
              {required && (
                <Text className="ml-0.5 text-red" intent="label">
                  *
                </Text>
              )}
            </View>
          )}
          <AnimatedTouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              onClickInputContainer?.();

              setShowCalendar(prev => {
                const val = !prev;
                if (val) {
                  borderWidthValue.value = withTiming(1.5);
                } else {
                  borderWidthValue.value = withTiming(1);
                }
                return !prev;
              });
            }}
            ref={ref}
            style={[
              styles.inputContainer,
              reanimtedBorderStyle,
              variants.intent[intent].inputContainer,
              inputContainerStyle,
            ]}
          >
            <View style={{ flexDirection: 'row' }}>
              {leftIcon}
              <Text className={`${selectedDay ? 'text-black' : 'text-gray'}`}>
                {!selectedDay
                  ? placeholder || ''
                  : isRange
                  ? `${moment(selectedDay).format('DD/MM/YYYY')} - ${moment(
                      selectedEndDay,
                    ).format('DD/MM/YYYY')}`
                  : moment(selectedDay).format('Do MMM, YYYY')}
              </Text>
            </View>
            {rightIcon}
          </AnimatedTouchableOpacity>
        </>
      )}

      {showCalendar && (
        <View
          className="border-gray-200"
          style={[styles.container, popUpInputContainerStyle]}
        >
          <View
            style={{
              backgroundColor: theme.white.DEFAULT,
              borderTopRightRadius: 5,
              borderTopLeftRadius: 5,
            }}
          >
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomColor: theme.gray[150],
                borderBottomWidth: 1,
                paddingVertical: 5,
              }}
            >
              <View
                style={{
                  width: '40%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 10,
                }}
              >
                <TouchableOpacity
                  onPress={() => onChangeMonth(ASEnum.subtract)}
                >
                  <Icon
                    color={theme.black[600]}
                    name="arrow-circle-left"
                    size={24}
                  />
                </TouchableOpacity>

                <Text>{selectedMonth.format('MMMM')}</Text>
                <TouchableOpacity onPress={() => onChangeMonth(ASEnum.add)}>
                  <Icon
                    color={theme.black[600]}
                    name="arrow-circle-right"
                    size={24}
                  />
                </TouchableOpacity>
              </View>

              <View
                style={{
                  width: '40%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 10,
                }}
              >
                <TouchableOpacity onPress={() => onChangeYear(ASEnum.subtract)}>
                  <Icon
                    color={theme.black[600]}
                    name="arrow-circle-left"
                    size={24}
                  />
                </TouchableOpacity>

                <TextInput
                  keyboardType="numeric"
                  maxLength={4}
                  onBlur={() => {
                    if (yearText.length < 4) {
                      setYearText(selectedMonth.format('YYYY'));
                    }
                  }}
                  onChangeText={handleYearInput}
                  style={{ color: theme.black[600] }}
                  value={yearText}
                />

                <TouchableOpacity onPress={() => onChangeYear(ASEnum.add)}>
                  <Icon
                    color={theme.black[600]}
                    name="arrow-circle-right"
                    size={24}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10,
                marginTop: 10,
                flexWrap: 'wrap',
              }}
            >
              <View style={styles.dayCell}>
                <Text className="text-center text-black">Su</Text>
              </View>
              <View style={styles.dayCell}>
                <Text className="text-center text-black">Mo</Text>
              </View>
              <View style={styles.dayCell}>
                <Text className="text-center text-black">Tu</Text>
              </View>
              <View style={styles.dayCell}>
                <Text className="text-center text-black">We</Text>
              </View>
              <View style={styles.dayCell}>
                <Text className="text-center text-black">Th</Text>
              </View>
              <View style={styles.dayCell}>
                <Text className="text-center text-black">Fr</Text>
              </View>
              <View style={styles.dayCell}>
                <Text className="text-center text-black">Sa</Text>
              </View>
            </View>
          </View>

          <View
            style={{
              backgroundColor: theme.white.DEFAULT,
              borderBottomRightRadius: 5,
              borderBottomLeftRadius: 5,
            }}
          >
            <View style={{ padding: 10 }}>
              {getRows().map((r, index) => {
                return (
                  <Pressable
                    key={index}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginBottom: 10,
                    }}
                  >
                    {r}
                  </Pressable>
                );
              })}
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 6,
  },
  header: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  headCell: {
    borderRadius: 3,
    padding: 5,
    width: 31,
  },
  dayCell: {
    borderRadius: 3,
    padding: 5,
    width: 31,
  },
  buttonHolder: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 48,
    justifyContent: 'space-between',
    width: '100%',
  },
  required: {
    color: 'red',
    fontWeight: 'bold',
  },
});

export default remapProps(DatePicker, {
  className: 'style',
  inputContainerStyle: 'inputContainerStyle',
  popUpInputContainerStyle: 'popUpInputContainerStyle',
  labelContainerStyle: 'labelContainerStyle',
});
