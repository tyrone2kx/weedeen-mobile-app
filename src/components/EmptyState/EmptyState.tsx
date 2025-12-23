import { remapProps } from 'nativewind';
import { FC, ReactElement } from 'react';
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
  return (
    <View
      style={[
        styles.container,
        {
          marginVertical: section ? '50%' : 'auto',
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
              className="flex-row items-center justify-center rounded-lg bg-gray-600 border"
              style={{
                height: 80,
                width: 80,
                borderColor: theme.gray[300],
                backgroundColor: '#4b5563',
              }}
            >
              {icon}
            </View>
          )}
        </View>
      )}
      {title && (
        <Text
          className="mt-4 text-center"
          intent="h3"
          style={{ color: theme.black[400], ...titleStyle }}
        >
          {title}
        </Text>
      )}
      {description && (
        <Text
          className="mt-1 text-center"
          style={descriptionStyle}
          weight="light"
        >
          {description}
        </Text>
      )}
      {Action && <View className="mt-4 flex-row">{Action}</View>}
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
