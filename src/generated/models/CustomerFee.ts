/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Customer } from './Customer';
import type { Fee } from './Fee';
export type CustomerFee = {
  id: string;
  tenant: string;
  customerId: string;
  feeId: string;
  plotId: string;
  customer: Customer;
  fee: Fee;
  isPaid: boolean;
  paidAt: string;
  lastNotifiedAt: string;
  updatedAt: string;
  createdAt: string;
};
