import { useQuery } from '@tanstack/react-query';
import { apiWrapper } from '@wd/api';
import { UtilitiesService } from '@wd/generated';
import { handleError } from '@wd/utils/helpers';
import { useEffect } from 'react';

const useGetUtilities = () => {
  const controller = useQuery({
    queryKey: ['utilities'],
    queryFn: () =>
      apiWrapper(() => UtilitiesService.utilityControllerFindAll()),
  });

  useEffect(() => {
    if (controller.error) {
      handleError(controller.error);
    }
  }, [controller.error]);

  return {
    ...controller,
    utilities: controller.data || [],
  };
};

export default useGetUtilities;
