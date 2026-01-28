import { Comment, Post } from '@wd/generated';
import { useAppSelector } from '@wd/redux-store/hooks/useAppSelector';
import { formatTimeAgo, returnUpdatedList } from '@wd/utils/helpers';
import { useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Avatar from '../Avatar/Avatar';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import ImageBlowupModal from '../ImageBlowupModal';
import TextArea from '../Input/TextAreaInput';
import Text from '../Text/Text';
import CommentItem from './components/CommentItem';
import VideoThumbnail from './components/VideoThumbnail';
import usePostMutations from './hooks/usePostMutations';

interface PostItemProps {
  post: Post;
}

const SinglePost = ({ post }: PostItemProps) => {
  const user = useAppSelector(state => state.user?.currentUser);
  const author = post.author;
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [displayedMediaCount, setDisplayedMediaCount] = useState(4);
  const [selectedMedia, setSelectedMedia] = useState<{
    type: 'image' | 'pdf' | 'video';
    url: string;
  } | null>(null);

  const [likes, setLikes] = useState(post.userIdsThatLiked || []);
  const [comments, setComments] = useState(post.comments || []);

  const totalComments = comments.reduce(
    (acc, comment) => acc + 1 + (comment.replies ? comment.replies.length : 0),
    0,
  );

  const {
    createComment,
    likePost,
    unlikePost,
    replyToComment,
    updateComment,
    deleteComment,
    likeComment,
    unlikeComment,
    isCreatingComment,
  } = usePostMutations({ postId: post.id });

  const handleLike = () => {
    const hasLiked = likes?.includes(user!.id);

    if (hasLiked) {
      unlikePost(undefined, {
        onSuccess: () => {
          setLikes(prev => prev.filter(id => id !== user!.id));
        },
      });
    } else {
      likePost(undefined, {
        onSuccess: () => {
          setLikes(prev => [...prev, user!.id]);
        },
      });
    }
  };

  const handleComment = () => {
    setShowComments(!showComments);
  };

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      createComment(
        {
          content: newComment.trim(),
        },
        {
          onSuccess: data => {
            setComments(prev => [data, ...prev]);
            setNewComment('');
          },
        },
      );
    }
  };

  const handleSubmitReply = (
    commentId: string,
    replyText: string,
    handlers: {
      onSuccess: (data: Comment) => void;
      onError: (error: any) => void;
    },
  ) => {
    if (replyText.trim()) {
      replyToComment(
        {
          commentId,
          requestBody: {
            content: replyText.trim(),
          },
        },
        {
          onSuccess: data => {
            const comment = comments.find(c => c.id === data.parentCommentId);
            if (comment) {
              comment.replies = comment.replies || [];
              comment.replies.unshift(data);
              setComments([...comments]);
            }
            handlers.onSuccess(data);
          },
          onError: handlers.onError,
        },
      );
    }
  };

  const handleUpdateComment = (
    commentId: string,
    newContent: string,
    handlers: {
      onSuccess: (data: Comment) => void;
      onError: (error: any) => void;
    },
  ) => {
    if (newContent.trim()) {
      updateComment(
        {
          commentId,
          requestBody: {
            content: newContent.trim(),
          },
        },
        {
          onSuccess: data => {
            if (data.parentCommentId) {
              const parentComment = comments.find(
                c => c.id === data.parentCommentId,
              );
              if (parentComment && parentComment.replies) {
                const updatedReplies = returnUpdatedList(
                  data,
                  parentComment.replies,
                  'id',
                );
                parentComment.replies = updatedReplies;
                setComments([...comments]);
              }
            } else {
              const updatedList = returnUpdatedList(data, comments, 'id');
              setComments(updatedList);
            }
            handlers.onSuccess(data);
          },
          onError: handlers.onError,
        },
      );
    }
  };

  const handleDeleteComment = (commentId: string) => {
    deleteComment(commentId);
  };

  const handleLikeComment = (comment: Comment) => {
    const hasLiked = comment.userIdsThatLiked?.includes(user!.id);
    if (hasLiked) {
      unlikeComment(comment.id, {
        onSuccess: () => {
          comment.userIdsThatLiked = comment.userIdsThatLiked?.filter(
            id => id !== user!.id,
          );
          if (comment.parentCommentId) {
            const parentComment = comments.find(
              c => c.id === comment.parentCommentId,
            );
            if (parentComment && parentComment.replies) {
              const updatedReplies = returnUpdatedList(
                comment,
                parentComment.replies,
                'id',
              );
              parentComment.replies = updatedReplies;
              setComments([...comments]);
            }
          } else {
            const updatedList = returnUpdatedList(comment, comments, 'id');
            setComments(updatedList);
          }
        },
      });
    } else {
      likeComment(comment.id, {
        onSuccess: () => {
          comment.userIdsThatLiked = [
            ...(comment.userIdsThatLiked || []),
            user!.id,
          ];
          if (comment.parentCommentId) {
            const parentComment = comments.find(
              c => c.id === comment.parentCommentId,
            );
            if (parentComment && parentComment.replies) {
              const updatedReplies = returnUpdatedList(
                comment,
                parentComment.replies,
                'id',
              );
              parentComment.replies = updatedReplies;
              setComments([...comments]);
            }
          } else {
            const updatedList = returnUpdatedList(comment, comments, 'id');
            setComments(updatedList);
          }
        },
      });
    }
  };

  return (
    <View className="bg-white border border-gray-300 rounded-lg shadow-md mb-4 max-w-2xl w-full h-fit">
      {/* Post Header */}
      <View className="p-4">
        <View className="flex-row gap-3 items-center mb-3">
          <Avatar
            image={post.author.profilePic}
            name={`${post.author.firstName} ${post.author.lastName}`}
          />
          <View className="flex-1">
            <Text className="font-semibold text-gray-900">
              {post.author.firstName} {post.author.lastName}
            </Text>
            <Text className="text-sm text-gray-500">
              {formatTimeAgo(post.createdAt)} • {post.postType}
            </Text>
          </View>
        </View>

        {/* Post Content */}
        <View className="mb-4">
          <Text className="font-semibold text-lg mb-2">{post.title}</Text>
          <Text className="text-gray-800 whitespace-pre-wrap text-sm">
            {post.content}
          </Text>
        </View>

        {/* Post Media (Images and Videos) */}
        {((post.images && post.images.length > 0) ||
          (post.videos && post.videos.length > 0)) && (
          <View className="mb-6">
            {(() => {
              const allMedia = [
                ...(post.images || []).map(url => ({ type: 'image', url })),
                ...(post.videos || []).map(url => ({ type: 'video', url })),
              ];

              const mediaToShow = allMedia.slice(0, displayedMediaCount);
              const remainingCount = allMedia.length - displayedMediaCount;

              if (allMedia.length === 1) {
                const media = allMedia[0];
                return media.type === 'image' ? (
                  <TouchableOpacity
                    onPress={() =>
                      setSelectedMedia({
                        type: 'image',
                        url: media.url,
                      })
                    }
                  >
                    <Image
                      alt="Post image"
                      className="w-full rounded-lg max-h-96 object-cover cursor-pointer"
                      src={media.url}
                    />
                  </TouchableOpacity>
                ) : (
                  <VideoThumbnail
                    onPress={() =>
                      setSelectedMedia({
                        type: 'video',
                        url: media.url,
                      })
                    }
                    url={media.url}
                  />
                );
              } else {
                return (
                  <View>
                    <View className="grid grid-cols-2 gap-2 relative">
                      {mediaToShow.slice(0, 4).map((media, index) => (
                        <View className="relative" key={index}>
                          {media.type === 'image' ? (
                            <TouchableOpacity
                              onPress={() =>
                                setSelectedMedia({
                                  type: 'image',
                                  url: media.url,
                                })
                              }
                            >
                              <Image
                                alt={`Post image ${index + 1}`}
                                className="w-full h-48 object-cover rounded-lg cursor-pointer"
                                src={media.url}
                              />
                            </TouchableOpacity>
                          ) : (
                            <VideoThumbnail
                              onPress={() =>
                                setSelectedMedia({
                                  type: 'video',
                                  url: media.url,
                                })
                              }
                              url={media.url}
                            />
                          )}
                          {/* Overlay for "+X more" on the last visible item */}
                          {index === 3 &&
                            remainingCount > 0 &&
                            displayedMediaCount === 4 && (
                              <TouchableOpacity
                                className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center rounded-lg cursor-pointer"
                                onPress={() =>
                                  setDisplayedMediaCount(allMedia.length)
                                }
                              >
                                <Text className="text-white text-xl font-semibold">
                                  +{remainingCount} more
                                </Text>
                              </TouchableOpacity>
                            )}
                        </View>
                      ))}
                    </View>

                    {/* Additional Media - displayed in rows after the initial grid */}
                    {displayedMediaCount > 4 && mediaToShow.length > 4 && (
                      <View className="mt-4 grid grid-cols-2 gap-2">
                        {mediaToShow.slice(4).map((media, index) => (
                          <View className="relative" key={index + 4}>
                            {media.type === 'image' ? (
                              <TouchableOpacity
                                onPress={() =>
                                  setSelectedMedia({
                                    type: 'image',
                                    url: media.url,
                                  })
                                }
                              >
                                <Image
                                  alt={`Post image ${index + 5}`}
                                  className="w-full h-48 object-cover rounded-lg cursor-pointer"
                                  src={media.url}
                                />
                              </TouchableOpacity>
                            ) : (
                              <VideoThumbnail
                                onPress={() =>
                                  setSelectedMedia({
                                    type: 'video',
                                    url: media.url,
                                  })
                                }
                                url={media.url}
                              />
                            )}
                          </View>
                        ))}
                      </View>
                    )}

                    {/* Show Less Button */}
                    {displayedMediaCount > 4 && (
                      <View className="mt-4 text-center">
                        <TouchableOpacity
                          className="px-4 py-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                          onPress={() => setDisplayedMediaCount(4)}
                        >
                          Show Less
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                );
              }
            })()}
          </View>
        )}

        {/* Post Stats */}
        <View className="flex-row items-center justify-between py-2 border-t border-b border-gray-200">
          <Text className="text-sm text-gray-500">
            {likes.length} {likes.length === 1 ? 'like' : 'likes'}
          </Text>
          <TouchableOpacity onPress={handleComment}>
            <Text className="text-sm text-gray-500 cursor-pointer">
              {totalComments} {totalComments === 1 ? 'comment' : 'comments'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Action Buttons */}
        <View className="flex-row justify-around py-2">
          <TouchableOpacity
            className="flex-row items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            onPress={handleLike}
          >
            <Icon
              color={likes.includes(user!.id) ? 'red' : 'gray'}
              name="heart-filled"
              size={32}
            />
            <Text className="text-gray-600">Like</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            onPress={handleComment}
          >
            <SvgIcon />
            <Text className="text-gray-600">Comment</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Comments Section */}
      {showComments && (
        <View className="border-t border-gray-200">
          {/* Add Comment */}
          <View className="p-4 border-b border-gray-100">
            <View className="flex-row gap-3">
              <Avatar image={author.profilePic} />
              <View className="flex-1">
                <TextArea
                  onChange={e => setNewComment(e)}
                  placeholder="Write a comment..."
                  value={newComment}
                />
                <View className="flex-row justify-end mt-2">
                  <Button
                    disabled={!newComment.trim()}
                    isLoading={isCreatingComment}
                    label="Post"
                    onPress={handleSubmitComment}
                  />
                </View>
              </View>
            </View>
          </View>

          {/* Comments List */}
          <View className="p-4 space-y-4">
            {comments.map(comment => (
              <CommentItem
                comment={comment}
                handleDeleteComment={handleDeleteComment}
                handleLikeComment={handleLikeComment}
                handleSubmitReply={handleSubmitReply}
                handleUpdateComment={handleUpdateComment}
                key={comment.id}
              />
            ))}
          </View>
        </View>
      )}

      {selectedMedia && (
        <ImageBlowupModal
          blowUpIsOpen={!!selectedMedia}
          handleCloseBlowUp={() => setSelectedMedia(null)}
          resourceType={selectedMedia?.type}
          resourceUrl={selectedMedia?.url}
        />
      )}
    </View>
  );
};

export const SvgIcon = props => (
  <Svg
    className="w-5 h-5 text-gray-600"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
  </Svg>
);
export default SinglePost;
