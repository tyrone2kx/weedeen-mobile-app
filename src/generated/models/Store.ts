/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Billing } from './Billing';
import type { Order } from './Order';
import type { Product } from './Product';
import type { StoreBankAccount } from './StoreBankAccount';
import type { TimeInputType } from './TimeInputType';
import type { User } from './User';
export type Store = {
  id: string;
  userId: string;
  tenant: string;
  name: string;
  description?: string;
  deactivationReason?: string;
  rejectionReason?: string;
  deactivatedById?: string;
  openingHours?: TimeInputType;
  closingHours?: TimeInputType;
  isOpenOnWeekends: boolean;
  isOpenOnHolidays: boolean;
  isTemporarilyClosed: boolean;
  rejectedById?: string;
  deactivatedBy?: User;
  rejectedBy?: User;
  logo?: string;
  images?: Array<string>;
  street?: string;
  block?: string;
  flat?: string;
  status: 'active' | 'pending_approval' | 'rejected' | 'deactivated';
  isDeleted: boolean;
  latitude?: number;
  longitude?: number;
  owner: User;
  products: Array<Product>;
  storeBankAccounts: Array<StoreBankAccount>;
  billings: Array<Billing>;
  orders: Array<Order>;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};
