/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Organization } from './Organization';
import type { User } from './User';
export type ApiKey = {
    id: string;
    isActive: boolean;
    apiKey: string;
    publicKey: string;
    secretKey: string;
    createdById: string;
    creator: User;
    organizationId: string;
    organization: Organization;
    deactivatedById?: string;
    deactivatedBy?: User;
    createdAt: string;
    updatedAt: string;
    deactivatedAt?: string;
    expiryDate?: string;
};

