/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OrderItem } from './OrderItem';
import type { Store } from './Store';
export type Product = {
  id: number;
  reference?: string;
  storeId: string;
  createdByUserId: string;
  updatedByUserId?: string;
  tenant: string;
  name: string;
  productSerialNo?: string;
  category?: string;
  quantity: number;
  description?: string;
  status: 'in_stock' | 'out_of_stock' | 'discontinued';
  isDeleted: boolean;
  images?: Array<string>;
  price: number;
  store: Store;
  orderItems: Array<OrderItem>;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};
