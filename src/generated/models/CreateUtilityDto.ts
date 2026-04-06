/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateUtilityDto = {
  /**
   * Name of the utility
   */
  name: string;
  /**
   * Description of the utility
   */
  description?: string;
  /**
   * Amount for the utility
   */
  amount: number;
  /**
   * Is the utility active
   */
  isActive?: boolean;
  /**
   * Date when utility was deactivated
   */
  deactivatedAt?: string;
  /**
   * User ID who deactivated the utility
   */
  deactivatedById?: string;
};
