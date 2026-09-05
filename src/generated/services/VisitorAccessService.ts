/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateVisitorAccessDto } from '../models/CreateVisitorAccessDto';
import type { GeneralResponseDto } from '../models/GeneralResponseDto';
import type { PaginatedVisitorAccessDto } from '../models/PaginatedVisitorAccessDto';
import type { UpdateVisitorAccessDto } from '../models/UpdateVisitorAccessDto';
import type { VisitorAccess } from '../models/VisitorAccess';
import type { VisitorAccessStatisticsResponseDto } from '../models/VisitorAccessStatisticsResponseDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class VisitorAccessService {
    /**
     * @returns VisitorAccess
     * @throws ApiError
     */
    public static visitorAccessControllerCreate({
        requestBody,
    }: {
        requestBody: CreateVisitorAccessDto,
    }): CancelablePromise<VisitorAccess> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/visitor-access',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns PaginatedVisitorAccessDto
     * @throws ApiError
     */
    public static visitorAccessControllerFindAll({
        page,
        limit,
        search,
        ignorePagination,
        accessCodeUsed,
        userId,
        passedTenant,
        startDate,
        endDate,
        includeUserRelations,
    }: {
        page?: number,
        limit?: number,
        search?: string,
        ignorePagination?: boolean,
        accessCodeUsed?: boolean,
        userId?: string,
        passedTenant?: string,
        startDate?: string,
        endDate?: string,
        includeUserRelations?: boolean,
    }): CancelablePromise<PaginatedVisitorAccessDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/visitor-access',
            query: {
                'page': page,
                'limit': limit,
                'search': search,
                'ignorePagination': ignorePagination,
                'accessCodeUsed': accessCodeUsed,
                'userId': userId,
                'passedTenant': passedTenant,
                'startDate': startDate,
                'endDate': endDate,
                'includeUserRelations': includeUserRelations,
            },
        });
    }
    /**
     * @returns VisitorAccessStatisticsResponseDto
     * @throws ApiError
     */
    public static visitorAccessControllerGetStatistics({
        userId,
        passedTenant,
        startDate,
        endDate,
    }: {
        userId: string,
        passedTenant: string,
        startDate: string,
        endDate: string,
    }): CancelablePromise<VisitorAccessStatisticsResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/visitor-access/statistics',
            query: {
                'userId': userId,
                'passedTenant': passedTenant,
                'startDate': startDate,
                'endDate': endDate,
            },
        });
    }
    /**
     * @returns VisitorAccess
     * @throws ApiError
     */
    public static visitorAccessControllerValidateAccessCode({
        accessCode,
    }: {
        accessCode: string,
    }): CancelablePromise<VisitorAccess> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/visitor-access/validate/{accessCode}',
            path: {
                'accessCode': accessCode,
            },
        });
    }
    /**
     * @returns VisitorAccess
     * @throws ApiError
     */
    public static visitorAccessControllerUpdate({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: UpdateVisitorAccessDto,
    }): CancelablePromise<VisitorAccess> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/visitor-access/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns GeneralResponseDto
     * @throws ApiError
     */
    public static visitorAccessControllerRemove({
        id,
    }: {
        id: string,
    }): CancelablePromise<GeneralResponseDto> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/visitor-access/{id}',
            path: {
                'id': id,
            },
        });
    }
}
