/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Organization } from './Organization';
import type { Plan } from './Plan';
import type { Store } from './Store';

export type Billing = {
  id: string;
  tenant: string;
  organizationId?: string;
  userId?: string;
  organization?: Organization;
  planId: string;
  storeId: string;
  store?: Store;
  startDate: string;
  endDate: string;
  isCancelled: boolean;
  cancelReason: string;
  cancelledAt: string;
  cancelledBy: string;
  status: 'active' | 'expired' | 'cancelled';
  billingType: 'organization' | 'individual';
  invoiceId?: number;
  plan: Plan;
  createdAt: string;
  updatedAt: string;
};
