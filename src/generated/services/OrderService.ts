/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateOrderDto } from '../models/CreateOrderDto';
import type { GeneralResponseDto } from '../models/GeneralResponseDto';
import type { Invoice } from '../models/Invoice';
import type { Order } from '../models/Order';
import type { OrderStatisticsForPackagersResponseDto } from '../models/OrderStatisticsForPackagersResponseDto';
import type { OrderStatisticsForRidersResponseDto } from '../models/OrderStatisticsForRidersResponseDto';
import type { OrderStatisticsForStoresResponseDto } from '../models/OrderStatisticsForStoresResponseDto';
import type { OrderStatisticsResponseDto } from '../models/OrderStatisticsResponseDto';
import type { PaginatedInvoiceDto } from '../models/PaginatedInvoiceDto';
import type { PaginatedOrdersDto } from '../models/PaginatedOrdersDto';
import type { UpdateOrderDto } from '../models/UpdateOrderDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class OrderService {
  /**
   * @returns Invoice
   * @throws ApiError
   */
  public static orderControllerCreate({
    requestBody,
  }: {
    requestBody: CreateOrderDto;
  }): CancelablePromise<Invoice> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/order',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @returns PaginatedOrdersDto
   * @throws ApiError
   */
  public static orderControllerFindAll({
    status,
    storeId,
    userId,
    startDate,
    endDate,
    page,
    limit,
    search,
    ignorePagination,
  }: {
    status: string;
    storeId: string;
    userId: string;
    startDate: string;
    endDate: string;
    page?: number;
    limit?: number;
    search?: string;
    ignorePagination?: boolean;
  }): CancelablePromise<PaginatedOrdersDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/order',
      query: {
        status: status,
        storeId: storeId,
        userId: userId,
        startDate: startDate,
        endDate: endDate,
        page: page,
        limit: limit,
        search: search,
        ignorePagination: ignorePagination,
      },
    });
  }

  /**
   * @returns PaginatedInvoiceDto
   * @throws ApiError
   */
  public static orderControllerFindAllOrdersForResident({
    status,
    storeId,
    userId,
    riderId,
    startDate,
    endDate,
    page,
    limit,
    search,
    ignorePagination,
  }: {
    status: string;
    storeId: string;
    userId: string;
    riderId: string;
    startDate: string;
    endDate: string;
    page?: number;
    limit?: number;
    search?: string;
    ignorePagination?: boolean;
  }): CancelablePromise<PaginatedInvoiceDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/order/resident',
      query: {
        status: status,
        storeId: storeId,
        userId: userId,
        riderId: riderId,
        startDate: startDate,
        endDate: endDate,
        page: page,
        limit: limit,
        search: search,
        ignorePagination: ignorePagination,
      },
    });
  }

  /**
   * @returns OrderStatisticsResponseDto
   * @throws ApiError
   */
  public static orderControllerGetOrderStatisticsForResident({
    forUser,
  }: {
    forUser: boolean;
  }): CancelablePromise<OrderStatisticsResponseDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/order/statistics-for-resident',
      query: {
        forUser: forUser,
      },
    });
  }

  /**
   * @returns OrderStatisticsForStoresResponseDto
   * @throws ApiError
   */
  public static orderControllerGetOrderStatisticsForStore({
    storeId,
    startDate,
    endDate,
  }: {
    storeId: string;
    startDate: string;
    endDate: string;
  }): CancelablePromise<OrderStatisticsForStoresResponseDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/order/statistics-for-store',
      query: {
        storeId: storeId,
        startDate: startDate,
        endDate: endDate,
      },
    });
  }

  /**
   * @returns OrderStatisticsForRidersResponseDto
   * @throws ApiError
   */
  public static orderControllerGetOrderStatisticsForRider({
    userId,
    startDate,
    endDate,
  }: {
    userId: string;
    startDate: string;
    endDate: string;
  }): CancelablePromise<OrderStatisticsForRidersResponseDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/order/statistics-for-rider',
      query: {
        userId: userId,
        startDate: startDate,
        endDate: endDate,
      },
    });
  }

  /**
   * @returns OrderStatisticsForPackagersResponseDto
   * @throws ApiError
   */
  public static orderControllerGetOrderStatisticsForPackagers({
    startDate,
    endDate,
  }: {
    startDate: string;
    endDate: string;
  }): CancelablePromise<OrderStatisticsForPackagersResponseDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/order/statistics-for-packager',
      query: {
        startDate: startDate,
        endDate: endDate,
      },
    });
  }

  /**
   * @returns Order
   * @throws ApiError
   */
  public static orderControllerFindOne({
    id,
  }: {
    id: string;
  }): CancelablePromise<Order> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/order/{id}',
      path: {
        id: id,
      },
    });
  }

  /**
   * @returns Order
   * @throws ApiError
   */
  public static orderControllerUpdate({
    id,
    requestBody,
  }: {
    id: string;
    requestBody: UpdateOrderDto;
  }): CancelablePromise<Order> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/order/{id}',
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @returns GeneralResponseDto
   * @throws ApiError
   */
  public static orderControllerDelete({
    id,
  }: {
    id: string;
  }): CancelablePromise<GeneralResponseDto> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/order/{id}',
      path: {
        id: id,
      },
    });
  }

  /**
   * @returns Invoice
   * @throws ApiError
   */
  public static orderControllerMarkInvoiceAsCompleted({
    invoiceId,
  }: {
    invoiceId: number;
  }): CancelablePromise<Invoice> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/order/complete/{invoiceId}',
      path: {
        invoiceId: invoiceId,
      },
    });
  }
}
