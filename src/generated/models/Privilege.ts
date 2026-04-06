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
    | 'billings_view_organization_invoices'
    | 'fee_create'
    | 'fee_assign_to_resident'
    | 'fee_read'
    | 'fee_update'
    | 'fee_delete'
    | 'fee_record_payment'
    | 'residents_create'
    | 'residents_read'
    | 'residents_update'
    | 'residents_delete'
    | 'utilities_create'
    | 'utilities_read'
    | 'utilities_update'
    | 'utilities_delete'
    | 'access_blocks_create'
    | 'access_blocks_read'
    | 'access_blocks_update'
    | 'access_blocks_delete'
    | 'stores_approve'
    | 'admin_create'
    | 'admin_read'
    | 'admin_update'
    | 'admin_delete'
    | 'roles_create'
    | 'roles_read'
    | 'roles_update'
    | 'roles_delete'
    | 'estates_create'
    | 'estates_read'
    | 'estates_update'
    | 'estates_delete'
    | 'landlords_create'
    | 'landlords_read'
    | 'landlords_update'
    | 'landlords_delete';
  group:
    | 'users'
    | 'admin'
    | 'orders'
    | 'billing'
    | 'fee'
    | 'residents'
    | 'utilities'
    | 'access_blocks'
    | 'stores'
    | 'roles'
    | 'estates'
    | 'landlords';
  createdAt: string;
  updatedAt: string;
  roles: Array<Role>;
};
