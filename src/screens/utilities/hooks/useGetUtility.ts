import { useQuery } from '@tanstack/react-query';
import { apiWrapper } from '@wd/api';
import { UtilitiesService } from '@wd/generated';
import { handleError } from '@wd/utils/helpers';
import { useEffect } from 'react';

interface Props {
  id?: string;
}

const useGetUtility = ({ id }: Props) => {
  const controller = useQuery({
    queryKey: ['utilities', id],
    queryFn: () =>
      apiWrapper(() => UtilitiesService.utilityControllerFindOne({ id: id! })),
    enabled: !!id,
  });

  useEffect(() => {
    if (controller.error) {
      handleError(controller.error);
    }
  }, [controller.error]);

  return {
    ...controller,
    utility: controller.data,
  };
};

export default useGetUtility;
