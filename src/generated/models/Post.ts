/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Advert } from './Advert';
import type { Comment } from './Comment';
import type { User } from './User';
export type Post = {
    id: string;
    title: string;
    tenant: string;
    content: string;
    postType: 'NEWS' | 'ADVERT' | 'GENERAL';
    images: Array<string>;
    videos: Array<string>;
    disableComments: boolean;
    authorId: string;
    advertId: string;
    advert: Advert;
    status: 'active' | 'archived' | 'draft';
    author: User;
    likes: Array<User>;
    userIdsThatLiked?: Array<string>;
    comments: Array<Comment>;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
};

