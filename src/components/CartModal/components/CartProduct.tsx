import Icon from '@wd/components/Icon/Icon';
import Quantity from '@wd/components/quantity/Quantity';
import Text from '@wd/components/Text/Text';
import { Product } from '@wd/generated';
import { formatNairaWithKobo } from '@wd/utils/helpers';
import useTheme from '@wd/utils/theme/useTheme';
import useCart from '@wd/utils/useCart';
import { TouchableOpacity, View } from 'react-native';

interface Props {
  item: { product: Product; quantity: number };
}

const CartProduct = ({ item }: Props) => {
  const { theme } = useTheme();
  const borderColor = theme.gray.DEFAULT;
  const { product } = item;
  const { quantity, setQuantity, handleCartItem } = useCart({
    product,
    defaultQuantity: item.quantity,
  });
  return (
    <View
      className="relative border bg-white p-4 flex-col md:flex-row justify-between"
      style={{ borderColor }}
    >
      <View className="md:max-w-[70%]">
        <Text className="text-sm capitalize">{product.name}</Text>
      </View>
      <View className="flex-row justify-between md:justify-start md:flex-col items-center gap-2">
        <Text className="font-bold text-gray-700">
          {formatNairaWithKobo(product.price || 0)}
        </Text>
        <Quantity
          quantity={quantity}
          setQuantity={setQuantity}
          stock={product.quantity}
        />
      </View>
      <TouchableOpacity
        className="absolute top-2 right-2 cursor-pointer "
        onPress={handleCartItem}
      >
        <Icon name="cross-2" size={20} />
      </TouchableOpacity>
    </View>
  );
};

export default CartProduct;
