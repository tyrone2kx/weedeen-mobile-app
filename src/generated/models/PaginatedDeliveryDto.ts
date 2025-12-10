/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Delivery } from './Delivery';

export type PaginatedDeliveryDto = {
  data: Array<Delivery>;
  page: number;
  limit: number;
  totalPages: number;
  totalElements: number;
};
