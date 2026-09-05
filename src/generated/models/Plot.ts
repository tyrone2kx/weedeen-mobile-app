/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Customer } from './Customer';
import type { Estate } from './Estate';
import type { User } from './User';
import type { UserDto } from './UserDto';
export type Plot = {
    name: string;
    size: string;
    price: number;
    plotNo: string;
    plotPrefix?: string;
    plotCount: string;
    block: string;
    street: string;
    phase: string;
    section: string;
    lotNumber: string;
    plotType: string;
    flatNo?: string;
    houseNo?: string;
    unitAttributes?: Record<string, any>;
    unitLabel?: string;
    occupancyStatus: 'vacant' | 'occupied';
    isBillableUnit: boolean;
    status: 'available' | 'reserved' | 'sold';
    location: string;
    images: Array<string>;
    documents: Array<string>;
    videos: Array<string>;
    estateId: string;
    estate: Estate;
    longitude?: number;
    latitude?: number;
    description: string;
    isPurchased: boolean;
    metadata: Record<string, any>;
    deletedById?: string;
    deletedBy: User;
    updatedAt: string;
    deletedAt: string;
    createdAt: string;
    allocatedTo?: Customer;
    id: string;
    createdById: string;
    updatedById: string;
    createdBy: UserDto;
    updatedBy: UserDto;
    tenant: string;
};

