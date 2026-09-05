/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DeactivateUserDto } from '../models/DeactivateUserDto';
import type { PaginatedUserDto } from '../models/PaginatedUserDto';
import type { User } from '../models/User';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AdminService {
    /**
     * @returns PaginatedUserDto
     * @throws ApiError
     */
    public static adminControllerFindTeamMembers({
        status,
        role,
        page,
        limit,
        search,
        ignorePagination,
    }: {
        status: string,
        role: string,
        page?: number,
        limit?: number,
        search?: string,
        ignorePagination?: boolean,
    }): CancelablePromise<PaginatedUserDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/team-members',
            query: {
                'status': status,
                'role': role,
                'page': page,
                'limit': limit,
                'search': search,
                'ignorePagination': ignorePagination,
            },
        });
    }
    /**
     * @returns User
     * @throws ApiError
     */
    public static adminControllerFindTeamMembersWithoutRole({
        roleId,
    }: {
        roleId: string,
    }): CancelablePromise<Array<User>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/team-members-without-role',
            query: {
                'roleId': roleId,
            },
        });
    }
    /**
     * @returns PaginatedUserDto
     * @throws ApiError
     */
    public static adminControllerGetAllResidents({
        status,
        withoutFeeId,
        passedTenant,
        startDate,
        endDate,
        page,
        limit,
        search,
        ignorePagination,
    }: {
        status: string,
        withoutFeeId: string,
        passedTenant: string,
        startDate: string,
        endDate: string,
        page?: number,
        limit?: number,
        search?: string,
        ignorePagination?: boolean,
    }): CancelablePromise<PaginatedUserDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/residents',
            query: {
                'status': status,
                'withoutFeeId': withoutFeeId,
                'passedTenant': passedTenant,
                'startDate': startDate,
                'endDate': endDate,
                'page': page,
                'limit': limit,
                'search': search,
                'ignorePagination': ignorePagination,
            },
        });
    }
    /**
     * @returns User
     * @throws ApiError
     */
    public static adminControllerGetUserById({
        id,
    }: {
        id: string,
    }): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/users/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static adminControllerDeactivateUser({
        requestBody,
    }: {
        requestBody: DeactivateUserDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/deactivate',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static adminControllerActivateUser({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/admin/activate/{id}',
            path: {
                'id': id,
            },
        });
    }
}
