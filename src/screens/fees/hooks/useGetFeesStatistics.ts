import { useQuery } from '@tanstack/react-query';
import { apiWrapper } from '@wd/api';
import { FeesService } from '@wd/generated';

interface Props {
  feeId?: string;
  userId?: string;
  startDate?: string;
  endDate?: string;
  utilityId?: string;
}

const useGetFeesStatistics = ({
  feeId = '',
  userId = '',
  startDate = '',
  endDate = '',
  utilityId = '',
}: Props) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['fees-statistics', feeId, userId, startDate, endDate, utilityId],
    queryFn: () =>
      apiWrapper(() =>
        FeesService.feesControllerGetStatistics({
          feeId,
          userId: userId || '',
          endDate,
          startDate,
          utilityId,
        }),
      ),
  });
  return {
    stats: data,
    isLoadingStats: isLoading,
    error,
    refetchStats: refetch,
  };
};

export default useGetFeesStatistics;
