/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Billing } from './Billing';
import type { User } from './User';
export type Organization = {
  id: string;
  name: string;
  address?: string;
  city?: string;
  zipcode?: string;
  addressLineTwo?: string;
  state?: string;
  defaultDeliveryFee: number;
  tenant: string;
  credits: number;
  userId: string;
  creator: User;
  billings: Array<Billing>;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};
