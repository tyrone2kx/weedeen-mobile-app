import { Theme } from './Theme';
import { OrderStatusEnum, StoreStatusEnum } from './types';

export const StatusMaps = {
  [StoreStatusEnum.ACTIVE]: {
    label: 'Active',
    color: Theme.green,
  },
  [StoreStatusEnum.PENDING_APPROVAL]: {
    label: 'Pending Approval',
    color: Theme.amber,
  },
  [StoreStatusEnum.REJECTED]: {
    label: 'Rejected',
    color: Theme.red,
  },
  [OrderStatusEnum.PENDING]: {
    label: 'Pending',
    color: Theme.amber,
  },
  [OrderStatusEnum.DELIVERY_IN_PROGRESS]: {
    label: 'Delivery in Progress',
    color: Theme.primary,
  },
  [OrderStatusEnum.COMPLETED]: {
    label: 'Completed',
    color: Theme.green,
  },
  [OrderStatusEnum.CANCELLED]: {
    label: 'Cancelled',
    color: Theme.red,
  },
  [OrderStatusEnum.PAID]: {
    label: 'Paid',
    color: Theme.green,
  },
  [OrderStatusEnum.REFUNDED]: {
    label: 'Refunded',
    color: Theme.primary,
  },
  inactive: {
    label: 'Inactive',
    color: Theme.red,
  },
  ending: {
    label: 'Ending Soon',
    color: Theme.amber,
  },
  deactivated: {
    label: 'Deactivated',
    color: Theme.red,
  },
};
