/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChartDataPointDto } from './ChartDataPointDto';
import type { RevenueByEstateDto } from './RevenueByEstateDto';
export type EstatesStatsResponseDto = {
    totalEstates: number;
    totalPlots: number;
    allocatedPlots: number;
    unallocatedPlots: number;
    totalCustomers: number;
    totalRevenueGenerated: number;
    totalPendingRevenue: number;
    totalUnpaidInvoices: number;
    revenueOverTime: Array<ChartDataPointDto>;
    plotSalesOverTime: Array<ChartDataPointDto>;
    customerGrowthOverTime: Array<ChartDataPointDto>;
    revenueByEstate: Array<RevenueByEstateDto> | null;
};

