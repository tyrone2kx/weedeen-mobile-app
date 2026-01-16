/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateCustomerDto = {
  firstName: string;
  lastName: string;
  email: string;
  gender?: 'male' | 'female';
  phoneNo?: string;
  address?: string;
  city?: string;
  state?: string;
  occupation?: string;
  company?: string;
  dateOfBirth?: string;
  idCardType?:
    | 'national_id'
    | 'international_passport'
    | 'driver_license'
    | 'voter_id';
  idCardNumber?: string;
};
