/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UpdateFeeDto = {
    amount?: number;
    title?: string;
    currency?: string;
    isActive?: boolean;
    dueDate?: string;
    isRecurrent?: boolean;
    isGeneralFee?: boolean;
    recurrentFrequency?: 'daily' | 'weekly' | 'monthly' | 'yearly';
    tag?: string;
    description?: string;
    bankAccountId?: string;
    flat?: string;
    block?: string;
    street?: string;
    /**
     * Explicit unit (plot) ids this fee applies to. Combined with any block/street/flat match to form the fee_units scope. Only primary residents of these units are invoiced.
     */
    selectedUnits?: Array<string>;
    selectedUsers?: Array<string>;
};

