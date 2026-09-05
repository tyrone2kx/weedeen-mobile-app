/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateProductDto } from '../models/CreateProductDto';
import type { GeneralResponseDto } from '../models/GeneralResponseDto';
import type { PaginatedProductsDto } from '../models/PaginatedProductsDto';
import type { Product } from '../models/Product';
import type { ProductStatisticsResponseDto } from '../models/ProductStatisticsResponseDto';
import type { UpdateProductDto } from '../models/UpdateProductDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ProductService {
    /**
     * @returns Product
     * @throws ApiError
     */
    public static productControllerCreate({
        requestBody,
    }: {
        requestBody: CreateProductDto,
    }): CancelablePromise<Product> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/product',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns PaginatedProductsDto
     * @throws ApiError
     */
    public static productControllerFindAll({
        status,
        storeId,
        includeDeleted,
        passedTenant,
        startDate,
        endDate,
        onlySubscribed,
        page,
        limit,
        search,
        ignorePagination,
    }: {
        status: string,
        storeId: string,
        includeDeleted: boolean,
        passedTenant: string,
        startDate: string,
        endDate: string,
        onlySubscribed: boolean,
        page?: number,
        limit?: number,
        search?: string,
        ignorePagination?: boolean,
    }): CancelablePromise<PaginatedProductsDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/product',
            query: {
                'status': status,
                'storeId': storeId,
                'includeDeleted': includeDeleted,
                'passedTenant': passedTenant,
                'startDate': startDate,
                'endDate': endDate,
                'onlySubscribed': onlySubscribed,
                'page': page,
                'limit': limit,
                'search': search,
                'ignorePagination': ignorePagination,
            },
        });
    }
    /**
     * @returns ProductStatisticsResponseDto
     * @throws ApiError
     */
    public static productControllerGetProductStatisticsForStore({
        storeId,
        startDate,
        endDate,
    }: {
        storeId: string,
        startDate: string,
        endDate: string,
    }): CancelablePromise<ProductStatisticsResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/product/statistics-for-stores',
            query: {
                'storeId': storeId,
                'startDate': startDate,
                'endDate': endDate,
            },
        });
    }
    /**
     * @returns GeneralResponseDto
     * @throws ApiError
     */
    public static productControllerDeleteProductImage({
        productId,
        imageUrl,
    }: {
        productId: string,
        imageUrl: string,
    }): CancelablePromise<GeneralResponseDto> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/product/image/{id}',
            path: {
                'productId': productId,
            },
            query: {
                'imageUrl': imageUrl,
            },
        });
    }
    /**
     * @returns Product
     * @throws ApiError
     */
    public static productControllerFindOne({
        id,
    }: {
        id: string,
    }): CancelablePromise<Product> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/product/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @returns Product
     * @throws ApiError
     */
    public static productControllerUpdate({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: UpdateProductDto,
    }): CancelablePromise<Product> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/product/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns Product
     * @throws ApiError
     */
    public static productControllerDelete({
        id,
    }: {
        id: string,
    }): CancelablePromise<Product> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/product/{id}',
            path: {
                'id': id,
            },
        });
    }
}
