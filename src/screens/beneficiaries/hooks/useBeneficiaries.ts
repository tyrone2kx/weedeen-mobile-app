import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiWrapper } from '@wd/api';
import { CreateBeneficiaryDto, PlotService, UserUnit } from '@wd/generated';
import { handleError, Notify } from '@wd/utils/helpers';
import { useEffect } from 'react';

const useBeneficiaries = () => {
  const queryClient = useQueryClient();
  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ['beneficiaries'] });

  const { data, isLoading, error, refetch, isRefetching } = useQuery({
    queryKey: ['beneficiaries'],
    queryFn: () =>
      apiWrapper(() => PlotService.plotControllerListBeneficiaries()),
  });

  useEffect(() => {
    if (error) handleError(error);
  }, [error]);

  const addBeneficiary = useMutation({
    mutationFn: (requestBody: CreateBeneficiaryDto) =>
      apiWrapper(() => PlotService.plotControllerAddBeneficiary({ requestBody })),
    onSuccess: () => {
      invalidate();
      Notify({
        type: 'success',
        message: 'Beneficiary added. An invite has been sent to their email.',
      });
    },
    onError: error => handleError(error),
  });

  const removeBeneficiary = useMutation({
    mutationFn: (id: string) =>
      apiWrapper(() => PlotService.plotControllerRemoveBeneficiary({ id })),
    onSuccess: () => {
      invalidate();
      Notify({ type: 'success', message: 'Beneficiary removed.' });
    },
    onError: error => handleError(error),
  });

  return {
    beneficiaries: (data as UserUnit[]) || [],
    isLoading,
    isRefetching,
    refetch,
    addBeneficiary,
    removeBeneficiary,
  };
};

export default useBeneficiaries;
