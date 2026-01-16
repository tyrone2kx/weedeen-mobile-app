import { useMutation } from '@tanstack/react-query';
import { apiWrapper } from '@wd/api';
import { CreatePaymentDto, FeesService } from '@wd/generated';
import { handleError } from '@wd/utils/helpers';

const usePaymentCreate = () => {
  const { mutate: createPayment, isPending: isCreating } = useMutation({
    mutationFn: (requestBody: CreatePaymentDto) =>
      apiWrapper(() =>
        FeesService.feesControllerInitializeFeePayment({
          requestBody,
        }),
      ),
    onError: error => {
      handleError(error);
    },
  });
  return { createPayment, isCreating };
};

export default usePaymentCreate;
