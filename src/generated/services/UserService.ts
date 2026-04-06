/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateStaffDto } from '../models/CreateStaffDto';
import type { GeneralResponseDto } from '../models/GeneralResponseDto';
import type { Staff } from '../models/Staff';
import type { UpdateStaffDto } from '../models/UpdateStaffDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UserService {
  /**
   * @returns any
   * @throws ApiError
   */
  public static userControllerGetUserStatisticsForEstateAdmin(): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/user/statistics/estate-admin',
    });
  }
  /**
   * @returns Staff
   * @throws ApiError
   */
  public static userControllerFindAllStaffForUser({
    userId,
  }: {
    userId: string;
  }): CancelablePromise<Array<Staff>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/user/staff',
      query: {
        userId: userId,
      },
    });
  }
  /**
   * @returns Staff
   * @throws ApiError
   */
  public static userControllerCreateStaff({
    requestBody,
  }: {
    requestBody: CreateStaffDto;
  }): CancelablePromise<Staff> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/user/staff',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @returns any
   * @throws ApiError
   */
  public static userControllerFindStaffLogs({
    page,
    limit,
    search,
    ignorePagination,
    staffId,
    userId,
    startDate,
    endDate,
  }: {
    page?: number;
    limit?: number;
    search?: string;
    ignorePagination?: boolean;
    staffId?: string;
    userId?: string;
    startDate?: string;
    endDate?: string;
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/user/staff/logs',
      query: {
        page: page,
        limit: limit,
        search: search,
        ignorePagination: ignorePagination,
        staffId: staffId,
        userId: userId,
        startDate: startDate,
        endDate: endDate,
      },
    });
  }
  /**
   * @returns Staff
   * @throws ApiError
   */
  public static userControllerGetStaffById({
    id,
  }: {
    id: string;
  }): CancelablePromise<Staff> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/user/staff/{id}',
      path: {
        id: id,
      },
    });
  }
  /**
   * @returns Staff
   * @throws ApiError
   */
  public static userControllerUpdateStaff({
    id,
    requestBody,
  }: {
    id: string;
    requestBody: UpdateStaffDto;
  }): CancelablePromise<Staff> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/user/staff/{id}',
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
  public static userControllerDeleteStaff({
    id,
  }: {
    id: string;
  }): CancelablePromise<GeneralResponseDto> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/user/staff/{id}',
      path: {
        id: id,
      },
    });
  }
}
