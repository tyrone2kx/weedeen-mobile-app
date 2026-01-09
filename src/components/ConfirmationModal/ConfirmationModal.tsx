import { Theme } from '@wd/utils/Theme';
import { Trash } from 'lucide-react-native';
import React, { ReactNode } from 'react';
import { View } from 'react-native';
import Button from '../Button/Button';
import CustomModal from '../CustomModal/CustomModal';
import Text from '../Text/Text';

interface IProps {
  description: string;
  title: string;
  onConfirm?: () => void;
  icon?: ReactNode;
  buttonColor?: string;
  isLoading?: boolean;
  onClose: () => void;
  isOpen?: boolean;
  cancelButtonText?: string;
  buttonText?: string;
}

const ConfirmationModal = ({
  description,
  onConfirm,
  icon,
  buttonColor = Theme.colors.red.DEFAULT,
  isLoading,
  onClose,
  isOpen,
  title,
  buttonText = 'Yes, Proceed',
  cancelButtonText = 'Cancel',
}: IProps) => {
  return (
    <CustomModal
      buttons={
        <View className="flex-row items-center justify-between gap-x-4">
          <View className="flex-1">
            <Button label={cancelButtonText} onPress={onClose} />
          </View>
          <View className="flex-1">
            <Button
              backgroundColor={buttonColor}
              isLoading={isLoading}
              label={buttonText}
              onPress={onConfirm}
            />
          </View>
        </View>
      }
      enforceMinHeight={true}
      isOpen={isOpen}
      onClose={onClose}
      title={title}
    >
      <View className="flex-1 justify-center">
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
      </View>
    </CustomModal>
  );
};

export default ConfirmationModal;
