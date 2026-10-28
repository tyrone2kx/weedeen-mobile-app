import { Theme } from '@wd/utils/Theme';
import useTheme from '@wd/utils/theme/useTheme';
import { Trash2Icon } from 'lucide-react-native';
import React, { ReactNode } from 'react';
import { View } from 'react-native';
import Button from '../Button/Button';
import CustomModal from '../CustomModal/CustomModal';
import Text from '../Text/Text';

interface IProps {
  description?: string;
  title: string;
  onConfirm?: () => void;
  icon?: ReactNode;
  buttonColor?: string;
  isLoading?: boolean;
  onClose: () => void;
  isOpen?: boolean;
  cancelButtonText?: string;
  buttonText?: string;
  descriptionComponent?: ReactNode;
  hideIcon?: boolean;
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
  descriptionComponent,
  hideIcon,
}: IProps) => {
  const { theme } = useTheme();
  // A custom icon signals a non-destructive flow (e.g. payment) → brand tile.
  const danger = !icon;
  const tileBg = danger ? theme.red[300] : theme.blue[300];
  const showIcon = !hideIcon;

  return (
    <CustomModal
      buttons={
        <View className="flex-row items-center justify-between gap-x-4">
          <View className="flex-1">
            <Button label={cancelButtonText} light onPress={onClose} />
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
          {showIcon && (
            <View
              className="mb-5 h-[76px] w-[76px] items-center justify-center rounded-2xl"
              style={{ backgroundColor: tileBg }}
            >
              {icon ?? <Trash2Icon color={theme.red.DEFAULT} size={30} />}
            </View>
          )}
          <View className="items-center">
            {descriptionComponent ?? (
              <Text
                intent="sm"
                style={{ color: theme.gray[500], textAlign: 'center' }}
              >
                {description}
              </Text>
            )}
          </View>
        </View>
      </View>
    </CustomModal>
  );
};

export default ConfirmationModal;
