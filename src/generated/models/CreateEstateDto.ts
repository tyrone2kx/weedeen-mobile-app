/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PlotAutoCreateConfigDto } from './PlotAutoCreateConfigDto';
export type CreateEstateDto = {
  name: string;
  address: string;
  city: string;
  status?:
    | 'undergoing_development'
    | 'completed'
    | 'operational'
    | 'suspended'
    | 'plot_allocation_ongoing'
    | 'estate_planning';
  state: string;
  zipCode?: string;
  lga?: string;
  size?: string;
  country?: string;
  availableDocuments?: Array<
    | 'fcda_approval'
    | 'certificate_of_occupancy'
    | 'survey_plan'
    | 'deed_of_assignment'
  >;
  longitude?: number;
  latitude?: number;
  description?: string;
  autoCreatePlots?: boolean;
  plotAutoCreateConfigs?: Array<PlotAutoCreateConfigDto>;
};
