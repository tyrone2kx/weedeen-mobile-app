/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiKey } from '../models/ApiKey';
import type { GenerateKeyDto } from '../models/GenerateKeyDto';
import type { Organization } from '../models/Organization';
import type { UpdateOrganizationDto } from '../models/UpdateOrganizationDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class OrganizationService {
  /**
   * @returns boolean
   * @throws ApiError
   */
  public static organizationControllerCheckIfTenantExists({
    tenant,
  }: {
    tenant: string;
  }): CancelablePromise<boolean> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/organization/exists/{tenant}',
      path: {
        tenant: tenant,
      },
    });
  }
  /**
   * @returns ApiKey
   * @throws ApiError
   */
  public static organizationControllerGetActiveKeys(): CancelablePromise<ApiKey> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/organization/active-keys',
    });
  }
  /**
   * @returns Organization
   * @throws ApiError
   */
  public static organizationControllerFindById({
    id,
  }: {
    id: string;
  }): CancelablePromise<Organization> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/organization/{id}',
      path: {
        id: id,
      },
    });
  }
  /**
   * @returns Organization
   * @throws ApiError
   */
  public static organizationControllerUpdate({
    id,
    requestBody,
  }: {
    id: string;
    requestBody: UpdateOrganizationDto;
  }): CancelablePromise<Organization> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/organization/{id}',
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @returns ApiKey
   * @throws ApiError
   */
  public static organizationControllerGenerateNewKeyPair({
    requestBody,
  }: {
    requestBody: GenerateKeyDto;
  }): CancelablePromise<ApiKey> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/organization/generate-keys',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @returns Organization
   * @throws ApiError
   */
  public static organizationControllerVerifyOrganizationKey(): CancelablePromise<Organization> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/organization/verify-api-key',
    });
  }
}
