import { useQuery } from '@tanstack/react-query';
import { apiWrapper } from '@wd/api';
import { OrderService } from '@wd/generated';
import { useAppSelector } from '@wd/redux-store/hooks/useAppSelector';
import { SelectOptionType } from '@wd/utils/types';
import usePaginationWrapper from '@wd/utils/usePaginationWrapper';
import { useEffect, useState } from 'react';

interface Props {
  forUser?: boolean;
  ignorePagination?: boolean;
  riderId?: string;
  isDashboard?: boolean;
}

const useGetResidentInvoices = ({
  forUser,
  ignorePagination = false,
  riderId = '',
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

  const { data, isLoading } = useQuery({
    queryKey: [
      'invoices',
      user?.id,
      status,
      startDate,
      endDate,
      debouncedSearchText,
    ],
    queryFn: async () =>
      apiWrapper(() =>
        OrderService.orderControllerFindAllOrdersForResident({
          userId: user?.id || '',
          status: status?.value || '',
          storeId: '',
          limit: isDashboard ? 5 : limit,
          page,
          search: debouncedSearchText,
          startDate: startDate ? startDate.toISOString() : '',
          endDate: endDate ? endDate.toISOString() : '',
          ignorePagination,
          riderId,
        }),
      ),
    enabled: forUser ? !!user?.id : true,
  });

  useEffect(() => {
    if (data) setPageable(data);
  }, [data]);

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
    invoices: data?.data || [],
    limit,
    setLimit,
    page,
    setPage,
    totalPages,
    totalElements,
    infiniteScrollCallback,
  };
};

export default useGetResidentInvoices;
