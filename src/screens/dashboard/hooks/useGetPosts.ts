import { useQuery } from '@tanstack/react-query';
import { apiWrapper } from '@wd/api';
import { Post, PostsService } from '@wd/generated';
import usePaginationWrapper from '@wd/utils/usePaginationWrapper';
import { useEffect, useState } from 'react';

const useGetPosts = () => {
  const { page, setPage, setPageable, totalPages, totalElements } =
    usePaginationWrapper();

  const [posts, setPosts] = useState<Post[]>([]);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['posts'],
    queryFn: async () =>
      apiWrapper(() =>
        PostsService.postsControllerGetPosts({
          limit: 20,
          page,
          ignorePagination: false,
        }),
      ),
    enabled: page === 1 || page <= totalPages, // Prevent fetching when page exceeds totalPages
  });

  useEffect(() => {
    if (data) {
      setPageable(data);
      setPosts(prev => [
        ...prev.filter(
          post => !data.data.some(newPost => newPost.id === post.id),
        ),
        ...data.data,
      ]);
    }
  }, [data]);

  return {
    isLoading,
    posts,
    page,
    setPage,
    totalPages,
    totalElements,
    refetch,
  };
};

export default useGetPosts;
