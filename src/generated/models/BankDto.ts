/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type BankDto = {
  name: string;
  slug: string;
  code: string;
  /**
   * May be empty string
   */
  longcode: string;
  gateway: string | null;
  pay_with_bank: boolean;
  active: boolean;
  is_deleted: boolean;
  country: string;
  currency: string;
  type: string;
  id: number;
  createdAt: string;
  updatedAt: string;
};
