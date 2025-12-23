import Avatar from '@wd/components/Avatar/Avatar';
import Quantity from '@wd/components/quantity/Quantity';
import Text from '@wd/components/Text/Text';
import { Product } from '@wd/generated';
import { formatNairaWithKobo } from '@wd/utils/helpers';
import useCart from '@wd/utils/useCart';
import { HeartIcon, ShoppingCartIcon } from 'lucide-react-native';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

interface Props {
  product: Product;
  onView?: () => void;
}

const ProductItem = ({ product, onView }: Props) => {
  const images = product.images || [];
  const inStock = product.quantity > 0;
  const { isInCart, quantity, setQuantity, handleCartItem } = useCart({
    product,
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onView}
        style={styles.imageWrapper}
      >
        <Image
          source={
            typeof images[0] === 'string' ? { uri: images[0] } : images[0]
          }
          style={styles.image}
        />
        <View style={styles.overlayRow}>
          <Quantity
            quantity={quantity}
            setQuantity={setQuantity}
            stock={product.quantity}
          />
          <View style={styles.iconRow}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleCartItem}
              style={[styles.iconButton, isInCart && styles.iconButtonActive]}
            >
              <ShoppingCartIcon
                color={isInCart ? '#fff' : '#1f2937'}
                size={20}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={[styles.iconButton, styles.heartButton]}
            >
              <HeartIcon color={'#1f2937'} size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <View style={styles.nameCol}>
            <Text style={styles.title}>{product.name}</Text>
          </View>
          <View style={styles.priceCol}>
            <Text style={styles.price}>
              {formatNairaWithKobo(product.price || 0)}
            </Text>
            <Text style={styles.stock}>
              {inStock ? 'In stock' : 'Out of stock'}
            </Text>
          </View>
        </View>
        <Text style={styles.description}>{product.description}</Text>
        <View style={styles.storeRow}>
          <Avatar image={product?.store?.logo} size={30} />
          <Text style={styles.storeName}>{product.store?.name}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 350,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
    overflow: 'hidden',
  },
  imageWrapper: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    width: '100%',
    height: 200,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#f3f4f6',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  overlayRow: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  iconRow: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    backgroundColor: '#fff',
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginLeft: 4,
  },
  iconButtonActive: {
    backgroundColor: '#22c55e',
  },
  heartButton: {
    backgroundColor: '#fff',
  },
  content: {
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  nameCol: {
    maxWidth: '70%',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  priceCol: {
    alignItems: 'flex-end',
  },
  price: {
    fontWeight: 'bold',
    color: '#374151',
    fontSize: 16,
  },
  stock: {
    fontSize: 12,
    color: '#16a34a',
  },
  description: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
  },
  storeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 999,
    padding: 4,
    gap: 8,
  },
  storeName: {
    fontSize: 12,
    fontStyle: 'italic',
    marginLeft: 8,
  },
});

export default ProductItem;
