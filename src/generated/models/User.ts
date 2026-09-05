/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AccessBlock } from './AccessBlock';
import type { Invoice } from './Invoice';
import type { Organization } from './Organization';
import type { Role } from './Role';
import type { Store } from './Store';
import type { TransactionHistory } from './TransactionHistory';
import type { UserDto } from './UserDto';
import type { UserFee } from './UserFee';
import type { UserRole } from './UserRole';
export type User = {
    unitLabel?: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    organization?: Organization;
    refreshToken?: string;
    gender?: 'male' | 'female';
    phoneNo?: string;
    profilePic?: string;
    fcmToken?: string;
    tokens: number;
    userType?: 'security' | 'packager' | 'rider' | 'estate_admin' | 'resident' | 'admin' | 'business_owner';
    otp?: string;
    isActive: boolean;
    verifiedAt?: string;
    isVerified: boolean;
    accessBlocks: Array<AccessBlock>;
    roles: Array<Role>;
    userRoles: Array<UserRole>;
    invoices: Array<Invoice>;
    userFees: Array<UserFee>;
    transactions: Array<TransactionHistory>;
    stores: Array<Store>;
    deactivatedAt?: string;
    deactivatedById?: string;
    deactivatedBy?: User;
    deactivationReason?: string;
    deletedAt: string;
    id: string;
    createdAt: string;
    updatedAt: string;
    createdById: string;
    updatedById: string;
    createdBy: UserDto;
    updatedBy: UserDto;
    tenant: string;
};

