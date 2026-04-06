/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UpdateAdvertDto = {
  /**
   * Advert title
   */
  title?: string;
  /**
   * Advert description
   */
  description?: string;
  /**
   * Advert status
   */
  status?: 'draft' | 'archived' | 'active' | 'inactive' | 'expired';
  /**
   * Number of tokens
   */
  tokens?: number;
  /**
   * Action type
   */
  actionType?: 'product_view' | 'service_view' | 'external_link' | 'general';
  /**
   * External URL
   */
  externalUrl?: string;
  /**
   * Start date
   */
  startDate?: string;
  /**
   * End date
   */
  endDate?: string;
  maxViewsPerUser?: number;
};
