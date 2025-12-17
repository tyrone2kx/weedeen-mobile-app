/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateRoleDto } from '../models/CreateRoleDto';
import type { CreateUserRoleDto } from '../models/CreateUserRoleDto';
import type { Role } from '../models/Role';
import type { UserRole } from '../models/UserRole';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class RoleService {
  /**
   * @returns Role
   * @throws ApiError
   */
  public static roleControllerCreate({
    requestBody,
  }: {
    requestBody: CreateRoleDto;
  }): CancelablePromise<Role> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/role',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @returns Role
   * @throws ApiError
   */
  public static roleControllerFindAll(): CancelablePromise<Array<Role>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/role',
    });
  }
  /**
   * @returns UserRole
   * @throws ApiError
   */
  public static roleControllerAssignUserRole({
    requestBody,
  }: {
    requestBody: CreateUserRoleDto;
  }): CancelablePromise<UserRole> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/role/assign',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
}
