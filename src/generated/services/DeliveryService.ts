/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AssignRiderToDeliveryDto } from '../models/AssignRiderToDeliveryDto';
import type { CreateDeliveryDto } from '../models/CreateDeliveryDto';
import type { Delivery } from '../models/Delivery';
import type { DeliveryStatisticsResponseDto } from '../models/DeliveryStatisticsResponseDto';
import type { PaginatedDeliveryDto } from '../models/PaginatedDeliveryDto';
import type { UpdateDeliveryDto } from '../models/UpdateDeliveryDto';
import type { User } from '../models/User';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DeliveryService {
  /**
   * @returns Delivery
   * @throws ApiError
   */
  public static deliveryControllerCreate({
    requestBody,
  }: {
    requestBody: CreateDeliveryDto;
  }): CancelablePromise<Delivery> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/delivery',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @returns PaginatedDeliveryDto
   * @throws ApiError
   */
  public static deliveryControllerFindAll({
    status,
    storeId,
    userId,
    invoiceId,
    passedTenant,
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
    invoiceId: string;
    passedTenant: string;
    startDate: string;
    endDate: string;
    page?: number;
    limit?: number;
    search?: string;
    ignorePagination?: boolean;
  }): CancelablePromise<PaginatedDeliveryDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/delivery',
      query: {
        status: status,
        storeId: storeId,
        userId: userId,
        invoiceId: invoiceId,
        passedTenant: passedTenant,
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
   * @returns DeliveryStatisticsResponseDto
   * @throws ApiError
   */
  public static deliveryControllerGetStatistics({
    userId,
    riderId,
    passedTenant,
    startDate,
    endDate,
  }: {
    userId: string;
    riderId: string;
    passedTenant: string;
    startDate: string;
    endDate: string;
  }): CancelablePromise<DeliveryStatisticsResponseDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/delivery/statistics',
      query: {
        userId: userId,
        riderId: riderId,
        passedTenant: passedTenant,
        startDate: startDate,
        endDate: endDate,
      },
    });
  }
  /**
   * @returns Delivery
   * @throws ApiError
   */
  public static deliveryControllerAssignRiderToDelivery({
    id,
    requestBody,
  }: {
    id: string;
    requestBody: AssignRiderToDeliveryDto;
  }): CancelablePromise<Delivery> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/delivery/{id}/assign-rider',
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @returns User
   * @throws ApiError
   */
  public static deliveryControllerGetRiders(): CancelablePromise<Array<User>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/delivery/riders',
    });
  }
  /**
   * @returns Delivery
   * @throws ApiError
   */
  public static deliveryControllerFindOne({
    id,
  }: {
    id: string;
  }): CancelablePromise<Delivery> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/delivery/{id}',
      path: {
        id: id,
      },
    });
  }
  /**
   * @returns Delivery
   * @throws ApiError
   */
  public static deliveryControllerUpdate({
    id,
    requestBody,
  }: {
    id: string;
    requestBody: UpdateDeliveryDto;
  }): CancelablePromise<Delivery> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/delivery/{id}',
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
}
