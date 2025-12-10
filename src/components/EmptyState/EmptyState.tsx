import { remapProps } from 'nativewind';
import { FC, ReactElement } from 'react';
import { StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { EmptyImage } from '../icons';

import Text from '../Text/Text';

interface EmptyStateProp {
  Image?: ReactElement;
  title?: string;
  info?: string;
  Action?: ReactElement;
  section?: boolean;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  descriptionStyle?: TextStyle;
}
const EmptyState: FC<EmptyStateProp> = ({
  Image,
  title = 'Nothing to see here',
  info = 'There are no available items.',
  Action,
  section,
  style,
  titleStyle,
  descriptionStyle,
}) => {
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
      {Image || <EmptyImage />}
      {title && (
        <Text className="mt-4 text-center" intent="h3" style={titleStyle}>
          {title}
        </Text>
      )}
      {info && (
        <Text className="mt-1 text-center" style={descriptionStyle}>
          {info}
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
