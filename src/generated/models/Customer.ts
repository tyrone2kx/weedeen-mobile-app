/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Organization } from './Organization';
import type { User } from './User';
export type Customer = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender?: 'male' | 'female';
  phoneNo?: string;
  profilePic?: string;
  address: string;
  city: string;
  state: string;
  tenant: string;
  occupation?: string;
  company?: string;
  dateOfBirth?: string;
  idCardType?:
    | 'national_id'
    | 'international_passport'
    | 'driver_license'
    | 'voter_id';
  idCardNumber?: string;
  idCardImages?: Array<string>;
  deletedById: string;
  deletedBy: User;
  updatedById: string;
  updatedBy: User;
  createdById: string;
  createdBy: User;
  organization?: Organization;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};
