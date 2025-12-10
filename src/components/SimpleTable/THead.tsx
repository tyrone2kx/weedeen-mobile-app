import { remapProps } from 'nativewind';
import { FC, ReactNode } from 'react';
import { View, ViewStyle } from 'react-native';

export type THeadProps = {
  children: ReactNode;
  style?: ViewStyle;
};

const THead: FC<THeadProps> = ({ children, style }) => {
  return (
    <View
      className="rounded-t-lg border-b border-b-gray-200 bg-white-300"
      style={style}
    >
      {children}
    </View>
  );
};

export default remapProps(THead, {
  className: 'style',
});
