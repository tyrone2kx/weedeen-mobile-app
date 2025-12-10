/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Billing } from './Billing';
import type { Invoice } from './Invoice';

export type VerifyPaymentResponseDto = {
  invoice: Invoice;
  activeSubscription: Billing;
};
