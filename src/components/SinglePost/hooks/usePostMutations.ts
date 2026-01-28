import { useMutation } from '@tanstack/react-query';
import { apiWrapper } from '@wd/api';
import {
  CreateCommentDto,
  PostsService,
  UpdateCommentDto,
} from '@wd/generated';
import { Notify } from '@wd/utils/helpers';
interface Props {
  postId: string;
}

const usePostMutations = ({ postId }: Props) => {
  const { mutate: createComment, isPending: isCreatingComment } = useMutation({
    mutationFn: (requestBody: CreateCommentDto) =>
      apiWrapper(() =>
        PostsService.postsControllerCreateComment({
          postId,
          requestBody,
        }),
      ),
    onSuccess: () => {
      Notify({
        title: 'New Comment',
        message: 'Your comment has been posted successfully.',
        type: 'success',
      });
    },
  });

  const { mutate: likePost } = useMutation({
    mutationFn: () =>
      apiWrapper(() =>
        PostsService.postsControllerLikePost({
          id: postId,
        }),
      ),
    onSuccess: () => {
      Notify({
        title: 'Post Liked',
        type: 'success',
      });
    },
  });

  const { mutate: unlikePost } = useMutation({
    mutationFn: () =>
      apiWrapper(() =>
        PostsService.postsControllerUnlikePost({
          id: postId,
        }),
      ),
    onSuccess: () => {
      Notify({
        title: 'Post Unliked',
        type: 'success',
      });
    },
  });

  const { mutate: replyToComment } = useMutation({
    mutationFn: ({
      commentId,
      requestBody,
    }: {
      commentId: string;
      requestBody: CreateCommentDto;
    }) =>
      apiWrapper(() =>
        PostsService.postsControllerReplyToComment({
          commentId,
          requestBody,
        }),
      ),
    onSuccess: () => {
      Notify({
        title: 'Reply added successfully',
        type: 'success',
      });
    },
  });

  const { mutate: updateComment } = useMutation({
    mutationFn: ({
      commentId,
      requestBody,
    }: {
      commentId: string;
      requestBody: UpdateCommentDto;
    }) =>
      apiWrapper(() =>
        PostsService.postsControllerUpdateComment({
          id: commentId,
          requestBody,
        }),
      ),
    onSuccess: () => {
      Notify({
        title: 'Comment updated successfully',
        type: 'success',
      });
    },
  });

  const { mutate: deleteComment } = useMutation({
    mutationFn: (commentId: string) =>
      apiWrapper(() =>
        PostsService.postsControllerDeleteComment({
          id: commentId,
        }),
      ),
    onSuccess: () => {
      Notify({
        title: 'Comment deleted successfully',
        type: 'success',
      });
    },
  });

  const { mutate: likeComment } = useMutation({
    mutationFn: (commentId: string) =>
      apiWrapper(() =>
        PostsService.postsControllerLikeComment({ id: commentId }),
      ),
    onSuccess: () => {
      Notify({
        title: 'Comment liked',
        type: 'success',
      });
    },
  });

  const { mutate: unlikeComment } = useMutation({
    mutationFn: (commentId: string) =>
      apiWrapper(() =>
        PostsService.postsControllerUnlikeComment({ id: commentId }),
      ),
    onSuccess: () => {
      Notify({
        title: 'Comment unliked',
        type: 'success',
      });
    },
  });

  return {
    createComment,
    likePost,
    unlikePost,
    replyToComment,
    updateComment,
    deleteComment,
    unlikeComment,
    likeComment,
    isCreatingComment,
  };
};

export default usePostMutations;
