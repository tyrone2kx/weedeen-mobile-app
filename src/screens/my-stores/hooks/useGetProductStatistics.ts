import { useQuery } from '@tanstack/react-query';
import { apiWrapper } from '@wd/api';
import { ProductService } from '@wd/generated';

interface Props {
  storeId?: string;
  startDate?: Date | null;
  endDate?: Date | null;
}

const useGetProductStatistics = ({ storeId, endDate, startDate }: Props) => {
  const { isLoading, data } = useQuery({
    queryKey: ['products-statistics', storeId, startDate, endDate],
    queryFn: () =>
      apiWrapper(() =>
        ProductService.productControllerGetProductStatisticsForStore({
          storeId: storeId || '',
          startDate: startDate ? startDate.toISOString() : '',
          endDate: endDate ? endDate.toISOString() : '',
        }),
      ),
    enabled: !!storeId,
  });
  return {
    isLoading,
    stats: data,
  };
};

export default useGetProductStatistics;
