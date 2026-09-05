/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { User } from './User';
import type { UserDto } from './UserDto';
import type { Utility } from './Utility';
export type AccessBlock = {
    reasons: Array<string>;
    userId: string;
    utilityId: string;
    defaultingFeeId: string;
    feature: 'visitor_access' | 'utility';
    isBlocked: boolean;
    unblockedAt: string;
    unblockedById: string;
    unblockReason: string;
    user: User;
    unblockedBy: User;
    utility: Utility;
    id: string;
    createdAt: string;
    updatedAt: string;
    createdById: string;
    updatedById: string;
    createdBy: UserDto;
    updatedBy: UserDto;
    tenant: string;
};

