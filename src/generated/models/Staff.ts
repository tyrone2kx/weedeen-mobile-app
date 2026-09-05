/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { User } from './User';
import type { UserDto } from './UserDto';
import type { VisitorAccess } from './VisitorAccess';
export type Staff = {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    role: string;
    isActive: boolean;
    specialInstruction?: string;
    profilePicture?: string;
    gender: 'male' | 'female';
    deactivatedAt?: string;
    visitorAccess?: VisitorAccess;
    employerId: string;
    employer: User;
    deletedAt?: string;
    id: string;
    createdAt: string;
    updatedAt: string;
    createdById: string;
    updatedById: string;
    createdBy: UserDto;
    updatedBy: UserDto;
    tenant: string;
};

