/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateSOSAlertDto } from '../models/CreateSOSAlertDto';
import type { CreateSOSResponseDto } from '../models/CreateSOSResponseDto';
import type { PaginatedSOSAlert } from '../models/PaginatedSOSAlert';
import type { SOSAlert } from '../models/SOSAlert';
import type { SosAlertStatisticsResponseDto } from '../models/SosAlertStatisticsResponseDto';
import type { SOSResponse } from '../models/SOSResponse';
import type { UpdateSOSAlertDto } from '../models/UpdateSOSAlertDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SosAlertService {
  /**
   * @returns SosAlertStatisticsResponseDto
   * @throws ApiError
   */
  public static sosAlertControllerGetStatistics({
    userId,
  }: {
    userId: string;
  }): CancelablePromise<SosAlertStatisticsResponseDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/sos-alert/statistics',
      query: {
        userId: userId,
      },
    });
  }
  /**
   * @returns SOSAlert
   * @throws ApiError
   */
  public static sosAlertControllerCreate({
    requestBody,
  }: {
    requestBody: CreateSOSAlertDto;
  }): CancelablePromise<SOSAlert> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/sos-alert',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @returns PaginatedSOSAlert
   * @throws ApiError
   */
  public static sosAlertControllerFindAll({
    status,
    emergencyType,
    userId,
    includeRelations,
    page,
    limit,
    search,
    ignorePagination,
  }: {
    status: string;
    emergencyType: string;
    userId: string;
    includeRelations: boolean;
    page?: number;
    limit?: number;
    search?: string;
    ignorePagination?: boolean;
  }): CancelablePromise<PaginatedSOSAlert> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/sos-alert',
      query: {
        status: status,
        emergencyType: emergencyType,
        userId: userId,
        includeRelations: includeRelations,
        page: page,
        limit: limit,
        search: search,
        ignorePagination: ignorePagination,
      },
    });
  }
  /**
   * @returns SOSAlert
   * @throws ApiError
   */
  public static sosAlertControllerFindOne({
    id,
  }: {
    id: string;
  }): CancelablePromise<SOSAlert> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/sos-alert/{id}',
      path: {
        id: id,
      },
    });
  }
  /**
   * @returns SOSAlert
   * @throws ApiError
   */
  public static sosAlertControllerUpdate({
    id,
    requestBody,
  }: {
    id: string;
    requestBody: UpdateSOSAlertDto;
  }): CancelablePromise<SOSAlert> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/sos-alert/{id}',
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @returns SOSResponse
   * @throws ApiError
   */
  public static sosAlertControllerRespondToAlert({
    id,
    requestBody,
  }: {
    id: string;
    requestBody: CreateSOSResponseDto;
  }): CancelablePromise<SOSResponse> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/sos-alert/respond/{id}',
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
}
