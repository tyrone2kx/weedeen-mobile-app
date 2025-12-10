import useTheme from '@wd/utils/theme/useTheme';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Text from '../Text/Text';
import { BackspaceIcon, FingerprintIcon } from '../icons';

interface IProps {
  onNumberPress: (number: number) => void;
  onFingerprintPress: () => void;
  onBackPress: () => void;
}

const outerNumbers = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  ['finger_print', 0, 'back'],
];

const CustomNumberPad = ({
  onNumberPress,
  onFingerprintPress,
  onBackPress,
}: IProps) => {
  const { theme } = useTheme();

  return (
    <View className="w-full items-center">
      <View className="w-full justify-center">
        {outerNumbers.map((innerNumbers, outerIndex) => (
          <View
            className="w-full flex-row flex-wrap justify-center"
            // eslint-disable-next-line react/no-array-index-key
            key={`${outerIndex}-${outerIndex}`}
          >
            {innerNumbers.map((value) => (
              <React.Fragment key={value}>
                {typeof value === 'number' ? (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    className="h-[80px] w-[33.33333%] items-center justify-center"
                    key={value}
                    onPress={() => onNumberPress(value)}
                  >
                    <Text className="text-3xl text-black">{value}</Text>
                  </TouchableOpacity>
                ) : value === 'finger_print' ? (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    className="h-[80px] w-[33.33333%] items-center justify-center"
                    onPress={onFingerprintPress}
                  >
                    <FingerprintIcon color={theme.black[600]} />
                  </TouchableOpacity>
                ) : value === 'back' ? (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    className="h-[80px] w-[33.33333%] items-center justify-center"
                    onPress={onBackPress}
                  >
                    <BackspaceIcon color={theme.black[600]} />
                  </TouchableOpacity>
                ) : null}
              </React.Fragment>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

export default CustomNumberPad;
