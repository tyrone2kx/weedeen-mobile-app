/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AccessBlock } from '../models/AccessBlock';
import type { BlockFeeDefaultersDto } from '../models/BlockFeeDefaultersDto';
import type { CreateAccessBlockDto } from '../models/CreateAccessBlockDto';
import type { PaginatedAccessBlocksDto } from '../models/PaginatedAccessBlocksDto';
import type { UpdateAccessBlockDto } from '../models/UpdateAccessBlockDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AccessBlocksService {
  /**
   * Create a new access block
   * @returns any Access block created successfully
   * @throws ApiError
   */
  public static accessBlockControllerCreate({
    requestBody,
  }: {
    requestBody: CreateAccessBlockDto;
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/access-block',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * Get all access blocks
   * @returns PaginatedAccessBlocksDto
   * @throws ApiError
   */
  public static accessBlockControllerFindAll({
    feature,
    utilityId,
    userId,
    feeId,
    isBlocked,
    page,
    limit,
    search,
    ignorePagination,
  }: {
    feature: string;
    utilityId: string;
    userId: string;
    feeId: string;
    isBlocked: boolean;
    page?: number;
    limit?: number;
    search?: string;
    ignorePagination?: boolean;
  }): CancelablePromise<PaginatedAccessBlocksDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/access-block',
      query: {
        feature: feature,
        utilityId: utilityId,
        userId: userId,
        feeId: feeId,
        isBlocked: isBlocked,
        page: page,
        limit: limit,
        search: search,
        ignorePagination: ignorePagination,
      },
    });
  }
  /**
   * Get an access block by ID
   * @returns AccessBlock
   * @throws ApiError
   */
  public static accessBlockControllerFindOne({
    id,
  }: {
    id: string;
  }): CancelablePromise<AccessBlock> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/access-block/{id}',
      path: {
        id: id,
      },
    });
  }
  /**
   * Update an access block
   * @returns AccessBlock
   * @throws ApiError
   */
  public static accessBlockControllerUpdate({
    id,
    requestBody,
  }: {
    id: string;
    requestBody: UpdateAccessBlockDto;
  }): CancelablePromise<AccessBlock> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/access-block/{id}',
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
  public static accessBlockControllerBlockFeeDefaulters({
    requestBody,
  }: {
    requestBody: BlockFeeDefaultersDto;
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/access-block/block-fee-defaulters',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
}
