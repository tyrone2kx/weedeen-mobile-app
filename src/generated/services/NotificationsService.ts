/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateNotificationDto } from '../models/CreateNotificationDto';
import type { Notification } from '../models/Notification';
import type { PaginatedNotificationDto } from '../models/PaginatedNotificationDto';
import type { UpdateNotificationDto } from '../models/UpdateNotificationDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class NotificationsService {
  /**
   * @returns Notification
   * @throws ApiError
   */
  public static notificationsControllerCreate({
    requestBody,
  }: {
    requestBody: CreateNotificationDto;
  }): CancelablePromise<Notification> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/Notifications',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @returns PaginatedNotificationDto
   * @throws ApiError
   */
  public static notificationsControllerFindAll({
    status,
    page,
    limit,
    search,
    ignorePagination,
  }: {
    status: string;
    page?: number;
    limit?: number;
    search?: string;
    ignorePagination?: boolean;
  }): CancelablePromise<PaginatedNotificationDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/Notifications',
      query: {
        status: status,
        page: page,
        limit: limit,
        search: search,
        ignorePagination: ignorePagination,
      },
    });
  }
  /**
   * @returns Notification
   * @throws ApiError
   */
  public static notificationsControllerUpdate({
    id,
    requestBody,
  }: {
    id: string;
    requestBody: UpdateNotificationDto;
  }): CancelablePromise<Notification> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/Notifications/{id}',
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @returns any
   * @throws ApiError
   */
  public static notificationsControllerRemove({
    id,
  }: {
    id: string;
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/Notifications/{id}',
      path: {
        id: id,
      },
    });
  }
}
