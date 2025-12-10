import { remapProps } from 'nativewind';
import { FC, ReactNode } from 'react';
import { View, ViewStyle } from 'react-native';

export type TableProps = {
  children: ReactNode;
  style?: ViewStyle;
};

const Table: FC<TableProps> = ({ children, style }) => {
  return (
    <View className="rounded-lg border border-gray-200 pr-[0.5]" style={style}>
      {children}
    </View>
  );
};

export default remapProps(Table, {
  className: 'style',
});
