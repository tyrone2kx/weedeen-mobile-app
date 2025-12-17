/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { User } from './User';
export type TransactionHistory = {
  id: string;
  tenant: string;
  userId: string;
  user: User;
  status:
    | 'pending'
    | 'failed'
    | 'abandoned'
    | 'ongoing'
    | 'processing'
    | 'queued'
    | 'reversed'
    | 'success';
  amount: number;
  transactionRef: string;
  splitCode?: string;
  metadata?: Record<string, any>;
  transactionTime: string;
  invoiceId: number;
  transactionType: 'credit' | 'debit' | 'product_purchase' | 'delivery_fee';
  createdAt: string;
  updatedAt: string;
};
