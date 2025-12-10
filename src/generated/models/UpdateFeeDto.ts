/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type UpdateFeeDto = {
  amount?: number;
  title?: string;
  currency?: string;
  isActive?: boolean;
  dueDate?: string;
  isRecurrent?: boolean;
  isGeneralFee?: boolean;
  recurrentFrequency?: 'daily' | 'weekly' | 'monthly' | 'yearly';
  tag?: string;
  description?: string;
  flat?: string;
  block?: string;
  street?: string;
  selectedUsers?: Array<string>;
};
