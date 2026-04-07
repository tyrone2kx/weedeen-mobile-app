import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiWrapper } from '@wd/api';
import { CreateVisitorAccessDto, VisitorAccessService } from '@wd/generated';
import { Notify } from '@wd/utils/helpers';

const useCreateVisitorAccess = () => {
  const queryClient = useQueryClient();
  const controller = useMutation({
    mutationFn: (values: CreateVisitorAccessDto) =>
      apiWrapper(() =>
        VisitorAccessService.visitorAccessControllerCreate({
          requestBody: values,
        }),
      ),
    onSuccess: () => {
      Notify({
        type: 'success',
        message: 'Access code generated successfully',
      });
      queryClient.invalidateQueries({ queryKey: ['visitors'] });
      queryClient.invalidateQueries({ queryKey: ['visitors-statistics'] });
    },
  });

  return controller;
};

export default useCreateVisitorAccess;
