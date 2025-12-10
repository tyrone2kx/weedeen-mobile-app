/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type UpdateSOSAlertDto = {
  subject?: string;
  description?: string;
  status?:
    | 'pending'
    | 'acknowledged'
    | 'in_progress'
    | 'resolved'
    | 'cancelled';
  emergencyType?:
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
  latitude?: number;
  longitude?: number;
  locationDescription?: string;
  isGeneralEmergency?: boolean;
  isFalseAlarm?: boolean;
  resolvedAt?: string;
  resolutionDetails?: string;
};
