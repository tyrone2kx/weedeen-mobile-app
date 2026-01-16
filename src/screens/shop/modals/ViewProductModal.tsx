import Avatar from '@wd/components/Avatar/Avatar';
import Carousel from '@wd/components/carousel';
import CustomModal from '@wd/components/CustomModal/CustomModal';
import Quantity from '@wd/components/quantity/Quantity';
import Text from '@wd/components/Text/Text';
import { Product } from '@wd/generated';
import { formatNairaWithKobo } from '@wd/utils/helpers';
import useBreakpointValue from '@wd/utils/useBreakpointValue';
import useCart from '@wd/utils/useCart';
import { HeartIcon, ShoppingCartIcon } from 'lucide-react-native';
import { Image, ScrollView, StyleSheet, View } from 'react-native';

const iconClass =
  'bg-white border h-[40px] w-[40px] flex items-center justify-center rounded-full cursor-pointer text-gray-800 hover:text-white transition-colors';
interface Props {
  isOpen?: boolean;
  inCartView?: boolean;
  onClose: () => void;
  product: Product;
  onAddToCart?: (product: Product) => void;
}

const ViewProductModal = ({ isOpen, onClose, product, inCartView }: Props) => {
  const images = product.images || [];
  const inStock = product.quantity > 0;
  const { isInCart, quantity, setQuantity } = useCart({ product });

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
        <ScrollView>
          <View className="flex gap-4 flex-col xl:flex-row">
            <View className="flex justify-center xl:ml-10 w-full xl:w-1/2">
              <Carousel
                autoPlay={true}
                autoPlayInterval={4000}
                data={images}
                hideControls={hideControls}
                onSlideChange={index => {
                  console.log('Slide changed to:', index);
                }}
                renderItem={(imageUrl: string, index) => (
                  <View style={styles.imageContainer}>
                    <Image
                      resizeMode="cover"
                      source={{ uri: imageUrl }}
                      style={styles.image}
                    />
                  </View>
                )}
                showDots={true}
              />
            </View>
            <View className="xl:ml-12 xl:p-4 flex flex-col justify-between">
              <View>
                <View className="flex-row items-start justify-between mb-2">
                  <View className="max-w-[70%]">
                    <Text className="text-lg font-semibold">
                      {product?.name}
                    </Text>
                  </View>
                  <View className="flex flex-col items-end">
                    <Text className="font-bold text-gray-700">
                      {formatNairaWithKobo(product.price || 0)}
                    </Text>
                    <Text className="text-xs text-green-600">
                      {inStock ? 'In stock' : 'Out of stock'}
                    </Text>
                  </View>
                </View>

                <View>
                  <Text className="text-sm text-gray-600 mb-4">
                    {product.description}
                  </Text>

                  <View className="flex-row border rounded-full p-1 items-center gap-2">
                    <Avatar image={product?.store?.logo} size={30} />
                    <Text className="text-xs italic">
                      {product.store?.name}
                    </Text>
                  </View>
                </View>
              </View>

              <View className="mt-12 w-full p-2  flex-row gap-2 justify-between">
                {inCartView ? (
                  <View />
                ) : (
                  <Quantity
                    quantity={quantity}
                    setQuantity={setQuantity}
                    stock={product.quantity}
                  />
                )}
                <View className="flex-row gap-2">
                  {inCartView ? (
                    <View />
                  ) : (
                    <View
                      className={`${iconClass} hover:bg-green-500 ${isInCart ? 'bg-green-500' : ''}`}
                    >
                      <ShoppingCartIcon
                        className="transition-colors"
                        size={20}
                      />
                    </View>
                  )}
                  <View className={`${iconClass} 'hover:bg-pink-500'`}>
                    <HeartIcon className="transition-colors" size={20} />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default ViewProductModal;
