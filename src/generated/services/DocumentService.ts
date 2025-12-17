/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateDocumentDto } from '../models/CreateDocumentDto';
import type { Document } from '../models/Document';
import type { GeneralResponseDto } from '../models/GeneralResponseDto';
import type { UpdateDocumentDto } from '../models/UpdateDocumentDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DocumentService {
  /**
   * @returns Document
   * @throws ApiError
   */
  public static documentControllerFindAll({
    slug,
  }: {
    slug: string;
  }): CancelablePromise<Array<Document>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/document',
      query: {
        slug: slug,
      },
    });
  }
  /**
   * @returns Document
   * @throws ApiError
   */
  public static documentControllerUploadImages({
    requestBody,
  }: {
    requestBody: CreateDocumentDto;
  }): CancelablePromise<Document> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/document/upload',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @returns GeneralResponseDto
   * @throws ApiError
   */
  public static documentControllerDeleteDocument({
    id,
  }: {
    id: string;
  }): CancelablePromise<GeneralResponseDto> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/document/{id}',
      path: {
        id: id,
      },
    });
  }
  /**
   * @returns GeneralResponseDto
   * @throws ApiError
   */
  public static documentControllerUpdateDocument({
    id,
    requestBody,
  }: {
    id: string;
    requestBody: UpdateDocumentDto;
  }): CancelablePromise<GeneralResponseDto> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/document/{id}',
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
}
