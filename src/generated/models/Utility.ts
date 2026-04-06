/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Organization } from './Organization';
import type { User } from './User';
export type Utility = {
  name: string;
  description: string;
  amount: number;
  isActive: boolean;
  deactivatedAt: string;
  deactivatedById: string;
  deactivatedBy: User;
  id: string;
  tenant: string;
  organization: Organization;
  createdAt: string;
  updatedAt: string;
  createdById: string;
  updatedById: string;
  createdBy: User;
  updatedBy: User;
};
