/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { User } from './User';
import type { UserFee } from './UserFee';
export type Fee = {
  id: string;
  title: string;
  tenant: string;
  creatorId: string;
  createdBy: User;
  amount: number;
  currency: string;
  flat?: string;
  block?: string;
  street?: string;
  isActive: boolean;
  isGeneralFee: boolean;
  dueDate: string;
  isRecurrent: boolean;
  recurrentFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  tag: string;
  invoices: Array<UserFee>;
  description: string;
  updatedAt: string;
  createdAt: string;
};
