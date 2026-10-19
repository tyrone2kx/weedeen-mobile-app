import useTheme from '@wd/utils/theme/useTheme';
import useDisclosure from '@wd/utils/useDisclosure/useDisclosure';
import {
  EyeIcon,
  LockIcon,
  MoreVerticalIcon,
  PencilIcon,
  Trash2Icon,
  WalletIcon,
  XIcon,
} from 'lucide-react-native';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Text from '../Text/Text';

interface Props {
  menuList: {
    label: string;
    onPress?: () => void;
    disabled?: boolean;
    icon?: React.ReactNode;
  }[];
  id: string;
}

const DESTRUCTIVE = ['delete', 'cancel'];

const iconFor = (label: string, color: string, size = 16) => {
  switch (label.toLowerCase()) {
    case 'view':
      return <EyeIcon color={color} size={size} />;
    case 'edit':
      return <PencilIcon color={color} size={size} />;
    case 'deactivate':
    case 'activate':
      return <LockIcon color={color} size={size} />;
    case 'delete':
      return <Trash2Icon color={color} size={size} />;
    case 'cancel':
      return <XIcon color={color} size={size} />;
    case 'pay now':
      return <WalletIcon color={color} size={size} />;
    default:
      return null;
  }
};

const MenuComponent = ({ menuList, id }: Props) => {
  const { theme } = useTheme();
  const handler = useDisclosure();

  return (
    <View className="relative">
      <TouchableOpacity
        activeOpacity={0.8}
        className="items-center justify-center rounded-full"
        onPress={handler.toggle}
        style={{ width: 32, height: 32 }}
      >
        <MoreVerticalIcon color={theme.gray[500]} size={20} />
      </TouchableOpacity>
      {handler.isOpen && (
        <View style={[styles.popup, { borderColor: theme.gray[200] }]}>
          {menuList.map((menuItem, index) => {
            const destructive = DESTRUCTIVE.includes(menuItem.label.toLowerCase());
            const color = menuItem.disabled
              ? theme.gray[400]
              : destructive
                ? theme.red.DEFAULT
                : theme.black[600];
            return (
              <TouchableOpacity
                activeOpacity={0.7}
                key={`menu-${id}-${index}`}
                onPress={() => {
                  if (menuItem.disabled) return;
                  handler.onClose();
                  menuItem.onPress?.();
                }}
                style={[
                  styles.row,
                  index < menuList.length - 1 && {
                    borderBottomWidth: 1,
                    borderBottomColor: theme.gray[200],
                  },
                ]}
              >
                {menuItem.icon ?? iconFor(menuItem.label, color)}
                <Text intent="sm" style={{ color }} weight="medium">
                  {menuItem.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
};

export default MenuComponent;

const styles = StyleSheet.create({
  popup: {
    position: 'absolute',
    right: 0,
    top: 34,
    minWidth: 160,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    paddingVertical: 4,
    zIndex: 20,
    shadowColor: '#101828',
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 11,
  },
});
