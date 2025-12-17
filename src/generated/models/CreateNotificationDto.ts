/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { User } from './User';
export type CreateNotificationDto = {
  userId: string;
  user: User;
  tenant: string;
  subject: string;
  message: string;
  notificationType:
    | 'info'
    | 'new_order'
    | 'visitor_approval'
    | 'delivery_status'
    | 'delivery_assignment'
    | 'sos_alert'
    | 'sos_alert_resolved'
    | 'maintenance_request'
    | 'new_invoice'
    | 'fee_reminder'
    | 'store_status_change'
    | 'news_update'
    | 'comment'
    | 'reply';
  status: 'unread' | 'read' | 'archived' | 'deleted';
  resourceId?: string | null;
  readAt: string | null;
  metadata?: Record<string, any>;
  deletedAt: string | null;
};
