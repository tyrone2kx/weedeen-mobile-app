/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateFeeDto = {
  amount: number;
  title: string;
  currency: string;
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
};
