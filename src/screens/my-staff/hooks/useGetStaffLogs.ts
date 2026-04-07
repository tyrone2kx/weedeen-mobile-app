import { useQuery } from '@tanstack/react-query';
import { apiWrapper } from '@wd/api';
import { UserService } from '@wd/generated';
import { useAppSelector } from '@wd/redux-store/hooks/useAppSelector';
import { handleError } from '@wd/utils/helpers';
import usePaginationWrapper from '@wd/utils/usePaginationWrapper';
import { useEffect, useState } from 'react';

export interface Props {
  ignorePagination?: boolean;
  staffId: string;
}

const useGetStaffLogs = ({ ignorePagination = false, staffId }: Props) => {
  const user = useAppSelector(state => state.user?.currentUser);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const {
    searchText,
    setSearchText,
    limit,
    setLimit,
    debouncedSearchText,
    page,
    setPage,
    setPageable,
    totalPages,
    totalElements,
  } = usePaginationWrapper();

  const { data, isLoading, error } = useQuery({
    queryKey: [
      'staff-logs',
      user?.id,
      startDate,
      endDate,
      debouncedSearchText,
      page,
      limit,
      staffId,
    ],
    queryFn: async () =>
      apiWrapper(() =>
        UserService.userControllerFindStaffLogs({
          limit,
          page,
          search: debouncedSearchText,
          startDate: startDate ? startDate.toISOString() : undefined,
          endDate: endDate ? endDate.toISOString() : undefined,
          ignorePagination,
          staffId,
        }),
      ),
  });

  useEffect(() => {
    if (data) setPageable(data);
  }, [data]);

  useEffect(() => {
    if (error) handleError(error);
  }, [error]);

  return {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    searchText,
    setSearchText,
    isLoading,
    logs: data?.data || [],
    limit,
    setLimit,
    page,
    setPage,
    totalPages,
    totalElements,
  };
};

export default useGetStaffLogs;
