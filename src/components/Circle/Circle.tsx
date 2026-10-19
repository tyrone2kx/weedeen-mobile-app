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
  color = '#2563EB',
  className,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      className={`items-center justify-center ${className ?? ''}`}
      onPress={onPress}
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color || style?.backgroundColor,
          shadowColor: color || '#2563EB',
          shadowOpacity: 0.3,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 8 },
          elevation: 6,
        },
        style,
      ]}
    >
      {children}
    </TouchableOpacity>
  );
};

export default Circle;
