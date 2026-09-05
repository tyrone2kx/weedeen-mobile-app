/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateAccessBlockDto = {
    /**
     * Reason for blocking access
     */
    reason: string;
    /**
     * User ID
     */
    userId: string;
    utilityIds?: Array<string>;
    /**
     * Defaulting Fee ID
     */
    defaultingFeeId?: string;
    /**
     * Feature being blocked
     */
    features: Array<'visitor_access' | 'utility'>;
};

