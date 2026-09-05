/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateProductDto = {
    storeId: string;
    updatedByUserId?: string;
    name: string;
    productSerialNo?: string;
    category?: string;
    quantity: number;
    description?: string;
    status?: 'in_stock' | 'out_of_stock' | 'discontinued';
    images?: Array<string>;
    price?: number;
};

