import { useQuery } from '@tanstack/react-query';
import { apiWrapper } from '@wd/api';
import { DeliveryService } from '@wd/generated';
import { useAppSelector } from '@wd/redux-store/hooks/useAppSelector';

interface Props {
  userId?: string;
  riderId?: string;
  tenant?: string;
  forUser?: boolean;
  startDate?: Date | null;
  endDate?: Date | null;
}

const useGetDeliveriesStatistics = ({
  forUser,
  tenant,
  userId = '',
  startDate,
  endDate,
  riderId = '',
}: Props) => {
  const user = useAppSelector(state => state.user?.currentUser);

  const { isLoading, data } = useQuery({
    queryKey: [
      'deliveries-statistics',
      forUser,
      tenant,
      userId,
      startDate,
      endDate,
      riderId,
    ],
    queryFn: () =>
      apiWrapper(() =>
        DeliveryService.deliveryControllerGetStatistics({
          userId: forUser ? userId || user?.id || '' : userId || '',
          passedTenant: tenant || '',
          startDate: startDate ? startDate.toISOString() : '',
          endDate: endDate ? endDate.toISOString() : '',
          riderId,
        }),
      ),
    enabled: forUser ? !!user?.id : true,
  });
  return {
    isLoading,
    statistics: data,
  };
};

export default useGetDeliveriesStatistics;
