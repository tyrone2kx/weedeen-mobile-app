/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type OrderStatisticsResponseDto = {
  /**
   * Total number of orders
   */
  totalOrders: number;
  /**
   * Total amount for completed (paid) orders
   */
  totalAmount: number;
  /**
   * Number of completed (paid) orders
   */
  completedOrders: number;
  /**
   * Number of pending orders
   */
  pendingOrders: number;
  /**
   * Number of cancelled orders
   */
  cancelledOrders: number;
  /**
   * Total amount spent in current month
   */
  amountSpentThisMonth: number;
};
