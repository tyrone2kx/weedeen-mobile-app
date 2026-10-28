import { useQuery, useQueryClient } from '@tanstack/react-query';
import { apiWrapper } from '@wd/api';
import { SosAlertService } from '@wd/generated';
import { useAppSelector } from '@wd/redux-store/hooks/useAppSelector';
import { SelectOptionType } from '@wd/utils/types';
import usePaginationWrapper from '@wd/utils/usePaginationWrapper';
import { useEffect, useState } from 'react';

interface Props {
  includeRelations?: boolean;
  ignorePagination?: boolean;
}

/**
 * Lists the current resident's SOS alerts with status/type filters and
 * infinite-scroll pagination. Mirrors the web resident Emergencies list.
 */
const useGetEmergencies = ({
  includeRelations = true,
  ignorePagination = false,
}: Props = {}) => {
  const queryClient = useQueryClient();
  const user = useAppSelector(state => state.user?.currentUser);
  const [status, setStatus] = useState<SelectOptionType>(null);
  const [emergencyType, setEmergencyType] = useState<SelectOptionType>(null);
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
      'sos-alerts',
      user?.id,
      status,
      emergencyType,
      debouncedSearchText,
    ],
    queryFn: async () =>
      apiWrapper(() =>
        SosAlertService.sosAlertControllerFindAll({
          userId: user?.id || '',
          status: status?.value || '',
          emergencyType: emergencyType?.value || '',
          includeRelations,
          limit,
          page,
          search: debouncedSearchText,
          ignorePagination,
        }),
      ),
    enabled: !!user?.id,
  });

  useEffect(() => {
    if (data) setPageable(data);
  }, [data]);

  const isRefreshing = isLoading && page > 1;

  return {
    status,
    setStatus,
    emergencyType,
    setEmergencyType,
    searchText,
    setSearchText,
    isLoading,
    emergencies: data?.data || [],
    limit,
    setLimit,
    page,
    setPage,
    totalPages,
    totalElements,
    infiniteScrollCallback,
    refetch,
    isRefreshing,
    callback: () =>
      queryClient.invalidateQueries({ queryKey: ['sos-alerts'] }),
  };
};

export default useGetEmergencies;
