/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Role } from './Role';

export type Privilege = {
  id: string;
  title: string;
  value: any;
  group: 'users' | 'admin' | 'orders' | 'billing';
  createdAt: string;
  updatedAt: string;
  roles: Array<Role>;
};
