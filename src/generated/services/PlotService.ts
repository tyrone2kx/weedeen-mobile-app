/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AssignUnitDto } from '../models/AssignUnitDto';
import type { BulkUpdatePlotPricesDto } from '../models/BulkUpdatePlotPricesDto';
import type { CreateBeneficiaryDto } from '../models/CreateBeneficiaryDto';
import type { CreateBulkPlotsDto } from '../models/CreateBulkPlotsDto';
import type { CreateCustomerPlotDto } from '../models/CreateCustomerPlotDto';
import type { CreatePlotDto } from '../models/CreatePlotDto';
import type { CustomerPlot } from '../models/CustomerPlot';
import type { GeneralResponseDto } from '../models/GeneralResponseDto';
import type { PaginatedPlotDto } from '../models/PaginatedPlotDto';
import type { Plot } from '../models/Plot';
import type { ReassignUnitDto } from '../models/ReassignUnitDto';
import type { UnitQuotaDto } from '../models/UnitQuotaDto';
import type { UpdateCustomerPlotDto } from '../models/UpdateCustomerPlotDto';
import type { UpdatePlotDto } from '../models/UpdatePlotDto';
import type { UserUnit } from '../models/UserUnit';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PlotService {
    /**
     * @returns PaginatedPlotDto
     * @throws ApiError
     */
    public static plotControllerFindAllPlots({
        page,
        limit,
        search,
        ignorePagination,
        estateId,
        customerId,
        status,
    }: {
        page?: number,
        limit?: number,
        search?: string,
        ignorePagination?: boolean,
        estateId?: string,
        customerId?: string,
        status?: 'available' | 'reserved' | 'sold',
    }): CancelablePromise<PaginatedPlotDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/unit',
            query: {
                'page': page,
                'limit': limit,
                'search': search,
                'ignorePagination': ignorePagination,
                'estateId': estateId,
                'customerId': customerId,
                'status': status,
            },
        });
    }
    /**
     * @returns Plot
     * @throws ApiError
     */
    public static plotControllerCreatePlot({
        requestBody,
    }: {
        requestBody: CreatePlotDto,
    }): CancelablePromise<Plot> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/unit',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns GeneralResponseDto
     * @throws ApiError
     */
    public static plotControllerCreatePlotsBulk({
        requestBody,
    }: {
        requestBody: CreateBulkPlotsDto,
    }): CancelablePromise<GeneralResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/unit/bulk',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns UnitQuotaDto
     * @throws ApiError
     */
    public static plotControllerGetQuota(): CancelablePromise<UnitQuotaDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/unit/quota',
        });
    }
    /**
     * @returns UserUnit
     * @throws ApiError
     */
    public static plotControllerGetMyUnits(): CancelablePromise<Array<UserUnit>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/unit/me/assignments',
        });
    }
    /**
     * @returns UserUnit
     * @throws ApiError
     */
    public static plotControllerGetUserUnits({
        userId,
    }: {
        userId: string,
    }): CancelablePromise<Array<UserUnit>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/unit/user/{userId}/assignments',
            path: {
                'userId': userId,
            },
        });
    }
    /**
     * @returns GeneralResponseDto
     * @throws ApiError
     */
    public static plotControllerBulkUpdatePlotPrices({
        requestBody,
    }: {
        requestBody: BulkUpdatePlotPricesDto,
    }): CancelablePromise<GeneralResponseDto> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/unit/bulk-price',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns GeneralResponseDto
     * @throws ApiError
     */
    public static plotControllerReassignUnit({
        requestBody,
    }: {
        requestBody: ReassignUnitDto,
    }): CancelablePromise<GeneralResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/unit/reassign',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns UserUnit
     * @throws ApiError
     */
    public static plotControllerAddBeneficiary({
        requestBody,
    }: {
        requestBody: CreateBeneficiaryDto,
    }): CancelablePromise<UserUnit> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/unit/beneficiaries',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns UserUnit
     * @throws ApiError
     */
    public static plotControllerListBeneficiaries(): CancelablePromise<Array<UserUnit>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/unit/beneficiaries',
        });
    }
    /**
     * @returns GeneralResponseDto
     * @throws ApiError
     */
    public static plotControllerRemoveBeneficiary({
        id,
    }: {
        id: string,
    }): CancelablePromise<GeneralResponseDto> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/unit/beneficiaries/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @returns CustomerPlot
     * @throws ApiError
     */
    public static plotControllerAllocatePlotToCustomer({
        requestBody,
    }: {
        requestBody: CreateCustomerPlotDto,
    }): CancelablePromise<CustomerPlot> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/unit/customer/allocate-plot',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns CustomerPlot
     * @throws ApiError
     */
    public static plotControllerUpdateCustomerPlot({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: UpdateCustomerPlotDto,
    }): CancelablePromise<CustomerPlot> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/unit/customer-plot/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns Plot
     * @throws ApiError
     */
    public static plotControllerFindOnePlot({
        id,
    }: {
        id: string,
    }): CancelablePromise<Plot> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/unit/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @returns Plot
     * @throws ApiError
     */
    public static plotControllerUpdatePlot({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: UpdatePlotDto,
    }): CancelablePromise<Plot> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/unit/{id}',
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
    public static plotControllerDeletePlot({
        id,
    }: {
        id: string,
    }): CancelablePromise<GeneralResponseDto> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/unit/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @returns CustomerPlot
     * @throws ApiError
     */
    public static plotControllerGetPlotAllocationHistory({
        id,
    }: {
        id: string,
    }): CancelablePromise<Array<CustomerPlot>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/unit/{id}/allocation-history',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @returns UserUnit
     * @throws ApiError
     */
    public static plotControllerAssignUnit({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: AssignUnitDto,
    }): CancelablePromise<UserUnit> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/unit/{id}/assign',
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
    public static plotControllerUnassignUnit({
        id,
        userId,
    }: {
        id: string,
        userId: string,
    }): CancelablePromise<GeneralResponseDto> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/unit/{id}/assign/{userId}',
            path: {
                'id': id,
                'userId': userId,
            },
        });
    }
}
