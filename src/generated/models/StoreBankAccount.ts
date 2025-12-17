/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BankAccount } from './BankAccount';
import type { Store } from './Store';
export type StoreBankAccount = {
  id: string;
  bankAccountId: string;
  storeId: string;
  store: Store;
  bankAccount: BankAccount;
  createdAt: string;
  updatedAt: string;
};
