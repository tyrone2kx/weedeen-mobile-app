/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Post } from './Post';
import type { User } from './User';

export type Comment = {
  id: string;
  content: string;
  authorId: string;
  author: User;
  postId: string;
  post: Post;
  parentCommentId?: string;
  parentComment?: Comment;
  replies: Array<Comment>;
  likes: Array<User>;
  userIdsThatLiked?: Array<string>;
  createdAt: string;
};
