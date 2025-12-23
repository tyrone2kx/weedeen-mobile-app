import { Theme } from '@wd/utils/Theme';
import React from 'react';
import {
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { CloseIcon } from '../icons';
import Text from '../Text/Text';

interface IProps {
  isOpen?: boolean;
  closeOnOutsideClick?: boolean;
  hideCloseButton?: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  enforceMinHeight?: boolean;
  buttons?: React.ReactNode;
}

const { height } = Dimensions.get('screen');

const CustomModal = ({
  isOpen,
  onClose,
  children,
  closeOnOutsideClick,
  hideCloseButton,
  title,
  enforceMinHeight = true,
  buttons,
}: IProps) => {
  return (
    <Modal animationType="fade" transparent visible={isOpen}>
      <Pressable
        onPress={() => {
          if (closeOnOutsideClick) {
            onClose();
          }
        }}
        style={[styles.overlay]}
      >
        <View
          style={{
            ...styles.container,
            minHeight: enforceMinHeight
              ? styles.container.minHeight
              : undefined,
          }}
        >
          {!!title || !hideCloseButton ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 20,
              }}
            >
              {title && (
                <Text style={{ fontSize: 18, fontWeight: '600' }}>{title}</Text>
              )}
              {!hideCloseButton && (
                <TouchableOpacity onPress={onClose}>
                  <CloseIcon color={Theme.colors.black[600]} />
                </TouchableOpacity>
              )}
            </View>
          ) : null}
          <View className="p-4">
            {children}
            {buttons && <View className="py-4">{buttons}</View>}
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  container: {
    backgroundColor: Theme.colors.white.DEFAULT,
    width: '100%',
    borderRadius: 10,
    minHeight: height / 2,
    maxHeight: height - 130,
  },
});
