import { useQuery } from '@tanstack/react-query';
import { apiWrapper } from '@wd/api';
import { OrderService } from '@wd/generated';

interface Props {
  orderId?: number;
}

const useGetSingleOrder = ({ orderId }: Props) => {
  const { isLoading, data: order } = useQuery({
    queryKey: ['orders', orderId],
    queryFn: () =>
      apiWrapper(() =>
        OrderService.orderControllerFindOne({
          id: String(orderId || ''),
        }),
      ),
    enabled: !!orderId,
  });
  return {
    isLoading,
    order,
  };
};

export default useGetSingleOrder;
