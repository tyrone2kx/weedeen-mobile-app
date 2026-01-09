import { useQuery } from '@tanstack/react-query';
import { apiWrapper } from '@wd/api';
import { BillingService } from '@wd/generated';

interface Props {
  userId?: string;
}

const useBankAccountsGet = ({ userId }: Props) => {
  const { data, isLoading } = useQuery({
    queryKey: ['bank-accounts', userId],
    queryFn: () =>
      apiWrapper(() =>
        BillingService.billingControllerGetBankAccountsByUserId({
          userId: userId || '',
        }),
      ),
    enabled: !!userId,
  });
  return {
    bankAccounts: data || [],
    isLoading,
  };
};

export default useBankAccountsGet;
