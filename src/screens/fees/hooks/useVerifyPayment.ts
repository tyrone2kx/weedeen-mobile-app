import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiWrapper } from '@wd/api';
import { FeesService } from '@wd/generated';
import { handleError } from '@wd/utils/helpers';

interface Props {
  onSuccess?: () => void;
}

const useVerifyPayment = ({ onSuccess }: Props) => {
  const queryClient = useQueryClient();
  const controller = useMutation({
    mutationFn: (reference: string) =>
      apiWrapper(() => FeesService.feesControllerVerifyPayment({ reference })),
    onError: error => handleError(error),
    onSuccess: () => {
      onSuccess?.();
      queryClient.invalidateQueries({ queryKey: ['fee-invoices'] });
    },
  });
  return controller;
};

export default useVerifyPayment;
