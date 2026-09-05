/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomerPlot } from './CustomerPlot';
import type { User } from './User';
import type { UserDto } from './UserDto';
export type Customer = {
    firstName: string;
    lastName: string;
    email: string;
    gender?: 'male' | 'female';
    phoneNo?: string;
    profilePic?: string;
    address: string;
    city: string;
    state: string;
    occupation?: string;
    company?: string;
    dateOfBirth?: string;
    idCardType?: 'national_id' | 'international_passport' | 'driver_license' | 'voter_id';
    idCardNumber?: string;
    idCardImages?: Array<string>;
    deletedById: string;
    deletedBy: User;
    deletedAt: string;
    plots: Array<CustomerPlot>;
    id: string;
    createdAt: string;
    updatedAt: string;
    createdById: string;
    updatedById: string;
    createdBy: UserDto;
    updatedBy: UserDto;
    tenant: string;
};

