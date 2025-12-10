import { globalStyles } from '@wd/utils/GlobalStyles';
import useTheme from '@wd/utils/theme/useTheme';
import { remapProps } from 'nativewind';
import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import Icon from '../Icon/Icon';

import Text from '../Text/Text';

interface IProps {
  headerComponent?: React.ReactElement;
  headerTitle?: string;
  leftContent?: React.ReactElement;
  rightContent?: React.ReactElement;
  showRightContent?: boolean;
  canGoBack?: boolean;
  transparent?: boolean;
  onBack?: () => void;
  navigation: any;
  iconColor?: string;
  style?: ViewStyle;
}

const Header: FC<IProps> = ({
  headerTitle,
  leftContent,
  canGoBack,
  showRightContent,
  rightContent,
  transparent,
  headerComponent,
  onBack,
  navigation,
  iconColor,
  style,
}) => {
  const bgColorClassName = transparent ? 'bg-transparent' : 'bg-white';

  const textColorClassName = transparent ? 'text-white' : 'text-black-600';

  const { theme } = useTheme();

  const handleBackPress = () => {
    if (onBack) {
      onBack();
    } else if (navigation?.canGoBack()) {
      navigation?.goBack();
    }
  };

  return (
    <View
      className={`h-[64px] justify-center ${bgColorClassName}`}
      style={[style]}
    >
      <View
        className="flex-row items-center justify-between"
        style={globalStyles.screen_gutter}
      >
        {canGoBack ? (
          <TouchableOpacity
            activeOpacity={0.8}
            className="h-full flex-1 flex-row items-center gap-x-3"
            onPress={handleBackPress}
          >
            {canGoBack ? (
              <Icon
                color={iconColor ?? theme.black[600]}
                name="arrow-left"
                size={25}
              />
            ) : null}
            {leftContent || headerComponent || (
              <Text
                className={`${textColorClassName}`}
                ellipsizeMode="tail"
                intent="h3"
                numberOfLines={1}
                style={{
                  flex: showRightContent ? 0.5 : 0.9,
                }}
                weight="semibold"
              >
                {headerTitle ?? ''}
              </Text>
            )}
          </TouchableOpacity>
        ) : (
          <View className="flex-1 flex-row items-center gap-x-3">
            {leftContent || (
              <Text
                className={`${textColorClassName}`}
                ellipsizeMode="tail"
                intent="h3"
                style={{ flex: showRightContent ? 0.5 : 0.9 }}
                weight="semibold"
              >
                {headerTitle ?? ''}
              </Text>
            )}
          </View>
        )}
        {showRightContent ? (
          <View className="flex-row items-center gap-x-3">
            <TouchableOpacity
              activeOpacity={0.8}
              className="bg-gray-150"
              style={styles.header_button}
            >
              <Icon color={theme.black[600]} name="search-normal" size={20} />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              className="bg-gray-150"
              style={styles.header_button}
            >
              <Icon color={theme.black[600]} name="shopping-cart" size={20} />
            </TouchableOpacity>
          </View>
        ) : (
          rightContent || null
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header_button: {
    width: 40,
    height: 40,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default remapProps(Header, {
  className: 'style',
});
