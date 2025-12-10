import { Theme } from '@wd/utils/Theme';
import React, { FC, ReactNode } from 'react';
import { View, ViewStyle } from 'react-native';

interface IProps {
  size: number;
  style?: ViewStyle;
  children?: ReactNode;
  color?: string;
}

const Circle: FC<IProps> = ({ size, style, children, color }) => {
  return (
    <View
      className="h-[36px] w-[36px] items-center justify-center rounded-[36px] bg-gray"
      style={[
        { backgroundColor: color || Theme.colors.gray.DEFAULT },
        { width: size, height: size, borderRadius: size / 2 },
        style,
      ]}
    >
      {children}
    </View>
  );
};

export default Circle;
