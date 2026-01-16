import { useQueryClient } from '@tanstack/react-query';
import { apiWrapper, httpClient } from '@wd/api';
import { CreateProductDto } from '@wd/generated';
import { getHeaders, handleError, Notify } from '@wd/utils/helpers';
import useLoading from '@wd/utils/useLoading';

interface Props {
  productId?: string;
  onSuccess?: () => void;
}

const useCreateProduct = ({ productId, onSuccess }: Props) => {
  const queryClient = useQueryClient();
  const loader = useLoading();

  const createOrUpdateProduct = async (
    body: CreateProductDto,
    images: File[],
  ) => {
    try {
      loader.startLoading();
      const headers = await getHeaders(true);
      const formData = new FormData();
      Object.keys(body).forEach(key => {
        formData.append(key, body[key]);
      });

      images.forEach(image => {
        formData.append('images', image);
      });

      const url = productId ? `/product/${productId}` : '/product';
      const method = productId ? 'patch' : 'post';
      const { data } = await apiWrapper(() =>
        httpClient[method](url, formData, {
          headers,
        }),
      );
      Notify({
        title: 'Success',
        message: `Product ${productId ? 'updated' : 'created'} successfully`,
        type: 'success',
      });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      onSuccess?.();
      return data;
    } catch (error) {
      handleError(error);
    } finally {
      loader.stopLoading();
    }
  };
  return {
    isLoading: loader.loading,
    createOrUpdateProduct,
  };
};

export default useCreateProduct;
