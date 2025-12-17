/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaginatedUserDto } from '../models/PaginatedUserDto';
import type { User } from '../models/User';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AdminService {
  /**
   * @returns PaginatedUserDto
   * @throws ApiError
   */
  public static adminControllerFindTeamMembers({
    status,
    role,
    page,
    limit,
    search,
    ignorePagination,
  }: {
    status: string;
    role: string;
    page?: number;
    limit?: number;
    search?: string;
    ignorePagination?: boolean;
  }): CancelablePromise<PaginatedUserDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/admin/team-members',
      query: {
        status: status,
        role: role,
        page: page,
        limit: limit,
        search: search,
        ignorePagination: ignorePagination,
      },
    });
  }
  /**
   * @returns PaginatedUserDto
   * @throws ApiError
   */
  public static adminControllerGetAllResidents({
    status,
    withoutFeeId,
    passedTenant,
    startDate,
    endDate,
    page,
    limit,
    search,
    ignorePagination,
  }: {
    status: string;
    withoutFeeId: string;
    passedTenant: string;
    startDate: string;
    endDate: string;
    page?: number;
    limit?: number;
    search?: string;
    ignorePagination?: boolean;
  }): CancelablePromise<PaginatedUserDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/admin/residents',
      query: {
        status: status,
        withoutFeeId: withoutFeeId,
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
   * @returns User
   * @throws ApiError
   */
  public static adminControllerGetUserById({
    id,
  }: {
    id: string;
  }): CancelablePromise<User> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/admin/users/{id}',
      query: {
        id: id,
      },
    });
  }
}
