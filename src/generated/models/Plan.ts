/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Billing } from './Billing';
import type { PricingStructure } from './PricingStructure';
export type Plan = {
    id: string;
    name: string;
    subtitle?: string;
    description: string;
    price: number;
    duration: number;
    allowedUnits?: number;
    allowedUsersPerUnit?: number;
    features: Array<string>;
    pricingStructure: Array<PricingStructure>;
    currency?: string;
    status: string;
    modules: Array<'estate_management' | 'plot_management'>;
    planType: 'organization' | 'individual' | 'estates';
    billings: Array<Billing>;
    createdAt: string;
    updatedAt: string;
};

