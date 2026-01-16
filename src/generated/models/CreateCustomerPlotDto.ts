/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaymentConfigDto } from './PaymentConfigDto';
export type CreateCustomerPlotDto = {
  customerId: string;
  plotId: string;
  status?: 'pending' | 'allocated' | 'cancelled' | 're_sold';
  allocatedAt?: string;
  callbackType?:
    | 'create_invoice'
    | 'create_and_send_invoice'
    | 'record_payment';
  paymentConfig?: PaymentConfigDto;
  forceAllocate: boolean;
};
