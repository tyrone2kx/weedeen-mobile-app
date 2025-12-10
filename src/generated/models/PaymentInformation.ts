/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Authorization } from './Authorization';
import type { User } from './User';

export type PaymentInformation = {
  id: string;
  userId: string;
  user: User;
  authorization: Authorization;
  createdAt: string;
  updatedAt: string;
};
