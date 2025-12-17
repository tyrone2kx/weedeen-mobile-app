/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Delivery } from './Delivery';
import type { Order } from './Order';
import type { Plan } from './Plan';
import type { Store } from './Store';
import type { User } from './User';
export type Invoice = {
  id: number;
  reference?: string;
  storeId: string;
  store?: Store;
  planId?: string;
  plan: Plan;
  orders: Array<Order>;
  tenant: string;
  user: User;
  userId: string;
  status: 'pending' | 'paid' | 'completed' | 'failed' | 'cancelled';
  delivery?: Delivery;
  paymentDate?: string;
  amount: number;
  invoiceType:
    | 'credit_purchase'
    | 'subscription'
    | 'product_purchase'
    | 'delivery';
  createdAt: string;
  updatedAt: string;
};
