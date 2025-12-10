/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreateDeliveryDto = {
  invoiceId?: number;
  riderId?: string;
  deliveryAddress: string;
  deliveryPhoneNo: string;
  receiverName: string;
  pickUpAddress?: string;
  pickUpPhoneNo?: string;
  pickUpName?: string;
  deliveryFee?: number;
  additionalNotes?: string;
  status?:
    | 'pending'
    | 'in_progress'
    | 'completed'
    | 'cancelled'
    | 'failed'
    | 'delivered'
    | 'ready_for_pickup';
};
