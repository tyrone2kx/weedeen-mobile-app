/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AssignRoleToBulkUsersDto } from '../models/AssignRoleToBulkUsersDto';
import type { CreateRoleDto } from '../models/CreateRoleDto';
import type { CreateRolePrivilegeDto } from '../models/CreateRolePrivilegeDto';
import type { CreateUserRoleDto } from '../models/CreateUserRoleDto';
import type { GeneralResponseDto } from '../models/GeneralResponseDto';
import type { Privilege } from '../models/Privilege';
import type { Role } from '../models/Role';
import type { UnassignUserRoleDto } from '../models/UnassignUserRoleDto';
import type { UpdateRoleDto } from '../models/UpdateRoleDto';
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
   * @returns Privilege
   * @throws ApiError
   */
  public static roleControllerGetAllPrivileges(): CancelablePromise<
    Array<Privilege>
  > {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/role/privileges',
    });
  }
  /**
   * @returns Role
   * @throws ApiError
   */
  public static roleControllerCreateRolePrivilege({
    requestBody,
  }: {
    requestBody: CreateRolePrivilegeDto;
  }): CancelablePromise<Role> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/role/privilege',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @returns UserRole
   * @throws ApiError
   */
  public static roleControllerAssignUserRoles({
    requestBody,
  }: {
    requestBody: CreateUserRoleDto;
  }): CancelablePromise<Array<UserRole>> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/role/assign',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @returns GeneralResponseDto
   * @throws ApiError
   */
  public static roleControllerAssignRoleToBulkUsers({
    requestBody,
  }: {
    requestBody: AssignRoleToBulkUsersDto;
  }): CancelablePromise<GeneralResponseDto> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/role/assign-bulk',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @returns GeneralResponseDto
   * @throws ApiError
   */
  public static roleControllerUnassignUserRole({
    requestBody,
  }: {
    requestBody: UnassignUserRoleDto;
  }): CancelablePromise<GeneralResponseDto> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/role/unassign',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @returns Role
   * @throws ApiError
   */
  public static roleControllerUpdate({
    id,
    requestBody,
  }: {
    id: string;
    requestBody: UpdateRoleDto;
  }): CancelablePromise<Role> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/role/{id}',
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
  public static roleControllerDelete({
    id,
  }: {
    id: string;
  }): CancelablePromise<GeneralResponseDto> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/role/{id}',
      path: {
        id: id,
      },
    });
  }
  /**
   * @returns Role
   * @throws ApiError
   */
  public static roleControllerFindOne({
    id,
  }: {
    id: string;
  }): CancelablePromise<Role> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/role/{id}',
      path: {
        id: id,
      },
    });
  }
}
