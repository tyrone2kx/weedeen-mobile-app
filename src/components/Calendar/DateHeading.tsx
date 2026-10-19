import { remapProps } from 'nativewind';
import { FC } from 'react';
import { TextStyle, View, ViewStyle } from 'react-native';

import Text from '../Text/Text';

type DayHeadingProps = {
  daysOfWeek: string[];
  style?: ViewStyle;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
};

const DayHeading: FC<DayHeadingProps> = ({
  daysOfWeek,
  containerStyle,
  textStyle,
  style,
}) => {
  return (
    // Render days of the week (Sun - Sat)
    <View className="flex-row rounded-2xl bg-gray-150 dark:bg-[#232D3A]" style={style}>
      {daysOfWeek.map((day) => (
        <View
          className="h-[40px] w-[14.23571%] items-center justify-center"
          key={day}
          style={containerStyle}
        >
          <Text className="text-black dark:text-[#E7ECF3]" style={textStyle}>
            {day}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default remapProps(DayHeading, {
  className: 'style',
  containerStyle: 'containerStyle',
  textStyle: 'textStyle',
});
