import { useQuery } from '@tanstack/react-query';
import { apiWrapper } from '@wd/api';
import { NotificationsService } from '@wd/generated';
import usePaginationWrapper from '@wd/utils/usePaginationWrapper';
import { useEffect } from 'react';

const useGetNotifications = () => {
  const {
    searchText,
    setSearchText,
    page,
    setPage,
    setPageable,
    totalPages,
    totalElements,
  } = usePaginationWrapper();

  const { data, isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () =>
      apiWrapper(() =>
        NotificationsService.notificationsControllerFindAll({
          limit: 100,
          page,
          ignorePagination: true,
          status: '',
        }),
      ),
  });

  const totalUnread =
    (data?.data || [])?.filter(notification => notification.status === 'unread')
      .length || 0;

  useEffect(() => {
    if (data) setPageable(data);
  }, [data]);

  return {
    searchText,
    setSearchText,
    isLoading,
    notifications: data?.data || [],
    page,
    setPage,
    totalPages,
    totalElements,
    totalUnread,
  };
};

export default useGetNotifications;
