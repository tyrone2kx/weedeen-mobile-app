import Avatar from '@wd/components/Avatar/Avatar';
import Tag, { TagVariant } from '@wd/components/Tag/Tag';
import Text from '@wd/components/Text/Text';
import { Product } from '@wd/generated';
import { formatNairaWithKobo } from '@wd/utils/helpers';
import useTheme from '@wd/utils/theme/useTheme';
import useCart from '@wd/utils/useCart';
import { HeartIcon, ImageIcon, ShoppingCartIcon } from 'lucide-react-native';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

interface Props {
  product: Product;
  onView?: () => void;
}

const ProductItem = ({ product, onView }: Props) => {
  const { theme } = useTheme();
  const image = (product.images || [])[0];
  const inStock = product.quantity > 0;
  const { isInCart, handleCartItem } = useCart({ product });

  const stockTag: { title: string; variant: TagVariant } = inStock
    ? { title: 'In stock', variant: 'success' }
    : { title: 'Out of stock', variant: 'danger' };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onView}
      style={[styles.container, { borderColor: theme.gray[200] }]}
    >
      <View style={[styles.imageWrapper, { backgroundColor: theme.blue[300] }]}>
        {image ? (
          <Image
            source={typeof image === 'string' ? { uri: image } : image}
            style={styles.image}
          />
        ) : (
          <ImageIcon color={theme.blue.DEFAULT} size={40} />
        )}
        <TouchableOpacity activeOpacity={0.8} style={styles.heart}>
          <HeartIcon color={theme.black[600]} size={18} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text intent="md" numberOfLines={1} style={{ flex: 1 }} weight="bold">
            {product.name}
          </Text>
          <Text intent="md" style={{ color: theme.blue.DEFAULT }} weight="extrabold">
            {formatNairaWithKobo(product.price || 0)}
          </Text>
        </View>

        <View style={{ marginTop: 6 }}>
          <Tag title={stockTag.title} variant={stockTag.variant} />
        </View>

        <Text
          intent="sm"
          numberOfLines={2}
          style={{ color: theme.gray[500], marginTop: 8 }}
        >
          {product.description}
        </Text>

        <View style={styles.footer}>
          <View style={[styles.storeChip, { borderColor: theme.gray[200] }]}>
            <Avatar
              image={product?.store?.logo}
              name={product.store?.name}
              showName
              size={24}
            />
            <Text intent="xs" style={{ color: theme.gray[500] }} weight="medium">
              {product.store?.name}
            </Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleCartItem}
            style={[
              styles.cartBtn,
              {
                backgroundColor: isInCart ? theme.blue.DEFAULT : theme.blue[300],
              },
            ]}
          >
            <ShoppingCartIcon
              color={isInCart ? '#fff' : theme.blue.DEFAULT}
              size={18}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: '#fff',
    shadowColor: '#101828',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 16,
    overflow: 'hidden',
  },
  imageWrapper: {
    width: '100%',
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  image: { width: '100%', height: '100%', resizeMode: 'cover' },
  heart: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#101828',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  content: { padding: 16 },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  footer: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  storeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderRadius: 999,
    padding: 4,
    paddingRight: 12,
    flexShrink: 1,
  },
  cartBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ProductItem;
