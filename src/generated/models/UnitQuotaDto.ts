/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UnitQuotaDto = {
    /**
     * Max billable units allowed by the active plan. null = unlimited.
     */
    allowedUnits?: number | null;
    currentUnits: number;
    /**
     * Units remaining before the cap. null = unlimited.
     */
    remaining?: number | null;
    /**
     * Max users per unit allowed by the active plan. null = unlimited.
     */
    allowedUsersPerUnit?: number | null;
};

