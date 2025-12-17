/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Privilege } from './Privilege';
import type { UserRole } from './UserRole';
export type Role = {
  id: string;
  title: string;
  slug: 'security' | 'packager' | 'rider' | 'estate_admin' | 'resident';
  isSystemDefault: boolean;
  description: string;
  createdAt: string;
  updatedAt: string;
  privileges: Array<Privilege>;
  userRoles: Array<UserRole>;
};
