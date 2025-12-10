/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Comment } from './Comment';
import type { User } from './User';

export type Post = {
  id: string;
  title: string;
  content: string;
  postType: 'NEWS' | 'ADVERT' | 'GENERAL';
  images: Array<string>;
  videos: Array<string>;
  authorId: string;
  author: User;
  likes: Array<User>;
  userIdsThatLiked?: Array<string>;
  comments: Array<Comment>;
  createdAt: string;
  updatedAt: string;
};
