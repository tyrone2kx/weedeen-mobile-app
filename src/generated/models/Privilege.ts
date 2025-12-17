/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Role } from './Role';
export type Privilege = {
  id: string;
  title: string;
  value:
    | 'users_create'
    | 'users_read'
    | 'users_update'
    | 'users_delete'
    | 'users_document_approve'
    | 'orders_create'
    | 'orders_read'
    | 'orders_update'
    | 'orders_delete'
    | 'billings_view_organization_invoices';
  group: 'users' | 'admin' | 'orders' | 'billing';
  createdAt: string;
  updatedAt: string;
  roles: Array<Role>;
};
