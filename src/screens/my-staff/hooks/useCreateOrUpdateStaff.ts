import { useQueryClient } from '@tanstack/react-query';
import { apiWrapper, httpClient } from '@wd/api';
import { CreateStaffDto, UpdateStaffDto } from '@wd/generated';
import { getHeaders, handleError, Notify } from '@wd/utils/helpers';
import useLoading from '@wd/utils/useLoading';

interface Props {
  staffId?: string;
}

const useCreateOrUpdateStaff = ({ staffId }: Props) => {
  const queryClient = useQueryClient();
  const loader = useLoading();

  const createOrUpdateStaff = async (
    body: CreateStaffDto | UpdateStaffDto,
    profilePic: File[] = [],
    onSuccess?: () => void,
  ) => {
    try {
      loader.startLoading();
      const headers = await getHeaders(true);
      const formData = new FormData();
      Object.keys(body).forEach(key => {
        formData.append(key, body[key]);
      });

      profilePic.forEach(file => {
        formData.append('profilePic', file);
      });

      const url = staffId ? `/user/staff/${staffId}` : '/user/staff';
      const method = staffId ? 'patch' : 'post';
      const { data } = await apiWrapper(() =>
        httpClient[method](url, formData, {
          headers,
        }),
      );
      Notify({
        type: 'success',
        message:
          data.message ||
          `Staff ${staffId ? 'updated' : 'created'} successfully`,
      });
      queryClient.invalidateQueries({ queryKey: ['staff'] });
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
    createOrUpdateStaff,
  };
};

export default useCreateOrUpdateStaff;
