/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreatePrivilegeDto } from '../models/CreatePrivilegeDto';
import type { Privilege } from '../models/Privilege';
import type { UpdatePrivilegeDto } from '../models/UpdatePrivilegeDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PrivilegeService {
  /**
   * @returns Privilege
   * @throws ApiError
   */
  public static privilegeControllerCreate({
    requestBody,
  }: {
    requestBody: CreatePrivilegeDto;
  }): CancelablePromise<Privilege> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/privilege',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @returns Privilege
   * @throws ApiError
   */
  public static privilegeControllerFindAll(): CancelablePromise<
    Array<Privilege>
  > {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/privilege',
    });
  }

  /**
   * @returns Privilege
   * @throws ApiError
   */
  public static privilegeControllerUpdate({
    id,
    requestBody,
  }: {
    id: string;
    requestBody: UpdatePrivilegeDto;
  }): CancelablePromise<Privilege> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/privilege/{id}',
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @returns string
   * @throws ApiError
   */
  public static privilegeControllerRemove({
    id,
  }: {
    id: string;
  }): CancelablePromise<string> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/privilege/{id}',
      path: {
        id: id,
      },
    });
  }
}
