/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Post } from './Post';

export type PaginatedPostsDto = {
  data: Array<Post>;
  page: number;
  limit: number;
  totalPages: number;
  totalElements: number;
};
