/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateCustomerDto } from '../models/CreateCustomerDto';
import type { CreateCustomerPlotDto } from '../models/CreateCustomerPlotDto';
import type { CreateEstateDto } from '../models/CreateEstateDto';
import type { CreatePlotDto } from '../models/CreatePlotDto';
import type { Customer } from '../models/Customer';
import type { CustomerPlot } from '../models/CustomerPlot';
import type { Estate } from '../models/Estate';
import type { EstatesStatsResponseDto } from '../models/EstatesStatsResponseDto';
import type { GeneralResponseDto } from '../models/GeneralResponseDto';
import type { PaginatedEstateDto } from '../models/PaginatedEstateDto';
import type { Plot } from '../models/Plot';
import type { UpdateCustomerDto } from '../models/UpdateCustomerDto';
import type { UpdateCustomerPlotDto } from '../models/UpdateCustomerPlotDto';
import type { UpdateEstateDto } from '../models/UpdateEstateDto';
import type { UpdatePlotDto } from '../models/UpdatePlotDto';
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
    requestBody: CreateEstateDto;
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
    status: string;
    page?: number;
    limit?: number;
    search?: string;
    ignorePagination?: boolean;
  }): CancelablePromise<PaginatedEstateDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/estate',
      query: {
        status: status,
        page: page,
        limit: limit,
        search: search,
        ignorePagination: ignorePagination,
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
    id: string;
    requestBody: UpdateEstateDto;
  }): CancelablePromise<Estate> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/estate/{id}',
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
  public static estateControllerDeleteEstate({
    id,
  }: {
    id: string;
  }): CancelablePromise<GeneralResponseDto> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/estate/{id}',
      path: {
        id: id,
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
    id: string;
  }): CancelablePromise<Estate> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/estate/{id}',
      path: {
        id: id,
      },
    });
  }
  /**
   * @returns Customer
   * @throws ApiError
   */
  public static estateControllerCreateCustomer({
    requestBody,
  }: {
    requestBody: CreateCustomerDto;
  }): CancelablePromise<Customer> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/estate/customer',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @returns Customer
   * @throws ApiError
   */
  public static estateControllerUpdateCustomer({
    id,
    requestBody,
  }: {
    id: string;
    requestBody: UpdateCustomerDto;
  }): CancelablePromise<Customer> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/estate/customer/{id}',
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
  public static estateControllerDeleteCustomer({
    id,
  }: {
    id: string;
  }): CancelablePromise<GeneralResponseDto> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/estate/customer/{id}',
      path: {
        id: id,
      },
    });
  }
  /**
   * @returns Plot
   * @throws ApiError
   */
  public static estateControllerCreatePlot({
    requestBody,
  }: {
    requestBody: CreatePlotDto;
  }): CancelablePromise<Plot> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/estate/plot',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @returns Plot
   * @throws ApiError
   */
  public static estateControllerUpdatePlot({
    id,
    requestBody,
  }: {
    id: string;
    requestBody: UpdatePlotDto;
  }): CancelablePromise<Plot> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/estate/plot/{id}',
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
  public static estateControllerDeletePlot({
    id,
  }: {
    id: string;
  }): CancelablePromise<GeneralResponseDto> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/estate/plot/{id}',
      path: {
        id: id,
      },
    });
  }
  /**
   * @returns CustomerPlot
   * @throws ApiError
   */
  public static estateControllerAllocatePlotToCustomer({
    requestBody,
  }: {
    requestBody: CreateCustomerPlotDto;
  }): CancelablePromise<CustomerPlot> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/estate/customer/allocate-plot',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @returns CustomerPlot
   * @throws ApiError
   */
  public static estateControllerUpdateCustomerPlot({
    id,
    requestBody,
  }: {
    id: string;
    requestBody: UpdateCustomerPlotDto;
  }): CancelablePromise<CustomerPlot> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/estate/customer-plot/{id}',
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @returns EstatesStatsResponseDto
   * @throws ApiError
   */
  public static estateControllerGetAllEstatesStats(): CancelablePromise<EstatesStatsResponseDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/estate/statistics',
    });
  }
}
