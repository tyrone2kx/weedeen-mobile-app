/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type UpdatePostDto = {
  title?: string;
  content?: string;
  postType?: 'NEWS' | 'ADVERT' | 'GENERAL';
  images?: Array<string>;
  videos?: Array<string>;
};
