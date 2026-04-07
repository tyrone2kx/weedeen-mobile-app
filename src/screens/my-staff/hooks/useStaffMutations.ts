import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiWrapper } from '@wd/api';
import { UserService } from '@wd/generated';
import { handleError, Notify } from '@wd/utils/helpers';
import useCreateOrUpdateStaff from './useCreateOrUpdateStaff';

interface Props {
  staffId?: string;
}

const useStaffMutations = ({ staffId }: Props) => {
  const queryClient = useQueryClient();

  // Create/update controller using the custom hook
  const createOrUpdateController = useCreateOrUpdateStaff({
    staffId,
  });

  // Delete controller
  const deleteController = useMutation({
    mutationFn: (id: string) =>
      apiWrapper(() => UserService.userControllerDeleteStaff({ id })),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staff'] });
      Notify({
        type: 'success',
        message: 'Staff deleted successfully',
      });
    },
    onError: error => {
      handleError(error);
    },
  });

  return {
    createOrUpdateController,
    deleteController,
  };
};

export default useStaffMutations;
