/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BankAccount } from './BankAccount';
import type { Fee } from './Fee';
import type { Payment } from './Payment';
import type { User } from './User';
import type { Utility } from './Utility';
export type UserFee = {
  id: string;
  tenant: string;
  userId: string;
  feeId: string;
  utilityId: string;
  amount: number;
  token: string;
  tokenUsedAt: string;
  user: User;
  fee: Fee;
  utility: Utility;
  payments: Array<Payment>;
  bankAccountId: string;
  bankAccount: BankAccount;
  isPaid: boolean;
  paidAt: string;
  lastNotifiedAt: string;
  updatedById: string;
  updatedBy: User;
  updatedAt: string;
  createdAt: string;
};
