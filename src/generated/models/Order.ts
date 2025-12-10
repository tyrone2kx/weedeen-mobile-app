/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Invoice } from './Invoice';
import type { OrderItem } from './OrderItem';
import type { Store } from './Store';
import type { User } from './User';

export type Order = {
  id: number;
  storeId?: string;
  invoiceId?: number;
  invoice?: Invoice;
  userId?: string;
  user?: User;
  tenant: string;
  items: Array<OrderItem>;
  description?: string;
  hasDelivery: boolean;
  status:
    | 'pending'
    | 'delivery_in_progress'
    | 'completed'
    | 'cancelled'
    | 'paid'
    | 'refunded'
    | 'failed'
    | 'delivered'
    | 'ready_for_pickup';
  store: Store;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};
