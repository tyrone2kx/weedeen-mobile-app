import { Theme } from '@wd/utils/Theme';
import { IDisclosure } from '@wd/utils/useDisclosure/useDisclosure';
import React, { useState } from 'react';
import {
  LayoutAnimation,
  Platform,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  UIManager,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Icon from '../Icon/Icon';
import Text from '../Text/Text';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

interface IProps {
  defaultHeight?: number;
  children: React.ReactNode;
  title?: string;
  titleStyle?: TextStyle;
  headerComponent?: React.ReactNode;
  containerStyle?: ViewStyle;
  childrenContainerStyle?: ViewStyle;
  handler?: IDisclosure;
}

const Accordion = ({
  defaultHeight = 60,
  title,
  titleStyle,
  headerComponent,
  children,
  containerStyle,
  childrenContainerStyle,
  handler,
}: IProps) => {
  const rotateValue = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotateValue.value}deg` }],
    };
  });

  const isControlled = !!handler;

  const contentHeight = useSharedValue(0);
  const [expanded, setExpanded] = useState<boolean>(false);

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (!isControlled) {
      setExpanded(!expanded);
    } else {
      handler?.toggle();
    }
  };

  return (
    <View style={[styles.accordionContainer, containerStyle]}>
      {!isControlled ? (
        <TouchableOpacity
          activeOpacity={0.95}
          onPress={() => {
            toggle();
            if (!expanded) {
              rotateValue.value = withTiming(180, { duration: 300 });
            } else {
              rotateValue.value = withTiming(0, { duration: 300 });
            }
          }}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: defaultHeight,
          }}
        >
          {headerComponent || (
            <Text intent="h3" style={titleStyle}>
              {title}
            </Text>
          )}
          <Animated.View style={[animatedStyle]}>
            <Icon
              color={Theme.colors.gray.DEFAULT}
              name="arrow-down"
              size={18}
            />
          </Animated.View>
        </TouchableOpacity>
      ) : (
        <View />
      )}
      {expanded || handler?.isOpen ? (
        <View
          onLayout={event => {
            contentHeight.value =
              event.nativeEvent.layout.height + defaultHeight;
          }}
          style={[
            { paddingHorizontal: 0, paddingBottom: 20 },
            childrenContainerStyle,
          ]}
        >
          {children}
        </View>
      ) : null}
    </View>
  );
};

export default Accordion;

const styles = StyleSheet.create({
  accordionContainer: {
    // backgroundColor: '#FFF',
    width: '100%',
    overflow: 'hidden',
    paddingHorizontal: 0,
  },
});
