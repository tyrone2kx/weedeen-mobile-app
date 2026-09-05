/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateBankAccountDto = {
    bankName: string;
    accountNumber: string;
    accountName: string;
    ownerType: 'resident' | 'organization';
    bankCode: string;
    isActive?: boolean;
    /**
     * Array of store UUIDs to link this bank account to
     */
    storeIds?: Array<string>;
};

