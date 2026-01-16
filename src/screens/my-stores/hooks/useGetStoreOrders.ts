import { useQuery } from '@tanstack/react-query';
import { apiWrapper } from '@wd/api';
import { OrderService } from '@wd/generated';
import { SelectOptionType } from '@wd/utils/types';
import usePaginationWrapper from '@wd/utils/usePaginationWrapper';
import { useEffect, useState } from 'react';

interface Props {
  ignorePagination?: boolean;
  storeId?: string;
}

const useGetStoreOrders = ({ storeId, ignorePagination = false }: Props) => {
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
      'orders',
      storeId,
      status,
      startDate,
      endDate,
      debouncedSearchText,
    ],
    queryFn: async () =>
      apiWrapper(() =>
        OrderService.orderControllerFindAll({
          userId: '',
          status: status?.value || '',
          storeId: storeId || '',
          limit,
          page,
          search: debouncedSearchText,
          startDate: startDate ? startDate.toISOString() : '',
          endDate: endDate ? endDate.toISOString() : '',
          ignorePagination,
        }),
      ),
    enabled: !!storeId,
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
    orders: data?.data || [],
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

export default useGetStoreOrders;
