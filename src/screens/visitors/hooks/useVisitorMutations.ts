import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiWrapper } from '@wd/api';
import {
  CreateVisitorAccessDto,
  UpdateVisitorAccessDto,
  VisitorAccessService,
} from '@wd/generated';
import { handleError, Notify } from '@wd/utils/helpers';

const useVisitorMutations = () => {
  const queryClient = useQueryClient();
  const { isPending: isDeleting, mutate: deleteAccess } = useMutation({
    mutationFn: (id: string) =>
      apiWrapper(() =>
        VisitorAccessService.visitorAccessControllerRemove({ id }),
      ),
    onSuccess: () => {
      Notify({
        type: 'success',
        message: 'Visitor access deleted successfully',
      });
    },
    onError: error => {
      handleError(error);
    },
  });

  const { mutate: updateAccess, isPending: isUpdating } = useMutation({
    mutationFn: (payload: {
      id: string;
      requestBody: UpdateVisitorAccessDto;
    }) =>
      apiWrapper(() =>
        apiWrapper(() =>
          VisitorAccessService.visitorAccessControllerUpdate(payload),
        ),
      ),
    onSuccess: async () => {
      Notify({
        type: 'success',
        message: 'Visitor access updated successfully',
      });
      await queryClient.invalidateQueries({ queryKey: ['visitors'] });
      await queryClient.invalidateQueries({
        queryKey: ['visitors-statistics'],
      });
    },
    onError: error => {
      handleError(error);
    },
  });

  const { isPending: isCreating, mutate: createAccess } = useMutation({
    mutationFn: (values: CreateVisitorAccessDto) =>
      apiWrapper(() =>
        VisitorAccessService.visitorAccessControllerCreate({
          requestBody: values,
        }),
      ),
    onSuccess: async () => {
      Notify({
        type: 'success',
        message: 'Access code generated successfully',
      });
      await queryClient.invalidateQueries({ queryKey: ['visitors'] });
      await queryClient.invalidateQueries({
        queryKey: ['visitors-statistics'],
      });
    },
  });

  return {
    deleteAccess,
    isDeleting,
    updateAccess,
    isUpdating,
    createAccess,
    isCreating,
  };
};

export default useVisitorMutations;
