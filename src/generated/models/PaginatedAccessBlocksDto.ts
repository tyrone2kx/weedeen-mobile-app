/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AccessBlock } from './AccessBlock';
export type PaginatedAccessBlocksDto = {
  /**
   * List of access blocks
   */
  data: Array<AccessBlock>;
  page: number;
  limit: number;
  totalPages: number;
  totalElements: number;
};
