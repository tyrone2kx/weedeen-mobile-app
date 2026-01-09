import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiWrapper } from '@wd/api';
import { StoreService } from '@wd/generated';
import { handleError, Notify } from '@wd/utils/helpers';

const useDeleteStoreImage = () => {
  const queryClient = useQueryClient();
  const { isPending, mutate: deleteStoreImage } = useMutation({
    mutationFn: ({
      id,
      imageUrl,
      isLogo,
    }: {
      id: string;
      imageUrl: string;
      isLogo: boolean;
    }) =>
      apiWrapper(() =>
        StoreService.storeControllerDeleteStoreImage({
          id,
          imageUrl,
          isLogo,
        }),
      ),
    onSuccess: () => {
      Notify({
        type: 'success',
        message: 'Image deleted successfully',
        title: 'Success',
      });
      queryClient.invalidateQueries({
        queryKey: ['store'],
      });
    },
    onError: error => {
      handleError(error);
    },
  });
  return {
    isDeletingImage: isPending,
    deleteStoreImage,
  };
};

export default useDeleteStoreImage;
