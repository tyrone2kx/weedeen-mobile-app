/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateVisitorAccessDto = {
  visitorName: string;
  visitorPhone?: string;
  visitorType:
    | 'friend'
    | 'family'
    | 'delivery'
    | 'service_provider'
    | 'other'
    | 'unknown';
  visitorTypeOther?: string;
  purposeOfVisit?: string;
  accessCode?: string;
  accessCodeExpiry?: string;
  accessCodeUsed?: boolean;
  accessCodeUsedAt?: string;
  approvedByUserId?: string;
};
