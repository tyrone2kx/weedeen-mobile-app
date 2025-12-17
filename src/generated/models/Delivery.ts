/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Invoice } from './Invoice';
import type { User } from './User';
export type Delivery = {
  id: number;
  tenant: string;
  invoiceId?: number;
  riderId?: string;
  deliveryAddress: string;
  deliveryPhoneNo: string;
  receiverName: string;
  pickUpAddress?: string;
  pickUpPhoneNo?: string;
  pickUpName?: string;
  deliveryFee: number;
  additionalNotes?: string;
  status:
    | 'pending'
    | 'in_progress'
    | 'completed'
    | 'cancelled'
    | 'failed'
    | 'delivered'
    | 'ready_for_pickup';
  completedAt?: string;
  invoice: Invoice;
  rider?: User;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};
