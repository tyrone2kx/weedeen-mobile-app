/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreatePaymentDto = {
    userFeeId?: string;
    customerFeeId?: string;
    voucherCode?: string;
    paymentMethod: 'paystack' | 'flutterwave' | 'cash' | 'POS';
    status: 'success' | 'pending' | 'failed' | 'abandoned';
    amount: number;
    reference?: string;
    resolvedById?: string;
};

