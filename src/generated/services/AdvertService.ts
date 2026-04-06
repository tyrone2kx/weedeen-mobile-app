/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Advert } from '../models/Advert';
import type { CreateAdvertDto } from '../models/CreateAdvertDto';
import type { GeneralResponseDto } from '../models/GeneralResponseDto';
import type { UpdateAdvertDto } from '../models/UpdateAdvertDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AdvertService {
  /**
   * @returns Advert
   * @throws ApiError
   */
  public static advertControllerCreate({
    requestBody,
  }: {
    requestBody: CreateAdvertDto;
  }): CancelablePromise<Advert> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/advert',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @returns Advert
   * @throws ApiError
   */
  public static advertControllerFindAll({
    status,
  }: {
    status?: 'draft' | 'archived' | 'active' | 'inactive' | 'expired';
  }): CancelablePromise<Array<Advert>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/advert',
      query: {
        status: status,
      },
    });
  }
  /**
   * @returns Advert
   * @throws ApiError
   */
  public static advertControllerFindOne({
    id,
  }: {
    id: string;
  }): CancelablePromise<Advert> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/advert/{id}',
      path: {
        id: id,
      },
    });
  }
  /**
   * @returns Advert
   * @throws ApiError
   */
  public static advertControllerUpdate({
    id,
    requestBody,
  }: {
    id: string;
    requestBody: UpdateAdvertDto;
  }): CancelablePromise<Advert> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/advert/{id}',
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
  public static advertControllerRemove({
    id,
  }: {
    id: string;
  }): CancelablePromise<GeneralResponseDto> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/advert/{id}',
      path: {
        id: id,
      },
    });
  }
}
