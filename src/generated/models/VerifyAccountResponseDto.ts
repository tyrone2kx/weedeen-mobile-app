/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Billing } from './Billing';
import type { User } from './User';
export type VerifyAccountResponseDto = {
  accessToken: string;
  refreshToken: string;
  user: User;
  activeSubscription: Billing;
  activeUserSubscriptions: Array<Billing>;
};
