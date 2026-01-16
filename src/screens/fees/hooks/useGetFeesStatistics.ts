import { useQuery } from '@tanstack/react-query';
import { apiWrapper } from '@wd/api';
import { FeesService } from '@wd/generated';

interface Props {
  feeId?: string;
  userId?: string;
}

const useGetFeesStatistics = ({ feeId = '', userId = '' }: Props) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['fees-statistics', feeId, userId],
    queryFn: () =>
      apiWrapper(() =>
        FeesService.feesControllerGetStatistics({
          feeId,
          userId: userId || '',
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
