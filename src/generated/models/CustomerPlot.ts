/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Customer } from './Customer';
import type { Plot } from './Plot';
import type { UserDto } from './UserDto';
export type CustomerPlot = {
    customerId: string;
    plotId: string;
    customer: Customer;
    plot: Plot;
    status: 'pending' | 'allocated' | 'cancelled' | 're_sold';
    allocatedAt: string;
    createdAt: string;
    updatedAt: string;
    id: string;
    createdById: string;
    updatedById: string;
    createdBy: UserDto;
    updatedBy: UserDto;
    tenant: string;
};

