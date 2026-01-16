/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Customer } from './Customer';
import type { Plot } from './Plot';
import type { User } from './User';
export type CustomerPlot = {
  id: string;
  tenant: string;
  customerId: string;
  plotId: string;
  customer: Customer;
  plot: Plot;
  status: 'pending' | 'allocated' | 'cancelled' | 're_sold';
  createdById: string;
  createdBy: User;
  updatedById: string;
  updatedBy: User;
  allocatedAt: string;
  createdAt: string;
  updatedAt: string;
};
