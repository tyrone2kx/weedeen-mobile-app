/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateStoreDto } from '../models/CreateStoreDto';
import type { GeneralResponseDto } from '../models/GeneralResponseDto';
import type { PaginatedStoresDto } from '../models/PaginatedStoresDto';
import type { Store } from '../models/Store';
import type { StoresStatisticsResponseDto } from '../models/StoresStatisticsResponseDto';
import type { UpdateStoreDto } from '../models/UpdateStoreDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class StoreService {
  /**
   * @returns Store
   * @throws ApiError
   */
  public static storeControllerCreate({
    requestBody,
  }: {
    requestBody: CreateStoreDto;
  }): CancelablePromise<Store> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/store',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @returns PaginatedStoresDto
   * @throws ApiError
   */
  public static storeControllerFindAll({
    status,
    includeDeleted,
    userId,
    passedTenant,
    startDate,
    endDate,
    onlySubscribed,
    page,
    limit,
    search,
    ignorePagination,
  }: {
    status: string;
    includeDeleted: boolean;
    userId: string;
    passedTenant: string;
    startDate: string;
    endDate: string;
    onlySubscribed: boolean;
    page?: number;
    limit?: number;
    search?: string;
    ignorePagination?: boolean;
  }): CancelablePromise<PaginatedStoresDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/store',
      query: {
        status: status,
        includeDeleted: includeDeleted,
        userId: userId,
        passedTenant: passedTenant,
        startDate: startDate,
        endDate: endDate,
        onlySubscribed: onlySubscribed,
        page: page,
        limit: limit,
        search: search,
        ignorePagination: ignorePagination,
      },
    });
  }
  /**
   * @returns StoresStatisticsResponseDto
   * @throws ApiError
   */
  public static storeControllerGetStatistics({
    userId,
    passedTenant,
    startDate,
    endDate,
  }: {
    userId: string;
    passedTenant: string;
    startDate: string;
    endDate: string;
  }): CancelablePromise<StoresStatisticsResponseDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/store/statistics',
      query: {
        userId: userId,
        passedTenant: passedTenant,
        startDate: startDate,
        endDate: endDate,
      },
    });
  }
  /**
   * @returns Store
   * @throws ApiError
   */
  public static storeControllerFindOne({
    id,
  }: {
    id: string;
  }): CancelablePromise<Store> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/store/{id}',
      path: {
        id: id,
      },
    });
  }
  /**
   * @returns Store
   * @throws ApiError
   */
  public static storeControllerUpdate({
    id,
    requestBody,
  }: {
    id: string;
    requestBody: UpdateStoreDto;
  }): CancelablePromise<Store> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/store/{id}',
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
  public static storeControllerDelete({
    id,
  }: {
    id: string;
  }): CancelablePromise<GeneralResponseDto> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/store/{id}',
      path: {
        id: id,
      },
    });
  }
  /**
   * @returns GeneralResponseDto
   * @throws ApiError
   */
  public static storeControllerDeleteStoreImage({
    id,
    imageUrl,
    isLogo,
  }: {
    id: string;
    imageUrl: string;
    isLogo: boolean;
  }): CancelablePromise<GeneralResponseDto> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/store/image/{id}',
      path: {
        id: id,
      },
      query: {
        imageUrl: imageUrl,
        isLogo: isLogo,
      },
    });
  }
  /**
   * @returns Store
   * @throws ApiError
   */
  public static storeControllerUploadStoreImages({
    id,
  }: {
    id: string;
  }): CancelablePromise<Store> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/store/upload-images/{id}',
      path: {
        id: id,
      },
    });
  }
}
