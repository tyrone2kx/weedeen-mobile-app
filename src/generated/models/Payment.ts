/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomerFee } from './CustomerFee';
import type { User } from './User';
import type { UserFee } from './UserFee';
export type Payment = {
  id: string;
  userId: string;
  userFeeId: string;
  customerFeeId: string;
  voucherId: string;
  user: User;
  paymentMethod: 'paystack' | 'flutterwave' | 'cash' | 'POS';
  status: 'success' | 'pending' | 'failed' | 'abandoned';
  reference: string;
  amount: number;
  splitCode?: string;
  metadata?: Record<string, any>;
  resolvedById?: string;
  resolvedBy: User;
  invoice: UserFee;
  customerInvoice: CustomerFee;
  updatedAt: string;
  createdAt: string;
  tenant: string;
};
