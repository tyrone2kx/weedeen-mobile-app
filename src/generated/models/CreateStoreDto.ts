/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TimeInputType } from './TimeInputType';
export type CreateStoreDto = {
  name: string;
  description?: string;
  logo?: string;
  images?: Array<string>;
  street?: string;
  block?: string;
  flat?: string;
  latitude?: number;
  longitude?: number;
  openingHours?: TimeInputType;
  closingHours?: TimeInputType;
  isOpenOnWeekends?: boolean;
  isOpenOnHolidays?: boolean;
  isTemporarilyClosed?: boolean;
};
