import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiWrapper } from '@wd/api';
import { StoreService } from '@wd/generated';
import { handleError, Notify } from '@wd/utils/helpers';

const useDeleteStore = () => {
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: (storeId: string) =>
      apiWrapper(() => StoreService.storeControllerDelete({ id: storeId })),
    onSuccess: () => {
      Notify({
        type: 'success',
        message: 'Store deleted successfully',
        title: 'Success',
      });
      queryClient.invalidateQueries({ queryKey: ['stores'] });
      queryClient.invalidateQueries({ queryKey: ['stores-statistics'] });
    },
    onError: error => {
      handleError(error);
    },
  });
  return {
    isDeleting: isPending,
    deleteStore: mutate,
  };
};

export default useDeleteStore;
