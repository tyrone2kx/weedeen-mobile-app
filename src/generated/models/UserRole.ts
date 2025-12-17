/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Role } from './Role';
import type { User } from './User';
export type UserRole = {
  roleId: string;
  userId: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  role: Role;
  user: User;
};
