import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiWrapper } from '@wd/api';
import { ProductService } from '@wd/generated';
import { handleError, Notify } from '@wd/utils/helpers';

const useDeleteProductImage = () => {
  const queryClient = useQueryClient();
  const { isPending, mutate: deleteProductImage } = useMutation({
    mutationFn: ({
      productId,
      imageUrl,
    }: {
      productId: string;
      imageUrl: string;
    }) =>
      apiWrapper(() =>
        ProductService.productControllerDeleteProductImage({
          productId,
          imageUrl,
        }),
      ),
    onSuccess: () => {
      Notify({
        title: 'Success',
        message: 'Image deleted successfully',
        type: 'success',
      });
      queryClient.invalidateQueries({
        queryKey: ['product'],
      });
    },
    onError: error => {
      handleError(error);
    },
  });
  return {
    isDeletingImage: isPending,
    deleteProductImage,
  };
};

export default useDeleteProductImage;
