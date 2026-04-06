/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type BlockFeeDefaultersDto = {
  /**
   * Reason for blocking access
   */
  reason: string;
  feeId: string;
  utilityIds?: Array<string>;
  /**
   * Feature being blocked
   */
  features: Array<'visitor_access' | 'utility'>;
};
