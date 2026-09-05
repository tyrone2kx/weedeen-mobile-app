/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { User } from './User';
import type { UserDto } from './UserDto';
export type Estate = {
    name: string;
    address: string;
    city: string;
    state: string;
    logo: string;
    images: Array<string>;
    documents: Array<string>;
    videos: Array<string>;
    zipCode: string;
    lga: string;
    size: string;
    country: string;
    availableDocuments: Array<'fcda_approval' | 'certificate_of_occupancy' | 'survey_plan' | 'deed_of_assignment'>;
    amenities: Array<'swimming_pool' | 'gym' | 'security' | 'cctv' | 'electricity' | 'water_supply' | 'internet' | 'parking' | 'playground' | 'club_house' | 'shopping_center' | 'school' | 'hospital' | 'mosque' | 'church' | 'road_network' | 'drainage_system' | 'perimeter_fence' | 'gate_house' | 'solar_power'>;
    longitude?: number;
    latitude?: number;
    description: string;
    status: 'undergoing_development' | 'completed' | 'operational' | 'suspended' | 'plot_allocation_ongoing' | 'estate_planning';
    metadata: Record<string, any>;
    deletedById: string;
    deletedBy: User;
    deletedAt: string;
    id: string;
    createdAt: string;
    updatedAt: string;
    createdById: string;
    updatedById: string;
    createdBy: UserDto;
    updatedBy: UserDto;
    tenant: string;
};

