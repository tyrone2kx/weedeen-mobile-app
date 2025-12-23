import { useQuery } from '@tanstack/react-query';
import { apiWrapper } from '@wd/api';
import { OrderService } from '@wd/generated';
import { useAppSelector } from '@wd/redux-store/hooks/useAppSelector';

const useGetOrdersStatistics = () => {
  const user = useAppSelector(state => state.user?.currentUser);
  const { data: stats, isLoading: isLoadingStats } = useQuery({
    queryKey: ['order-statistics', user?.id],
    queryFn: () =>
      apiWrapper(() =>
        OrderService.orderControllerGetOrderStatisticsForResident({
          forUser: true,
        }),
      ),
  });

  return {
    isLoadingStats,
    stats,
  };
};

export default useGetOrdersStatistics;
