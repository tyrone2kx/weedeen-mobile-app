/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateAccountDto } from '../models/CreateAccountDto';
import type { CreateAccountResponseDto } from '../models/CreateAccountResponseDto';
import type { ForgotPasswordRequestDto } from '../models/ForgotPasswordRequestDto';
import type { ForgotPasswordResponseDto } from '../models/ForgotPasswordResponseDto';
import type { GeneralResponseDto } from '../models/GeneralResponseDto';
import type { InviteTeamMembersRequestDto } from '../models/InviteTeamMembersRequestDto';
import type { InviteTeamMembersResponseDto } from '../models/InviteTeamMembersResponseDto';
import type { LoginRequestDto } from '../models/LoginRequestDto';
import type { LoginResponseDto } from '../models/LoginResponseDto';
import type { ResetPasswordRequestDto } from '../models/ResetPasswordRequestDto';
import type { UpdateAuthDto } from '../models/UpdateAuthDto';
import type { UpdatePasswordDto } from '../models/UpdatePasswordDto';
import type { VerifyAccountRequestDto } from '../models/VerifyAccountRequestDto';
import type { VerifyAccountResponseDto } from '../models/VerifyAccountResponseDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthService {
  /**
   * @returns CreateAccountResponseDto
   * @throws ApiError
   */
  public static authControllerCreateNewAccount({
    requestBody,
  }: {
    requestBody: CreateAccountDto;
  }): CancelablePromise<CreateAccountResponseDto> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/auth',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @returns GeneralResponseDto
   * @throws ApiError
   */
  public static authControllerResetPassword({
    requestBody,
  }: {
    requestBody: ResetPasswordRequestDto;
  }): CancelablePromise<GeneralResponseDto> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/auth/reset-password',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @returns LoginResponseDto
   * @throws ApiError
   */
  public static authControllerLogin({
    requestBody,
  }: {
    requestBody: LoginRequestDto;
  }): CancelablePromise<LoginResponseDto> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/auth/login',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @returns VerifyAccountResponseDto
   * @throws ApiError
   */
  public static authControllerVerifyAccount({
    requestBody,
  }: {
    requestBody: VerifyAccountRequestDto;
  }): CancelablePromise<VerifyAccountResponseDto> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/auth/verify',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @returns GeneralResponseDto
   * @throws ApiError
   */
  public static authControllerVerifyPasswordReset({
    requestBody,
  }: {
    requestBody: VerifyAccountRequestDto;
  }): CancelablePromise<GeneralResponseDto> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/auth/verify-password-reset',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @returns ForgotPasswordResponseDto
   * @throws ApiError
   */
  public static authControllerForgotPassword({
    requestBody,
  }: {
    requestBody: ForgotPasswordRequestDto;
  }): CancelablePromise<ForgotPasswordResponseDto> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/auth/forgot-password',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @returns GeneralResponseDto
   * @throws ApiError
   */
  public static authControllerResendVerificationLink({
    requestBody,
  }: {
    requestBody: VerifyAccountRequestDto;
  }): CancelablePromise<GeneralResponseDto> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/auth/resend-verification',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @returns InviteTeamMembersResponseDto
   * @throws ApiError
   */
  public static authControllerInviteTeamMembers({
    requestBody,
  }: {
    requestBody: InviteTeamMembersRequestDto;
  }): CancelablePromise<InviteTeamMembersResponseDto> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/auth/invite-team',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @returns any
   * @throws ApiError
   */
  public static authControllerRefreshUserTokens(): CancelablePromise<
    Record<string, any>
  > {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/auth/refresh-token',
    });
  }
  /**
   * @returns GeneralResponseDto
   * @throws ApiError
   */
  public static authControllerUpdateProfile({
    id,
    requestBody,
  }: {
    id: string;
    requestBody: UpdateAuthDto;
  }): CancelablePromise<GeneralResponseDto> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/auth/update-profile/{id}',
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
  public static authControllerChangeUserPassword({
    id,
    requestBody,
  }: {
    id: string;
    requestBody: UpdatePasswordDto;
  }): CancelablePromise<GeneralResponseDto> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/auth/password/{id}',
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
  public static authControllerUpdateUserProfilePic(): CancelablePromise<GeneralResponseDto> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/auth/profile-pic',
    });
  }
}
