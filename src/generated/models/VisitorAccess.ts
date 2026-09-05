/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Staff } from './Staff';
import type { User } from './User';
export type VisitorAccess = {
    id: string;
    userId?: string;
    user?: User;
    staffId?: string;
    staff?: Staff;
    visitorName: string;
    visitorPhone?: string;
    visitorType: 'friend' | 'family' | 'delivery' | 'service_provider' | 'other' | 'unknown' | 'staff';
    visitorTypeOther?: string;
    purposeOfVisit?: string;
    accessCode: string;
    accessCodeExpiry?: string;
    accessCodeUsed: boolean;
    accessCodeUsedAt?: string;
    approvedByUserId?: string;
    createdAt: string;
    updatedAt: string;
    tenant: string;
};

