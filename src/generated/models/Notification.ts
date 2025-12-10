/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { User } from './User';

export type Notification = {
  id: string;
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
  metadata?: any;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};
