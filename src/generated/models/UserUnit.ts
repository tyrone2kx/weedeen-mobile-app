/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Plot } from './Plot';
import type { User } from './User';
import type { UserDto } from './UserDto';
export type UserUnit = {
    userId: string;
    plotId: string;
    user: User;
    unit: Plot;
    isPrimary: boolean;
    isAssigned: boolean;
    primaryUserId?: string;
    assignedById?: string;
    assignedAt?: string;
    unassignedById?: string;
    unassignedAt?: string;
    id: string;
    createdAt: string;
    updatedAt: string;
    createdById: string;
    updatedById: string;
    createdBy: UserDto;
    updatedBy: UserDto;
    tenant: string;
};

