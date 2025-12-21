import useTheme from '@wd/utils/theme/useTheme';
import useDisclosure from '@wd/utils/useDisclosure/useDisclosure';
import { MenuIcon } from 'lucide-react-native';
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

const MenuComponent = ({ menuList, id }: Props) => {
  const { theme } = useTheme();
  const handler = useDisclosure();
  return (
    <View className="relative">
      <TouchableOpacity onPress={handler.toggle}>
        <MenuIcon color={theme.gray[600]} size={20} />
      </TouchableOpacity>
      {handler.isOpen && (
        <View
          className="absolute bg-white rounded-xl border"
          style={{
            borderColor: theme.gray[300],
            elevation: 4,
            maxWidth: 400,
            minWidth: 100,
            right: -2,
            top: 25,
            zIndex: 10,
          }}
        >
          {menuList.map((menuItem, index) => (
            <TouchableOpacity
              className="p-1 px-2 flex-row items-center gap-2"
              key={`menu-${id}-${index}`}
              onPress={() => {
                if (menuItem.disabled) return;
                handler.onClose();
                menuItem.onPress?.();
              }}
              style={{
                borderBottomWidth: index === menuList.length - 1 ? 0 : 1,
                borderBottomColor: theme.gray[300],
                paddingHorizontal: 10,
                paddingVertical: 5,
                backgroundColor: menuItem.disabled
                  ? theme.gray[100]
                  : theme.white.DEFAULT,
                borderTopLeftRadius: index === 0 ? 8 : 0,
                borderTopRightRadius: index === 0 ? 8 : 0,
                borderBottomLeftRadius: index === menuList.length - 1 ? 8 : 0,
                borderBottomRightRadius: index === menuList.length - 1 ? 8 : 0,
              }}
            >
              {menuItem.icon}
              <Text weight="light">{menuItem.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default MenuComponent;

const styles = StyleSheet.create({});
