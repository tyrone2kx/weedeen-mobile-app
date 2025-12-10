import { remapProps } from 'nativewind';
import { FC } from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';

import useTheme from '@wd/utils/theme/useTheme';
import { CloseIcon } from '../icons';

type CloseButtonIconProps = {
  onPress?: () => void;
  style?: ViewStyle;
};

const CloseButtonIcon: FC<CloseButtonIconProps> = ({ onPress, style }) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className="h-[48px] w-[48px] items-center justify-center rounded-full bg-gray-150"
      onPress={onPress}
      style={style}
    >
      <CloseIcon color={theme.black[600]} height={24} width={24} />
    </TouchableOpacity>
  );
};

export default remapProps(CloseButtonIcon, {
  className: 'style',
});
