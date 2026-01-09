import { useQuery } from '@tanstack/react-query';
import { apiWrapper } from '@wd/api';
import { DeliveryService } from '@wd/generated';
import { useAppSelector } from '@wd/redux-store/hooks/useAppSelector';
import { SelectOptionType } from '@wd/utils/types';
import usePaginationWrapper from '@wd/utils/usePaginationWrapper';
import { useEffect, useState } from 'react';

interface Props {
  forUser?: boolean;
  ignorePagination?: boolean;
  tenant?: string;
  invoiceId?: string;
  storeId?: string;
}

const useGetDeliveries = ({
  forUser,
  ignorePagination = false,
  tenant,
  invoiceId,
  storeId,
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
      'deliveries',
      user?.id,
      status,
      startDate,
      endDate,
      debouncedSearchText,
    ],
    queryFn: async () =>
      apiWrapper(() =>
        DeliveryService.deliveryControllerFindAll({
          userId: user?.id || '',
          status: status?.value || '',
          passedTenant: forUser ? user?.tenant || '' : tenant || '',
          limit,
          page,
          search: debouncedSearchText,
          startDate: startDate ? startDate.toISOString() : '',
          endDate: endDate ? endDate.toISOString() : '',
          ignorePagination,
          invoiceId: invoiceId || '',
          storeId: storeId || '',
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
    deliveries: data?.data || [],
    limit,
    setLimit,
    page,
    setPage,
    totalPages,
    totalElements,
    refetch,
    infiniteScrollCallback,
    isRefreshing,
  };
};

export default useGetDeliveries;
