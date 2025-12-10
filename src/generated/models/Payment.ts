/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { User } from './User';
import type { UserFee } from './UserFee';

export type Payment = {
  id: string;
  tenant: string;
  userId: string;
  userFeeId: string;
  voucherId: string;
  user: User;
  paymentMethod: 'paystack' | 'flutterwave' | 'cash' | 'POS';
  status: 'success' | 'pending' | 'failed' | 'abandoned';
  reference: string;
  amount: number;
  resolvedById?: string;
  resolvedBy: User;
  invoice: UserFee;
  updatedAt: string;
  createdAt: string;
};
