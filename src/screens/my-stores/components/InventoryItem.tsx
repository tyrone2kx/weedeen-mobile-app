import Circle from '@wd/components/Circle/Circle';
import MenuComponent from '@wd/components/MenuComponent/MenuComponent';
import Text from '@wd/components/Text/Text';
import { Product } from '@wd/generated';
import { formatNairaWithKobo } from '@wd/utils/helpers';
import useTheme from '@wd/utils/theme/useTheme';
import React from 'react';
import { Image, View } from 'react-native';

interface Props {
  product: Product;
  onDelete?: () => void;
  onView?: () => void;
  onEdit?: () => void;
}

const InventoryItem = ({ product, onDelete, onView, onEdit }: Props) => {
  const { theme } = useTheme();
  const { color, title, textColor } = resolveStatus(product);

  return (
    <View
      className="rounded-xl flex-row bg-white border mb-4 gap-2 w-full"
      style={{
        borderColor: theme.gray[300],
      }}
    >
      <Image
        source={{ uri: product.images?.[0] }}
        style={{
          height: '100%',
          width: 100,
          borderTopLeftRadius: 8,
          borderBottomLeftRadius: 8,
        }}
      />
      <View className="flex-row justify-between flex-1 p-2">
        <View className=" mb-4">
          <View>
            <Text>{product.name}</Text>
            <View className="flex-row gap-2 items-center">
              <Circle size={5} />
              <Text className="text-sm" style={{ color: textColor }}>
                {title}
              </Text>
            </View>
            <Text className="text-blue-600">
              {formatNairaWithKobo(product.price)}
            </Text>
            <Text>QTY: {product.quantity}</Text>
          </View>
        </View>

        <MenuComponent
          id={`product-item-${product.id}`}
          menuList={[
            { label: 'View', onPress: onView },
            { label: 'Edit', onPress: onEdit },
            { label: 'Delete', onPress: onDelete },
          ]}
        />
      </View>
    </View>
  );
};

const resolveStatus = (product: Product) => {
  switch (product.status) {
    case 'in_stock':
      return {
        title: 'In Stock',
        color: '#E8F5E9',
        textColor: '#388E3C',
      };
    case 'out_of_stock':
      return {
        title: 'Out of Stock',
        color: '#FFEBEE',
        textColor: '#D32F2F',
      };
    case 'discontinued':
      return {
        title: 'Discontinued',
        color: '#E3F2FD',
        textColor: '#1976D2',
      };
    default:
      return {
        title: 'Unknown',
        color: '#EEEEEE',
        textColor: '#888888',
      };
  }
};

export default InventoryItem;
