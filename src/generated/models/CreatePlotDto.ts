/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreatePlotDto = {
    name: string;
    size?: string;
    price?: number;
    plotNo?: string;
    plotPrefix?: string;
    plotCount?: string;
    block?: string;
    street?: string;
    phase?: string;
    section?: string;
    lotNumber?: string;
    plotType?: string;
    flatNo?: string;
    houseNo?: string;
    /**
     * Org-defined taxonomy components without a dedicated column
     */
    unitAttributes?: Record<string, any>;
    /**
     * Only billable units count toward the plan and can be assigned to residents
     */
    isBillableUnit?: boolean;
    status?: 'available' | 'reserved' | 'sold';
    location?: string;
    estateId: string;
    longitude?: number;
    latitude?: number;
    description?: string;
    isPurchased?: boolean;
    metadata?: Record<string, any>;
};

