/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type BulkUpdatePlotPricesDto = {
    estateId: string;
    updateType: 'fixed' | 'percentage';
    /**
     * New price for fixed updates, or percentage change (e.g. 10 for +10%, -5 for -5%) for percentage updates
     */
    value: number;
};

