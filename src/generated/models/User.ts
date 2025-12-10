/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Invoice } from './Invoice';
import type { Organization } from './Organization';
import type { Role } from './Role';
import type { Store } from './Store';
import type { TransactionHistory } from './TransactionHistory';
import type { UserFee } from './UserFee';
import type { UserRole } from './UserRole';

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  refreshToken?: string;
  gender?: 'male' | 'female';
  phoneNo?: string;
  profilePic?: string;
  street?: string;
  block?: string;
  flatNumber?: string;
  longitude?: number;
  latitude?: number;
  fcmToken?: string;
  userType?: 'admin' | 'resident' | 'estate_admin';
  tenant: string;
  isActive: boolean;
  verifiedAt?: string;
  isVerified: boolean;
  organization?: Organization;
  roles: Array<Role>;
  userRoles: Array<UserRole>;
  invoices: Array<Invoice>;
  userFees: Array<UserFee>;
  transactions: Array<TransactionHistory>;
  stores: Array<Store>;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};
