import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiWrapper } from '@wd/api';
import { FeesService } from '@wd/generated';
import { handleError } from '@wd/utils/helpers';

interface Props {
  amount: number;
  utilityId: string;
  initializePayment: (ref: string) => void;
}

const useCreateUtilityFee = ({
  amount,
  utilityId,
  initializePayment,
}: Props) => {
  const queryClient = useQueryClient();

  const controller = useMutation({
    mutationFn: () =>
      apiWrapper(() =>
        FeesService.feesControllerCreateUtilityFee({
          requestBody: {
            amount,
            utilityId,
          },
        }),
      ),
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['fee-invoices'] });
      queryClient.invalidateQueries({ queryKey: ['fees-statistics'] });

      const payment = data?.payments?.[0];
      if (payment) {
        initializePayment(payment.reference);
      }
    },
    onError: error => {
      handleError(error);
    },
  });
  return controller;
};

export default useCreateUtilityFee;
