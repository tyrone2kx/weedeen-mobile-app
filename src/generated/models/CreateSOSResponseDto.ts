/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreateSOSResponseDto = {
  acknowledgedAt?: string;
  sosAlertId: string;
  action: 'dispatched' | 'on_way' | 'on_site' | 'resolved' | 'need_more_info';
  message?: string;
  status?:
    | 'pending'
    | 'acknowledged'
    | 'in_progress'
    | 'resolved'
    | 'cancelled';
};
