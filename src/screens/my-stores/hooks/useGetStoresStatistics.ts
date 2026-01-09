import { useQuery } from '@tanstack/react-query';
import { apiWrapper } from '@wd/api';
import { StoreService } from '@wd/generated';
import { useAppSelector } from '@wd/redux-store/hooks/useAppSelector';

interface Props {
  userId?: string;
  tenant?: string;
  forUser?: boolean;
  startDate?: Date | null;
  endDate?: Date | null;
}

const useGetStoresStatistics = ({
  forUser,
  tenant,
  userId = '',
  startDate,
  endDate,
}: Props) => {
  const user = useAppSelector(state => state.user?.currentUser);

  const { isLoading, data } = useQuery({
    queryKey: [
      'stores-statistics',
      forUser,
      tenant,
      userId,
      startDate,
      endDate,
    ],
    queryFn: () =>
      apiWrapper(() =>
        StoreService.storeControllerGetStatistics({
          userId: forUser ? userId || user?.id || '' : userId || '',
          passedTenant: tenant || '',
          startDate: startDate ? startDate.toISOString() : '',
          endDate: endDate ? endDate.toISOString() : '',
        }),
      ),
    enabled: forUser ? !!user?.id : true,
  });
  return {
    isLoading,
    statistics: data,
  };
};

export default useGetStoresStatistics;
