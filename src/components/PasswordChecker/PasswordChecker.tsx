import { getPasswordScore } from '@wd/utils/helpers';
import { useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import ProgressBar from '../ProgressBar/ProgressBar';
import Text from '../Text/Text';

interface Props {
  text: string;
  setDisabled?: (value: boolean) => void;
}

const PasswordChecker = ({ text, setDisabled }: Props) => {
  const [value, setValue] = useState(0);

  const scoreObject = useMemo(() => getPasswordScore(text), [text]);
  const color = value < 50 ? '#900001' : value < 80 ? '#E8B931' : 'green';
  const message = value < 50 ? 'Poor' : value < 80 ? 'Weak' : 'Strong';

  useEffect(() => {
    const score = Object.values(getPasswordScore(text)).filter(
      score => score,
    ).length;
    const calc = (score / 4) * 100;
    setValue(calc);
    if (calc === 100) {
      setDisabled?.(false);
    } else {
      setDisabled?.(true);
    }
  }, [text]);

  return (
    <View className="w-full">
      <ProgressBar color={color} value={value} />
      <View className="mt-2 flex justify-between items-start text-[#595959]">
        <View>
          <Text className="text-xs mb-2">Your password must contain</Text>
          <View className="text-xs">
            <Item isActive={scoreObject.hasSymbol} text="a symbol" />
            <Item
              isActive={scoreObject.hasUpperCase}
              text="an uppercase letter"
            />
            <Item isActive={scoreObject.hasNumber} text="a number" />
            <Item
              isActive={scoreObject.has8Characters}
              text="8 characters minimum"
            />
          </View>
        </View>
        <View className="flex-row justify-end w-full">
          <Text className="text-xs">{message}</Text>
        </View>
      </View>
    </View>
  );
};

const Item = ({ text, isActive }: { text: string; isActive: boolean }) => (
  <View className="flex-row items-center gap-2">
    <View
      className={`h-2 w-2 rounded-full ${isActive ? 'bg-green-400' : 'bg-gray-600'}`}
    />
    <Text className={`text-sm ${isActive ? 'text-green-400' : ''}`}>
      {text}
    </Text>
  </View>
);

export default PasswordChecker;
