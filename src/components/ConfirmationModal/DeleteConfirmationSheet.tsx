import { Theme } from '@wd/utils/Theme';
import { Trash } from 'lucide-react-native';
import React, { ReactNode } from 'react';
import { View } from 'react-native';
import Button from '../Button/Button';
import Text from '../Text/Text';

interface IProps {
  description: string;
  onSubmit?: () => void;
  icon?: ReactNode;
  buttonColor?: string;
  loading?: boolean;
  onClose?: () => void;
}

const ConfirmationModal = ({
  description,
  onSubmit,
  icon,
  buttonColor = Theme.colors.red.DEFAULT,
  loading,
  onClose,
}: IProps) => {
  return (
    <View className="flex-auto justify-center">
      <View className="mb-5 items-center">
        <View className="mb-5 h-[76px] w-[76px] items-center justify-center rounded-full bg-gray-150">
          {icon ?? <Trash color={Theme.colors.red.DEFAULT} size={30} />}
        </View>
        <View className="items-center">
          <Text style={{ fontSize: 15, color: Theme.colors.gray.DEFAULT }}>
            {description}
          </Text>
        </View>
      </View>
      <View className="flex-row items-center justify-between gap-x-4">
        <View className="flex-1">
          <Button label="Close" onPress={onClose} />
        </View>
        <View className="flex-1">
          <Button
            backgroundColor={buttonColor}
            isLoading={loading}
            label="Proceed"
            onPress={onSubmit}
          />
        </View>
      </View>
    </View>
  );
};

export default ConfirmationModal;
