/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Order } from './Order';
export type PaginatedOrdersDto = {
  data: Array<Order>;
  page: number;
  limit: number;
  totalPages: number;
  totalElements: number;
};
