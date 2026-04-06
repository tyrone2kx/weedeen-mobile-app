/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Privilege } from './Privilege';
import type { User } from './User';
import type { UserRole } from './UserRole';
export type Role = {
  id: string;
  createdAt: string;
  updatedAt: string;
  createdById: string;
  updatedById: string;
  createdBy: User;
  updatedBy: User;
  tenant: string;
  title: string;
  slug:
    | 'security'
    | 'packager'
    | 'rider'
    | 'estate_admin'
    | 'resident'
    | 'admin'
    | 'business_owner';
  userType:
    | 'security'
    | 'packager'
    | 'rider'
    | 'estate_admin'
    | 'resident'
    | 'admin'
    | 'business_owner';
  isSystemDefault: boolean;
  description: string;
  privileges: Array<Privilege>;
  userRoles: Array<UserRole>;
};
