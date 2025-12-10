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

interface IProps {
  isOpen?: boolean;
  closeOnOutsideClick?: boolean;
  hideCloseButton?: boolean;
  onClose: () => void;
  children: any;
}

const { height } = Dimensions.get('screen');

const CustomModal = ({
  isOpen,
  onClose,
  children,
  closeOnOutsideClick,
  hideCloseButton,
}: IProps) => {
  return (
    <Modal animationType="slide" transparent visible={isOpen}>
      <Pressable
        onPress={() => {
          if (closeOnOutsideClick) {
            onClose();
          }
        }}
        style={[styles.overlay]}
      >
        <View style={[styles.container]}>
          {!hideCloseButton && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                padding: 20,
              }}
            >
              <TouchableOpacity onPress={onClose}>
                <CloseIcon color={Theme.colors.black[600]} />
              </TouchableOpacity>
            </View>
          )}
          {children}
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
