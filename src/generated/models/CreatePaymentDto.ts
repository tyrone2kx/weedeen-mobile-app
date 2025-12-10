/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreatePaymentDto = {
  userFeeId: string;
  voucherCode?: string;
  paymentMethod: 'paystack' | 'flutterwave' | 'cash' | 'POS';
  status: 'success' | 'pending' | 'failed' | 'abandoned';
  amount: number;
  reference?: string;
  resolvedById?: string;
};
