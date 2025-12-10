export interface Breakpoints {
  base?: number;
  md?: number;
  lg?: number;
  xl?: number;
  xxl?: number;
}

export type SelectOptionType = {
  label: string;
  value: any;
  extras?: any;
} | null;

export type PaginatedType<T> = {
  page: number;
  limit: number;
  totalPages: number;
  totalElements: number;
  data: T[];
};

export enum InvoiceStatusEnum {
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
}

export enum UserTypeEnum {
  RESIDENT = 'resident',
  RIDER = 'rider',
  SECURITY = 'security',
  ADMIN = 'admin',
  ESTATE_ADMIN = 'estate_admin',
  PACKAGER = 'packager',
}

export enum StoreStatusEnum {
  ACTIVE = 'active',
  PENDING_APPROVAL = 'pending_approval',
  REJECTED = 'rejected',
}

export enum OrderStatusEnum {
  PENDING = 'pending',
  DELIVERY_IN_PROGRESS = 'delivery_in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  PAID = 'paid',
  REFUNDED = 'refunded',
  FAILED = 'failed',
  DELIVERED = 'delivered',
  READY_FOR_PICKUP = 'ready_for_pickup',
}

export enum DeliveryStatusEnum {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  FAILED = 'failed',
  DELIVERED = 'delivered',
  READY_FOR_PICKUP = 'ready_for_pickup',
}
export enum ProductStatusEnum {
  IN_STOCK = 'in_stock',
  OUT_OF_STOCK = 'out_of_stock',
  DISCONTINUED = 'discontinued',
}

export enum VisitorTypeEnum {
  FRIEND = 'friend',
  FAMILY = 'family',
  DELIVERY = 'delivery',
  SERVICE_PROVIDER = 'service_provider',
  OTHER = 'other',
  UNKNOWN = 'unknown',
}

export enum InvoiceTypeEnum {
  CREDIT_PURCHASE = 'credit_purchase',
  SUBSCRIPTION = 'subscription',
  PRODUCT_PURCHASE = 'product_purchase',
}

export enum EmergencyTypeEnum {
  MEDICAL = 'medical',
  SECURITY = 'security',
  FIRE = 'fire',
  MAINTENANCE = 'maintenance',
  ROBBERY = 'robbery',
  FIGHT = 'fight',
  KIDNAPPING = 'kidnapping',
  ACCIDENT = 'accident',
  NATURAL_DISASTER = 'natural_disaster',
  OTHER = 'other',
}

export enum SOSStatusEnum {
  PENDING = 'pending',
  ACKNOWLEDGED = 'acknowledged',
  IN_PROGRESS = 'in_progress',
  RESOLVED = 'resolved',
  CANCELLED = 'cancelled',
}

export enum SOSResponseActionEnum {
  DISPATCHED = 'dispatched',
  ON_WAY = 'on_way',
  ON_SITE = 'on_site',
  RESOLVED = 'resolved',
  NEED_MORE_INFO = 'need_more_info',
}

export type TEnvModes = 'staging' | 'production' | 'development';

export type TErrorStatusCodes =
  | 400
  | 401
  | 403
  | 404
  | 408
  | 409
  | 500
  | 502
  | 503
  | 504
  | 600
  | 0;

export enum NotificationTypeEnum {
  INFO = 'info',
  NEW_ORDER = 'new_order',
  VISITOR_APPROVAL = 'visitor_approval',
  DELIVERY_STATUS = 'delivery_status',
  DELIVERY_ASSIGNMENT = 'delivery_assignment',
  SOS_ALERT = 'sos_alert',
  SOS_ALERT_RESOLVED = 'sos_alert_resolved',
  MAINTENANCE_REQUEST = 'maintenance_request',
  NEW_INVOICE = 'new_invoice',
  FEE_REMINDER = 'fee_reminder',
  STORE_STATUS_CHANGE = 'store_status_change',
  NEWS_UPDATE = 'news_update',
  COMMENT = 'comment',
  REPLY = 'reply',
}
