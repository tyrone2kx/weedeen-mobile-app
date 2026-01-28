import Avatar from '@wd/components/Avatar/Avatar';
import Button from '@wd/components/Button/Button';
import Input from '@wd/components/Input/Input';
import TextArea from '@wd/components/Input/TextAreaInput';
import Text from '@wd/components/Text/Text';
import { Comment } from '@wd/generated';
import { useAppSelector } from '@wd/redux-store/hooks/useAppSelector';
import { formatTimeAgo } from '@wd/utils/helpers';
import useDisclosure from '@wd/utils/useDisclosure/useDisclosure';
import useLoading from '@wd/utils/useLoading';
import { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

interface Props {
  comment: Comment;
  handleUpdateComment: (
    commentId: string,
    content: string,
    handlers: {
      onSuccess: (data: Comment) => void;
      onError: (error: any) => void;
    },
  ) => void;
  handleDeleteComment: (commentId: string) => void;
  handleLikeComment: (comment: Comment) => void;
  handleSubmitReply: (
    parentCommentId: string,
    content: string,
    handlers: {
      onSuccess: (data: Comment) => void;
      onError: (error: any) => void;
    },
  ) => void;
  isReply?: boolean;
}

const CommentItem = ({
  comment,
  handleUpdateComment,
  handleDeleteComment,
  handleLikeComment,
  handleSubmitReply,
  isReply,
}: Props) => {
  const user = useAppSelector(state => state.user?.currentUser);
  const editHandler = useDisclosure();
  const replyHandler = useDisclosure();
  const [editText, setEditText] = useState('');
  const [replyText, setReplyText] = useState('');

  const replyLoader = useLoading();
  const updateLoader = useLoading();

  const hasLiked = comment.userIdsThatLiked?.includes(user?.id || '');

  return (
    <View>
      {/* Main Comment */}
      <View className="flex-row gap-3">
        <Avatar
          image={comment.author.profilePic}
          name={`${comment.author.firstName} ${comment.author.lastName}`}
          size={32}
        />
        <View className="flex-1">
          {editHandler.isOpen ? (
            /* Edit Comment Mode */
            <View className="bg-gray-100 rounded-lg p-3">
              <Text className="font-semibold text-sm text-gray-900 mb-2">
                {comment.author.firstName} {comment.author.lastName}
              </Text>
              <TextArea
                value={editText}
                onChange={e => setEditText(e)}
                // className="w-full p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <View className="flex-row gap-2 mt-2">
                <Button
                  isLoading={updateLoader.loading}
                  label={'Save'}
                  onPress={() => {
                    updateLoader.startLoading();
                    handleUpdateComment(comment.id, editText, {
                      onSuccess: () => {
                        updateLoader.stopLoading();
                        editHandler.onClose();
                        setEditText('');
                      },
                      onError: () => {
                        updateLoader.stopLoading();
                      },
                    });
                  }}
                />
                <TouchableOpacity
                  className="px-3 py-1 bg-gray-300 text-gray-700 rounded text-sm hover:bg-gray-400"
                  onPress={() => {
                    setEditText('');
                    editHandler.onClose();
                  }}
                >
                  <Text>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            /* Normal Comment Display */
            <View className="bg-gray-100 rounded-lg p-3">
              <View>
                <Text className="font-semibold text-sm text-gray-900">
                  {comment.author.firstName} {comment.author.lastName}
                </Text>
              </View>
              <View>
                <Text className="text-gray-800">{comment.content}</Text>
              </View>
            </View>
          )}
          <View className="flex-row items-center gap-4 mt-1 text-sm text-gray-500">
            <Text>{formatTimeAgo(comment.createdAt)}</Text>
            <Text>
              {comment.userIdsThatLiked?.length || 0}{' '}
              {comment.userIdsThatLiked?.length === 1 ? 'like' : 'likes'}
            </Text>
            <TouchableOpacity
              className="hover:underline"
              onPress={() => handleLikeComment(comment)}
            >
              <Text>{hasLiked ? 'Unlike' : 'Like'}</Text>
            </TouchableOpacity>
            {!isReply && (
              <TouchableOpacity
                className="hover:underline"
                onPress={replyHandler.toggle}
              >
                <Text>Reply</Text>
              </TouchableOpacity>
            )}
            {!editHandler.isOpen && comment.authorId === user?.id && (
              <>
                <TouchableOpacity
                  className="hover:underline"
                  onPress={() => {
                    setEditText(comment.content);
                    editHandler.onOpen();
                  }}
                >
                  <Text>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="hover:underline text-red-500"
                  onPress={() => handleDeleteComment(comment.id)}
                >
                  <Text>Delete</Text>
                </TouchableOpacity>
              </>
            )}
            {(comment.userIdsThatLiked?.length || 0) > 0 && (
              <Text>
                {comment.userIdsThatLiked?.length}{' '}
                {comment.userIdsThatLiked?.length === 1 ? 'like' : 'likes'}
              </Text>
            )}
          </View>

          {/* Reply Input */}
          {replyHandler.isOpen && (
            <View className="flex gap-2 mt-2">
              <Avatar image={user?.profilePic} size={24} />
              <View className="flex-1">
                <Input
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={e => setReplyText(e)}
                  onEndEditing={() => {
                    replyLoader.startLoading();
                    handleSubmitReply(comment.id, replyText, {
                      onSuccess: () => {
                        replyLoader.stopLoading();
                        replyHandler.onClose();
                        setReplyText('');
                      },
                      onError: () => {
                        replyLoader.stopLoading();
                      },
                    });
                  }}
                  placeholder={`Reply to ${comment.author.firstName}...`}
                  value={replyText}
                />
              </View>
            </View>
          )}

          {/* Replies */}
          {comment.replies && comment.replies.length > 0 && (
            <View className="mt-3 space-y-3">
              {comment.replies.map(reply => (
                <CommentItem
                  comment={reply}
                  handleDeleteComment={handleDeleteComment}
                  handleLikeComment={handleLikeComment}
                  handleSubmitReply={handleSubmitReply}
                  handleUpdateComment={handleUpdateComment}
                  isReply
                  key={reply.id}
                />
              ))}
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default CommentItem;
