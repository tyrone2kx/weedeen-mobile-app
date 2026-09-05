/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UserDto = {
    id: string;
    firstName: string;
    lastName: string;
    middleName?: string;
    email: string;
    phoneNo?: string;
    postalCode?: string;
    gender?: 'male' | 'female';
    address?: string;
    country?: string;
    profilePic?: string;
    isActive: boolean;
    isVerified: boolean;
    verifiedAt?: string;
    userType?: 'security' | 'packager' | 'rider' | 'estate_admin' | 'resident' | 'admin' | 'business_owner';
    tenant: string;
    legacyId?: string;
    deactivatedAt?: string;
    deactivatedById?: string;
    deactivationReason?: string;
    createdAt: string;
    updatedAt: string;
    createdById?: string;
    updatedById?: string;
    deletedAt?: string;
};

