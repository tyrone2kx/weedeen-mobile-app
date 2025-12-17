/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Organization } from './Organization';
import type { SOSResponse } from './SOSResponse';
import type { User } from './User';
export type SOSAlert = {
  id: string;
  subject: string;
  description: string;
  status: 'pending' | 'acknowledged' | 'in_progress' | 'resolved' | 'cancelled';
  emergencyType:
    | 'medical'
    | 'security'
    | 'fire'
    | 'maintenance'
    | 'robbery'
    | 'fight'
    | 'kidnapping'
    | 'accident'
    | 'natural_disaster'
    | 'other';
  latitude: number;
  longitude: number;
  locationDescription: string;
  isFalseAlarm: boolean;
  isGeneralEmergency: boolean;
  audioFiles: Array<string>;
  images: Array<string>;
  videoFiles: Array<string>;
  user: User;
  userId: string;
  estate: Organization;
  tenant: string;
  responses: Array<SOSResponse>;
  createdAt: string;
  updatedAt: string;
  acknowledgedAt: string;
  resolvedAt: string;
  resolvedById: string;
  resolvedBy: User;
  resolutionDetails: string;
};
