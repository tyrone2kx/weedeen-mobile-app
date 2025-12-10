import { Product } from '@wd/generated';
import { useAppSelector } from '@wd/redux-store/hooks/useAppSelector';
import {
  addToCart,
  removeFromCart,
} from '@wd/redux-store/reducers/cart-reducer';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

interface Props {
  product: Product;
  defaultQuantity?: number;
}

const useCart = ({ product, defaultQuantity }: Props) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(defaultQuantity || 1);
  const cartItems = useAppSelector(state => state.cart.cartItems);
  const isInCart = cartItems?.some(item => item.product?.id === product.id);

  useEffect(() => {
    if (defaultQuantity) {
      setQuantity(defaultQuantity);
    } else {
      setQuantity(1);
    }
  }, [defaultQuantity]);

  const handleCartItem = () => {
    if (isInCart) {
      dispatch(removeFromCart(product.id));
    } else
      dispatch(
        addToCart({
          product,
          quantity,
        }),
      );
  };

  useEffect(() => {
    if (isInCart) {
      dispatch(
        addToCart({
          product,
          quantity,
        }),
      );
    }
  }, [quantity, isInCart, dispatch, product]);

  return {
    isInCart,
    quantity,
    setQuantity,
    handleCartItem,
    cartItems,
  };
};

export default useCart;
