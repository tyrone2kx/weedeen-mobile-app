import { remapProps } from 'nativewind';
import { FC, ReactElement, cloneElement, isValidElement } from 'react';
import { StyleSheet, TextStyle, View, ViewStyle } from 'react-native';

import useTheme from '@wd/utils/theme/useTheme';
import Text from '../Text/Text';

interface EmptyStateProp {
  icon?: ReactElement;
  title?: string;
  description?: string;
  Action?: ReactElement;
  section?: boolean;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  descriptionStyle?: TextStyle;
  iconIsImage?: boolean;
}
const EmptyState: FC<EmptyStateProp> = ({
  icon,
  title = 'Nothing to see here',
  description = 'There are no available items.',
  Action,
  section,
  style,
  titleStyle = {},
  descriptionStyle,
  iconIsImage,
}) => {
  const { theme } = useTheme();

  const tintedIcon =
    icon && isValidElement(icon) && !iconIsImage
      ? cloneElement(icon as ReactElement<any>, {
          color: theme.blue.DEFAULT,
        })
      : icon;

  return (
    <View
      style={[
        styles.container,
        {
          marginVertical: section ? '25%' : 'auto',
        },
        style,
      ]}
    >
      {icon && (
        <View className="mb-4">
          {iconIsImage ? (
            icon
          ) : (
            <View
              style={{
                height: 76,
                width: 76,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: theme.blue[300],
              }}
            >
              {tintedIcon}
            </View>
          )}
        </View>
      )}
      {title && (
        <Text
          className="mt-2 text-center"
          intent="h3"
          style={{ color: theme.black[700], ...titleStyle }}
          weight="bold"
        >
          {title}
        </Text>
      )}
      {description && (
        <Text
          className="mt-1 text-center"
          intent="sm"
          style={{ color: theme.gray[500], ...descriptionStyle }}
        >
          {description}
        </Text>
      )}
      {Action && <View className="mt-5 flex-row">{Action}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
    backgroundColor: 'transparent',
  },
});

export default remapProps(EmptyState, {
  className: 'style',
  titleStyle: 'titleStyle',
  descriptionStyle: 'descriptionStyle',
});
