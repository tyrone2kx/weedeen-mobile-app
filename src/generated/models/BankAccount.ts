/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Organization } from './Organization';
import type { StoreBankAccount } from './StoreBankAccount';
import type { User } from './User';
export type BankAccount = {
    id: string;
    tenant: string;
    organization: Organization;
    userId: string;
    bankName: string;
    isActive: boolean;
    isDefault: boolean;
    accountNumber: string;
    accountName: string;
    bankCode: string;
    paystackSubAccountId?: string;
    metadata?: Record<string, any>;
    isDeleted: boolean;
    ownerType: 'resident' | 'organization';
    user: User;
    storeBankAccounts: Array<StoreBankAccount>;
    deletedAt?: string;
    updatedById: string;
    updatedBy: User;
    createdAt: string;
    updatedAt: string;
};

