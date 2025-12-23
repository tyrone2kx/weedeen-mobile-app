import { useQuery } from '@tanstack/react-query';
import { apiWrapper } from '@wd/api';
import { ProductService } from '@wd/generated';
import { SelectOptionType } from '@wd/utils/types';
import usePaginationWrapper from '@wd/utils/usePaginationWrapper';
import { useEffect, useState } from 'react';

interface Props {
  ignorePagination?: boolean;
  includeDeleted?: boolean;
  onlySubscribed?: boolean;
  storeId?: string;
  tenant?: string;
}

const useGetProducts = ({
  storeId = '',
  tenant = '',
  ignorePagination = false,
  includeDeleted = false,
  onlySubscribed = false,
}: Props) => {
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
      'products',
      storeId,
      status,
      startDate,
      endDate,
      debouncedSearchText,
      onlySubscribed,
      includeDeleted,
    ],
    queryFn: async () =>
      apiWrapper(() =>
        ProductService.productControllerFindAll({
          status: status?.value,
          storeId,
          limit,
          page,
          search: debouncedSearchText,
          startDate: startDate ? startDate.toISOString() : '',
          endDate: endDate ? endDate.toISOString() : '',
          ignorePagination,
          passedTenant: tenant,
          includeDeleted,
          onlySubscribed,
        }),
      ),
    enabled: !!storeId || !!tenant,
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
    products: data?.data || [],
    limit,
    setLimit,
    page,
    setPage,
    totalPages,
    totalElements,
    isRefreshing,
    infiniteScrollCallback,
    refetch,
  };
};

export default useGetProducts;
