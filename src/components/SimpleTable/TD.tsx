import { remapProps } from 'nativewind';
import { FC } from 'react';
import { TextStyle, View, ViewStyle } from 'react-native';

import Text, { TextProps } from '../Text/Text';

export type TDProps = {
  children?: string | number;
  style?: ViewStyle;
  textStyle?: TextStyle;
  textProps?: TextProps;
};

const TD: FC<TDProps> = ({ children, style, textStyle, textProps }) => {
  return (
    <View className="flex-1 border-r border-r-gray-400 p-2" style={style}>
      {children ? (
        <Text
          className="text-center text-black"
          style={textStyle}
          {...textProps}
        >
          {children}
        </Text>
      ) : null}
    </View>
  );
};

export default remapProps(TD, {
  className: 'style',
  textStyle: 'textStyle',
});
