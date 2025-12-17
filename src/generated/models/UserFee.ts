/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Fee } from './Fee';
import type { User } from './User';
export type UserFee = {
  id: string;
  tenant: string;
  userId: string;
  feeId: string;
  user: User;
  fee: Fee;
  isPaid: boolean;
  paidAt: string;
  lastNotifiedAt: string;
  updatedAt: string;
  createdAt: string;
};
