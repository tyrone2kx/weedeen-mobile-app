import React, { FC, ReactNode } from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';

interface IProps {
  size: number;
  style?: ViewStyle;
  children?: ReactNode;
  color?: string;
  className?: string;
  onPress?: () => void;
}

const Circle: FC<IProps> = ({
  size,
  style,
  children,
  color = '#9ca3af',
  className,
  onPress,
}) => {
  return (
    <TouchableOpacity
      className={`h-[36px] w-[36px] items-center bg-gray-400 justify-center rounded-[36px] bg-gray ${className}`}
      onPress={onPress}
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color || style?.backgroundColor,
        },
        style,
      ]}
    >
      {children}
    </TouchableOpacity>
  );
};

export default Circle;
