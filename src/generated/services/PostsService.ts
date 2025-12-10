/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Comment } from '../models/Comment';
import type { CreateCommentDto } from '../models/CreateCommentDto';
import type { CreatePostDto } from '../models/CreatePostDto';
import type { DeletePostResourceDto } from '../models/DeletePostResourceDto';
import type { PaginatedPostsDto } from '../models/PaginatedPostsDto';
import type { Post } from '../models/Post';
import type { UpdateCommentDto } from '../models/UpdateCommentDto';
import type { UpdatePostDto } from '../models/UpdatePostDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PostsService {
  /**
   * @returns Post
   * @throws ApiError
   */
  public static postsControllerCreatePost({
    requestBody,
  }: {
    requestBody: CreatePostDto;
  }): CancelablePromise<Post> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/posts',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @returns PaginatedPostsDto
   * @throws ApiError
   */
  public static postsControllerGetPosts({
    page,
    limit,
    search,
    ignorePagination,
  }: {
    page?: number;
    limit?: number;
    search?: string;
    ignorePagination?: boolean;
  }): CancelablePromise<PaginatedPostsDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/posts',
      query: {
        page: page,
        limit: limit,
        search: search,
        ignorePagination: ignorePagination,
      },
    });
  }

  /**
   * @returns Post
   * @throws ApiError
   */
  public static postsControllerGetPostById({
    id,
  }: {
    id: string;
  }): CancelablePromise<Post> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/posts/{id}',
      path: {
        id: id,
      },
    });
  }

  /**
   * @returns Post
   * @throws ApiError
   */
  public static postsControllerUpdatePost({
    id,
    requestBody,
  }: {
    id: string;
    requestBody: UpdatePostDto;
  }): CancelablePromise<Post> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/posts/{id}',
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  public static postsControllerDeletePost({
    id,
  }: {
    id: string;
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/posts/{id}',
      path: {
        id: id,
      },
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  public static postsControllerDeleteResource({
    id,
    requestBody,
  }: {
    id: string;
    requestBody: DeletePostResourceDto;
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/posts/image/{id}',
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  public static postsControllerLikePost({
    id,
  }: {
    id: string;
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/posts/{id}/like',
      path: {
        id: id,
      },
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  public static postsControllerUnlikePost({
    id,
  }: {
    id: string;
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/posts/{id}/like',
      path: {
        id: id,
      },
    });
  }

  /**
   * @returns Comment
   * @throws ApiError
   */
  public static postsControllerCreateComment({
    postId,
    requestBody,
  }: {
    postId: string;
    requestBody: CreateCommentDto;
  }): CancelablePromise<Comment> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/posts/{postId}/comments',
      path: {
        postId: postId,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @returns Comment
   * @throws ApiError
   */
  public static postsControllerGetCommentsForPost({
    postId,
  }: {
    postId: string;
  }): CancelablePromise<Array<Comment>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/posts/{postId}/comments',
      path: {
        postId: postId,
      },
    });
  }

  /**
   * @returns Comment
   * @throws ApiError
   */
  public static postsControllerReplyToComment({
    commentId,
    requestBody,
  }: {
    commentId: string;
    requestBody: CreateCommentDto;
  }): CancelablePromise<Comment> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/posts/comments/{commentId}/replies',
      path: {
        commentId: commentId,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @returns Comment
   * @throws ApiError
   */
  public static postsControllerUpdateComment({
    id,
    requestBody,
  }: {
    id: string;
    requestBody: UpdateCommentDto;
  }): CancelablePromise<Comment> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/posts/comments/{id}',
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  public static postsControllerDeleteComment({
    id,
  }: {
    id: string;
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/posts/comments/{id}',
      path: {
        id: id,
      },
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  public static postsControllerLikeComment({
    id,
  }: {
    id: string;
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/posts/comments/{id}/like',
      path: {
        id: id,
      },
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  public static postsControllerUnlikeComment({
    id,
  }: {
    id: string;
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/posts/comments/{id}/like',
      path: {
        id: id,
      },
    });
  }
}
