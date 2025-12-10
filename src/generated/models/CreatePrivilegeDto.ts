/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreatePrivilegeDto = {
  title: string;
  value: any;
  group: 'users' | 'admin' | 'orders' | 'billing';
};
