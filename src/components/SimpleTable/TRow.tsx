import { remapProps } from 'nativewind';
import { FC, ReactNode } from 'react';
import { View, ViewStyle } from 'react-native';

export type TRowProps = {
  children: ReactNode;
  style?: ViewStyle;
};

const TRow: FC<TRowProps> = ({ children, style }) => {
  return (
    <View className="flex-row" style={style}>
      {children}
    </View>
  );
};

export default remapProps(TRow, {
  className: 'style',
});
