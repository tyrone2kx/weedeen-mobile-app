import Avatar from '@wd/components/Avatar/Avatar';
import Carousel from '@wd/components/carousel';
import CustomModal from '@wd/components/CustomModal/CustomModal';
import Quantity from '@wd/components/quantity/Quantity';
import Text from '@wd/components/Text/Text';
import { Product } from '@wd/generated';
import { formatNairaWithKobo } from '@wd/utils/helpers';
import useTheme from '@wd/utils/theme/useTheme';
import useBreakpointValue from '@wd/utils/useBreakpointValue';
import useCart from '@wd/utils/useCart';
import { HeartIcon, ImageIcon, ShoppingCartIcon } from 'lucide-react-native';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

interface Props {
  isOpen?: boolean;
  inCartView?: boolean;
  onClose: () => void;
  product: Product;
  onAddToCart?: (product: Product) => void;
}

const ViewProductModal = ({ isOpen, onClose, product, inCartView }: Props) => {
  const { theme } = useTheme();
  const images = product.images || [];
  const inStock = product.quantity > 0;
  const { isInCart, quantity, setQuantity, handleCartItem } = useCart({
    product,
  });

  const hideControls = useBreakpointValue({
    base: true,
    md: false,
    lg: false,
    xl: false,
    xxl: false,
  });

  return (
    <CustomModal isOpen={isOpen} onClose={onClose} title="View Product">
      <View className="flex-1">
        <ScrollView showsVerticalScrollIndicator={false}>
          {images.length ? (
            <Carousel
              autoPlay
              autoPlayInterval={4000}
              data={images}
              hideControls={hideControls}
              onSlideChange={() => {}}
              renderItem={(imageUrl: string) => (
                <View style={styles.imageContainer}>
                  <Image
                    resizeMode="cover"
                    source={{ uri: imageUrl }}
                    style={styles.image}
                  />
                </View>
              )}
              showDots
            />
          ) : (
            <View
              style={[styles.imageContainer, styles.placeholder, { backgroundColor: theme.blue[300] }]}
            >
              <ImageIcon color={theme.blue.DEFAULT} size={44} />
            </View>
          )}

          <View className="mt-5">
            <View className="mb-1 flex-row items-start justify-between gap-3">
              <Text intent="h3" style={{ flex: 1 }} weight="bold">
                {product?.name}
              </Text>
              <Text intent="h3" style={{ color: theme.blue.DEFAULT }} weight="extrabold">
                {formatNairaWithKobo(product.price || 0)}
              </Text>
            </View>
            <Text
              intent="sm"
              style={{ color: inStock ? theme.green[600] : theme.red.DEFAULT }}
              weight="semibold"
            >
              {inStock ? 'In stock' : 'Out of stock'}
            </Text>

            <Text
              intent="sm"
              style={{ color: theme.gray[500], marginTop: 12 }}
            >
              {product.description}
            </Text>

            <View
              className="mt-4 flex-row items-center gap-2 self-start rounded-full py-1 pl-1 pr-4"
              style={{ borderWidth: 1, borderColor: theme.gray[200] }}
            >
              <Avatar image={product?.store?.logo} name={product.store?.name} showName size={28} />
              <Text intent="sm" style={{ color: theme.gray[500] }} weight="medium">
                {product.store?.name}
              </Text>
            </View>
          </View>
        </ScrollView>

        {!inCartView ? (
          <View className="mt-4 flex-row items-center gap-3">
            <Quantity
              quantity={quantity}
              setQuantity={setQuantity}
              stock={product.quantity}
            />
            <TouchableOpacity
              activeOpacity={0.85}
              className="h-[52px] flex-1 flex-row items-center justify-center gap-2 rounded-2xl"
              onPress={handleCartItem}
              style={{ backgroundColor: theme.blue.DEFAULT }}
            >
              <ShoppingCartIcon color="#fff" size={18} />
              <Text intent="md" style={{ color: '#fff' }} weight="semibold">
                {isInCart ? 'Remove from cart' : 'Add to cart'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.85}
              className="h-[52px] w-[52px] items-center justify-center rounded-2xl"
              style={{ borderWidth: 1, borderColor: theme.gray[200] }}
            >
              <HeartIcon color={theme.black[600]} size={20} />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: 260,
    borderRadius: 16,
    overflow: 'hidden',
  },
  placeholder: { alignItems: 'center', justifyContent: 'center' },
  image: { width: '100%', height: '100%' },
});

export default ViewProductModal;
