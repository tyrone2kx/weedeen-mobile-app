/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { User } from './User';
export type Estate = {
  id: string;
  tenant: string;
  name: string;
  address: string;
  city: string;
  state: string;
  logo: string;
  images: Array<string>;
  documents: Array<string>;
  videos: Array<string>;
  zipCode: string;
  lga: string;
  size: string;
  country: string;
  availableDocuments: Array<
    | 'fcda_approval'
    | 'certificate_of_occupancy'
    | 'survey_plan'
    | 'deed_of_assignment'
  >;
  longitude?: number;
  latitude?: number;
  createdById: string;
  createdBy: User;
  updatedById: string;
  updatedBy: User;
  description: string;
  status:
    | 'undergoing_development'
    | 'completed'
    | 'operational'
    | 'suspended'
    | 'plot_allocation_ongoing'
    | 'estate_planning';
  metadata: Record<string, any>;
  deletedById: string;
  deletedBy: User;
  updatedAt: string;
  deletedAt: string;
  createdAt: string;
};
