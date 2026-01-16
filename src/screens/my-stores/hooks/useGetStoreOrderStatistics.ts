import { useQuery } from '@tanstack/react-query';
import { apiWrapper } from '@wd/api';
import { OrderService } from '@wd/generated';

interface Props {
  storeId?: string;
  startDate?: Date | null;
  endDate?: Date | null;
}

const useGetStoreOrderStatistics = ({
  startDate,
  endDate,
  storeId = '',
}: Props) => {
  const { isLoading, data } = useQuery({
    queryKey: ['store-order-statistics', storeId, startDate, endDate],
    queryFn: () =>
      apiWrapper(() =>
        OrderService.orderControllerGetOrderStatisticsForStore({
          startDate: startDate ? startDate.toISOString() : '',
          endDate: endDate ? endDate.toISOString() : '',
          storeId,
        }),
      ),
    enabled: !!storeId,
  });
  return {
    isLoading,
    statistics: data,
  };
};

export default useGetStoreOrderStatistics;
