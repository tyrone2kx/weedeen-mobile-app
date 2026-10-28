import { useQuery } from '@tanstack/react-query';
import { apiWrapper } from '@wd/api';
import { SosAlertService } from '@wd/generated';
import { useAppSelector } from '@wd/redux-store/hooks/useAppSelector';

/**
 * SOS alert statistics for the current resident (ongoing / total alerts).
 */
const useGetEmergencyStatistics = () => {
  const user = useAppSelector(state => state.user?.currentUser);

  const { data, isLoading } = useQuery({
    queryKey: ['emergency-statistics', user?.id],
    queryFn: () =>
      apiWrapper(() =>
        SosAlertService.sosAlertControllerGetStatistics({
          userId: user?.id || '',
        }),
      ),
    enabled: !!user?.id,
  });

  return {
    stats: data,
    isLoadingStats: isLoading,
  };
};

export default useGetEmergencyStatistics;
