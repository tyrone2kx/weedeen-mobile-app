/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Order } from './Order';
import type { Product } from './Product';

export type OrderItem = {
  id: string;
  orderId: number;
  productId: string;
  order: Order;
  product: Product;
  quantity: number;
  unitPrice: number;
};
