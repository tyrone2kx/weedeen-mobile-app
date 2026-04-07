import { useQuery } from '@tanstack/react-query';
import { apiWrapper } from '@wd/api';
import { UserService } from '@wd/generated';
import { useAppSelector } from '@wd/redux-store/hooks/useAppSelector';
import { handleError } from '@wd/utils/helpers';
import { useEffect } from 'react';

const useGetAllStaff = () => {
  const user = useAppSelector(state => state.user?.currentUser);
  const { isLoading, data, error, refetch, isRefetching } = useQuery({
    queryKey: ['staff'],
    queryFn: () =>
      apiWrapper(() =>
        UserService.userControllerFindAllStaffForUser({
          userId: user?.id || '',
        }),
      ),
  });

  useEffect(() => {
    if (error) {
      handleError(error);
    }
  }, [error]);

  return {
    isLoading,
    staff: data || [],
    refetch,
    isRefetching,
  };
};

export default useGetAllStaff;
