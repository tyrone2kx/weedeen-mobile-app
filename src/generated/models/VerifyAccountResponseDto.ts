/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { User } from './User';

export type VerifyAccountResponseDto = {
  accessToken: string;
  refreshToken: string;
  user: User;
};
