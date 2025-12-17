/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BankAccount } from '../models/BankAccount';
import type { BankDto } from '../models/BankDto';
import type { CancelBillingRequestDto } from '../models/CancelBillingRequestDto';
import type { CreateBankAccountDto } from '../models/CreateBankAccountDto';
import type { GeneralResponseDto } from '../models/GeneralResponseDto';
import type { Invoice } from '../models/Invoice';
import type { PaginatedInvoiocesDto } from '../models/PaginatedInvoiocesDto';
import type { PaymentInformation } from '../models/PaymentInformation';
import type { Plan } from '../models/Plan';
import type { PurchaseCreditRequestDto } from '../models/PurchaseCreditRequestDto';
import type { TransactionHistory } from '../models/TransactionHistory';
import type { UpdateBankAccountDto } from '../models/UpdateBankAccountDto';
import type { VerifyPaymentResponseDto } from '../models/VerifyPaymentResponseDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BillingService {
  /**
   * @returns Invoice
   * @throws ApiError
   */
  public static billingControllerPurchaseCredits({
    requestBody,
  }: {
    requestBody: PurchaseCreditRequestDto;
  }): CancelablePromise<Invoice> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/billing/purchase-credits',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @returns Plan
   * @throws ApiError
   */
  public static billingControllerFindAllPlans(): CancelablePromise<
    Array<Plan>
  > {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/billing/plans',
    });
  }
  /**
   * @returns Invoice
   * @throws ApiError
   */
  public static billingControllerGetInvoiceById({
    id,
  }: {
    id: string;
  }): CancelablePromise<Invoice> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/billing/invoices/{id}',
      path: {
        id: id,
      },
    });
  }
  /**
   * @returns PaginatedInvoiocesDto
   * @throws ApiError
   */
  public static billingControllerFindAllInvoices({
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
  }): CancelablePromise<PaginatedInvoiocesDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/billing/invoices',
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
   * @returns Invoice
   * @throws ApiError
   */
  public static billingControllerSubscribeToPlan({
    planId,
    storeId,
  }: {
    planId: string;
    storeId: string;
  }): CancelablePromise<Invoice> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/billing/subscribe/{planId}',
      path: {
        planId: planId,
      },
      query: {
        storeId: storeId,
      },
    });
  }
  /**
   * @returns TransactionHistory
   * @throws ApiError
   */
  public static billingControllerInitiatePayment({
    invoiceId,
  }: {
    invoiceId: string;
  }): CancelablePromise<TransactionHistory> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/billing/initiate-payment/{invoiceId}',
      path: {
        invoiceId: invoiceId,
      },
    });
  }
  /**
   * @returns GeneralResponseDto
   * @throws ApiError
   */
  public static billingControllerCancelSubscription({
    billingId,
    requestBody,
  }: {
    billingId: string;
    requestBody: CancelBillingRequestDto;
  }): CancelablePromise<GeneralResponseDto> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/billing/cancel-subscription/{billingId}',
      path: {
        billingId: billingId,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @returns VerifyPaymentResponseDto
   * @throws ApiError
   */
  public static billingControllerVerifyPayment({
    reference,
  }: {
    reference: string;
  }): CancelablePromise<VerifyPaymentResponseDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/billing/verify-payment/{reference}',
      path: {
        reference: reference,
      },
    });
  }
  /**
   * @returns PaymentInformation
   * @throws ApiError
   */
  public static billingControllerGetAllPaymentInformation(): CancelablePromise<
    Array<PaymentInformation>
  > {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/billing/payment-information',
    });
  }
  /**
   * @returns GeneralResponseDto
   * @throws ApiError
   */
  public static billingControllerDeletePaymentInformation({
    id,
  }: {
    id: string;
  }): CancelablePromise<GeneralResponseDto> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/billing/payment-information/{id}',
      path: {
        id: id,
      },
    });
  }
  /**
   * @returns BankAccount
   * @throws ApiError
   */
  public static billingControllerCreateBankAccount({
    requestBody,
  }: {
    requestBody: CreateBankAccountDto;
  }): CancelablePromise<BankAccount> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/billing/bank-accounts',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @returns BankAccount
   * @throws ApiError
   */
  public static billingControllerGetBankAccountsByUserId({
    userId,
  }: {
    userId: string;
  }): CancelablePromise<Array<BankAccount>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/billing/bank-accounts',
      query: {
        userId: userId,
      },
    });
  }
  /**
   * @returns BankAccount
   * @throws ApiError
   */
  public static billingControllerUpdateBankAccount({
    id,
    requestBody,
  }: {
    id: string;
    requestBody: UpdateBankAccountDto;
  }): CancelablePromise<BankAccount> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/billing/bank-accounts/{id}',
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
  public static billingControllerDeleteBankAccount({
    id,
  }: {
    id: string;
  }): CancelablePromise<GeneralResponseDto> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/billing/bank-accounts/{id}',
      path: {
        id: id,
      },
    });
  }
  /**
   * @returns BankDto
   * @throws ApiError
   */
  public static billingControllerGetAllBanksFromPaystack(): CancelablePromise<
    Array<BankDto>
  > {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/billing/bank-accounts/banks',
    });
  }
}
