import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiWrapper } from '@wd/api';
import { BillingService } from '@wd/generated';
import { handleError, Notify } from '@wd/utils/helpers';

const useDeleteBankAccount = () => {
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: (bankAccountId: string) =>
      apiWrapper(() =>
        BillingService.billingControllerDeleteBankAccount({
          id: bankAccountId,
        }),
      ),
    onSuccess: () => {
      Notify({
        title: 'Bank Account Deleted',
        message: 'The bank account has been deleted successfully.',
        type: 'success',
      });
      void queryClient.invalidateQueries({
        queryKey: ['bank-accounts'],
      });
    },
    onError: error => {
      handleError(error);
    },
  });
  return {
    isDeleting: isPending,
    deleteBankAccount: mutate,
  };
};

export default useDeleteBankAccount;
