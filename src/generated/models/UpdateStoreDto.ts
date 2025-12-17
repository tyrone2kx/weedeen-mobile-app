/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UpdateStoreDto = {
  name?: string;
  description?: string;
  logo?: string;
  images?: Array<string>;
  street?: string;
  block?: string;
  flat?: string;
  latitude?: number;
  longitude?: number;
  status?: 'active' | 'pending_approval' | 'rejected' | 'deactivated';
  deactivationReason?: string;
  deactivatedById?: string;
  rejectedById?: string;
  rejectionReason?: string;
};
