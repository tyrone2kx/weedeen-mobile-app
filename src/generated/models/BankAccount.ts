/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Store } from './Store';
import type { StoreBankAccount } from './StoreBankAccount';
import type { User } from './User';
export type BankAccount = {
  id: string;
  tenant: string;
  userId: string;
  bankName: string;
  isActive: boolean;
  accountNumber: string;
  accountName: string;
  bankCode: string;
  paystackSubAccountId?: string;
  metadata?: Record<string, any>;
  isDeleted: boolean;
  store: Store;
  user: User;
  storeBankAccounts: Array<StoreBankAccount>;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
};
