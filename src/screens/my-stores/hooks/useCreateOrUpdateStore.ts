import { useQueryClient } from '@tanstack/react-query';
import { apiWrapper, httpClient } from '@wd/api';
import { CreateStoreDto, UpdateStoreDto } from '@wd/generated';
import { getHeaders, handleError, Notify } from '@wd/utils/helpers';
import useLoading from '@wd/utils/useLoading';

interface Props {
  storeId?: string;
  onSuccess?: () => void;
}

const useCreateOrUpdateStore = ({ storeId, onSuccess }: Props) => {
  const queryClient = useQueryClient();
  const loader = useLoading();

  const createOrUpdateStore = async (
    body: CreateStoreDto | UpdateStoreDto,
    logo: File[] = [],
    images: File[] = [],
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

      logo.forEach(image => {
        formData.append('logo', image);
      });

      const url = storeId ? `/store/${storeId}` : '/store';
      const method = storeId ? 'patch' : 'post';
      const { data } = await apiWrapper(() =>
        httpClient[method](url, formData, {
          headers,
        }),
      );
      Notify({
        type: 'success',
        message: `Store ${storeId ? 'updated' : 'created'} successfully`,
        title: 'Success',
      });
      queryClient.invalidateQueries({ queryKey: ['stores'] });
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
    createOrUpdateStore,
  };
};

export default useCreateOrUpdateStore;
