/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Post } from './Post';
import type { User } from './User';
export type Advert = {
    id: string;
    title: string;
    description?: string;
    tenant: string;
    userId: string;
    status: 'draft' | 'archived' | 'active' | 'inactive' | 'expired';
    tokens: number;
    maxViewsPerUser: number;
    actionType: 'product_view' | 'service_view' | 'external_link' | 'general';
    externalUrl: string;
    post: Post;
    startDate: string;
    endDate: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    user: User;
    totalClicks?: number;
    totalUsersClicked?: number;
    totalViews?: number;
};

