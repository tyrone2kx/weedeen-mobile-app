import { Theme } from '@wd/utils/Theme';
import React, { FC } from 'react';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import { fontelloConfig } from '../fontello/fontelloConfig';

const IconComponent = createIconSetFromFontello(fontelloConfig);

type IconProps = {
  name: string;
  size?: number;
  color?: string;
};

const Icon: FC<IconProps> = ({ name, size, color }) => {
  return (
    <IconComponent
      color={color || Theme.colors.black[600]}
      name={name}
      size={size}
    />
  );
};

export default Icon;
