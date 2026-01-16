import { useMutation } from '@tanstack/react-query';
import { apiWrapper } from '@wd/api';
import { ProductService } from '@wd/generated';
import { handleError, Notify } from '@wd/utils/helpers';

const useProductDelete = () => {
  const { isPending, mutate } = useMutation({
    mutationFn: (productId: string) =>
      apiWrapper(() =>
        ProductService.productControllerDelete({ id: productId }),
      ),
    onSuccess: () => {
      Notify({
        title: 'Product deleted',
        message: 'The product has been deleted successfully.',
        type: 'success',
      });
    },
    onError: error => {
      handleError(error);
    },
  });
  return {
    isDeleting: isPending,
    deleteProduct: mutate,
  };
};

export default useProductDelete;
