import { useQuery } from '@tanstack/react-query';
import { apiWrapper } from '@wd/api';
import { BillingService } from '@wd/generated';

interface Props {
  invoiceId?: number;
}

const useGetSingleInvoice = ({ invoiceId }: Props) => {
  const {
    isLoading,
    data: invoice,
    refetch,
  } = useQuery({
    queryKey: ['invoices', invoiceId],
    queryFn: () =>
      apiWrapper(() =>
        BillingService.billingControllerGetInvoiceById({
          id: String(invoiceId || ''),
        }),
      ),
    enabled: !!invoiceId,
  });
  return {
    isLoading,
    invoice,
    refetch,
  };
};

export default useGetSingleInvoice;
