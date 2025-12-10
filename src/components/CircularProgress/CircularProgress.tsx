import { Theme } from '@wd/utils/Theme';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import Text from '../Text/Text';

interface IProps {
  color?: string;
  value: number;
  hideLabel?: boolean;
  size?: number;
  strokeWidth?: number;
  children?: React.ReactNode;
}

const CircularProgress: FC<IProps> = ({
  color = Theme.colors.green.DEFAULT,
  value,
  hideLabel,
  size = 48,
  strokeWidth = 4,
  children,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = value / 100;

  const progressColor = color || '#000';
  const bgColor = Theme.colors.gray[150];

  const progressDashArray = `${circumference} ${circumference}`;
  const progressDashOffset = circumference * (1 - progress);

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
      ]}
    >
      <Svg height={size} width={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          fill="none"
          r={radius}
          stroke={bgColor}
          strokeWidth={strokeWidth}
        />
        <Path
          d={`M${size / 2},${size / 2 - radius} A${radius},${radius} 0 1 1 ${
            size / 2 - 0.01
          },${size / 2 - radius}`}
          fill="none"
          stroke={progressColor}
          strokeDasharray={progressDashArray}
          strokeDashoffset={progressDashOffset}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
        />
      </Svg>
      {!hideLabel ? (
        <Text style={styles.label}>{value}%</Text>
      ) : (
        <View style={styles.label}>{children}</View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  label: {
    position: 'absolute',
  },
});

export default CircularProgress;
