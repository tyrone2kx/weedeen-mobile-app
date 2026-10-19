import MenuComponent from '@wd/components/MenuComponent/MenuComponent';
import Tag, { TagVariant } from '@wd/components/Tag/Tag';
import Text from '@wd/components/Text/Text';
import { Product } from '@wd/generated';
import { formatNairaWithKobo } from '@wd/utils/helpers';
import useTheme from '@wd/utils/theme/useTheme';
import { ImageIcon } from 'lucide-react-native';
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';

interface Props {
  product: Product;
  onDelete?: () => void;
  onView?: () => void;
  onEdit?: () => void;
}

const InventoryItem = ({ product, onDelete, onView, onEdit }: Props) => {
  const { theme } = useTheme();
  const { title, variant } = resolveStatus(product);
  const img = product.images?.[0];

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      className="mb-4 flex-row items-center gap-3 rounded-2xl bg-white p-3"
      onPress={onView}
      style={{
        width: '100%',
        borderWidth: 1,
        backgroundColor: theme.white.DEFAULT, borderColor: theme.gray[200],
        shadowColor: '#101828',
        shadowOpacity: 0.05,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },
        elevation: 2,
      }}
    >
      <View
        className="items-center justify-center overflow-hidden rounded-xl"
        style={{ width: 56, height: 56, backgroundColor: theme.blue[300] }}
      >
        {img ? (
          <Image source={{ uri: img }} style={{ width: 56, height: 56 }} />
        ) : (
          <ImageIcon color={theme.blue.DEFAULT} size={22} />
        )}
      </View>

      <View style={{ flex: 1 }}>
        <Text intent="md" numberOfLines={1} weight="bold">
          {product.name}
        </Text>
        <View className="mt-1 flex-row items-center gap-2">
          <Tag title={title} variant={variant} />
        </View>
        <View className="mt-1 flex-row items-center gap-2">
          <Text intent="sm" style={{ color: theme.blue.DEFAULT }} weight="bold">
            {formatNairaWithKobo(product.price)}
          </Text>
          <Text intent="xs" style={{ color: theme.gray[500] }}>
            Qty: {product.quantity}
          </Text>
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
    </TouchableOpacity>
  );
};

const resolveStatus = (
  product: Product,
): { title: string; variant: TagVariant } => {
  switch (product.status) {
    case 'in_stock':
      return { title: 'In Stock', variant: 'success' };
    case 'out_of_stock':
      return { title: 'Out of Stock', variant: 'danger' };
    case 'discontinued':
      return { title: 'Discontinued', variant: 'info' };
    default:
      return { title: 'Unknown', variant: 'neutral' };
  }
};

export default InventoryItem;
