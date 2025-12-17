/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Product } from './Product';
export type PaginatedProductsDto = {
  data: Array<Product>;
  page: number;
  limit: number;
  totalPages: number;
  totalElements: number;
};
