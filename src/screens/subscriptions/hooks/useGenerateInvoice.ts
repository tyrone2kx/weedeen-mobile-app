import { useMutation } from '@tanstack/react-query';
import { apiWrapper } from '@wd/api';
import { BillingService } from '@wd/generated';
import { handleError } from '@wd/utils/helpers';

const useGenerateInvoice = () => {
  const { isPending: isLoadingCredits, mutate: purchaseCredit } = useMutation({
    mutationFn: ({ amount, credits }: { amount: number; credits: number }) =>
      apiWrapper(() =>
        BillingService.billingControllerPurchaseCredits({
          requestBody: {
            amount,
            credits,
          },
        }),
      ),
    onError: error => handleError(error),
  });

  const { mutate: subscribeToPlan, isPending: isSubscribing } = useMutation({
    mutationFn: ({ planId, storeId }: { planId: string; storeId?: string }) =>
      apiWrapper(() =>
        BillingService.billingControllerSubscribeToPlan({
          planId,
          storeId: storeId || '',
        }),
      ),
    onError: error => handleError(error),
  });

  return {
    purchaseCredit,
    isLoadingCredits,
    subscribeToPlan,
    isSubscribing,
  };
};

export default useGenerateInvoice;
