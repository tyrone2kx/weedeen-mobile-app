import { useQuery } from '@tanstack/react-query';
import { apiWrapper } from '@wd/api';
import { BillingService } from '@wd/generated';

const useBanksGet = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['banks'],
    queryFn: () =>
      apiWrapper(() =>
        BillingService.billingControllerGetAllBanksFromPaystack(),
      ),
  });
  return {
    banks: data || [],
    isLoading,
  };
};

export default useBanksGet;
