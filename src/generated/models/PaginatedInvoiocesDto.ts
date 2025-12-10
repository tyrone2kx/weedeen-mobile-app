/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Invoice } from './Invoice';

export type PaginatedInvoiocesDto = {
  data: Array<Invoice>;
  page: number;
  limit: number;
  totalPages: number;
  totalElements: number;
};
