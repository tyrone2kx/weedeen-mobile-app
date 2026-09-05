/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateCustomerDto } from '../models/CreateCustomerDto';
import type { Customer } from '../models/Customer';
import type { CustomerFeesStatsDto } from '../models/CustomerFeesStatsDto';
import type { CustomerLiteDto } from '../models/CustomerLiteDto';
import type { GeneralResponseDto } from '../models/GeneralResponseDto';
import type { PaginatedCustomerDto } from '../models/PaginatedCustomerDto';
import type { PaginatedCustomerFeeDto } from '../models/PaginatedCustomerFeeDto';
import type { UpdateCustomerDto } from '../models/UpdateCustomerDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CustomerService {
    /**
     * @returns Customer
     * @throws ApiError
     */
    public static customerControllerCreateCustomer({
        requestBody,
    }: {
        requestBody: CreateCustomerDto,
    }): CancelablePromise<Customer> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/customer',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns PaginatedCustomerDto
     * @throws ApiError
     */
    public static customerControllerFindAll({
        page,
        limit,
        search,
        ignorePagination,
        estateId,
    }: {
        page?: number,
        limit?: number,
        search?: string,
        ignorePagination?: boolean,
        estateId?: string,
    }): CancelablePromise<PaginatedCustomerDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/customer',
            query: {
                'page': page,
                'limit': limit,
                'search': search,
                'ignorePagination': ignorePagination,
                'estateId': estateId,
            },
        });
    }
    /**
     * @returns CustomerLiteDto
     * @throws ApiError
     */
    public static customerControllerFindAllLite(): CancelablePromise<Array<CustomerLiteDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/customer/lite',
        });
    }
    /**
     * @returns CustomerFeesStatsDto
     * @throws ApiError
     */
    public static customerControllerGetCustomerFeesStats({
        page,
        limit,
        search,
        ignorePagination,
        customerId,
        plotId,
        estateId,
        isPaid,
        startDate,
        endDate,
    }: {
        page?: number,
        limit?: number,
        search?: string,
        ignorePagination?: boolean,
        customerId?: string,
        plotId?: string,
        estateId?: string,
        isPaid?: boolean,
        startDate?: string,
        endDate?: string,
    }): CancelablePromise<CustomerFeesStatsDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/customer/fee/stats',
            query: {
                'page': page,
                'limit': limit,
                'search': search,
                'ignorePagination': ignorePagination,
                'customerId': customerId,
                'plotId': plotId,
                'estateId': estateId,
                'isPaid': isPaid,
                'startDate': startDate,
                'endDate': endDate,
            },
        });
    }
    /**
     * @returns PaginatedCustomerFeeDto
     * @throws ApiError
     */
    public static customerControllerFindAllCustomerFees({
        page,
        limit,
        search,
        ignorePagination,
        customerId,
        plotId,
        estateId,
        isPaid,
        startDate,
        endDate,
    }: {
        page?: number,
        limit?: number,
        search?: string,
        ignorePagination?: boolean,
        customerId?: string,
        plotId?: string,
        estateId?: string,
        isPaid?: boolean,
        startDate?: string,
        endDate?: string,
    }): CancelablePromise<PaginatedCustomerFeeDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/customer/fee',
            query: {
                'page': page,
                'limit': limit,
                'search': search,
                'ignorePagination': ignorePagination,
                'customerId': customerId,
                'plotId': plotId,
                'estateId': estateId,
                'isPaid': isPaid,
                'startDate': startDate,
                'endDate': endDate,
            },
        });
    }
    /**
     * @returns Customer
     * @throws ApiError
     */
    public static customerControllerFindOne({
        id,
    }: {
        id: string,
    }): CancelablePromise<Customer> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/customer/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @returns Customer
     * @throws ApiError
     */
    public static customerControllerUpdateCustomer({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: UpdateCustomerDto,
    }): CancelablePromise<Customer> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/customer/{id}',
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
    public static customerControllerDeleteCustomer({
        id,
    }: {
        id: string,
    }): CancelablePromise<GeneralResponseDto> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/customer/{id}',
            path: {
                'id': id,
            },
        });
    }
}
