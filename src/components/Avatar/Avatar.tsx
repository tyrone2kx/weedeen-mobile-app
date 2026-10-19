import { Theme } from '@wd/utils/Theme';
import { generateUserInitials } from '@wd/utils/helpers';
import {
  Image,
  ImageResizeMode,
  ImageStyle,
  Pressable,
  TextStyle,
  View,
} from 'react-native';

import useTheme from '@wd/utils/theme/useTheme';
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
  borderColor?: string;
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
  borderColor,
}: IProps) => {
  const { theme } = useTheme();

  // Default: brand-tinted circle with brand-blue initials (matches mockup).
  const useTint = !color;
  const backgroundColor = color || theme.blue[300];
  const initialsColor = useTint ? theme.blue.DEFAULT : '#FFFFFF';

  const avatarStyle = {
    height: size,
    width: size,
    borderRadius: size / 2,
    borderColor: borderColor || theme.gray[200],
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
          style={[{ backgroundColor }, avatarStyle, style]}
        >
          <Text
            intent="h6"
            style={{ color: initialsColor, ...textStyles }}
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
            { borderWidth: 4, borderColor: Theme.colors.gray[150] },
            avatarStyle,
            style,
          ]}
        />
      ) : image ? (
        <Image
          resizeMode={resizeMode}
          source={{ uri: image }}
          style={[
            { borderWidth: 4, borderColor: Theme.colors.gray[150] },
            avatarStyle,
            style,
          ]}
        />
      ) : (
        <View
          className="items-center justify-center"
          style={[{ backgroundColor: theme.blue[300] }, avatarStyle, style]}
        >
          <UserIcon
            color={theme.blue.DEFAULT}
            height={avatarIconStyle.height}
            width={avatarIconStyle.width}
          />
        </View>
      )}
    </Pressable>
  );
};

export default Avatar;
