import { useQuery } from '@tanstack/react-query';
import { apiWrapper } from '@wd/api';
import { FeesService } from '@wd/generated';
import { useAppSelector } from '@wd/redux-store/hooks/useAppSelector';
import { handleError } from '@wd/utils/helpers';
import { SelectOptionType } from '@wd/utils/types';
import usePaginationWrapper from '@wd/utils/usePaginationWrapper';
import { useEffect, useState } from 'react';

interface Props {
  ignorePagination?: boolean;
  userId?: string;
  feeId?: string;
}

const useGetFeeInvoices = ({
  ignorePagination = false,
  userId,
  feeId,
}: Props) => {
  const user = useAppSelector(state => state.user?.currentUser);
  const [status, setStatus] = useState<SelectOptionType>(null);
  const [generalFee, setGeneralFee] = useState<SelectOptionType>(null);
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

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['fee-invoices', user?.id, status, debouncedSearchText],
    queryFn: async () =>
      apiWrapper(() =>
        FeesService.feesControllerFindAllFeeInvoices({
          limit,
          page,
          search: debouncedSearchText,
          ignorePagination,
          startDate: startDate ? startDate.toISOString() : '',
          endDate: endDate ? endDate.toISOString() : '',
          userId: userId || '',
          status: status?.value,
          feeId: feeId || '',
        }),
      ),
  });

  useEffect(() => {
    if (data) setPageable(data);
  }, [data]);

  useEffect(() => {
    if (error) handleError(error);
  }, [error]);

  const isRefreshing = isLoading && page > 1;

  return {
    status,
    setStatus,
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
    setGeneralFee,
    generalFee,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    callback: refetch,
    infiniteScrollCallback,
    isRefreshing,
    refetch,
  };
};

export default useGetFeeInvoices;
