/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UpdatePlotDto = {
  name?: string;
  size?: string;
  price?: number;
  plotNo?: string;
  plotPrefix?: string;
  plotCount?: string;
  block?: string;
  street?: string;
  phase?: string;
  section?: string;
  lotNumber?: string;
  plotType?: string;
  status?: 'available' | 'reserved' | 'sold';
  location?: string;
  estateId?: string;
  createdById?: string;
  longitude?: number;
  latitude?: number;
  updatedById?: string;
  description?: string;
  isPurchased?: boolean;
  metadata?: Record<string, any>;
};
