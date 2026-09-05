/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateFeeDto } from '../models/CreateFeeDto';
import type { CreatePaymentDto } from '../models/CreatePaymentDto';
import type { CreateUtilityFeeDto } from '../models/CreateUtilityFeeDto';
import type { Fee } from '../models/Fee';
import type { FeeStatisticsResponseDto } from '../models/FeeStatisticsResponseDto';
import type { GeneralResponseDto } from '../models/GeneralResponseDto';
import type { MarkTokenAsUsedDto } from '../models/MarkTokenAsUsedDto';
import type { NotifyDefaultersDto } from '../models/NotifyDefaultersDto';
import type { PaginatedFeeInvoicesDto } from '../models/PaginatedFeeInvoicesDto';
import type { PaginatedFeesDto } from '../models/PaginatedFeesDto';
import type { Payment } from '../models/Payment';
import type { UpdateFeeDto } from '../models/UpdateFeeDto';
import type { UserFee } from '../models/UserFee';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FeesService {
    /**
     * @returns Fee
     * @throws ApiError
     */
    public static feesControllerCreate({
        requestBody,
    }: {
        requestBody: CreateFeeDto,
    }): CancelablePromise<Fee> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/fees',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns PaginatedFeesDto
     * @throws ApiError
     */
    public static feesControllerFindAllFees({
        isGeneralFee,
        isActive,
        startDate,
        endDate,
        page,
        limit,
        search,
        ignorePagination,
    }: {
        isGeneralFee: boolean,
        isActive: boolean,
        startDate: string,
        endDate: string,
        page?: number,
        limit?: number,
        search?: string,
        ignorePagination?: boolean,
    }): CancelablePromise<PaginatedFeesDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/fees',
            query: {
                'isGeneralFee': isGeneralFee,
                'isActive': isActive,
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
     * @returns PaginatedFeeInvoicesDto
     * @throws ApiError
     */
    public static feesControllerFindAllFeeInvoices({
        userId,
        startDate,
        endDate,
        status,
        feeId,
        utilityId,
        page,
        limit,
        search,
        ignorePagination,
    }: {
        userId: string,
        startDate: string,
        endDate: string,
        status: string,
        feeId: string,
        utilityId: string,
        page?: number,
        limit?: number,
        search?: string,
        ignorePagination?: boolean,
    }): CancelablePromise<PaginatedFeeInvoicesDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/fees/invoices',
            query: {
                'userId': userId,
                'startDate': startDate,
                'endDate': endDate,
                'status': status,
                'feeId': feeId,
                'utilityId': utilityId,
                'page': page,
                'limit': limit,
                'search': search,
                'ignorePagination': ignorePagination,
            },
        });
    }
    /**
     * @returns FeeStatisticsResponseDto
     * @throws ApiError
     */
    public static feesControllerGetStatistics({
        userId,
        feeId,
        utilityId,
        startDate,
        endDate,
    }: {
        userId: string,
        feeId: string,
        utilityId: string,
        startDate: string,
        endDate: string,
    }): CancelablePromise<FeeStatisticsResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/fees/statistics',
            query: {
                'userId': userId,
                'feeId': feeId,
                'utilityId': utilityId,
                'startDate': startDate,
                'endDate': endDate,
            },
        });
    }
    /**
     * @returns Payment
     * @throws ApiError
     */
    public static feesControllerVerifyPayment({
        reference,
    }: {
        reference: string,
    }): CancelablePromise<Payment> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/fees/payment/verify/{reference}',
            path: {
                'reference': reference,
            },
        });
    }
    /**
     * @returns Fee
     * @throws ApiError
     */
    public static feesControllerFindOne({
        id,
    }: {
        id: string,
    }): CancelablePromise<Fee> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/fees/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @returns Fee
     * @throws ApiError
     */
    public static feesControllerUpdate({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: UpdateFeeDto,
    }): CancelablePromise<Fee> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/fees/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns Payment
     * @throws ApiError
     */
    public static feesControllerInitializeFeePayment({
        requestBody,
    }: {
        requestBody: CreatePaymentDto,
    }): CancelablePromise<Payment> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/fees/payment/init',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static feesControllerNotifyDefaulters({
        requestBody,
    }: {
        requestBody: NotifyDefaultersDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/fees/notify-defaulters',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns UserFee
     * @throws ApiError
     */
    public static feesControllerCreateUtilityFee({
        requestBody,
    }: {
        requestBody: CreateUtilityFeeDto,
    }): CancelablePromise<UserFee> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/fees/utility-fee',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns GeneralResponseDto
     * @throws ApiError
     */
    public static feesControllerMarkTokenAsUsed({
        requestBody,
    }: {
        requestBody: MarkTokenAsUsedDto,
    }): CancelablePromise<GeneralResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/fees/utility-fee/token',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns GeneralResponseDto
     * @throws ApiError
     */
    public static feesControllerDeleteUtilityFee({
        id,
    }: {
        id: string,
    }): CancelablePromise<GeneralResponseDto> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/fees/utility-fee/{id}',
            path: {
                'id': id,
            },
        });
    }
}
