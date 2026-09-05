/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type VerifyAccountRequestDto = {
    token: string;
    source?: 'web' | 'app';
    code?: string;
    isPasswordReset?: boolean;
    isInvite?: boolean;
};

