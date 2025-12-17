/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SOSAlert } from './SOSAlert';
import type { User } from './User';
export type SOSResponse = {
  id: string;
  sosAlert: SOSAlert;
  sosAlertId: string;
  responder: User;
  responderId: string;
  message?: string;
  action: 'dispatched' | 'on_way' | 'on_site' | 'resolved' | 'need_more_info';
  createdAt: string;
};
