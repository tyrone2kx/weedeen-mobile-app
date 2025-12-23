import { useQuery } from '@tanstack/react-query';
import { apiWrapper } from '@wd/api';
import { StoreService } from '@wd/generated';
import { useAppSelector } from '@wd/redux-store/hooks/useAppSelector';
import { SelectOptionType } from '@wd/utils/types';
import usePaginationWrapper from '@wd/utils/usePaginationWrapper';
import { useEffect, useState } from 'react';

interface Props {
  forUser?: boolean;
  includeDeleted?: boolean;
  ignorePagination?: boolean;
  tenant?: string;
  userId?: string;
  onlySubscribed?: boolean;
}

const useGetStores = ({
  forUser,
  ignorePagination = false,
  tenant,
  userId,
  includeDeleted = false,
  onlySubscribed = false,
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
      'stores',
      user?.id,
      status,
      startDate,
      endDate,
      debouncedSearchText,
    ],
    queryFn: async () =>
      apiWrapper(() =>
        StoreService.storeControllerFindAll({
          userId: forUser ? userId || user?.id || '' : userId || '',
          status: status?.value || '',
          passedTenant: forUser ? user?.tenant || '' : tenant || '',
          limit,
          page,
          search: debouncedSearchText,
          startDate: startDate ? startDate.toISOString() : '',
          endDate: endDate ? endDate.toISOString() : '',
          ignorePagination,
          includeDeleted,
          onlySubscribed,
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
    stores: data?.data || [],
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

export default useGetStores;
