/* eslint-disable react-native/no-inline-styles */
import { Theme } from '@wd/utils/Theme';
import { generateUserInitials } from '@wd/utils/helpers';
import { useState } from 'react';
import {
  Image,
  ImageResizeMode,
  ImageStyle,
  Pressable,
  TextStyle,
  View,
} from 'react-native';

import Text from '../Text/Text';
import { UserIcon } from '../icons';

interface IProps {
  image?: string;
  style?: ImageStyle;
  size?: number;
  resizeMode?: ImageResizeMode;
  name?: string;
  color?: string;
  textStyles?: TextStyle;
  showName?: boolean;
  onPress?: () => void;
  disabled?: boolean;
  fallbackToLogo?: boolean;
  kemLogo?: boolean;
}

function getRandomNumber() {
  return Math.floor(Math.random() * 4);
}

const Avatar = ({
  image,
  style = {},
  size = 50,
  resizeMode = 'cover',
  name,
  textStyles = {},
  color,
  showName,
  onPress,
  disabled = false,
  fallbackToLogo,
}: IProps) => {
  const obj = {
    primary: '#4E00DA',
    tertiary: '#F14FAD',
    secondary: '#FEB76A',
    blue: '#437EF7',
  };
  const colors = [obj.primary, obj.secondary, obj.tertiary, obj.blue];
  const backgroundColor = color || colors[getRandomNumber()];
  const [bgColor] = useState(backgroundColor);

  const avatarStyle = {
    height: size,
    width: size,
    borderRadius: size / 2,
  };

  const avatarIconStyle = {
    height: size / 2.5,
    width: size / 2.5,
  };

  return (
    <Pressable disabled={disabled} onPress={onPress}>
      {!image && showName ? (
        <View
          className="flex-row items-center justify-center"
          style={[
            {
              backgroundColor: bgColor,
            },
            avatarStyle,
            style,
          ]}
        >
          <Text
            className="uppercase text-white"
            intent="h6"
            style={textStyles}
            weight="bold"
          >
            {generateUserInitials(name ?? '')}
          </Text>
        </View>
      ) : !image && fallbackToLogo ? (
        <Image
          resizeMode={resizeMode}
          source={require('@assets/images/logo512.png')}
          style={[
            {
              borderWidth: 4,
              borderColor: Theme.colors.gray[150],
            },
            avatarStyle,
            style,
          ]}
        />
      ) : image ? (
        <Image
          resizeMode={resizeMode}
          source={{ uri: image }}
          style={[
            {
              borderWidth: 4,
              borderColor: Theme.colors.gray[150],
            },
            avatarStyle,
            style,
          ]}
        />
      ) : (
        <View
          className="items-center justify-center border-4 border-solid border-gray-150 bg-gray-400"
          style={[avatarStyle, style]}
        >
          <UserIcon
            color="white"
            height={avatarIconStyle.height}
            width={avatarIconStyle.width}
          />
        </View>
      )}
    </Pressable>
  );
};

export default Avatar;
