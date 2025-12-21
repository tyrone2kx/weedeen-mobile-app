import useTheme from '@wd/utils/theme/useTheme';
import { FC, useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View, ViewStyle } from 'react-native';
import Text from '../Text/Text';

interface IProps {
  size?: number;
  style?: ViewStyle;
  section?: boolean;
  label?: string;
}

const Loader: FC<IProps> = ({ size = 50, style = {}, section, label }) => {
  const fillAnim = useRef(new Animated.Value(0)).current;

  const { theme } = useTheme();

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fillAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(fillAnim, {
          toValue: 0,
          duration: 800,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ]),
    ).start();
  }, [fillAnim]);

  const fillInterpolation = fillAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '140%'],
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: section ? '50%' : 'auto',
        rowGap: 6,
        ...style,
      }}
    >
      <Animated.View
        style={[
          styles.waterDrop,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: theme.gray[150],
          },
        ]}
      >
        <Animated.View
          style={[
            styles.waterDropFill,
            {
              backgroundColor: theme.blue.DEFAULT,
              height: fillInterpolation,
            },
          ]}
        />
      </Animated.View>
      {label && <Text intent="label">{label}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  waterDrop: {
    overflow: 'hidden',
  },
  waterDropFill: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '200%',
  },
});

export default Loader;
