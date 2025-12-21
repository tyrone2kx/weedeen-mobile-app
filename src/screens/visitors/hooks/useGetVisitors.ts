import { useQuery } from '@tanstack/react-query';
import { apiWrapper } from '@wd/api';
import { VisitorAccessService } from '@wd/generated';
import { useAppSelector } from '@wd/redux-store/hooks/useAppSelector';
import { SelectOptionType } from '@wd/utils/types';
import usePaginationWrapper from '@wd/utils/usePaginationWrapper';
import { useEffect, useState } from 'react';

interface Props {
  forUser?: boolean;
  ignorePagination?: boolean;
  passedTenant?: string;
  isDashboard?: boolean;
}

const useGetVisitors = ({
  forUser,
  ignorePagination = false,
  passedTenant = '',
  isDashboard,
}: Props) => {
  const user = useAppSelector(state => state.user?.currentUser);
  const [status, setStatus] = useState<SelectOptionType>(null);
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
    infiniteScrollCallback,
  } = usePaginationWrapper();

  const { data, isLoading, refetch } = useQuery({
    queryKey: [
      'visitors',
      user?.id,
      status,
      startDate,
      endDate,
      debouncedSearchText,
    ],
    queryFn: async () =>
      apiWrapper(() =>
        VisitorAccessService.visitorAccessControllerFindAll({
          userId: user?.id || '',
          accessCodeUsed: !!status?.value,
          passedTenant,
          limit: isDashboard ? 5 : limit,
          page,
          search: debouncedSearchText,
          startDate: startDate ? startDate.toISOString() : '',
          endDate: endDate ? endDate.toISOString() : '',
          ignorePagination,
        }),
      ),
    enabled: forUser ? !!user?.id : true,
  });

  useEffect(() => {
    if (data) setPageable(data);
  }, [data]);

  const isRefreshing = isLoading && page > 1;

  return {
    status,
    setStatus,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    searchText,
    setSearchText,
    isLoading,
    visitors: data?.data || [],
    limit,
    setLimit,
    page,
    setPage,
    totalPages,
    totalElements,
    infiniteScrollCallback,
    refetch,
    isRefreshing,
  };
};

export default useGetVisitors;
