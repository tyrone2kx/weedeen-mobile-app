/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateUtilityDto } from '../models/CreateUtilityDto';
import type { UpdateUtilityDto } from '../models/UpdateUtilityDto';
import type { Utility } from '../models/Utility';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UtilitiesService {
  /**
   * Create a new utility
   * @returns any Utility created successfully
   * @throws ApiError
   */
  public static utilityControllerCreate({
    requestBody,
  }: {
    requestBody: CreateUtilityDto;
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/utility',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * Get all utilities
   * @returns Utility
   * @throws ApiError
   */
  public static utilityControllerFindAll(): CancelablePromise<Array<Utility>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/utility',
    });
  }
  /**
   * Get a utility by ID
   * @returns Utility
   * @throws ApiError
   */
  public static utilityControllerFindOne({
    id,
  }: {
    id: string;
  }): CancelablePromise<Utility> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/utility/{id}',
      path: {
        id: id,
      },
    });
  }
  /**
   * Update a utility
   * @returns Utility
   * @throws ApiError
   */
  public static utilityControllerUpdate({
    id,
    requestBody,
  }: {
    id: string;
    requestBody: UpdateUtilityDto;
  }): CancelablePromise<Utility> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/utility/{id}',
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * Delete a utility
   * @returns any
   * @throws ApiError
   */
  public static utilityControllerRemove({
    id,
  }: {
    id: string;
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/utility/{id}',
      path: {
        id: id,
      },
    });
  }
}
