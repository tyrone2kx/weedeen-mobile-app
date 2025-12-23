import { MinusIcon, PlusIcon } from 'lucide-react-native';
import { TouchableOpacity, View } from 'react-native';
import Text from '../Text/Text';

interface Props {
  className?: string;
  quantity: number;
  stock: number;
  setQuantity: (quantity: number) => void;
}

const Quantity = ({ className, quantity, setQuantity, stock }: Props) => {
  const quantityClass =
    'p-1 w-[40] flex items-center justify-center cursor-pointer text-gray-800 transition-colors';

  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };
  const handleIncrease = () => {
    if (quantity < stock) setQuantity(quantity + 1);
  };

  return (
    <View
      className={`rounded-full flex-row bg-white border ${className}`}
      style={{ height: 40 }}
    >
      <TouchableOpacity
        className={` ${quantityClass} rounded-l-full hover:bg-red-100`}
        onPress={handleDecrease}
        style={{ width: 40 }}
      >
        <MinusIcon size={20} />
      </TouchableOpacity>
      <View
        className={`${quantityClass}`}
        style={{ width: 40, borderLeftWidth: 1, borderRightWidth: 1 }}
      >
        <Text>{quantity}</Text>
      </View>
      <TouchableOpacity
        className={` ${quantityClass} rounded-r-full hover:bg-blue-100`}
        onPress={handleIncrease}
        style={{ width: 40 }}
      >
        <PlusIcon size={20} />
      </TouchableOpacity>
    </View>
  );
};

export default Quantity;
