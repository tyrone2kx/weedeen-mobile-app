/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateOrderItemDto } from './CreateOrderItemDto';
export type UpdateOrderDto = {
  hasDelivery?: boolean;
  deliveryAddress?: string;
  additionalNotes?: string;
  deliveryPhoneNo?: string;
  receiverName?: string;
  items?: Array<CreateOrderItemDto>;
  status?:
    | 'pending'
    | 'delivery_in_progress'
    | 'completed'
    | 'cancelled'
    | 'paid'
    | 'refunded'
    | 'failed'
    | 'delivered'
    | 'ready_for_pickup';
};
