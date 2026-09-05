/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateEstateDto } from '../models/CreateEstateDto';
import type { Estate } from '../models/Estate';
import type { EstatesStatsResponseDto } from '../models/EstatesStatsResponseDto';
import type { GeneralResponseDto } from '../models/GeneralResponseDto';
import type { PaginatedEstateDto } from '../models/PaginatedEstateDto';
import type { UpdateEstateDto } from '../models/UpdateEstateDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class EstateService {
    /**
     * @returns Estate
     * @throws ApiError
     */
    public static estateControllerCreateEstate({
        requestBody,
    }: {
        requestBody: CreateEstateDto,
    }): CancelablePromise<Estate> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/estate',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns PaginatedEstateDto
     * @throws ApiError
     */
    public static estateControllerFindAll({
        status,
        page,
        limit,
        search,
        ignorePagination,
    }: {
        status: string,
        page?: number,
        limit?: number,
        search?: string,
        ignorePagination?: boolean,
    }): CancelablePromise<PaginatedEstateDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/estate',
            query: {
                'status': status,
                'page': page,
                'limit': limit,
                'search': search,
                'ignorePagination': ignorePagination,
            },
        });
    }
    /**
     * @returns Estate
     * @throws ApiError
     */
    public static estateControllerUpdateEstate({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: UpdateEstateDto,
    }): CancelablePromise<Estate> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/estate/{id}',
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
    public static estateControllerDeleteEstate({
        id,
    }: {
        id: string,
    }): CancelablePromise<GeneralResponseDto> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/estate/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @returns Estate
     * @throws ApiError
     */
    public static estateControllerFindOne({
        id,
    }: {
        id: string,
    }): CancelablePromise<Estate> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/estate/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @returns EstatesStatsResponseDto
     * @throws ApiError
     */
    public static estateControllerGetAllEstatesStats({
        estateId,
        startDate,
        endDate,
    }: {
        estateId?: string,
        startDate?: string,
        endDate?: string,
    }): CancelablePromise<EstatesStatsResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/estate/statistics',
            query: {
                'estateId': estateId,
                'startDate': startDate,
                'endDate': endDate,
            },
        });
    }
}
